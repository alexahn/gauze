import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "down [migration]";

export const describe = "Undo the last migration that was run";

export const builder = function (yargs) {
	return yargs.env("GAUZE_PROJECT_MIGRATE").option("migration", {
		describe: "The name of the migration file",
		type: "string",
		requiresArgs: false,
	});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	MANAGER.migrate_down(argv.migration);
};
