import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "list";

export const describe = "List applied migrations and those still waiting to run";

export const builder = function (yargs) {
	return yargs.env("GAUZE_PROJECT_MIGRATE").option("format", {
		alias: "f",
		description: "Output format for the migration list",
		type: "string",
		requiresArg: false,
		choices: ["console", "json"],
		default: "console",
	});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	return MANAGER.migrate_list(argv.format);
};
