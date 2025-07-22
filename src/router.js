import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);
const __RELATIVE_DIRECTORY = path.relative(process.cwd(), import.meta.dirname);

import url from "url";

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
		if (ctx.get('referrer')) {
			const referrer_parsed = new url.URL(ctx.get('referrer'))
			const referrer_directory = referrer_parsed.pathname[referrer_parsed.pathname.length - 1] === "/" ? referrer_parsed.pathname : path.dirname(referrer_parsed.pathname)
			const relative_path = path.relative(referrer_directory, ctx.path)
			if (path.extname(ctx.path)) {
				await send(ctx, relative_path, { root: __RELATIVE_DIRECTORY + "/views/gauze/build", index: "index.html" });
			} else {
				await send(ctx, "/index.html", { root: __RELATIVE_DIRECTORY + "/views/gauze/build", index: "index.html" });
			}
		} else {
			// remove /gauze prefix from path when accessing files from root directory
			if (path.extname(ctx.path)) {
				const path_split = ctx.path.split('/')
				const rebased_path_split = path_split.slice(0, 1).concat(path_split.slice(2))
				const rebased_path = rebased_path_split.join('/')
				await send(ctx, rebased_path, { root: __RELATIVE_DIRECTORY + "/views/gauze/build", index: "index.html" });	
			} else {
				await send(ctx, "/index.html", { root: __RELATIVE_DIRECTORY + "/views/gauze/build", index: "index.html" });	
			}
		}
	})
	ROUTER.get("/gauze/(.*)", function (ctx, next) {
		return next()
	})
	ROUTER.get("/gauze", function (ctx, next) {
		ctx.status = 301;
		ctx.redirect("/gauze/")
		return next()
	})

	return ROUTER;
}
