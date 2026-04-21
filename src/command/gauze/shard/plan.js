import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../../index.js";

export const command = "plan <depth>";

export const describe = "Generate shard key ranges for a given shard depth";

export const builder = function (yargs) {
	return yargs
		.env("GAUZE_PROJECT_SHARD")
		.option("depth", {
			alias: "d",
			describe: "Shard depth to generate ranges for",
			type: "number",
			requiresArg: true,
		})
		.option("order", {
			alias: "o",
			describe:
				"Ordering for the generated ranges. Use `time` for rollout order or `key` for contiguous key-space order.",
			type: "string",
			requiresArg: false,
			choices: ["time", "key"],
			default: "time",
		})
		.option("format", {
			alias: "f",
			description: "Output format for the shard plan",
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
