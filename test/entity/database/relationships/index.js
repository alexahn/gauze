import * as $gauze from "./../../../../src/index.js";

import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

import { load_steps, run_steps } from "./../../../steps.js";

const SCHEMA = $gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE;

test.describe("relationships entity graphql interface database", async function (suite_ctx) {
	test.before(function (ctx) {
		suite_ctx.database_manager = new $gauze.kernel.src.database.manager.DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL($gauze.database.config.default);
		return suite_ctx.database_manager.migrate_latest().then(function () {
			return suite_ctx.database_manager.seed_run();
		});
	});
	test.after(function () {
		suite_ctx.database_manager.destroy_connections();
	});
	await test.it("create", function (test_ctx) {
		return load_steps(import.meta.dirname, "./create").then(function (steps) {
			return run_steps(
				{
					database: suite_ctx.database,
					database_manager: suite_ctx.database_manager,
					schema: SCHEMA,
				},
				steps,
			);
		});
	});
	await test.it("read", function (test_ctx) {
		return load_steps(import.meta.dirname, "./read").then(function (steps) {
			return run_steps(
				{
					database: suite_ctx.database,
					database_manager: suite_ctx.database_manager,
					schema: SCHEMA,
				},
				steps,
			);
		});
	});
	await test.it("update", function (test_ctx) {
		return load_steps(import.meta.dirname, "./update").then(function (steps) {
			return run_steps(
				{
					database: suite_ctx.database,
					database_manager: suite_ctx.database_manager,
					schema: SCHEMA,
				},
				steps,
			);
		});
	});
	await test.it("delete", function (test_ctx) {
		return load_steps(import.meta.dirname, "./delete").then(function (steps) {
			return run_steps(
				{
					database: suite_ctx.database,
					database_manager: suite_ctx.database_manager,
					schema: SCHEMA,
				},
				steps,
			);
		});
	});
});
