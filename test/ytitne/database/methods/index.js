import * as $gauze from "./../../../../src/index.js";

import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

import { load_steps, run_steps } from "./../../../helper.js";

const SCHEMA = $gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE;

test.describe("ytitne graphql interface database", async function (suite_ctx) {
	test.before(function (ctx) {
		suite_ctx.database = $gauze.database.knex.create_connection("test");
		return suite_ctx.database.migrate.latest().then(function () {
			return suite_ctx.database.seed.run();
		});
	});
	test.after(function () {
		suite_ctx.database.destroy();
	});
	await test.it("create", function (test_ctx) {
		return load_steps(import.meta.dirname, "./create").then(function (steps) {
			return run_steps(
				{
					database: suite_ctx.database,
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
					schema: SCHEMA,
				},
				steps,
			);
		});
	});
	await test.it("delete", function (test_ctx) {
		return load_steps(import.meta.dirname, "./update").then(function (steps) {
			return run_steps(
				{
					database: suite_ctx.database,
					schema: SCHEMA,
				},
				steps,
			);
		});
	});
});
