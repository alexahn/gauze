import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "noop";

export const describe = "Run gauze noop";

export const builder = function (yargs) {
	return yargs.env("GAUZE_NOOP");
	//.wrap(128)
};

export const handler = function (argv) {
	console.log(process.argv);
};
