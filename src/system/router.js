import ROUTER__HTTP__INTERFACE__SYSTEM from "./interfaces/http/router.js";

import Router from "@koa/router";

export default function ($gauze) {
	const ROUTER__SYSTEM = new Router();

	// todo: add jwt middleware here
	// router.use("*", JWT_MIDDLEWARE("system"))
	// todo: add maximum request size middleware here
	// router.use("*", HTTP_LIMITS_MIDDLEWARE(max_size))
	ROUTER__SYSTEM.use("", ROUTER__HTTP__INTERFACE__SYSTEM($gauze).routes());

	return ROUTER__SYSTEM;
}
