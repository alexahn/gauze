import http from "http";

class GauzeServer {
	// note: config takes the command argv structure (src/command/commands/run/server.js)
	constructor({ $gauze }, config) {
		this.$gauze = $gauze;
		this.config = config;

		process.on("SIGINT", (val) => {
			console.log("SIGINT", val);
			process.exit(130);
		});

		process.on("SIGTERM", (val) => {
			console.log("SIGTERM", val);
			// https://tldp.org/LDP/abs/html/exitcodes.html
			// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
			// in this case SIGTERM is 15 so we have 128 + 15
			process.exit(143);
		});

		// this is called once the exit trajectory has been set
		process.on("exit", function (v) {
			console.log("terminating", v);
		});

		this.database = $gauze.database.knex.create_connection();

		this.server = http.createServer((req, res) => {
			if (req.url.startsWith("/database/graphql")) {
				return this.create_graphql_handler($gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE, req, res);
			} else if (req.url.startsWith("/system/graphql")) {
				return this.create_graphql_handler($gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM, req, res);
			} else {
				res.writeHead(404).end();
			}
		});
		return this;
	}
	create_graphql_handler(schema, req, res) {
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
	start() {
		this.server.listen(this.config.port);
	}
}

const GAUZE__SERVER__APPLICATION__KERNEL = function (modules, options) {
	return new GauzeServer(modules, options);
};

export { GAUZE__SERVER__APPLICATION__KERNEL };
