import ROUTES__DATABASE from "./database/router.js";
import ROUTES__SYSTEM from "./system/router.js";

import Router from "@koa/router";

const ROUTER = new Router();

ROUTER.use("/system", ROUTES__SYSTEM.routes());
ROUTER.use("/database", ROUTES__DATABASE.routes());

export default ROUTER

/*

todo: change to structure below to inject $gauze

export default function ($gauze) {
	const router = new Router()
	router.use("/system", ROUTES__SYSTEM($gauze))
	router.use("/database", ROUTES__DATABASE($gauze))
	return router
}
*/
