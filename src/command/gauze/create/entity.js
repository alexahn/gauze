import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "entity <directory> <name>";

export const describe = "Create an entity in a gauze project";

export const builder = function (yargs) {
	return yargs
		.env("GAUZE_PROJECT_CREATE")
		.option("directory", {
			//alias: 'r',
			describe: "The gauze project directory that the entity will be created in",
			type: "string",
			requiresArg: true,
		})
		.option("name", {
			//alias: 'n',
			describe: "The name of the entity",
			type: "string",
			requiresArg: true,
		});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	MANAGER.create_entity(argv.directory, argv.name);
};
