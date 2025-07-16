import * as example from "./example.js";
import * as server_http from "./server_http.js";

export const command = "application <command>";

export const describe = "Execute a custom application (project) command";

export const builder = function (yargs) {
	return yargs.command(example).command(server_http).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
