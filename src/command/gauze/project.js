import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../index.js";

export const command = "project <directory>";

export const describe = "Command a gauze project";

export const builder = function (yargs) {
	return yargs.env("GAUZE_PROJECT").option("directory", {
		//alias: 'r',
		describe: "Interact with a gauze project",
		type: "string",
		requiresArg: true,
	});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const PROJECT_MANAGER = $gauze.kernel.src.applications.project_manager.GAUZE__PROJECT_MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	PROJECT_MANAGER.proxy(argv.directory);
};
