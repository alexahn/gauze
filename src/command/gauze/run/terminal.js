import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "terminal";

export const describe = "Run gauze terminal";

export const builder = function (yargs) {
	return yargs.env("GAUZE_TERMINAL");
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "terminal argv", argv);
	const SHELL = $gauze.kernel.src.applications.terminal.GAUZE__TERMINAL__APPLICATION__KERNEL({ $gauze }, argv);
	SHELL.start();
};
