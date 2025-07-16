import * as example from "./example.js";

export const command = "application <command>";

export const describe = "Execute a custom application (project) command";

export const builder = function (yargs) {
	return yargs.command(example).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
