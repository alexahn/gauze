import ROUTER__DATABASE from "./database/router.js";
import ROUTER__SYSTEM from "./system/router.js";
//import ROUTER__ENVIRONMENT from "./environment/router.js";

import Router from "@koa/router";

export default function ($gauze) {
	const ROUTER = new Router();

	ROUTER.use("/system", ROUTER__SYSTEM($gauze).routes());
	ROUTER.use("/database", ROUTER__DATABASE($gauze).routes());
	//ROUTER.use("/environment", ROUTER__ENVIRONMENT($gauze).routes());

	return ROUTER;
}
