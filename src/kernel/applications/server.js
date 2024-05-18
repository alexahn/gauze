import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import http from "http";
//import { v4 as uuidv4 } from "uuid";

import * as jose from "jose";

import * as $project from "./../../gauze.js";

class GauzeServer {
	// note: config takes the command argv structure (src/command/commands/run/server.js)
	constructor({ $gauze }, config) {
		const self = this;
		self.$gauze = $gauze;
		self.config = config;

		process.on("SIGINT", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGINT: ${val}`);
			process.exit(130);
		});

		process.on("SIGTERM", function (val) {
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGTERM: ${val}`);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (val) {
			self.database.destroy();
			$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `process.exit: ${val}`);
		});

		self.database = $gauze.database.knex.create_connection();

		self.routes = [
			{
				url: new RegExp("^/database/graphql"),
				handler: function (req, res) {
					return self.handle_graphql($gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE, req, res);
				},
			},
			{
				url: new RegExp("^/system/graphql"),
				handler: function (req, res) {
					if (req.method === "OPTIONS") {
						res.writeHead(200, "OK", {
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Headers": "*",
						}).end(
							JSON.stringify({
								status: 200,
								message: "OK",
							}),
						);
					} else {
						// parse system jwt
						return self.$gauze.environment.authentication.AUTHENTICATE_SYSTEM__AUTHENTICATION__ENVIRONMENT(req).then(function (agent) {
							if (agent) {
								return self.handle_graphql($gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM, req, res, agent);
							} else {
								res.writeHead(401, "Unauthorized", {
									"content-type": "application/json; charset=utf-8",
									"Access-Control-Allow-Origin": "*",
								}).end(
									JSON.stringify({
										status: 401,
										message: "Unauthorized",
									}),
								);
							}
						});
					}
				},
			},
			{
				url: new RegExp("^/environment/graphql"),
				handler: function (req, res) {
					// parse environment and system jwt
					const auth_transactions = [
						function () {
							return self.$gauze.environment.authentication.AUTHENTICATE_ENVIRONMENT__AUTHENTICATION__ENVIRONMENT(req);
						},
						function () {
							return self.$gauze.environment.authentication.AUTHENTICATE_SYSTEM__AUTHENTICATION__ENVIRONMENT(req);
						},
					];
					return Promise.all(
						auth_transactions.map(function (f) {
							return f();
						}),
					)
						.then(function (agents) {
							if (agents[0]) {
								return agents[0];
							} else if (agents[1]) {
								return agents[1];
							} else {
								return null;
							}
						})
						.then(function (agent) {
							if (req.headers.authorization) {
								if (agent) {
									return self.handle_graphql($gauze.environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT, req, res, agent);
								} else {
									res.writeHead(401, "Unauthorized", {
										"content-type": "application/json; charset=utf-8",
										"Access-Control-Allow-Origin": "*",
									}).end(
										JSON.stringify({
											status: 401,
											message: "Unauthorized",
										}),
									);
								}
							} else {
								return self.handle_graphql($gauze.environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT, req, res, agent);
							}
						});
				},
			},
			{
				url: new RegExp(".*"),
				handler: function (req, res) {
					res.writeHead(404, "Not Found", {
						"content-type": "application/json; charset=utf-8",
						"Access-Control-Allow-Origin": "*",
					}).end(
						JSON.stringify({
							status: 404,
							message: "Not Found",
						}),
					);
				},
			},
		];

		self.server = http.createServer((req, res) => {
			const route = self.routes.find(function (route) {
				return route.url.test(req.url);
			});
			return route.handler(req, res);
		});

		return this;
	}
	handle_graphql_query(schema, req, res, agent, body) {
		const self = this;
		return self.database.transaction(function (transaction) {
			const context = {};
			context.project = $project;
			context.database = self.database;
			context.transaction = transaction;
			context.agent = agent;
			//context.parameters = body.variables
			//context.request_id = uuidv4()

			// todo: refactor this later, seems kind of ugly
			return new Promise(function (resolve, reject) {
				if (context.agent) {
					return self.$gauze.environment.authentication
						.VERIFY_JWT_PAYLOAD(context, context.agent)
						.then(function (session) {
							return resolve(session);
						})
						.catch(function (err) {
							return reject(err);
						});
				} else {
					return resolve(null);
				}
			}).then(function () {
				return self.$gauze.kernel.shell.graphql
					.EXECUTE__GRAPHQL__SHELL__KERNEL({
						schema: schema,
						context: context,
						operation: body.query,
						operation_name: body.operationName,
						operation_variables: body.variables,
					})
					.then(function (data) {
						if (data.errors && data.errors.length) {
							self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "errors", data.errors);
							return transaction
								.rollback()
								.then(function () {
									self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION REVERTED");
									res.writeHead(400, "Bad Request", {
										"content-type": "application/json; charset=utf-8",
										"Access-Control-Allow-Origin": "*",
									}).end(JSON.stringify(data));
								})
								.catch(function (err) {
									self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO REVERT", err);
									res.writeHead(500, "Internal Server Error", {
										"content-type": "application/json; charset=utf-8",
										"Access-Control-Allow-Origin": "*",
									}).end(
										JSON.stringify({
											status: 500,
											message: "Internal Server Error",
										}),
									);
								});
						} else {
							return transaction
								.commit(data)
								.then(function () {
									self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION COMMITTED");
									res.writeHead(200, "OK", {
										"content-type": "application/json; charset=utf-8",
										"Access-Control-Allow-Origin": "*",
									}).end(JSON.stringify(data));
								})
								.catch(function (err) {
									self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO COMMIT", err);
									res.writeHead(500, "Internal Server Error", {
										"content-type": "application/json; charset=utf-8",
										"Access-Control-Allow-Origin": "*",
									}).end(
										JSON.stringify({
											status: 500,
											message: "Internal Server Error",
										}),
									);
								});
						}
					})
					.catch(function (err) {
						self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "internal error", err);
						return transaction
							.rollback(err)
							.then(function () {
								res.writeHead(500, "Internal Server Error", {
									"content-type": "application/json; charset=utf-8",
									"Access-Control-Allow-Origin": "*",
								}).end(
									JSON.stringify({
										status: 500,
										message: "Internal Server Error",
									}),
								);
							})
							.catch(function (err) {
								self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO ROLLBACK", err);
								res.writeHead(500, "Internal Server Error", {
									"content-type": "application/json; charset=utf-8",
									"Access-Control-Allow-Origin": "*",
								}).end(
									JSON.stringify({
										status: 500,
										message: "Internal Server Error",
									}),
								);
							});
					});
			});
		});
	}
	handle_graphql(schema, req, res, agent) {
		var data = [];
		var self = this;
		if (req.method === "POST") {
			req.on("data", function (chunk) {
				data.push(chunk);
			});
			req.on("end", function () {
				try {
					var body = JSON.parse(Buffer.concat(data).toString("utf8"));
				} catch (err) {
					res.writeHead(400, "Bad Request", {
						"content-type": "application/json; charset=utf-8",
						"Access-Control-Allow-Origin": "*",
					}).end(
						JSON.stringify({
							status: 400,
							message: "Bad Request",
						}),
					);
					return;
				}
				return self.handle_graphql_query(schema, req, res, agent, body);
			});
		} else if (req.method === "OPTIONS") {
			res.writeHead(200, "OK", {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*",
			}).end(
				JSON.stringify({
					status: 200,
					message: "OK",
				}),
			);
		}
	}
	start() {
		this.server.listen(this.config.port);
	}
}

const GAUZE__SERVER__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeServer(modules, argv);
};

export { GAUZE__SERVER__APPLICATION__KERNEL };
