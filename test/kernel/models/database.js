import assert from "node:assert/strict";
import test from "node:test";

import * as $gauze from "./../../../src/index.js";

test.describe("database model pagination validation", async function () {
	await test.it("accepts missing and non-negative pagination arguments", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;

		assert.doesNotThrow(function () {
			model._validate_parameters({});
		});
		assert.doesNotThrow(function () {
			model._validate_parameters({
				limit: 0,
				offset: 0,
			});
		});
		assert.doesNotThrow(function () {
			model._validate_parameters({
				limit: 16,
				offset: 4,
			});
		});
	});

	await test.it("rejects negative pagination arguments before SQL construction", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;

		assert.throws(function () {
			model._validate_parameters({
				limit: -1,
			});
		}, /Input argument 'limit' is invalid: limit must be a non-negative integer/);
		assert.throws(function () {
			model._validate_parameters({
				offset: -1,
			});
		}, /Input argument 'offset' is invalid: offset must be a non-negative integer/);
	});

	await test.it("rejects non-integer pagination arguments", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;

		assert.throws(function () {
			model._validate_parameters({
				limit: 1.5,
			});
		}, /Input argument 'limit' is invalid: limit must be a non-negative integer/);
		assert.throws(function () {
			model._validate_parameters({
				offset: 1.5,
			});
		}, /Input argument 'offset' is invalid: offset must be a non-negative integer/);
	});
});

test.describe("database model write filter validation", async function () {
	await test.it("accepts non-empty write filters", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;
		const primary_key = model.primary_key;

		assert.doesNotThrow(function () {
			model._validate_write_filter_parameters({
				where: {
					[primary_key]: "00000000-0000-0000-0000-000000000001",
				},
			});
		});
		assert.doesNotThrow(function () {
			model._validate_write_filter_parameters({
				where_in: {
					[primary_key]: [],
				},
			});
		});
		assert.doesNotThrow(function () {
			model._validate_write_filter_parameters({
				where_not_in: {
					[primary_key]: ["00000000-0000-0000-0000-000000000001"],
				},
			});
		});
		assert.doesNotThrow(function () {
			model._validate_write_filter_parameters({
				where_between: {
					[primary_key]: [null, "00000000-0000-0000-0000-000000000001"],
				},
			});
		});
	});

	await test.it("rejects empty write filter objects before update/delete execution", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;
		const error = /At least one non-empty filter is required for update\/delete/;

		assert.throws(function () {
			model._update(
				{},
				{},
				{
					attributes: {},
					where: {},
				},
			);
		}, error);
		assert.throws(function () {
			model._delete(
				{},
				{},
				{
					where_in: {},
				},
			);
		}, error);
	});

	await test.it("rejects broad write filters that do not constrain rows", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;
		const primary_key = model.primary_key;
		const error = /At least one non-empty filter is required for update\/delete/;

		assert.throws(function () {
			model._validate_write_filter_parameters({
				where_not_in: {
					[primary_key]: [],
				},
			});
		}, error);
		assert.throws(function () {
			model._validate_write_filter_parameters({
				where_between: {
					[primary_key]: [null, null],
				},
			});
		}, error);
	});

	await test.it("rejects empty cursor write filters before page selection", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;
		const error = /At least one non-empty filter is required for update\/delete/;

		assert.throws(function () {
			model._cursor_update(
				{},
				{},
				{
					attributes: {},
					where: {},
				},
			);
		}, error);
		assert.throws(function () {
			model._cursor_delete(
				{},
				{},
				{
					where_like: {},
				},
			);
		}, error);
	});
});
