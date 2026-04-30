import * as $gauze from "./../../src/index.js";

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const DATABASE_SCHEMA = $gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE;

function create_database_manager() {
	return new $gauze.kernel.src.database.manager.DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL($gauze.database.config.default);
}

function describe_database_cursor_suite(description, define_tests) {
	test.describe(description, async function (suite_ctx) {
		test.before(function () {
			suite_ctx.database_manager = create_database_manager();
			return suite_ctx.database_manager.migrate_latest().then(function () {
				return suite_ctx.database_manager.seed_run();
			});
		});

		test.after(function () {
			suite_ctx.database_manager.destroy_connections();
		});

		await define_tests(suite_ctx);
	});
}

function encode_cursor_payload(payload) {
	return $gauze.kernel.src.cursor.ENCODE_PAYLOAD__CURSOR__SRC__KERNEL(payload);
}

function decode_cursor_payload(cursor) {
	return $gauze.kernel.src.cursor.DECODE_PAYLOAD__CURSOR__SRC__KERNEL(cursor);
}

function tamper_cursor_payload(cursor, transform) {
	const [encoded_payload, signature] = cursor.split(".");
	const payload = JSON.parse(Buffer.from(encoded_payload, "base64url").toString("utf8"));
	const transformed = transform(payload);
	const tampered_payload = Buffer.from(JSON.stringify(transformed), "utf8").toString("base64url");
	return `${tampered_payload}.${signature}`;
}

async function execute(database_manager, transactions, operation, operation_name, operation_variables = {}) {
	const result = await $gauze.kernel.src.shell.graphql.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
		schema: DATABASE_SCHEMA,
		context: {
			agent_id: "1",
			database_manager,
			transactions,
		},
		operation,
		operation_name,
		operation_variables,
	});
	if (result.errors && result.errors.length) {
		throw result.errors[0];
	}
	return result.data;
}

async function execute_with_errors(database_manager, transactions, operation, operation_name, operation_variables = {}) {
	return await $gauze.kernel.src.shell.graphql.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
		schema: DATABASE_SCHEMA,
		context: {
			agent_id: "1",
			database_manager,
			transactions,
		},
		operation,
		operation_name,
		operation_variables,
	});
}

async function with_transactions(database_manager, action) {
	const transactions = {};
	try {
		return await action(transactions);
	} finally {
		await $gauze.database.manager.default.rollback_transactions(transactions);
	}
}

async function with_stubbed_methods(target, stubs, action) {
	const originals = {};
	Object.keys(stubs).forEach(function (key) {
		originals[key] = target[key];
		target[key] = stubs[key];
	});
	try {
		return await action();
	} finally {
		Object.keys(stubs).forEach(function (key) {
			target[key] = originals[key];
		});
	}
}

function text_values(page, field) {
	return page.nodes.map(function (node) {
		return node.attributes[field];
	});
}

function assert_cursor_shape(page_info, expected) {
	Object.keys(expected).forEach(function (key) {
		const expected_value = expected[key];
		if (expected_value === "string") {
			assert.equal(typeof page_info[key], "string");
		} else {
			assert.equal(page_info[key], expected_value);
		}
	});
}

function validate_cursor_step(module) {
	if (typeof module.step !== "number") {
		throw new TypeError(`Cursor step must have a numeric step: ${module.step}`);
	}
	if (typeof module.description !== "string") {
		throw new TypeError(`Cursor step must have a string description: ${module.description}`);
	}
	if (typeof module.run !== "function") {
		throw new TypeError(`Cursor step must export a run function: ${module.description}`);
	}
}

async function load_cursor_steps(base_path, directory) {
	const directory_path = path.resolve(base_path, directory);
	const files = await fs.readdir(directory_path);
	const modules = await Promise.all(
		files
			.filter(function (file) {
				return path.extname(file) === ".js";
			})
			.map(function (file) {
				const file_path = path.resolve(directory_path, file);
				return import(file_path).then(function (module) {
					const step = module.default;
					const prefix = parseInt(file.split(".")[0]);
					if (prefix !== step.step) {
						throw new Error(`Cursor step file must be prefixed with the step number, step is ${step.step} but prefix is ${file.split(".")[0]}`);
					}
					validate_cursor_step(step);
					step.file_path = file_path;
					return step;
				});
			}),
	);
	const steps = [];
	modules.forEach(function (module) {
		if (!steps[module.step]) {
			steps[module.step] = [];
		}
		steps[module.step].push(module);
	});
	for (let i = 0; i < steps.length; i += 1) {
		if (!steps[i]) {
			throw new Error(`Cursor steps has a hole at step ${i}`);
		}
	}
	return steps;
}

async function run_cursor_steps(environment, steps) {
	return await with_transactions(environment.database_manager, async function (transactions) {
		const scenario = {};
		const runtime = {
			...environment,
			transactions,
		};
		for (const step_group of steps) {
			for (const step of step_group) {
				await step.run(runtime, scenario);
			}
		}
		return scenario;
	});
}

export {
	$gauze,
	DATABASE_SCHEMA,
	assert_cursor_shape,
	create_database_manager,
	decode_cursor_payload,
	describe_database_cursor_suite,
	encode_cursor_payload,
	execute,
	execute_with_errors,
	load_cursor_steps,
	run_cursor_steps,
	tamper_cursor_payload,
	text_values,
	with_stubbed_methods,
	with_transactions,
};
