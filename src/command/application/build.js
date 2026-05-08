import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { spawn } from "node:child_process";

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../index.js";

function RUN_NODE_SCRIPT__BUILD__APPLICATION__COMMAND(script_path, dependencies = {}) {
	const spawn_process = dependencies.spawn || spawn;
	const node_path = dependencies.node_path || process.execPath;
	return new Promise(function (resolve, reject) {
		const spawned = spawn_process(node_path, [script_path], {
			stdio: "inherit",
			shell: false,
		});
		spawned.on("error", reject);
		spawned.on("close", function (code) {
			if (code === 0) {
				return resolve(code);
			} else {
				return reject(new Error(`Command failed with exit code ${code}: ${script_path}`));
			}
		});
	});
}

function BUILD_UI__BUILD__APPLICATION__COMMAND(paths, dependencies = {}) {
	const run_node_script = dependencies.run_node_script || RUN_NODE_SCRIPT__BUILD__APPLICATION__COMMAND;
	return new Promise(function (resolve, reject) {
		const collection = {};
		return resolve(collection);
	}).then(function (collection) {
		return run_node_script(paths.gauze_build_path, dependencies).then(function () {
			console.log("Gauze build finished");
			return collection;
		});
	});
}

export const command = "build";

export const describe = "Build the bundled frontend assets for the Gauze UIs";

export const builder = function (yargs) {
	return yargs.env("GAUZE_APPLICATION");
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	// call a application level application here
	const gauze_build_path = path.resolve(path.dirname(__FILEPATH), "./../../views/gauze/build.js");
	return BUILD_UI__BUILD__APPLICATION__COMMAND({
		gauze_build_path,
	});
};

export { BUILD_UI__BUILD__APPLICATION__COMMAND, RUN_NODE_SCRIPT__BUILD__APPLICATION__COMMAND };
