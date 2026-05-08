import path from "path";

import ROUTER__DATABASE from "./database/router.js";
import ROUTER__SYSTEM from "./system/router.js";
import ROUTER__ENVIRONMENT from "./environment/router.js";

import Router from "@koa/router";
import { send } from "@koa/send";
import etag from "@koa/etag";
import compress from "koa-compress";
import conditional from "koa-conditional-get";

const GAUZE_BUILD_ROOT = path.resolve(import.meta.dirname, "./views/gauze/build");

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

function redirectToGauze(ctx, prefix) {
	const rebased_path = ctx.path.slice(prefix.length) || "/";
	const query = ctx.querystring ? `?${ctx.querystring}` : "";
	ctx.status = 301;
	ctx.redirect(`/gauze${rebased_path}${query}`);
}

function redirectToGauzeHandler(prefix) {
	return function (ctx, next) {
		redirectToGauze(ctx, prefix);
		return next();
	};
}

async function sendGauzeBuild(ctx) {
	if (path.extname(ctx.path)) {
		const gauze_prefix = "/gauze";
		const rebased_path = ctx.path.slice(gauze_prefix.length);
		await send(ctx, rebased_path, { root: GAUZE_BUILD_ROOT, index: "index.html" });
	} else {
		//ctx.status = 200;
		//ctx.body = gauzeIndex();
		//await next();
		await send(ctx, "/index.html", { root: GAUZE_BUILD_ROOT, index: "index.html" });
	}
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

	ROUTER.get("/project", redirectToGauzeHandler("/project"));
	ROUTER.get("/project/(.*)", redirectToGauzeHandler("/project"));
	ROUTER.get("/gauze/v1", redirectToGauzeHandler("/gauze/v1"));
	ROUTER.get("/gauze/v1/(.*)", redirectToGauzeHandler("/gauze/v1"));

	ROUTER.get("/gauze", function (ctx, next) {
		if (ctx.path[ctx.path.length - 1] === "/") {
			// nothing
		} else {
			const query = ctx.querystring ? `?${ctx.querystring}` : "";
			ctx.status = 301;
			ctx.redirect(`/gauze/${query}`);
		}
		return next();
	});
	ROUTER.get("/gauze/(.*)", async function (ctx, next) {
		await sendGauzeBuild(ctx);
	});

	return ROUTER;
}
