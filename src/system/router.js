import ROUTER__HTTP__INTERFACE__SYSTEM from "./interfaces/http/router.js";

import Router from "@koa/router";

export default function ($gauze) {
	const ROUTER__SYSTEM = new Router();

	// todo: add jwt middleware here
	// note: maybe don't use a middleware and just wrap the graphql handler. the problem with using a middleware is that the logic for handling the route now depends on the request ctx being modified in a certain way, and it makes me uncomfortable. it's better to keep it functionally pure
	// router.use("*", JWT_MIDDLEWARE("system"))
	ROUTER__SYSTEM.use("", ROUTER__HTTP__INTERFACE__SYSTEM($gauze).routes());

	return ROUTER__SYSTEM;
}
