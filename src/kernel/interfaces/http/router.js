import Router from "@koa/router";

import * as $realm from "./../../gauze.js";

export default function ($gauze) {
	const ROUTER__HTTP__INTERFACE__KERNEL = new Router();

	/*
	ROUTER__HTTP__INTERFACE__SYSTEM.post("/graphql", function (ctx, next) {
		return $gauze.kernel.src.servers.http.HANDLE_GRAPHQL__HTTP__SERVER__SRC__KERNEL(
			{
				$gauze: $gauze,
				$realm: $realm,
				authenticators: [$gauze.environment.authentication.AUTHENTICATE_SYSTEM__AUTHENTICATION__ENVIRONMENT],
				schema: $gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM,
			},
			ctx,
			next,
		);
	});
	*/

	return ROUTER__HTTP__INTERFACE__KERNEL;
}
