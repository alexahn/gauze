import * as example from "./example.js";

export const command = "user <command>";

export const describe = "Execute a custom user (project) command";

export const builder = function (yargs) {
	return yargs.command(example).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
