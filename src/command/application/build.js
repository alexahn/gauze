import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { exec, spawn } from "node:child_process";

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../index.js";

export const command = "build";

export const describe = "Build the frontend application";

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
			return new Promise(function (resolve, reject) {
				exec(`node ${gauze_v1_build_path}`, function (err, stdout, stderr) {
					if (err) {
						return reject(err);
					}
					if (stdout) {
						console.log(stdout);
					}
					if (stderr) {
						console.error(stderr);
					}
					console.log("Gauze build finished");
					return resolve(collection);
				});
			});
		})
		.then(function (collection) {
			return new Promise(function (resolve, reject) {
				exec(`node ${project_build_path}`, function (err, stdout, stderr) {
					if (err) {
						return reject(err);
					}
					if (stdout) {
						console.log(stdout);
					}
					if (stderr) {
						console.error(stderr);
					}
					console.log("Project build finished");
					return resolve(collection);
				});
			});
		})
		.catch(function (err) {
			console.error(err);
		});
};
