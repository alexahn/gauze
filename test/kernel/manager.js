import assert from "node:assert/strict";
import test from "node:test";

import * as $gauze from "./../../src/index.js";

const MANAGER = $gauze.kernel.src.applications.manager.GAUZE__MANAGER__APPLICATION__SRC__KERNEL({ $gauze });

function entity_config(overrides = {}) {
	return {
		...$gauze.abstract.entities.entity.default($gauze.abstract),
		...overrides,
	};
}

test.describe("kernel manager entity validation", async function () {
	await test.it("accepts safe lower snake case entity names", function () {
		const config = entity_config({
			name: "article_comment2",
		});
		assert.doesNotThrow(function () {
			MANAGER.validate_entity_config(config);
		});
	});

	await test.it("rejects unsafe entity names before scaffold scripts run", function () {
		const unsafe_names = ["../../bad", "bad/name", "bad.name", "Bad", "bad-name", "bad name", "bad__name", "bad_", "1bad", ""];
		unsafe_names.forEach(function (name) {
			const config = entity_config({
				name,
			});
			assert.throws(function () {
				MANAGER.validate_entity_config(config);
			}, /safe lower snake case identifier/);
		});
	});
});
