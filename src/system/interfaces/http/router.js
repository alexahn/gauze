// todo: figure out if we want to change graphql to not used a named export either
// note: use a default export here because it makes composing much easier across realms and applications

import Router from "@koa/router";

export default function ($gauze) {
	const ROUTER__HTTP__INTERFACE__SYSTEM = new Router();

	ROUTER__HTTP__INTERFACE__SYSTEM.post("/graphql", function (ctx, next) {
		ctx.body = "test";
		return next();
	});

	return ROUTER__HTTP__INTERFACE__SYSTEM;
}
