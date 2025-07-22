import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);
const __RELATIVE_DIRECTORY = path.relative(process.cwd(), import.meta.dirname);

import ROUTER__DATABASE from "./database/router.js";
import ROUTER__SYSTEM from "./system/router.js";
import ROUTER__ENVIRONMENT from "./environment/router.js";

import Router from "@koa/router";
import { send } from "@koa/send";

export default function ($gauze) {
	const ROUTER = new Router();

	ROUTER.use("/system", ROUTER__SYSTEM($gauze).routes());
	ROUTER.use("/database", ROUTER__DATABASE($gauze).routes());
	ROUTER.use("/environment", ROUTER__ENVIRONMENT($gauze).routes());

	ROUTER.use("/gauze/(.*)", async function (ctx) {
		console.log("ENTER")
		console.log('__RELATIVE_DIRECTORY', __RELATIVE_DIRECTORY)
		// remove /gauze prefix from path when accessing files from root directory
		const root = ctx.path.split('/').slice(2).join('/')
		console.log('root', root)
		await send(ctx, root, { root: __RELATIVE_DIRECTORY + "/views/gauze/build" });	
	})
	ROUTER.get("/gauze/(.*)", function (ctx, next) {
		return next()
	})

	return ROUTER;
}
