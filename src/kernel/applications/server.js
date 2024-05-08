import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import http from "http";

import * as jose from "jose";

class GauzeServer {
	// note: config takes the command argv structure (src/command/commands/run/server.js)
	constructor({ $gauze }, config) {
		const self = this;
		this.$gauze = $gauze;
		this.config = config;

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

		this.database = $gauze.database.knex.create_connection();

		this.server = http.createServer((req, res) => {
			if (req.url.startsWith("/database/graphql")) {
				return this.create_graphql_handler($gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE, req, res);
			} else if (req.url.startsWith("/system/graphql")) {
				// parse system jwt here
				return this.create_graphql_handler($gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM, req, res);
			} else if (req.url.startsWith("/environment/graphql")) {
				// parse environment jwt here
				var environment_jwt = null;
				const environment_auth = req.headers.authorization;
				if (environment_auth) {
					const environment_auth_split = environment_auth.split(" ");
					if (environment_auth_split[0] === "Bearer") {
						environment_jwt = environment_auth_split[1];
					}
				}
				const secret = new TextEncoder().encode(process.env.GAUZE_ENVIRONMENT_JWT_SECRET);
				return jose
					.jwtVerify(environment_jwt, secret, {
						issuer: "gauze",
						//audience: 'urn:example:audience',
					})
					.then(function ({ payload, protectedHeader }) {
						// agent is payload
						const agent = payload;
						console.log("agent", agent);
						return self.create_graphql_handler($gauze.environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT, req, res, agent);
					})
					.catch(function (error) {
						// agent is null
						const agent = null;
						console.log("agent", agent);
						return self.create_graphql_handler($gauze.environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT, req, res, agent);
					});
				//return this.create_graphql_handler($gauze.environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT, req, res, agent);
			} else {
				res.writeHead(404).end();
			}
		});
		return this;
	}
	create_graphql_handler(schema, req, res, agent) {
		var body = "";
		var self = this;
		req.on("data", function (chunk) {
			body += chunk;
		});
		req.on("end", function () {
			try {
				var parsed = JSON.parse(body);
			} catch (err) {
				res.writeHead(400, "Bad Request", {
					"content-type": "application/json; charset=utf-8",
				}).end(JSON.stringify(err));
				return;
			}
			return self.database.transaction(function (transaction) {
				const context = {};
				context.database = self.database;
				context.transaction = transaction;
				context.agent = agent;
				return self.$gauze.kernel.shell.graphql
					.EXECUTE__GRAPHQL__SHELL__KERNEL({
						schema: schema,
						context: context,
						operation: parsed.query,
						operation_name: parsed.operationName,
						operation_variables: parsed.variables,
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
									}).end(JSON.stringify(data));
								})
								.catch(function (err) {
									self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO REVERT");
									res.writeHead(500, "Internal Server Error", {
										"content-type": "application/json; charset=utf-8",
									}).end(JSON.stringify(data));
								});
						} else {
							return transaction
								.commit(data)
								.then(function () {
									self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION COMMITTED");
									res.writeHead(200, "OK", {
										"content-type": "application/json; charset=utf-8",
									}).end(JSON.stringify(data));
								})
								.catch(function (err) {
									self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO COMMIT");
									res.writeHead(500, "Internal Server Error", {
										"content-type": "application/json; charset=utf-8",
									}).end(JSON.stringify(data));
								});
						}
					})
					.catch(function (err) {
						self.$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "err", err);
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
	start() {
		this.server.listen(this.config.port);
	}
}

const GAUZE__SERVER__APPLICATION__KERNEL = function (modules, argv) {
	return new GauzeServer(modules, argv);
};

export { GAUZE__SERVER__APPLICATION__KERNEL };
