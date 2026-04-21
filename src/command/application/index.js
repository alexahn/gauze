import * as example from "./example.js";
import * as build from "./build.js";
import * as watch from "./watch.js";
import * as serve from "./serve.js";

export const command = "application <command>";

export const describe = "Run application-level tasks such as serving or building the UI";

export const builder = function (yargs) {
	return yargs.command(build).command(serve).command(watch).command(example).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
