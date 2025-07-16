import ROUTER__HTTP__INTERFACE__DATABASE from "./interfaces/http/router.js";

import Router from "@koa/router";

const ROUTER__DATABASE = new Router();

// todo: add jwt middleware here
// router.use("*", JWT_MIDDLEWARE("system"))
// todo: add maximum request size middleware here
// router.use("*", HTTP_LIMITS_MIDDLEWARE(max_size))
ROUTER__DATABASE.use("", ROUTER__HTTP__INTERFACE__DATABASE.routes());

export default ROUTER__DATABASE;
