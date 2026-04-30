import assert from "node:assert/strict";
import test from "node:test";

import { $gauze, with_stubbed_methods } from "./../../helpers.js";

test.describe("cursor pagination system relationship models", async function () {
	await test.it("authorizes cursor reads from decoded parameters and executes with a fresh cache filter", async function () {
		const model = $gauze.system.models.relationship.MODEL__RELATIONSHIP__MODEL__SYSTEM;
		const parameters = {
			cursor: "relationship-read-cursor",
		};
		const decoded_parameters = {
			where: {
				gauze__relationship__from_id: "from-1",
			},
		};
		const realm = {
			operation: {
				operation: "database-operation",
			},
		};
		await with_stubbed_methods(
			model,
			{
				_cursor_request_from_parameters(input, method) {
					assert.deepEqual(input, parameters);
					assert.equal(method, "read");
					return {
						parameters: decoded_parameters,
					};
				},
				_cursor_read_authorized_ids(context, scope, input, input_realm) {
					assert.deepEqual(context, { context: "read" });
					assert.deepEqual(scope, { scope: "read" });
					assert.deepEqual(input, decoded_parameters);
					assert.equal(input_realm, realm);
					return Promise.resolve(["relationship-1", "relationship-2"]);
				},
				_cursor_cache_where_in(input, key, values) {
					assert.deepEqual(input, parameters);
					assert.equal(key, model.entity.primary_key);
					assert.deepEqual(values, ["relationship-1", "relationship-2"]);
					return {
						...input,
						cache_where_in: {
							[key]: "fresh-relationship-cache-key",
						},
					};
				},
				_execute(context, operation, input) {
					assert.deepEqual(context, { context: "read" });
					assert.deepEqual(operation, realm.operation);
					assert.deepEqual(input, {
						cursor: "relationship-read-cursor",
						cache_where_in: {
							[model.entity.primary_key]: "fresh-relationship-cache-key",
						},
					});
					return Promise.resolve({
						data: {
							cursor_read_relationship: {
								nodes: [],
								page_info: model._cursor_empty_page_info(),
							},
						},
					});
				},
			},
			async function () {
				const result = await model._cursor_read({ context: "read" }, { scope: "read" }, parameters, realm);
				assert.deepEqual(result.data.cursor_read_relationship.page_info, model._cursor_empty_page_info());
			},
		);
	});

	await test.it("routes relationship cursor updates and deletes through root mutation paths", async function () {
		async function assert_relationship_mutation(method, operation_method, expected_ids) {
			const model = $gauze.system.models.relationship.MODEL__RELATIONSHIP__MODEL__SYSTEM;
			const parameters = {
				cursor: `${operation_method}-cursor`,
			};
			const decoded_parameters = {
				where: {
					[model.entity.primary_key]: `${operation_method}-decoded`,
				},
				attributes: method === "update" ? { gauze__relationship__to_id: "to-2" } : undefined,
			};
			if (!decoded_parameters.attributes) {
				delete decoded_parameters.attributes;
			}
			const realm = {
				operation: {
					operation: `${operation_method}-operation`,
				},
			};
			const root_rows = [
				{
					attributes: {
						[model.entity.primary_key]: expected_ids[0],
					},
				},
			];
			await with_stubbed_methods(
				model,
				{
					_cursor_request_from_parameters(input, input_method) {
						assert.deepEqual(input, parameters);
						assert.equal(input_method, method);
						return {
							parameters: decoded_parameters,
						};
					},
					_cursor_authorized_ids(context, scope, input, input_realm, input_method) {
						assert.deepEqual(context, { context: operation_method });
						assert.deepEqual(scope, { scope: operation_method });
						assert.deepEqual(input, decoded_parameters);
						assert.equal(input_realm, realm);
						assert.equal(input_method, method);
						return Promise.resolve(expected_ids);
					},
					_root_update(context, scope, input, input_realm) {
						assert.equal(method, "update");
						assert.deepEqual(context, { context: operation_method });
						assert.deepEqual(scope, { scope: operation_method });
						assert.equal(input_realm, realm);
						assert.deepEqual(input, {
							where: {
								[model.entity.primary_key]: expected_ids[0],
							},
							attributes: decoded_parameters.attributes,
						});
						return Promise.resolve({
							data: {
								update_relationship: root_rows,
							},
						});
					},
					_root_delete(context, scope, input, input_realm) {
						assert.equal(method, "delete");
						assert.deepEqual(context, { context: operation_method });
						assert.deepEqual(scope, { scope: operation_method });
						assert.equal(input_realm, realm);
						assert.deepEqual(input, {
							where: {
								[model.entity.primary_key]: expected_ids[0],
							},
						});
						return Promise.resolve({
							data: {
								delete_relationship: root_rows,
							},
						});
					},
					_cursor_cache_where_in() {
						throw new Error("cursor relationship mutation should not build an execution cache");
					},
					_execute() {
						throw new Error("cursor relationship mutation should not execute a database cursor mutation");
					},
				},
				async function () {
					const result =
						method === "update"
							? await model._cursor_update({ context: operation_method }, { scope: operation_method }, parameters, realm)
							: await model._cursor_delete({ context: operation_method }, { scope: operation_method }, parameters, realm);
					assert.deepEqual(result, {
						data: {
							[`cursor_${method}_relationship`]: {
								nodes: root_rows,
								page_info: model._cursor_empty_page_info(),
							},
						},
					});
				},
			);
		}

		await assert_relationship_mutation("update", "relationship-update", ["relationship-1"]);
		await assert_relationship_mutation("delete", "relationship-delete", ["relationship-2"]);
	});

	await test.it("requires relationship cursor mutations to target the primary key", async function () {
		const model = $gauze.system.models.relationship.MODEL__RELATIONSHIP__MODEL__SYSTEM;
		function database() {
			throw new Error("relationship cursor mutations without a primary key should not query");
		}
		["update", "delete"].forEach(function (method) {
			assert.throws(function () {
				model._cursor_authorized_ids_transaction(
					{},
					{},
					{
						where: {
							gauze__relationship__from_id: "from-1",
							gauze__relationship__from_type: "gauze__ytitne",
						},
					},
					{
						agent: {
							agent_id: "agent-1",
							agent_type: "gauze__agent_user",
						},
						entity: {},
					},
					method,
					database,
					"transaction",
				);
			}, /Field 'where.gauze__relationship__id' is required/);
		});
	});
});
