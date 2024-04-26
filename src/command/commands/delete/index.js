import * as gauze from "./gauze.js";
import * as entity from "./entity.js";

export const command = "delete <gauze object>";

export const describe = "Delete a gauze object";

export const builder = function (yargs) {
	return yargs.command(gauze).command(entity).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
