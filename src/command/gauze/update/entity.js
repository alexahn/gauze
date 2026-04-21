import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "entity <directory> <entity_file>";

export const describe = "Refresh generated code for an existing project entity";

export const builder = function (yargs) {
	return yargs
		.env("GAUZE_PROJECT_UPDATE")
		.option("directory", {
			describe: "Path to the Gauze project that contains the entity",
			type: "string",
			requiresArg: true,
		})
		.option("entity_file", {
			describe: "Path to the entity config file to update from",
			type: "string",
			requiresArg: true,
		});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	MANAGER.update_entity(argv.directory, argv.entity_file);
};
