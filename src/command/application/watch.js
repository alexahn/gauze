import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { exec, spawn } from 'node:child_process';

import { config } from "dotenv";
import findConfig from "find-config";

config({
	path: findConfig(".env"),
});

import * as $gauze from "./../../index.js";

export const command = "watch";

export const describe = "Watch the frontend application code and rebuild the application on change";

export const builder = function (yargs) {
	return yargs.env("GAUZE_APPLICATION");
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	// call a application level application here
	const gauze_watch_path = path.resolve(path.dirname(__FILEPATH), "./../../views/gauze/watch.js")
	const project_watch_path = path.resolve(path.dirname(__FILEPATH), "./../../views/project/watch.js")
	return new Promise(function (resolve, reject) {
		const collection = {}
		return resolve(collection)
	}).then(function (collection) {
		return new Promise(function (resolve, reject) {
			const spawned = spawn(`node ${gauze_watch_path}`, { shell: true })
			spawned.stdout.on("data", function (data) {
				console.log(data.toString("utf8"))
			})
			spawned.stderr.on("data", function (data) {
				console.error(data.toString("utf8"))
			})
			spawned.on("close", function () {
				console.log("Gauze watch process ending")
			})
			return resolve(collection)
		})
	}).then(function (collection) {
		return new Promise(function (resolve, reject) {
			const spawned = spawn(`node ${project_watch_path}`, { shell: true })
			spawned.stdout.on("data", function (data) {
				console.log(data.toString("utf8"))
			})
			spawned.stderr.on("data", function (data) {
				console.error(data.toString("utf8"))
			})
			spawned.on("close", function () {
				console.log("Project watch process ending")
			})
		})
	}).catch(function (err) {
		console.error(err)
	})

};
