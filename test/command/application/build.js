import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";

import { BUILD_UI__BUILD__APPLICATION__COMMAND, RUN_NODE_SCRIPT__BUILD__APPLICATION__COMMAND } from "./../../../src/command/application/build.js";

function close_spawn(code) {
	const calls = [];
	return {
		calls,
		spawn(file, args, options) {
			const child = new EventEmitter();
			calls.push({ file, args, options });
			queueMicrotask(function () {
				child.emit("close", code);
			});
			return child;
		},
	};
}

test.describe("application build command", async function () {
	await test.it("rejects when a child build process exits unsuccessfully", async function () {
		const fake = close_spawn(2);
		await assert.rejects(
			RUN_NODE_SCRIPT__BUILD__APPLICATION__COMMAND("build-script.js", {
				spawn: fake.spawn,
				node_path: "node",
			}),
			/exit code 2/,
		);
		assert.deepEqual(fake.calls, [
			{
				file: "node",
				args: ["build-script.js"],
				options: {
					stdio: "inherit",
					shell: false,
				},
			},
		]);
	});

	await test.it("propagates build orchestration failures", async function () {
		const scripts = [];
		await assert.rejects(
			BUILD_UI__BUILD__APPLICATION__COMMAND(
				{
					gauze_v1_build_path: "gauze-build.js",
					project_build_path: "project-build.js",
				},
				{
					run_node_script(script_path) {
						scripts.push(script_path);
						return Promise.reject(new Error("build failed"));
					},
				},
			),
			/build failed/,
		);
		assert.deepEqual(scripts, ["gauze-build.js"]);
	});
});
