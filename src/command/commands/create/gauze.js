import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import child_process from "child_process";

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "gauze";

export const describe = "Create gauze internal entity";

export const builder = function (yargs) {
	return yargs.env("GAUZE_PROJECT");
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "project argv", argv);
	//
	child_process.execSync("echo hello");
};
