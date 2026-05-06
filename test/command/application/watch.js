import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";

import { START_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND, WATCH_UI__WATCH__APPLICATION__COMMAND } from "./../../../src/command/application/watch.js";

function close_spawn(code) {
	const calls = [];
	return {
		calls,
		spawn(file, args, options) {
			const child = new EventEmitter();
			child.stdout = new EventEmitter();
			child.stderr = new EventEmitter();
			calls.push({ file, args, options });
			queueMicrotask(function () {
				child.emit("close", code);
			});
			return child;
		},
	};
}

function watcher(promise) {
	return {
		spawned: {
			killed: false,
			kill(signal) {
				this.killed = true;
				this.signal = signal;
			},
		},
		promise,
	};
}

test.describe("application watch command", async function () {
	await test.it("rejects when a watcher child process exits unsuccessfully", async function () {
		const fake = close_spawn(3);
		const result = START_WATCH_SCRIPT__WATCH__APPLICATION__COMMAND("watch-script.js", "Project", {
			spawn: fake.spawn,
			node_path: "node",
			log() {},
			error_log() {},
		});
		await assert.rejects(result.promise, /Project watch process failed with exit code 3/);
		assert.deepEqual(fake.calls, [
			{
				file: "node",
				args: ["watch-script.js"],
				options: {
					shell: false,
				},
			},
		]);
	});

	await test.it("propagates watcher failures and stops sibling watchers", async function () {
		const watchers = [watcher(Promise.reject(new Error("watch failed"))), watcher(new Promise(function () {}))];
		const calls = [];
		await assert.rejects(
			WATCH_UI__WATCH__APPLICATION__COMMAND(
				{
					gauze_v1_watch_path: "gauze-watch.js",
					project_watch_path: "project-watch.js",
				},
				{
					start_watch_script(script_path, label) {
						calls.push({ script_path, label });
						return watchers[calls.length - 1];
					},
				},
			),
			/watch failed/,
		);
		assert.deepEqual(calls, [
			{ script_path: "gauze-watch.js", label: "Gauze" },
			{ script_path: "project-watch.js", label: "Project" },
		]);
		assert.equal(watchers[0].spawned.killed, true);
		assert.equal(watchers[0].spawned.signal, "SIGTERM");
		assert.equal(watchers[1].spawned.killed, true);
		assert.equal(watchers[1].spawned.signal, "SIGTERM");
	});
});
