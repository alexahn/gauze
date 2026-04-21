import * as gauze from "./gauze.js";
import * as entity from "./entity.js";

export const command = "update <gauze object>";

export const describe = "Update an entity or builtin scaffold in a Gauze project";

export const builder = function (yargs) {
	return yargs.command(gauze).command(entity).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
