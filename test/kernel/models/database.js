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

		assert.throws(
			function () {
				model._validate_parameters({
					limit: -1,
				});
			},
			/Input argument 'limit' is invalid: limit must be a non-negative integer/,
		);
		assert.throws(
			function () {
				model._validate_parameters({
					offset: -1,
				});
			},
			/Input argument 'offset' is invalid: offset must be a non-negative integer/,
		);
	});

	await test.it("rejects non-integer pagination arguments", function () {
		const model = $gauze.database.models.entity.MODEL__ENTITY__MODEL__DATABASE;

		assert.throws(
			function () {
				model._validate_parameters({
					limit: 1.5,
				});
			},
			/Input argument 'limit' is invalid: limit must be a non-negative integer/,
		);
		assert.throws(
			function () {
				model._validate_parameters({
					offset: 1.5,
				});
			},
			/Input argument 'offset' is invalid: offset must be a non-negative integer/,
		);
	});
});
