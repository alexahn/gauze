import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";

import * as $gauze from "./../../index.js";
//import Router from "./../../router.js";

export const command = "serve";

export const describe = "Run gauze application HTTP server";

export const builder = function (yargs) {
	return yargs
		.env("GAUZE_SERVER")
		.option("protocol", {
			//alias: 'r',
			describe: "Protocol the server should use",
			type: "string",
			default: "http",
		})
		.option("host", {
			//alias: 'h',
			describe: "Host the server should use",
			type: "string",
			default: "localhost",
		})
		.option("port", {
			//alias: 'p',
			describe: "Port the server should use",
			type: "number",
			default: "4000",
			//requiresArg: false,
		})
		.demandOption(["port"]);
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "server argv", argv);

	process.on("SIGINT", function (val) {
		$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGINT: ${val}`);
		process.exit(130);
	});

	process.on("SIGTERM", function (val) {
		$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `process.SIGTERM: ${val}`);
		// https://tldp.org/LDP/abs/html/exitcodes.html
		// 128 + signal_constants from https://nodejs.org/dist/latest-v18.x/docs/api/os.html#signal-constants
		// in this case SIGTERM is 15 so we have 128 + 15
		process.exit(143);
	});

	// asynchronous import here to avoid static dependency linking failing
	import("./../../router.js").then(function (module) {
		const Router = module.default;
		const app = new Koa();
		const router = Router($gauze);

		app.use(koaBody());
		app.use(cors());

		app.use(router.routes());

		app.listen(argv.port);
	});
};
