import ROUTES__HTTP__INTERFACE__DATABASE from "./database/interfaces/http/routes.js";
import ROUTES__HTTP__INTERFACE__SYSTEM from "./system/interfaces/http/routes.js";

import Router from "@koa/router";

const router = new Router();

router.post("/database", ROUTES__HTTP__INTERFACE__DATABASE.routes());
router.post("/system", ROUTES__HTTP__INTERFACE__SYSTEM.routes());

console.log("composed", router);
