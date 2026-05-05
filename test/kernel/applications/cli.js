import assert from "node:assert/strict";
import child_process from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const REPO_ROOT = path.resolve(import.meta.dirname, "../../..");
const CLI_PATH = path.join(REPO_ROOT, "src/command/gauze.js");
const SOMETHING_ENTITY_PATH = path.join(import.meta.dirname, "something.js");
const SOMETHING_NAME = "something";

function cli_env() {
	return {
		...process.env,
		GAUZE_ENV: process.env.GAUZE_ENV || "test_monolithic",
		LOG_LEVEL_MINIMUM: "4",
	};
}

function spawn_cli(args, options = {}) {
	return child_process.spawnSync(process.execPath, [CLI_PATH, ...args], {
		cwd: options.cwd,
		encoding: "utf8",
		env: cli_env(),
		shell: false,
	});
}

function spawn_project_cli(project_dir, args, options = {}) {
	return spawn_cli(["project", project_dir, ...args], options);
}

function spawn_project_cli_live(project_dir, args, options = {}) {
	const child = child_process.spawn(process.execPath, [CLI_PATH, "project", project_dir, ...args], {
		cwd: options.cwd,
		detached: true,
		encoding: "utf8",
		env: cli_env(),
		shell: false,
		stdio: ["pipe", "pipe", "pipe"],
	});

	let killed = false;
	let stdout = "";
	let stderr = "";

	child.stdout.on("data", function (data) {
		stdout += data.toString("utf8");
	});
	child.stderr.on("data", function (data) {
		stderr += data.toString("utf8");
	});

	if (options.stdin) {
		child.stdin.end(options.stdin);
	} else {
		child.stdin.end();
	}

	return new Promise(function (resolve, reject) {
		const timeout = setTimeout(function () {
			killed = true;
			try {
				process.kill(-child.pid, "SIGTERM");
			} catch (err) {
				if (err.code !== "ESRCH") {
					throw err;
				}
			}
		}, options.kill_after_ms || 5000);

		child.on("error", function (err) {
			clearTimeout(timeout);
			reject(err);
		});
		child.on("close", function (status, signal) {
			clearTimeout(timeout);
			resolve({
				killed,
				signal,
				status,
				stderr,
				stdout,
			});
		});
	});
}

async function with_temp_directory(callback) {
	const temp_dir = fs.mkdtempSync(path.join(os.tmpdir(), "gauze-cli-e2e-"));
	try {
		return await callback(temp_dir);
	} finally {
		fs.rmSync(temp_dir, {
			force: true,
			recursive: true,
		});
	}
}

