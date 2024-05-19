import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "gauze <directory> <name>";

export const describe = "Create a gauze builtin entity in a gauze project (for kernel developers only)";

export const builder = function (yargs) {
	return yargs
		.env("GAUZE_PROJECT_CREATE")
		.option("directory", {
			//alias: 'r',
			describe: "The gauze project directory that the gauze builtin entity will be created in",
			type: "string",
			requiresArg: true,
		})
		.option("name", {
			//alias: 'n',
			describe: "The name of the gauze builtin entity",
			type: "string",
			requiresArg: true,
		});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.applications.manager.GAUZE__MANAGER__APPLICATION__KERNEL({ $gauze });
	MANAGER.create_gauze(argv.directory, argv.name);
};
