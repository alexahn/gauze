import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $project from "./../../../gauze.js"

// todo: figure out if we want to change graphql to not used a named export either
// note: use a default export here because it makes composing much easier across realms and applications

import Router from "@koa/router";

function handle_graphql ($gauze, database, schema, ctx, next) {
	console.log("ASDF", ctx.response.status)
	// 404 is the default response status
	return $gauze.environment.authentication
		.AUTHENTICATE_SYSTEM__AUTHENTICATION__ENVIRONMENT(ctx.get("authorization")).then(function (agent) {
			return database.transaction(function (transaction) {
				const context = {}
				context.project = $project
				context.database = database
				context.transaction = transaction
				context.agent = agent
				return $gauze.environment.authentication
					.VERIFY_JWT_PAYLOAD(context, context.agent).then(function (session) {
						// valid session
						return $gauze.kernel.shell.graphql.EXECUTE__GRAPHQL__SHELL__KERNEL({
							schema: schema,
							context: context,
							operation: ctx.request.body.query,
							operation_name: ctx.request.body.operationName,
							operation_variables: ctx.request.body.variables,
						}).then(function (data) {
							if (data.errors && data.errors.length) {
								$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "errors", data.errors);
								// note: rollback can error
								return transaction.rollback().then(function () {
									$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION REVERTED");
									ctx.response.status = 400
									ctx.response.body = JSON.stringify(data)
								}).catch(function (err) {
									$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO REVERT", err);
									ctx.response.status = 500
									ctx.response.body = JSON.stringify({
										status: 500,
										message: "Internal Server Error"
									})
								})
							} else {
								// note: commit can error
								return transaction.commit(data).then(function () {
									$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION COMMITTED");
									ctx.response.status = 200
									ctx.response.body = JSON.stringify(data)
								}).catch(function (err) {
									$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION FAILED TO COMMIT", err)
									ctx.response.status = 500
									ctx.response.body = JSON.stringify({
										status: 500,
										message: "Internal Server Error"
									})
								})
							}
						}).catch(function (err) {
							// not sure if these conditionals are safe (but if it works how i think it does, then this is the cleanest way to preserve the inner error)
							ctx.response.status = ctx.response.status || 500
							ctx.response.body = ctx.response.body || JSON.stringify({
								status: 500,
								message: "Internal Server Error"
							})
							// note: rollback can error
							return transaction.rollback(err).then(function () {
								$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED REVERTED");
							}).catch(function (err) {
								$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNEXPECTED FAILED TO REVERT");
							})
						})
					}).catch(function (err) {
						// not sure if these conditionals are safe (but if it works how i think it does, then this is the cleanest way to preserve the inner error)
						ctx.response.status = ctx.response.status || 401
						ctx.response.body = ctx.response.body || JSON.stringify({
							status: 401,
							message: "Unauthorized"
						})
						// note: rollback can error
						return transaction.rollback(err).then(function () {
							$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED REVERTED");
						}).catch(function (err) {
							$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("2", __RELATIVE_FILEPATH, "request", "TRANSACTION UNAUTHORIZED FAILED TO REVERT");
							ctx.response.status = 500
							ctx.response.body = JSON.stringify({
								status: 500,
								message: "Internal Server Error"
							})
						})
					})
			}).catch(function (err) {
				// not sure if these conditionals are safe (but if it works how i think it does, then this is the cleanest way to preserve the inner error)
				ctx.response.status = ctx.response.status || 500
				ctx.response.body = ctx.response.body || JSON.stringify({
					status: 500,
					message: "Internal Server Error"
				})
			})
		}).catch(function (err) {
			ctx.response.status = 401
			ctx.response.body = JSON.stringify({
				status: 401,
				message: "Unauthorized"
			})
		}).then(next)
}

export default function ($gauze) {
	const ROUTER__HTTP__INTERFACE__SYSTEM = new Router();

	const database = $gauze.database.knex.create_connection();

	ROUTER__HTTP__INTERFACE__SYSTEM.post("/graphql", function (ctx, next) {

		return handle_graphql($gauze, database, $gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM, ctx, next)

		//ctx.body = "test";
		//return self.handle_graphql($gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM, req, res, agent);
		//return next();
	});

	return ROUTER__HTTP__INTERFACE__SYSTEM;
}
