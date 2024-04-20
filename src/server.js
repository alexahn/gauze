import http from 'http';
import {
	graphql
} from 'graphql'
/*
import {
	createHandler
} from 'graphql-http/lib/use/http';
*/
import {
	createHandler
} from 'graphql-http';

import {
	SCHEMA_INTERFACE_SYSTEM as schema
} from './system/interfaces/graphql/schema.js';

import database from './database/knex.js'

// Create the GraphQL over HTTP Node request handler
/*
const handler = createHandler({
	schema
});
*/

// Create a HTTP server using the listener on `/graphql`
const server = http.createServer((req, res) => {
	if (req.url.startsWith('/graphql')) {
		var body = ''
		req.on('data', function (chunk) {
			//console.log('chunk', chunk)
			body += chunk
		})
		req.on('end', function () {
			//console.log('body', body.toString('utf8'))
			try {
				var parsed = JSON.parse(body)

			} catch (err) {
				red.end(JSON.stringify(err))
			}
			database.transaction(function (transaction) {
				const context = {}
				context.database = database
				context.transaction = transaction
				graphql({
					schema: schema,
					source: parsed.query,
					contextValue: context
				}).then(function (data) {
					//console.log('result', JSON.stringify(data, null, 4))
					if (data.errors && data.errors.length) {
						return transaction.rollback().then(function () {
							console.log('transaction reverted')
							// figure out when to send 500 / 'Internal Server Error' versus 400
							res.writeHead(400, 'Bad Request', {
								'content-type': 'application/json; charset=utf-8'
							}).end(JSON.stringify(data))
						})
					} else {
						return transaction.commit(data).then(function () {
							// write to body
							console.log('transaction committed')
							res.writeHead(200, 'OK', {
								'content-type': 'application/json; charset=utf-8'
							}).end(JSON.stringify(data))
						})
					}
				}).catch(function (err) {
					console.log('err', err)
					return transaction.rollback(err).then(function () {
						res.end(JSON.stringify(err))
					})
				})
			})

			/*
			const handle = createHandler({
				schema,
				context
			});

			try {
				if (!req.url) {
					throw new Error('Missing request URL');
				}
				if (!req.method) {
					throw new Error('Missing request method');
				}
				handle(toRequest(req, res)).then(function ([body, init]) {

					if (body.errors && body.errors.length) {
						transaction.rollback().then(function () {
							console.log('reverting transaction')
							res.writeHead(init.status, init.statusText, init.headers).end(body);
						})
					} else {
						transaction.commit().then(function () {
							console.log('committing transaction')
							res.writeHead(init.status, init.statusText, init.headers).end(body);
						})
					}
					//res.writeHead(init.status, init.statusText, init.headers).end(body);

				}).catch(function (err) {
					
				})
			} catch (err) {
				// The handler shouldnt throw errors.
				// If you wish to handle them differently, consider implementing your own request handler.
				console.error(
					'Internal error occurred during request handling. ' +
					'Please check your implementation.',
					err,
				);
				res.writeHead(500).end();
			}
			//handler(req, res);
			*/
		})
	} else {
		res.writeHead(404).end();
	}
});

function toRequest (
	req,
	res,
) {
	if (!req.url) {
		throw new Error('Missing request URL');
	}
	if (!req.method) {
		throw new Error('Missing request method');
	}
	return {
		url: req.url,
		method: req.method,
		headers: req.headers,
		body: () =>
			new Promise((resolve) => {
				let body = '';
				req.setEncoding('utf-8');
				req.on('data', (chunk) => (body += chunk));
				req.on('end', () => resolve(body));
			}),
		raw: req,
		context: {
			res
		},
	};
}

server.listen(4000);
console.log('Listening to port 4000');