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

function run_node_script(script_path) {
	return new Promise(function (resolve, reject) {
		const spawned = spawn(process.execPath, [script_path], {
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

export const command = "build";

export const describe = "Build the bundled frontend assets for the Gauze UIs";

export const builder = function (yargs) {
	return yargs.env("GAUZE_APPLICATION");
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	// call a application level application here
	const gauze_v1_build_path = path.resolve(path.dirname(__FILEPATH), "./../../views/gauze/v1/build.js");
	const project_build_path = path.resolve(path.dirname(__FILEPATH), "./../../views/project/build.js");
	return new Promise(function (resolve, reject) {
		const collection = {};
		return resolve(collection);
	})
		.then(function (collection) {
			return run_node_script(gauze_v1_build_path).then(function () {
				console.log("Gauze build finished");
				return collection;
			});
		})
		.then(function (collection) {
			return run_node_script(project_build_path).then(function () {
				console.log("Project build finished");
				return collection;
			});
		})
		.catch(function (err) {
			console.error(err);
		});
};
