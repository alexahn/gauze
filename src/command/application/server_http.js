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
import Router from "./../../router.js";

export const command = "server_http";

export const describe = "Run gauze application server http";

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
			requiresArg: true,
		})
		.demandOption(["port"]);
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "server argv", argv);

	const app = new Koa();
	const router = Router($gauze);

	app.use(koaBody());
	app.use(cors());
	app.use(router.routes());

	app.listen(argv.port);
};
