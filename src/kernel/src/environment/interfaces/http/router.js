import Router from "@koa/router";

import * as $realm from "./../../../gauze.js"

export default function ($gauze) {
	const ROUTER__HTTP__INTERFACE__ENVIRONMENT = new Router();

	const database = $gauze.database.knex.create_connection();

	ROUTER__HTTP__INTERFACE__ENVIRONMENT.post("/graphql", function (ctx, next) {
		return $gauze.kernel.src.servers.http.HANDLE_ENVIRONMENT_GRAPHQL__HTTP__SERVER__SRC__KERNEL(
			{
				$gauze: $gauze,
				$realm: $realm,
				database: database,
				authenticators: [
					$gauze.environment.authentication.AUTHENTICATE_ENVIRONMENT__AUTHENTICATION__ENVIRONMENT,
					//$gauze.environment.authentication.AUTHENTICATE_SYSTEM__AUTHENTICATION__ENVIRONMENT,
					//$gauze.environment.authentication.AUTHENTICATE_DATABASE__AUTHENTICATION__ENVIRONMENT,
					//$gauze.environment.authentication.AUTHENTICATE_KERNEL__AUTHENTICATION__ENVIRONMENT,
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
