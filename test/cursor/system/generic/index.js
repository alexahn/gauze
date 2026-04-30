import assert from "node:assert/strict";
import test from "node:test";

import { $gauze, encode_cursor_payload } from "./../../helpers.js";

test.describe("cursor pagination system generic models", async function () {
	await test.it("decodes system cursor requests for authorization filtering", async function () {
		const model = $gauze.system.models.ytitne.MODEL__YTITNE__MODEL__SYSTEM;
		const current = {
			direction: "current",
			cursor_where_between: null,
		};
		const cursor = encode_cursor_payload({
			v: 1,
			entity: "gauze__ytitne",
			method: "read",
			parameters: {
				where: {
					id: "10000000-0000-4000-8000-000000000061",
				},
				limit: 1,
			},
			page: "current",
			previous: null,
			current,
			next: null,
		});

		const request = model._cursor_request_from_parameters({ cursor }, "read");
		assert.deepEqual(request.parameters, {
			where: {
				id: "10000000-0000-4000-8000-000000000061",
			},
			limit: 1,
		});
		assert.deepEqual(request.page, current);

		assert.throws(function () {
			model._cursor_request_from_parameters(
				{
					cursor,
					where: {
						id: "10000000-0000-4000-8000-000000000062",
					},
				},
				"read",
			);
		}, /cannot be combined/);
		assert.throws(function () {
			model._cursor_request_from_parameters({ cursor }, "update");
		}, /Invalid cursor method/);
	});

	await test.it("generic system cursor methods proxy through normal method hooks", async function () {
		const model = $gauze.system.models.ytitne.MODEL__YTITNE__MODEL__SYSTEM;
		const realm = {
			agent: {
				agent_id: "agent-1",
				agent_type: "gauze__agent_user",
			},
			entity: {
				entity_type: "gauze__ytitne",
			},
			operation: {
				operation: "database-operation",
			},
		};

		const calls = [];
		const original_read = model._read;
		const original_update = model._update;
		const original_delete = model._delete;
		model._read = function (context, scope, parameters, input_realm) {
			calls.push(["read", context, scope, parameters, input_realm]);
			return Promise.resolve("read-result");
		};
		model._update = function (context, scope, parameters, input_realm) {
			calls.push(["update", context, scope, parameters, input_realm]);
			return Promise.resolve("update-result");
		};
		model._delete = function (context, scope, parameters, input_realm) {
			calls.push(["delete", context, scope, parameters, input_realm]);
			return Promise.resolve("delete-result");
		};
		try {
			assert.equal(await model._cursor_read({ context: "read" }, { scope: "read" }, { where: { id: "1" } }, realm), "read-result");
			assert.equal(await model._cursor_update({ context: "update" }, { scope: "update" }, { where: { id: "1" }, attributes: { text: "updated" } }, realm), "update-result");
			assert.equal(await model._cursor_delete({ context: "delete" }, { scope: "delete" }, { where: { id: "1" } }, realm), "delete-result");
		} finally {
			model._read = original_read;
			model._update = original_update;
			model._delete = original_delete;
		}

		assert.deepEqual(calls, [
			["read", { context: "read" }, { scope: "read" }, { where: { id: "1" } }, realm],
			["update", { context: "update" }, { scope: "update" }, { where: { id: "1" }, attributes: { text: "updated" } }, realm],
			["delete", { context: "delete" }, { scope: "delete" }, { where: { id: "1" } }, realm],
		]);
	});
});
