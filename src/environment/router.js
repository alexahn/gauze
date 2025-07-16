import ROUTER__HTTP__INTERFACE__ENVIRONMENT from "./interfaces/http/router.js";

import Router from "@koa/router";

export default function ($gauze) {
	const ROUTER__ENVIRONMENT = new Router();

	// todo: add jwt middleware here
	// note: maybe don't use a middleware and just wrap the graphql handler. the problem with using a middleware is that the logic for handling the route now depends on the request ctx being modified in a certain way, and it makes me uncomfortable. it's better to keep it functionally pure
	// router.use("*", JWT_MIDDLEWARE("environment"))
	ROUTER__ENVIRONMENT.use("", ROUTER__HTTP__INTERFACE__ENVIRONMENT($gauze).routes());

	return ROUTER__ENVIRONMENT;
}
