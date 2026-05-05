import assert from "node:assert/strict";
import child_process from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { GAUZE__MANAGER__APPLICATION__SRC__KERNEL } from "../../../src/kernel/src/applications/manager.js";
import { GAUZE__PROJECT_MANAGER__APPLICATION__SRC__KERNEL } from "../../../src/kernel/src/applications/project_manager.js";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../..");

function modules() {
	return {
		$gauze: {
			kernel: {
				src: {
					logger: {
						io: {
							LOGGER__IO__LOGGER__SRC__KERNEL: {
								write() {},
							},
						},
					},
				},
			},
		},
	};
}

async function with_temp_directory(callback) {
	const temp_dir = fs.mkdtempSync(path.join(os.tmpdir(), "gauze-cli-"));
	try {
		return await callback(temp_dir);
	} finally {
		fs.rmSync(temp_dir, {
			force: true,
			recursive: true,
		});
	}
}

test.describe("kernel CLI application command execution", async function () {
	await test.it("project proxy passes the project CLI path and subcommand as argv", async function () {
		await with_temp_directory(async function (temp_dir) {
			const project_dir = path.join(temp_dir, "project with spaces");
			const project_cli = path.join(project_dir, "command/gauze.js");
			const sentinel = path.join(temp_dir, "injected");
			const injected_arg = `literal; touch ${sentinel}`;
			const project_manager = GAUZE__PROJECT_MANAGER__APPLICATION__SRC__KERNEL(modules(), {});
			const original_argv = process.argv;
			let captured;

			project_manager.execute = function (file, args) {
				captured = { file, args };
				return Promise.resolve(0);
			};

			process.argv = ["node", "gauze", "project", project_dir, "run", injected_arg];
			try {
				await project_manager.proxy(project_dir);
			} finally {
				process.argv = original_argv;
			}

			assert.equal(captured.file, process.execPath);
			assert.deepEqual(captured.args, [project_cli, "run", injected_arg]);
			assert.equal(fs.existsSync(sentinel), false);
		});
	});

	await test.it("project manager command helpers pass paths as argv", async function () {
		await with_temp_directory(async function (temp_dir) {
			const project_dir = path.join(temp_dir, "project with spaces");
			const sentinel = path.join(temp_dir, "injected");
			const requested_project_dir = `${project_dir}; touch ${sentinel}`;
			const manager = GAUZE__MANAGER__APPLICATION__SRC__KERNEL(modules(), {});
			let captured;

			manager.execute = function (file, args) {
				captured = { file, args };
				return Promise.resolve(0);
			};

			await manager.create_project(requested_project_dir);

			assert.equal(path.basename(captured.file), "manager_create_project");
			assert.equal(captured.args.length, 2);
			assert.equal(captured.args[1], path.resolve(process.cwd(), requested_project_dir));
			assert.equal(fs.existsSync(sentinel), false);
		});
	});

	await test.it("manager execute passes shell metacharacters as literal argv", async function () {
		await with_temp_directory(async function (temp_dir) {
			const manager = GAUZE__MANAGER__APPLICATION__SRC__KERNEL(modules(), {});
			const output = path.join(temp_dir, "argv.json");
			const sentinel = path.join(temp_dir, "injected");
			const script = path.join(temp_dir, "script with spaces.js");
			const injected_arg = `literal; touch ${sentinel}`;

			fs.writeFileSync(script, ['import fs from "node:fs";', `fs.writeFileSync(${JSON.stringify(output)}, JSON.stringify(process.argv.slice(2)), "utf8");`].join("\n"), "utf8");

			await manager.execute(process.execPath, [script, injected_arg]);

			assert.deepEqual(JSON.parse(fs.readFileSync(output, "utf8")), [injected_arg]);
			assert.equal(fs.existsSync(sentinel), false);
		});
	});

	await test.it("project creation script handles target paths with spaces", async function () {
		await with_temp_directory(async function (temp_dir) {
			const script = path.join(REPO_ROOT, "src/kernel/bin/manager_create_project");
			const project_dir = path.join(temp_dir, "generated project with spaces");
			const result = child_process.spawnSync(script, [REPO_ROOT, project_dir], {
				cwd: temp_dir,
				encoding: "utf8",
				shell: false,
			});

			assert.equal(result.status, 0, result.stderr);
			assert.equal(fs.existsSync(path.join(project_dir, "command/gauze.js")), true);
			assert.equal(fs.existsSync(path.join(temp_dir, "example.env")), true);
			assert.equal(fs.existsSync(path.join(temp_dir, "example.js")), true);
		});
	});
});
