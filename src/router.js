import path from "path";

import url from "url";

import ROUTER__DATABASE from "./database/router.js";
import ROUTER__SYSTEM from "./system/router.js";
import ROUTER__ENVIRONMENT from "./environment/router.js";

import Router from "@koa/router";
import { send } from "@koa/send";
import etag from "@koa/etag";
import compress from "koa-compress";
import conditional from "koa-conditional-get";

const GAUZE_V1_BUILD_ROOT = path.resolve(import.meta.dirname, "./views/gauze/v1/build");
const PROJECT_BUILD_ROOT = path.resolve(import.meta.dirname, "./views/project/build");

// note: currently unused (edit src/views/gauze/build/index.html instead)
function gauzeIndex() {
	const index = `<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gauze</title>
        <link rel="stylesheet" href="${process.env.GAUZE_SERVER_PROTOCOL}://${process.env.GAUZE_SERVER_HOST}:${process.env.GAUZE_SERVER_PORT}/gauze/index.css" />
    </head>
    <body>
        <div id="gauze"></div>
        <script src="${process.env.GAUZE_SERVER_PROTOCOL}://${process.env.GAUZE_SERVER_HOST}:${process.env.GAUZE_SERVER_PORT}/gauze/index.js"></script>
    </body>
</html>`;
	return index;
}

// note: currently unused (edit src/views/project/build/index.html instead)
function projectIndex() {
	const index = `<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Project</title>
        <link rel="stylesheet" href="${process.env.GAUZE_SERVER_PROTOCOL}://${process.env.GAUZE_SERVER_HOST}:${process.env.GAUZE_SERVER_PORT}/gauze/index.css" />
    </head>
    <body>
        <div id="project"></div>
        <script src="${process.env.GAUZE_SERVER_PROTOCOL}://${process.env.GAUZE_SERVER_HOST}:${process.env.GAUZE_SERVER_PORT}/gauze/index.js"></script>
    </body>
</html>`;
	return index;
}

export default function ($gauze) {
	const ROUTER = new Router();

	// todo: move these middleware outside to command level (or put it in project config)
	ROUTER.use(compress());
	ROUTER.use(conditional());
	ROUTER.use(etag());

	ROUTER.use("/system", ROUTER__SYSTEM($gauze).routes());
	ROUTER.use("/database", ROUTER__DATABASE($gauze).routes());
	ROUTER.use("/environment", ROUTER__ENVIRONMENT($gauze).routes());

	ROUTER.get("/gauze/v1", function (ctx, next) {
		if (ctx.path[ctx.path.length - 1] === "/") {
			// nothing
		} else {
			ctx.status = 301;
			ctx.redirect("/gauze/v1/");
		}
		return next();
	});
	ROUTER.get("/gauze/v1/(.*)", async function (ctx, next) {
		if (ctx.get("referrer")) {
			const referrer_parsed = new url.URL(ctx.get("referrer"));
			const referrer_directory = referrer_parsed.pathname[referrer_parsed.pathname.length - 1] === "/" ? referrer_parsed.pathname : path.dirname(referrer_parsed.pathname);
			const relative_path = path.relative(referrer_directory, ctx.path);
			if (path.extname(ctx.path)) {
				await send(ctx, relative_path, { root: GAUZE_V1_BUILD_ROOT, index: "index.html" });
			} else {
				//ctx.status = 200;
				//ctx.body = gauzeIndex();
				//await next();
				await send(ctx, "/index.html", { root: GAUZE_V1_BUILD_ROOT, index: "index.html" });
			}
		} else {
			// remove /gauze prefix from path when accessing files from root directory
			if (path.extname(ctx.path)) {
				// note: prefix length is 2 because /gauze/v1 has 2 segments
				const prefix_length = 2;
				const path_split = ctx.path.split("/");
				const rebased_path_split = path_split.slice(0, 1).concat(path_split.slice(prefix_length + 1));
				const rebased_path = rebased_path_split.join("/");
				await send(ctx, rebased_path, { root: GAUZE_V1_BUILD_ROOT, index: "index.html" });
			} else {
				//ctx.status = 200;
				//ctx.body = gauzeIndex();
				//await next();
				await send(ctx, "/index.html", { root: GAUZE_V1_BUILD_ROOT, index: "index.html" });
			}
		}
	});

	ROUTER.get("/project", function (ctx, next) {
		if (ctx.path[ctx.path.length - 1] === "/") {
			// nothing
		} else {
			ctx.status = 301;
			ctx.redirect("/project/");
		}
		return next();
	});
	ROUTER.get("/project/(.*)", async function (ctx, next) {
		if (path.extname(ctx.path)) {
			const project_prefix = "/project";
			const rebased_path = ctx.path.slice(project_prefix.length);
			await send(ctx, rebased_path, { root: PROJECT_BUILD_ROOT, index: "index.html" });
		} else {
			//ctx.status = 200;
			//ctx.body = projectIndex();
			//await next();
			await send(ctx, "/index.html", { root: PROJECT_BUILD_ROOT, index: "index.html" });
		}
	});

	return ROUTER;
}
