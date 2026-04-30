import assert from "node:assert/strict";
import test from "node:test";

import { $gauze, with_stubbed_methods } from "./../../helpers.js";

test.describe("cursor pagination system access models", async function () {
	await test.it("authorizes cursor reads from decoded parameters and executes with a fresh cache filter", async function () {
		const model = $gauze.system.models.whitelist.MODEL__WHITELIST__MODEL__SYSTEM;
		const parameters = {
			cursor: "whitelist-read-cursor",
		};
		const decoded_parameters = {
			where: {
				[model.key_agent_id]: "agent-1",
				[model.key_agent_type]: "gauze__agent_user",
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
					return Promise.resolve(["whitelist-1", "whitelist-2"]);
				},
				_cursor_cache_where_in(input, key, values) {
					assert.deepEqual(input, parameters);
					assert.equal(key, model.key_id);
					assert.deepEqual(values, ["whitelist-1", "whitelist-2"]);
					return {
						...input,
						cache_where_in: {
							[key]: "fresh-cache-key",
						},
					};
				},
				_execute(context, operation, input) {
					assert.deepEqual(context, { context: "read" });
					assert.deepEqual(operation, realm.operation);
					assert.deepEqual(input, {
						cursor: "whitelist-read-cursor",
						cache_where_in: {
							[model.key_id]: "fresh-cache-key",
						},
					});
					return Promise.resolve({
						data: {
							cursor_read_whitelist: {
								nodes: [],
								page_info: model._cursor_empty_page_info(),
							},
						},
					});
				},
			},
			async function () {
				const result = await model._cursor_read({ context: "read" }, { scope: "read" }, parameters, realm);
				assert.deepEqual(result.data.cursor_read_whitelist.page_info, model._cursor_empty_page_info());
			},
		);
	});

	await test.it("routes access cursor updates and deletes through root mutation paths", async function () {
		async function assert_access_mutation(model, method, operation_method, expected_ids) {
			const parameters = {
				cursor: `${operation_method}-cursor`,
			};
			const decoded_parameters = {
				where: {
					[model.key_id]: `${operation_method}-decoded`,
				},
				attributes: method === "update" ? { [model.key_agent_role]: "trunk" } : undefined,
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
						[model.key_id]: expected_ids[0],
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
								[model.key_id]: expected_ids[0],
							},
							attributes: decoded_parameters.attributes,
						});
						return Promise.resolve({
							data: {
								[`update_${model.entity.name}`]: root_rows,
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
								[model.key_id]: expected_ids[0],
							},
						});
						return Promise.resolve({
							data: {
								[`delete_${model.entity.name}`]: root_rows,
							},
						});
					},
					_cursor_cache_where_in() {
						throw new Error("cursor access mutation should not build an execution cache");
					},
					_execute() {
						throw new Error("cursor access mutation should not execute a database cursor mutation");
					},
				},
				async function () {
					const result =
						method === "update"
							? await model._cursor_update({ context: operation_method }, { scope: operation_method }, parameters, realm)
							: await model._cursor_delete({ context: operation_method }, { scope: operation_method }, parameters, realm);
					assert.deepEqual(result, {
						data: {
							[`cursor_${method}_${model.entity.name}`]: {
								nodes: root_rows,
								page_info: model._cursor_empty_page_info(),
							},
						},
					});
				},
			);
		}

		await assert_access_mutation($gauze.system.models.whitelist.MODEL__WHITELIST__MODEL__SYSTEM, "update", "whitelist-update", ["whitelist-1"]);
		await assert_access_mutation($gauze.system.models.blacklist.MODEL__BLACKLIST__MODEL__SYSTEM, "delete", "blacklist-delete", ["blacklist-1"]);
	});

	await test.it("requires access cursor agent filters to match agent id and type", async function () {
		const model = $gauze.system.models.whitelist.MODEL__WHITELIST__MODEL__SYSTEM;
		assert.throws(function () {
			model._cursor_authorized_ids_transaction(
				{},
				{},
				{
					where: {
						[model.key_agent_id]: "agent-1",
						[model.key_agent_type]: "wrong-agent-type",
					},
				},
				{
					agent: {
						agent_id: "agent-1",
						agent_type: "right-agent-type",
					},
					entity: {},
				},
				"read",
				null,
				null,
			);
		}, /must match the initiating agent/);
	});

	await test.it("requires access cursor mutations to target the primary key", async function () {
		const model = $gauze.system.models.whitelist.MODEL__WHITELIST__MODEL__SYSTEM;
		function database() {
			throw new Error("access cursor mutations without a primary key should not query");
		}
		["update", "delete"].forEach(function (method) {
			assert.throws(
				function () {
					model._cursor_authorized_ids_transaction(
						{},
						{},
						{
							where: {
								[model.key_agent_id]: "agent-1",
								[model.key_agent_type]: "gauze__agent_user",
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
				},
				new RegExp(`Field 'where.${model.key_id}' is required`),
			);
		});
	});

	await test.it("routes access cursor primary-key authorization through the access router", async function () {
		const model = $gauze.system.models.whitelist.MODEL__WHITELIST__MODEL__SYSTEM;
		const agent = {
			agent_id: "root-agent",
			agent_type: "gauze__agent_user",
		};
		const target_record = {
			[model.key_id]: "whitelist-1",
			[model.key_realm]: "system",
			[model.key_agent_role]: "leaf",
			[model.key_agent_type]: "gauze__agent_user",
			[model.key_agent_id]: "leaf-agent",
			[model.key_entity_type]: "gauze__agent_user",
			[model.key_entity_id]: "entity-1",
			[model.key_method]: "read",
		};

		const calls = [];
		await with_stubbed_methods(
			model,
			{
				_valid_access(context, input_agent, method, record) {
					calls.push({ context, agent: input_agent, method, record });
					return Promise.resolve();
				},
				_valid_access_transaction() {
					throw new Error("cursor access-id authorization should route through _valid_access");
				},
			},
			async function () {
				const delete_id = await model._cursor_access_record_id_transaction(
					{ context: "delete" },
					agent,
					{
						where: {
							[model.key_id]: "whitelist-1",
						},
					},
					target_record,
					"delete",
					"wrong-shard-database",
					"wrong-shard-transaction",
				);
				assert.equal(delete_id, "whitelist-1");

				const update_id = await model._cursor_access_record_id_transaction(
					{ context: "update" },
					agent,
					{
						where: {
							[model.key_id]: "whitelist-1",
						},
						attributes: {
							[model.key_agent_role]: "trunk",
						},
					},
					target_record,
					"update",
					"wrong-shard-database",
					"wrong-shard-transaction",
				);
				assert.equal(update_id, "whitelist-1");
			},
		);

		assert.equal(calls.length, 3);
		assert.deepEqual(calls[0], {
			context: { context: "delete" },
			agent,
			method: "delete",
			record: target_record,
		});
		assert.deepEqual(calls[1], {
			context: { context: "update" },
			agent,
			method: "update",
			record: target_record,
		});
		assert.deepEqual(calls[2], {
			context: { context: "update" },
			agent,
			method: "update",
			record: {
				...target_record,
				[model.key_agent_role]: "trunk",
			},
		});
	});
});
