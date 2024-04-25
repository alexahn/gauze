import * as project from "./project.js";
import * as entity from "./entity.js";
import * as gauze from "./gauze.js";

export const command = "create <gauze object>";

export const describe = "Create a gauze object";

export const builder = function (yargs) {
	return yargs.command(project).command(entity).command(gauze).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
