import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "gauze <directory> <entity_file>";

export const describe = "Print the files and metadata for a builtin Gauze entity";

export const builder = function (yargs) {
	return yargs
		.env("GAUZE_PROJECT")
		.option("directory", {
			//alias: 'r',
			describe: "Path to the Gauze project that contains the builtin entity",
			type: "string",
			requiresArg: true,
		})
		.option("entity_file", {
			//alias: 'n',
			describe: "Path to the builtin entity config file to inspect",
			type: "string",
			requiresArg: true,
		});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	MANAGER.read_gauze(argv.directory, argv.entity_file);
};
