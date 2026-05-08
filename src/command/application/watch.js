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

function START_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND(script_path, label, dependencies = {}) {
	const spawn_process = dependencies.spawn || spawn;
	const node_path = dependencies.node_path || process.execPath;
	const log = dependencies.log || console.log;
	const error_log = dependencies.error_log || console.error;
	const spawned = spawn_process(node_path, [script_path], { shell: false });
	const promise = new Promise(function (resolve, reject) {
		spawned.on("error", reject);
		if (spawned.stdout) {
			spawned.stdout.on("data", function (data) {
				log(data.toString("utf8"));
			});
		}
		if (spawned.stderr) {
			spawned.stderr.on("data", function (data) {
				error_log(data.toString("utf8"));
			});
		}
		spawned.on("close", function (code) {
			log(`${label} watch process ending`);
			if (code === 0) {
				return resolve(code);
			} else {
				return reject(new Error(`${label} watch process failed with exit code ${code}: ${script_path}`));
			}
		});
	});
	return {
		spawned,
		promise,
	};
}

function STOP_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND(watcher) {
	if (watcher && watcher.spawned && !watcher.spawned.killed && typeof watcher.spawned.kill === "function") {
		watcher.spawned.kill("SIGTERM");
	}
}

function WATCH_UI__WATCH__APPLICATION__COMMAND(paths, dependencies = {}) {
	const start_watch_script = dependencies.start_watch_script || START_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND;
	const watchers = [];
	try {
		watchers.push(start_watch_script(paths.gauze_watch_path, "Gauze", dependencies));
	} catch (err) {
		watchers.forEach(STOP_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND);
		throw err;
	}
	return Promise.all(
		watchers.map(function (watcher) {
			return watcher.promise;
		}),
	).catch(function (err) {
		watchers.forEach(STOP_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND);
		throw err;
	});
}

export const command = "watch";

export const describe = "Watch the frontend sources and rebuild UI bundles when files change";

export const builder = function (yargs) {
	return yargs.env("GAUZE_APPLICATION");
	//.wrap(128)
};

export const handler = function (argv) {
	$gauze.kernel.src.logger.io.LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, "manager argv", argv);
	// call a application level application here
	const gauze_watch_path = path.resolve(path.dirname(__FILEPATH), "./../../views/gauze/watch.js");
	return WATCH_UI__WATCH__APPLICATION__COMMAND({
		gauze_watch_path,
	});
};

export { START_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND, WATCH_UI__WATCH__APPLICATION__COMMAND };
