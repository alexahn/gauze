import * as gauze from "./gauze.js";
import * as entity from "./entity.js";

export const command = "read <gauze object>";

export const describe = "Inspect an entity or builtin scaffold and print its generated source";

export const builder = function (yargs) {
	return yargs.command(gauze).command(entity).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
