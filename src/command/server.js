import http from "http";
import { graphql } from "graphql";
/*
import {
	createHandler
} from 'graphql-http/lib/use/http';
*/
import { createHandler } from "graphql-http";

import { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM } from "./../system/interfaces/graphql/schema.js";

import { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE } from "./../database/interfaces/graphql/schema.js";

import { create_connection } from "./../database/knex.js";

const database = create_connection();

function create_graphql_handler(schema, req, res) {
	var body = "";
	req.on("data", function (chunk) {
		body += chunk;
	});
	req.on("end", function () {
		try {
			var parsed = JSON.parse(body);
		} catch (err) {
			red.end(JSON.stringify(err));
		}
		return database.transaction(function (transaction) {
			const context = {};
			context.database = database;
			context.transaction = transaction;
			return graphql({
				schema: schema,
				source: parsed.query,
				contextValue: context,
				variableValues: parsed.variables,
				operationName: parsed.operationName,
			})
				.then(function (data) {
					//console.log('result', JSON.stringify(data, null, 4))
					if (data.errors && data.errors.length) {
						console.log(data.errors);
						return transaction
							.rollback()
							.then(function () {
								console.log("transaction reverted");
								// database.destroy()
								res.writeHead(400, "Bad Request", {
									"content-type": "application/json; charset=utf-8",
								}).end(JSON.stringify(data));
							})
							.catch(function (err) {
								console.log("transaction failed to revert", err);
								res.writeHead(500, "Internal Server Error", {
									"content-type": "application/json; charset=utf-8",
								}).end(JSON.stringify(data));
							});
					} else {
						return transaction
							.commit(data)
							.then(function () {
								// write to body
								console.log("transaction committed");
								//database.destroy()
								res.writeHead(200, "OK", {
									"content-type": "application/json; charset=utf-8",
								}).end(JSON.stringify(data));
							})
							.catch(function (err) {
								console.log("transaction failed to commit", err);
								res.writeHead(500, "Internal Server Error", {
									"content-type": "application/json; charset=utf-8",
								}).end(JSON.stringify(data));
							});
					}
				})
				.catch(function (err) {
					console.log("err", err);
					//database.destroy()
					return transaction
						.rollback(err)
						.then(function () {
							res.writeHead(500, "Internal Server Error", {
								"content-type": "application/json; charset=utf-8",
							}).end(JSON.stringify(err));
						})
						.catch(function (err) {
							res.writeHead(500, "Internal Server Error", {
								"content-type": "application/json; charset=utf-8",
							}).end(JSON.stringify(err));
						});
				});
		});
	});
}

// Create a HTTP server using the listener on `/graphql`
const server = http.createServer((req, res) => {
	if (req.url.startsWith("/database/graphql")) {
		return create_graphql_handler(SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE, req, res);
	} else if (req.url.startsWith("/system/graphql")) {
		return create_graphql_handler(SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM, req, res);
	} else {
		res.writeHead(404).end();
	}
});

server.listen(4000);
console.log("Listening to port 4000");
