import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "current <mode>";

export const describe = "Get the current migration version";

export const builder = function (yargs) {
	return yargs.env("GAUZE_PROJECT_MIGRATE").option("mode", {
		alias: "m",
		describe: "The run mode. Single will get the current migration version for the first shard node. All will get the current migration version for every shard node.",
		choices: ["single", "all"], // Fixed set of options
		type: "string",
	});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	return MANAGER.migrate_current_version(argv.mode);
};
