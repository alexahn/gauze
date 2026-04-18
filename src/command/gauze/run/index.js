import * as terminal from "./terminal.js";
import * as noop from "./noop.js";

export const command = "run <application>";

export const describe = "Run a gauze application";

export const builder = function (yargs) {
	return yargs.command(terminal).command(noop).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
