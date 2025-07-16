import * as $project from "./../../../gauze.js"

// todo: figure out if we want to change graphql to not used a named export either
// note: use a default export here because it makes composing much easier across realms and applications

import Router from "@koa/router";

function handle_graphql ($gauze, database, schema, ctx, next) {
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
							ctx.body = JSON.stringify(data)
							return transaction.commit(data)
						})
					})
			}).catch(function (err) {
				return transaction.rollback(err)
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
