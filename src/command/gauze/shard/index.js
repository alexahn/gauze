import * as plan from "./plan.js";

export const command = "shard <command>";

export const describe = "Inspect shard layouts and sharding plans";

export const builder = function (yargs) {
	return yargs.command(plan).demandCommand();
	//.wrap(128)
};

export const handler = function (argv) {
	// do something with argv.
};
