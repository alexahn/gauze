import assert from "node:assert/strict";
import test from "node:test";

import * as $gauze from "./../../../src/index.js";

const SystemModel = $gauze.kernel.src.models.system.SystemModel;

test.describe("system model field filtering", async function () {
	await test.it("merges wildcard and agent-specific allowed fields", function () {
		const model = {
			allowed_fields_agent_types: {
				"*": ["id", "created_at"],
				gauze__agent_user: ["text"],
			},
		};
		const agent = {
			agent_type: "gauze__agent_user",
		};
		const attributes = {
			id: "entity-id",
			created_at: "2026-05-01T00:00:00.000Z",
			text: "visible",
			hidden: "filtered",
		};

		assert.deepEqual(SystemModel.prototype.agent_filter.call(model, agent, attributes), {
			id: "entity-id",
			created_at: "2026-05-01T00:00:00.000Z",
			text: "visible",
		});
	});
});
