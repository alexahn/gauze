import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "plan <depth>";

export const describe = "Get the sharding ranges for the depth";

export const builder = function (yargs) {
	return yargs
		.env("GAUZE_PROJECT_SHARD")
		.option("depth", {
			alias: "d",
			describe: "The depth to use for generating the sharding plan",
			type: "number",
			requiresArg: true,
		})
		.option("order", {
			alias: "o",
			describe:
				"The order in which the ranges are returned for the sharding plan. The default is time, which generates the sharding plan according to the logical progression of a sharding strategy. Use key ordering to return shards in contiguous segments.",
			type: "string",
			requiresArg: false,
			choices: ["time", "key"],
			default: "time",
		})
		.option("format", {
			alias: "f",
			description: "The format to log the sharding plan in",
			type: "string",
			requiresArg: false,
			choices: ["console", "json"],
			default: "console",
		});
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });
	return MANAGER.shard_plan(argv.depth, argv.order, argv.format).then(function () {
		console.log("Shard plan created successfully");
	});
};