function assert_success(result, label = "command") {
	assert.equal(result.status, 0, `${label}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
}

function assert_failure(result, pattern, label = "command") {
	assert.notEqual(result.status, 0, `${label}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
	assert.match(`${result.stdout}\n${result.stderr}`, pattern);
}

function assert_live_started(result, label) {
	assert.equal(result.killed, true, `${label} exited before the test stopped it\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
}

function link_runtime_for_project_proxy(temp_dir, project_dir) {
	// Generated projects contain copied source but not install/runtime roots.
	fs.symlinkSync(path.join(REPO_ROOT, "node_modules"), path.join(project_dir, "node_modules"), "dir");
	fs.symlinkSync(path.join(REPO_ROOT, "src"), path.join(temp_dir, "src"), "dir");
	fs.symlinkSync(path.join(REPO_ROOT, "env"), path.join(temp_dir, "env"), "dir");
	fs.symlinkSync(path.join(REPO_ROOT, "gauze"), path.join(temp_dir, "gauze"), "dir");
}

function stub_project_database_manager(project_dir) {
	// Keep CLI command coverage focused on dispatch instead of SQLite migrations.
	fs.writeFileSync(
		path.join(project_dir, "database/manager.js"),
		[
			'import fs from "node:fs";',
			'import path from "node:path";',
			'import url from "node:url";',
			"const __filename = url.fileURLToPath(import.meta.url);",
			"const __dirname = path.dirname(__filename);",
			"function write_file(directory, name) {",
			"\tfs.mkdirSync(directory, { recursive: true });",
			'\tfs.writeFileSync(path.join(directory, `00000000000000_${name}.js`), "export async function up() {}\\nexport async function down() {}\\n", "utf8");',
			"}",
			"const MANAGER__DATABASE = {",
			"\tdestroy_connections() {},",
			"\tmigrate_make(name) {",
			'\t\twrite_file(path.join(__dirname, "migrations"), name);',
			"\t\treturn Promise.resolve();",
			"\t},",
			"\tmigrate_latest() { return Promise.resolve(); },",
			"\tmigrate_rollback() { return Promise.resolve(); },",
			"\tmigrate_up() { return Promise.resolve(); },",
			"\tmigrate_down() { return Promise.resolve(); },",
			'\tmigrate_current_version() { return Promise.resolve([{ id: "test", version: "none" }]); },',
			"\tmigrate_list() { return Promise.resolve([{ completed_migrations: [], pending_migrations: [] }]); },",
			"\tmigrate_unlock() { return Promise.resolve(); },",
			"\tseed_make(name) {",
			'\t\twrite_file(path.join(__dirname, "seeds", "test"), name);',
			"\t\treturn Promise.resolve();",
			"\t},",
			"\tseed_run() { return Promise.resolve(); },",
			"\tshard_plan(depth, order) { return Promise.resolve([{ depth, order, start: 0n, end: 1n }]); },",
			"};",
			"export default MANAGER__DATABASE;",
			"",
		].join("\n"),
		"utf8",
	);
}

function create_project_for_proxy(temp_dir) {
	const project_dir = path.join(temp_dir, "project with spaces; touch injected");
	const sentinel = path.join(temp_dir, "injected");
	const result = spawn_cli(["create", "project", project_dir], {
		cwd: temp_dir,
	});

	assert_success(result, "create project");
	assert.equal(fs.existsSync(path.join(project_dir, "command/gauze.js")), true);
	assert.equal(fs.existsSync(path.join(temp_dir, "example.env")), true);
	assert.equal(fs.existsSync(path.join(temp_dir, "example.js")), true);
	assert.equal(fs.existsSync(sentinel), false);

	link_runtime_for_project_proxy(temp_dir, project_dir);
	stub_project_database_manager(project_dir);

	return {
		project_dir,
		sentinel,
	};
}

function entity_paths(project_dir, entity_name = SOMETHING_NAME) {
	return [
		path.join(project_dir, "abstract/entities", `${entity_name}.js`),
		path.join(project_dir, "database/models", `${entity_name}.js`),
		path.join(project_dir, "database/controllers", `${entity_name}.js`),
		path.join(project_dir, "database/interfaces/graphql/entities", `${entity_name}.js`),
		path.join(project_dir, "database/interfaces/graphql/mutations", `${entity_name}.js`),
		path.join(project_dir, "database/interfaces/graphql/queries", `${entity_name}.js`),
		path.join(project_dir, "database/interfaces/graphql/operations", entity_name, "read.graphql"),
		path.join(project_dir, "system/models", `${entity_name}.js`),
		path.join(project_dir, "system/controllers", `${entity_name}.js`),
		path.join(project_dir, "system/interfaces/graphql/entities", `${entity_name}.js`),
		path.join(project_dir, "system/interfaces/graphql/mutations", `${entity_name}.js`),
		path.join(project_dir, "system/interfaces/graphql/queries", `${entity_name}.js`),
		path.join(project_dir, "structure/entities", entity_name, "index.js"),
	];
}

function assert_paths_exist(paths) {
	for (const file_path of paths) {
		assert.equal(fs.existsSync(file_path), true, file_path);
	}
}

function assert_paths_missing(paths) {
	for (const file_path of paths) {
		assert.equal(fs.existsSync(file_path), false, file_path);
	}
}

function create_fake_project_cli(project_dir, output_path) {
	const command_dir = path.join(project_dir, "command");
	fs.mkdirSync(command_dir, {
		recursive: true,
	});
	fs.writeFileSync(
		path.join(command_dir, "gauze.js"),
		["#!/usr/bin/env node", 'import fs from "node:fs";', `fs.writeFileSync(${JSON.stringify(output_path)}, JSON.stringify(process.argv.slice(2)), "utf8");`].join("\n"),
		{
			encoding: "utf8",
			mode: 0o755,
		},
	);
}

function assert_created_file(directory, pattern, label) {
	const files = fs.readdirSync(directory).filter(function (file) {
		return pattern.test(file);
	});
	assert.notEqual(files.length, 0, label);
}

test.describe("gauze CLI end-to-end", async function () {
	await test.it("runs project CLI commands through the project proxy", async function () {
		await with_temp_directory(async function (temp_dir) {
			const { project_dir, sentinel } = create_project_for_proxy(temp_dir);
			const nested_project_dir = path.join(temp_dir, "nested project with spaces");
			const fake_project_dir = path.join(temp_dir, "fake nested project with spaces");
			const fake_project_output = path.join(temp_dir, "fake-project-argv.json");
			const injected_arg = "literal; touch injected";

			const create_nested_project = spawn_project_cli(project_dir, ["create", "project", nested_project_dir], {
				cwd: temp_dir,
			});
			assert_success(create_nested_project, "project create project");
			assert.equal(fs.existsSync(path.join(nested_project_dir, "command/gauze.js")), true);

			create_fake_project_cli(fake_project_dir, fake_project_output);
			const proxy_nested_project = spawn_project_cli(project_dir, ["project", fake_project_dir, "run", "noop", injected_arg], {
				cwd: temp_dir,
			});
			assert_success(proxy_nested_project, "project project");
			assert.deepEqual(JSON.parse(fs.readFileSync(fake_project_output, "utf8")), ["run", "noop", injected_arg]);
			assert.equal(fs.existsSync(sentinel), false);

			const create_entity = spawn_project_cli(project_dir, ["create", "entity", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(create_entity, "project create entity");
			assert_paths_exist(entity_paths(project_dir));

			const read_entity = spawn_project_cli(project_dir, ["read", "entity", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(read_entity, "project read entity");
			assert.match(read_entity.stdout, /database\/models\/something\.js/);

			const update_entity = spawn_project_cli(project_dir, ["update", "entity", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(update_entity, "project update entity");
			assert_paths_exist(entity_paths(project_dir));

			const delete_entity = spawn_project_cli(project_dir, ["delete", "entity", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(delete_entity, "project delete entity");
			assert_paths_missing(entity_paths(project_dir));

			const create_gauze = spawn_project_cli(project_dir, ["create", "gauze", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(create_gauze, "project create gauze");
			assert_paths_exist(entity_paths(project_dir));

			const read_gauze = spawn_project_cli(project_dir, ["read", "gauze", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(read_gauze, "project read gauze");
			assert.match(read_gauze.stdout, /database\/models\/something\.js/);

			const update_gauze = spawn_project_cli(project_dir, ["update", "gauze", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(update_gauze, "project update gauze");
			assert_paths_exist(entity_paths(project_dir));

			const delete_gauze = spawn_project_cli(project_dir, ["delete", "gauze", project_dir, SOMETHING_ENTITY_PATH], {
				cwd: temp_dir,
			});
			assert_success(delete_gauze, "project delete gauze");
			assert_paths_missing(entity_paths(project_dir));

			const run_noop = spawn_project_cli(project_dir, ["run", "noop", injected_arg], {
				cwd: temp_dir,
			});
			assert_success(run_noop, "project run noop");
			assert.match(run_noop.stdout, /literal; touch injected/);

			const run_terminal = await spawn_project_cli_live(project_dir, ["run", "terminal"], {
				cwd: temp_dir,
				stdin: ".exit\n",
			});
			assert_success(run_terminal, "project run terminal");

			const application_example = spawn_project_cli(project_dir, ["application", "example"], {
				cwd: temp_dir,
			});
			assert_success(application_example, "project application example");
			assert.match(application_example.stdout, /project application command called/);

			const application_build = spawn_project_cli(project_dir, ["application", "build"], {
				cwd: temp_dir,
			});
			assert_success(application_build, "project application build");

			const application_serve = spawn_project_cli(project_dir, ["application", "serve", "--port"], {
				cwd: temp_dir,
			});
			assert_failure(application_serve, /Not enough arguments following: port|port/, "project application serve");

			const application_watch = await spawn_project_cli_live(project_dir, ["application", "watch"], {
				cwd: temp_dir,
				kill_after_ms: 1000,
			});
			assert_live_started(application_watch, "project application watch");

			const migrate_current = spawn_project_cli(project_dir, ["migrate", "current", "--format", "json"], {
				cwd: temp_dir,
			});
			assert_success(migrate_current, "project migrate current");

			const migrate_list = spawn_project_cli(project_dir, ["migrate", "list", "--format", "json"], {
				cwd: temp_dir,
			});
			assert_success(migrate_list, "project migrate list");

			const migrate_make = spawn_project_cli(project_dir, ["migrate", "make", "cli_command_migration"], {
				cwd: temp_dir,
			});
			assert_success(migrate_make, "project migrate make");
			assert_created_file(path.join(project_dir, "database/migrations"), /cli_command_migration/, "migration file");

			const migrate_up = spawn_project_cli(project_dir, ["migrate", "up"], {
				cwd: temp_dir,
			});
			assert_success(migrate_up, "project migrate up");

			const migrate_down = spawn_project_cli(project_dir, ["migrate", "down"], {
				cwd: temp_dir,
			});
			assert_success(migrate_down, "project migrate down");

			const migrate_run = spawn_project_cli(project_dir, ["migrate", "run"], {
				cwd: temp_dir,
			});
			assert_success(migrate_run, "project migrate run");

			const seed_make = spawn_project_cli(project_dir, ["seed", "make", "cli_command_seed"], {
				cwd: temp_dir,
			});
			assert_success(seed_make, "project seed make");
			assert_created_file(path.join(project_dir, "database/seeds/test"), /cli_command_seed/, "seed file");

			const seed_run = spawn_project_cli(project_dir, ["seed", "run"], {
				cwd: temp_dir,
			});
			assert_success(seed_run, "project seed run");

			const migrate_rollback = spawn_project_cli(project_dir, ["migrate", "rollback"], {
				cwd: temp_dir,
			});
			assert_success(migrate_rollback, "project migrate rollback");

			const migrate_unlock = spawn_project_cli(project_dir, ["migrate", "unlock"], {
				cwd: temp_dir,
			});
			assert_success(migrate_unlock, "project migrate unlock");

			const shard_plan = spawn_project_cli(project_dir, ["shard", "plan", "1", "--format", "json"], {
				cwd: temp_dir,
			});
			assert_success(shard_plan, "project shard plan");
			assert.match(shard_plan.stdout, /Shard plan created successfully/);
		});
	});
});
