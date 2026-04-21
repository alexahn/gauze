import * as make from "./make.js";
import * as run from "./run.js";

export const command = "seed <command>";

export const describe = "Create and run database seed files";

export const builder = function (yargs) {
	return yargs.command(run).command(make).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
