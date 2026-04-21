import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "make <name>";

export const describe = "Create a new seed file";

export const builder = function (yargs) {
	return yargs.env("GAUZE_PROJECT_SEED").option("name", {
		//alias: 'r',
		describe: "Seed name to include in the new filename",
		type: "string",
		requiresArg: true,
	});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	return MANAGER.seed_make(argv.name).then(function () {
		console.log("Seed file created successfully");
	});
};
