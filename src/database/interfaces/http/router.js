import Router from "@koa/router";

import * as $realm from "./../../../gauze.js"

export default function ($gauze) {
	const ROUTER__HTTP__INTERFACE__DATABASE = new Router();

	const database = $gauze.database.knex.create_connection();

	// this is called once the exit trajectory has been set
	process.on("exit", function (val) {
		database.destroy();
	});

	ROUTER__HTTP__INTERFACE__DATABASE.post("/graphql", function (ctx, next) {
		return $gauze.kernel.src.servers.http.HANDLE_REALM_GRAPHQL__HTTP__SERVER__SRC__KERNEL(
			{
				$gauze: $gauze,
				$realm: $realm,
				database: database,
				authenticators: [$gauze.environment.authentication.AUTHENTICATE_DATABASE__AUTHENTICATION__ENVIRONMENT],
				schema: $gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
			},
			ctx,
			next,
		);
	});

	return ROUTER__HTTP__INTERFACE__DATABASE;
}
