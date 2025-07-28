import Router from "@koa/router";

import * as $realm from "./../../gauze.js";

export default function ($gauze) {
	const ROUTER__HTTP__INTERFACE__ENVIRONMENT = new Router();

	const database = $gauze.database.knex.create_connection();

	ROUTER__HTTP__INTERFACE__ENVIRONMENT.post("/graphql", function (ctx, next) {
		// note: for some reason, this endpoint does not work if we don't return the promise value, even though i'm calling next at the end of the promise (like a manual callback)
		return $gauze.kernel.src.servers.http.HANDLE_GRAPHQL__HTTP__SERVER__SRC__KERNEL(
			{
				$gauze: $gauze,
				$realm: $realm,
				database: database,
				authenticators: [
					$gauze.environment.authentication.AUTHENTICATE_ENVIRONMENT__AUTHENTICATION__ENVIRONMENT,
					$gauze.environment.authentication.AUTHENTICATE_PROXY__AUTHENTICATION__ENVIRONMENT,
				],
				schema: $gauze.environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT,
			},
			ctx,
			next,
		);
	});

	return ROUTER__HTTP__INTERFACE__ENVIRONMENT;
}
