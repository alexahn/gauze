import * as entity from "./entity.js";

export const command = "read <gauze object>";

export const describe = "Read a gauze object";

export const builder = function (yargs) {
	return yargs.command(entity).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
