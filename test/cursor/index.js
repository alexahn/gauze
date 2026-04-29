import * as $gauze from "./../../src/index.js";

import assert from "node:assert/strict";
import test from "node:test";

const DATABASE_SCHEMA = $gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE;

function encode_cursor_payload(payload) {
	return $gauze.kernel.src.cursor.ENCODE_PAYLOAD__CURSOR__SRC__KERNEL(payload);
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

test.describe("cursor pagination", async function (suite_ctx) {
	test.before(function () {
		suite_ctx.database_manager = new $gauze.kernel.src.database.manager.DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL($gauze.database.config.default);
		return suite_ctx.database_manager.migrate_latest().then(function () {
			return suite_ctx.database_manager.seed_run();
		});
	});

	test.after(function () {
		suite_ctx.database_manager.destroy_connections();
	});

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

	await test.it("routes special system cursor deletes through authorized id caches", async function () {
		async function assert_cursor_delete(model, operation_method, key, expected_ids) {
			const parameters = {
				cursor: `${operation_method}-cursor`,
			};
			const decoded_parameters = {
				where: {
					id: `${operation_method}-decoded`,
				},
			};
			const realm = {
				operation: {
					operation: `${operation_method}-operation`,
				},
			};
			await with_stubbed_methods(
				model,
				{
					_cursor_request_from_parameters(input, method) {
						assert.deepEqual(input, parameters);
						assert.equal(method, "delete");
						return {
							parameters: decoded_parameters,
						};
					},
					_cursor_authorized_ids(context, scope, input, input_realm, method) {
						assert.deepEqual(context, { context: operation_method });
						assert.deepEqual(scope, { scope: operation_method });
						assert.deepEqual(input, decoded_parameters);
						assert.equal(input_realm, realm);
						assert.equal(method, "delete");
						return Promise.resolve(expected_ids);
					},
					_cursor_cache_where_in(input, input_key, values) {
						assert.deepEqual(input, parameters);
						assert.equal(input_key, key);
						assert.deepEqual(values, expected_ids);
						return {
							...input,
							cache_where_in: {
								[input_key]: `${operation_method}-cache`,
							},
						};
					},
					_execute(context, operation, input) {
						assert.deepEqual(context, { context: operation_method });
						assert.equal(operation, realm.operation);
						assert.deepEqual(input, {
							cursor: `${operation_method}-cursor`,
							cache_where_in: {
								[key]: `${operation_method}-cache`,
							},
						});
						return Promise.resolve({
							data: operation_method,
						});
					},
				},
				async function () {
					const result = await model._cursor_delete({ context: operation_method }, { scope: operation_method }, parameters, realm);
					assert.deepEqual(result, {
						data: operation_method,
					});
				},
			);
		}

		const relationship_model = $gauze.system.models.relationship.MODEL__RELATIONSHIP__MODEL__SYSTEM;
		await assert_cursor_delete(relationship_model, "relationship-delete", relationship_model.entity.primary_key, ["relationship-2"]);

		const blacklist_model = $gauze.system.models.blacklist.MODEL__BLACKLIST__MODEL__SYSTEM;
		await assert_cursor_delete(blacklist_model, "blacklist-delete", blacklist_model.key_id, ["blacklist-1"]);
	});

	await test.it("authorizes special system cursor updates without executing updates", async function () {
		function expected_empty_cursor_update_response(model) {
			return {
				data: {
					[`cursor_update_${model.entity.name}`]: {
						nodes: [],
						page_info: {
							has_previous_page: false,
							has_next_page: false,
							previous_cursor: null,
							current_cursor: null,
							next_cursor: null,
						},
					},
				},
			};
		}

		async function assert_cursor_update(model, operation_method, expected_response) {
			const parameters = {
				cursor: `${operation_method}-cursor`,
			};
			const decoded_parameters = {
				where: {
					id: `${operation_method}-decoded`,
				},
			};
			const realm = {
				operation: {
					operation: `${operation_method}-operation`,
				},
			};
			await with_stubbed_methods(
				model,
				{
					_cursor_request_from_parameters(input, method) {
						assert.deepEqual(input, parameters);
						assert.equal(method, "update");
						return {
							parameters: decoded_parameters,
						};
					},
					_cursor_authorized_ids(context, scope, input, input_realm, method) {
						assert.deepEqual(context, { context: operation_method });
						assert.deepEqual(scope, { scope: operation_method });
						assert.deepEqual(input, decoded_parameters);
						assert.equal(input_realm, realm);
						assert.equal(method, "update");
						return Promise.resolve([`${operation_method}-id`]);
					},
					_cursor_cache_where_in() {
						throw new Error("cursor update should not build an execution cache");
					},
					_execute() {
						throw new Error("cursor update should not execute a database update");
					},
				},
				async function () {
					const result = await model._cursor_update({ context: operation_method }, { scope: operation_method }, parameters, realm);
					assert.deepEqual(result, expected_response);
				},
			);
		}

		const relationship_model = $gauze.system.models.relationship.MODEL__RELATIONSHIP__MODEL__SYSTEM;
		await assert_cursor_update(relationship_model, "relationship-update", expected_empty_cursor_update_response(relationship_model));

		const whitelist_model = $gauze.system.models.whitelist.MODEL__WHITELIST__MODEL__SYSTEM;
		await assert_cursor_update(whitelist_model, "whitelist-update", expected_empty_cursor_update_response(whitelist_model));
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

	await test.it("requires special system cursor mutations to target the primary key", async function () {
		const relationship_model = $gauze.system.models.relationship.MODEL__RELATIONSHIP__MODEL__SYSTEM;
		function relationship_database() {
			throw new Error("relationship cursor mutations without a primary key should not query");
		}
		["update", "delete"].forEach(function (method) {
			assert.throws(function () {
				relationship_model._cursor_authorized_ids_transaction(
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
					relationship_database,
					"transaction",
				);
			}, /Field 'where.gauze__relationship__id' is required/);
		});

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

	await test.it("pages ytitne with previous, current, and next cursors", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
				"CursorCreateYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000001",
						text: "cursor-ytitne-read-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000002",
						text: "cursor-ytitne-read-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000003",
						text: "cursor-ytitne-read-003",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitne($where_like: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ytitne(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info {
						has_previous_page
						has_next_page
						previous_cursor
						current_cursor
						next_cursor
					}
				}
			}
			`,
				"CursorReadYtitne",
				{
					where_like: {
						text: "cursor-ytitne-read-%",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(
				first.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-read-001", "cursor-ytitne-read-002"],
			);
			assert.equal(first.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);
			assert.equal(first.cursor_read_ytitne.page_info.previous_cursor, null);
			assert.equal(typeof first.cursor_read_ytitne.page_info.current_cursor, "string");
			assert.equal(typeof first.cursor_read_ytitne.page_info.next_cursor, "string");

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneNext($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info {
						has_previous_page
						has_next_page
						previous_cursor
						current_cursor
						next_cursor
					}
				}
			}
			`,
				"CursorReadYtitneNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				second.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-read-003"],
			);
			assert.equal(second.cursor_read_ytitne.page_info.has_previous_page, true);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);
			assert.equal(typeof second.cursor_read_ytitne.page_info.previous_cursor, "string");
			assert.equal(second.cursor_read_ytitne.page_info.next_cursor, null);

			const previous = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitnePrevious($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info {
						has_previous_page
						has_next_page
						previous_cursor
						next_cursor
					}
				}
			}
			`,
				"CursorReadYtitnePrevious",
				{
					cursor: second.cursor_read_ytitne.page_info.previous_cursor,
				},
			);
			assert.deepEqual(
				previous.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-read-001", "cursor-ytitne-read-002"],
			);
			assert.equal(previous.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(previous.cursor_read_ytitne.page_info.has_next_page, true);
			assert.equal(previous.cursor_read_ytitne.page_info.previous_cursor, null);
			assert.equal(typeof previous.cursor_read_ytitne.page_info.next_cursor, "string");

			const stale_empty_previous_cursor = encode_cursor_payload({
				v: 1,
				entity: "gauze__ytitne",
				method: "read",
				parameters: {
					where_like: {
						text: "cursor-ytitne-read-%",
					},
					limit: 2,
					order: [
						{
							column: "text",
							order: "asc",
							nulls: "first",
						},
						{
							column: "id",
							order: "asc",
							nulls: "last",
						},
					],
				},
				page: "previous",
				previous: {
					direction: "previous",
					cursor_where_between: {
						type: "lexicographic",
						start: null,
						end: [
							{
								column: "text",
								value: "cursor-ytitne-read-001",
							},
							{
								column: "id",
								value: "10000000-0000-4000-8000-000000000001",
							},
						],
					},
				},
				current: {
					direction: "previous",
					cursor_where_between: {
						type: "lexicographic",
						start: null,
						end: [
							{
								column: "text",
								value: "cursor-ytitne-read-003",
							},
							{
								column: "id",
								value: "10000000-0000-4000-8000-000000000003",
							},
						],
					},
				},
				next: null,
			});
			const empty_previous = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneEmptyPrevious($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info {
						has_previous_page
						has_next_page
						previous_cursor
						next_cursor
					}
				}
			}
			`,
				"CursorReadYtitneEmptyPrevious",
				{
					cursor: stale_empty_previous_cursor,
				},
			);
			assert.deepEqual(
				empty_previous.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				[],
			);
			assert.equal(empty_previous.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(empty_previous.cursor_read_ytitne.page_info.has_next_page, true);
			assert.equal(empty_previous.cursor_read_ytitne.page_info.previous_cursor, null);
			assert.equal(typeof empty_previous.cursor_read_ytitne.page_info.next_cursor, "string");

			const restored_previous = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneRestoredPrevious($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
				}
			}
			`,
				"CursorReadYtitneRestoredPrevious",
				{
					cursor: empty_previous.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				restored_previous.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-read-001", "cursor-ytitne-read-002"],
			);

			const mixed = await execute_with_errors(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneMixed($cursor: String, $where_like: Ytitne_Query__Where) {
				cursor_read_ytitne(cursor: $cursor, where_like: $where_like) {
					nodes { attributes { id } }
				}
			}
			`,
				"CursorReadYtitneMixed",
				{
					cursor: first.cursor_read_ytitne.page_info.current_cursor,
					where_like: {
						text: "cursor-ytitne-read-%",
					},
				},
			);
			assert.match(mixed.errors[0].message, /cannot be combined/);
		});
	});

	await test.it("allows internal cache filters on cursor continuation", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateCachedYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
				$d: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
				d: create_ytitne(attributes: $d) { attributes { id } }
			}
			`,
				"CursorCreateCachedYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000051",
						text: "cursor-ytitne-cache-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000052",
						text: "cursor-ytitne-cache-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000053",
						text: "cursor-ytitne-cache-003",
					},
					d: {
						id: "10000000-0000-4000-8000-000000000054",
						text: "cursor-ytitne-cache-004",
					},
				},
			);

			const allowed_ids = ["10000000-0000-4000-8000-000000000051", "10000000-0000-4000-8000-000000000052", "10000000-0000-4000-8000-000000000053"];
			$gauze.kernel.src.cache.lru.TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set("cursor-cache-where-in-initial", allowed_ids, allowed_ids.length);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneCached(
				$where_like: Ytitne_Query__Where
				$cache_where_in: Ytitne_Query__Where_String
				$limit: Int
				$order: [Order]
			) {
				cursor_read_ytitne(where_like: $where_like, cache_where_in: $cache_where_in, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadYtitneCached",
				{
					where_like: {
						text: "cursor-ytitne-cache-%",
					},
					cache_where_in: {
						id: "cursor-cache-where-in-initial",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(
				first.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-cache-001", "cursor-ytitne-cache-002"],
			);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const decoded_next_cursor = JSON.parse(Buffer.from(first.cursor_read_ytitne.page_info.next_cursor.split(".")[0], "base64url").toString("utf8"));
			assert.equal(decoded_next_cursor.parameters.cache_where_in, undefined);

			$gauze.kernel.src.cache.lru.TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set("cursor-cache-where-in-next", allowed_ids, allowed_ids.length);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneCachedNext($cursor: String, $cache_where_in: Ytitne_Query__Where_String) {
				cursor_read_ytitne(cursor: $cursor, cache_where_in: $cache_where_in) {
					nodes { attributes { id text } }
					page_info { has_next_page }
				}
			}
			`,
				"CursorReadYtitneCachedNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
					cache_where_in: {
						id: "cursor-cache-where-in-next",
					},
				},
			);
			assert.deepEqual(
				second.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-cache-003"],
			);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);
		});
	});

	await test.it("uses embedded attributes for cursor_update_ytitne continuation", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateUpdateYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
				"CursorCreateUpdateYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000011",
						text: "cursor-ytitne-update-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000012",
						text: "cursor-ytitne-update-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000013",
						text: "cursor-ytitne-update-003",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorUpdateYtitne(
				$where_like: Ytitne_Mutation__Where
				$attributes: Ytitne_Mutation__Attributes
				$limit: Int
				$order: [Order]
			) {
				cursor_update_ytitne(where_like: $where_like, attributes: $attributes, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { next_cursor }
				}
			}
			`,
				"CursorUpdateYtitne",
				{
					where_like: {
						text: "cursor-ytitne-update-%",
					},
					attributes: {
						text: "cursor-ytitne-updated",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.equal(first.cursor_update_ytitne.nodes.length, 2);
			assert.equal(typeof first.cursor_update_ytitne.page_info.next_cursor, "string");

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorUpdateYtitneNext($cursor: String) {
				cursor_update_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_next_page }
				}
			}
			`,
				"CursorUpdateYtitneNext",
				{
					cursor: first.cursor_update_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				second.cursor_update_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-updated"],
			);
			assert.equal(second.cursor_update_ytitne.page_info.has_next_page, false);
		});
	});

	await test.it("pages ytitne in descending order", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateDescendingYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
				"CursorCreateDescendingYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000031",
						text: "cursor-ytitne-desc-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000032",
						text: "cursor-ytitne-desc-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000033",
						text: "cursor-ytitne-desc-003",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneDescending($where_like: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ytitne(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadYtitneDescending",
				{
					where_like: {
						text: "cursor-ytitne-desc-%",
					},
					limit: 2,
					order: [{ column: "text", order: "desc" }],
				},
			);
			assert.deepEqual(
				first.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-desc-003", "cursor-ytitne-desc-002"],
			);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneDescendingNext($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page previous_cursor }
				}
			}
			`,
				"CursorReadYtitneDescendingNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				second.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-desc-001"],
			);
			assert.equal(second.cursor_read_ytitne.page_info.has_previous_page, true);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);

			const previous = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneDescendingPrevious($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadYtitneDescendingPrevious",
				{
					cursor: second.cursor_read_ytitne.page_info.previous_cursor,
				},
			);
			assert.deepEqual(
				previous.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.text;
				}),
				["cursor-ytitne-desc-003", "cursor-ytitne-desc-002"],
			);
			assert.equal(previous.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(previous.cursor_read_ytitne.page_info.has_next_page, true);
		});
	});

	await test.it("pages ezuag with mixed multi-column order and null cursor values", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateMixedEzuag(
				$a: Ezuag_Mutation__Attributes
				$b: Ezuag_Mutation__Attributes
				$c: Ezuag_Mutation__Attributes
				$d: Ezuag_Mutation__Attributes
				$e: Ezuag_Mutation__Attributes
				$f: Ezuag_Mutation__Attributes
				$g: Ezuag_Mutation__Attributes
			) {
				a: create_ezuag(attributes: $a) { attributes { gauze__ezuag__id } }
				b: create_ezuag(attributes: $b) { attributes { gauze__ezuag__id } }
				c: create_ezuag(attributes: $c) { attributes { gauze__ezuag__id } }
				d: create_ezuag(attributes: $d) { attributes { gauze__ezuag__id } }
				e: create_ezuag(attributes: $e) { attributes { gauze__ezuag__id } }
				f: create_ezuag(attributes: $f) { attributes { gauze__ezuag__id } }
				g: create_ezuag(attributes: $g) { attributes { gauze__ezuag__id } }
			}
			`,
				"CursorCreateMixedEzuag",
				{
					a: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000041",
						gauze__ezuag__text1: "cursor-ezuag-mixed-a",
						gauze__ezuag__text2: "b",
					},
					b: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000042",
						gauze__ezuag__text1: "cursor-ezuag-mixed-a",
						gauze__ezuag__text2: "a",
					},
					c: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000043",
						gauze__ezuag__text1: "cursor-ezuag-mixed-b",
						gauze__ezuag__text2: "b",
					},
					d: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000044",
						gauze__ezuag__text1: "cursor-ezuag-mixed-b",
						gauze__ezuag__text2: "a",
					},
					e: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000045",
						gauze__ezuag__text1: "cursor-ezuag-null-001",
						gauze__ezuag__text2: "null-boundary",
					},
					f: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000046",
						gauze__ezuag__text1: "cursor-ezuag-null-002",
						gauze__ezuag__text2: "null-boundary",
					},
					g: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000047",
						gauze__ezuag__text1: "cursor-ezuag-null-003",
						gauze__ezuag__text2: "null-boundary",
					},
				},
			);

			const mixed_first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagMixed($where_like: Ezuag_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ezuag(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadEzuagMixed",
				{
					where_like: {
						gauze__ezuag__text1: "cursor-ezuag-mixed-%",
					},
					limit: 2,
					order: [
						{ column: "gauze__ezuag__text1", order: "asc" },
						{ column: "gauze__ezuag__text2", order: "desc" },
					],
				},
			);
			assert.deepEqual(
				mixed_first.cursor_read_ezuag.nodes.map(function (node) {
					return `${node.attributes.gauze__ezuag__text1}:${node.attributes.gauze__ezuag__text2}`;
				}),
				["cursor-ezuag-mixed-a:b", "cursor-ezuag-mixed-a:a"],
			);
			assert.equal(mixed_first.cursor_read_ezuag.page_info.has_next_page, true);

			const mixed_second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagMixedNext($cursor: String) {
				cursor_read_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_previous_page has_next_page previous_cursor }
				}
			}
			`,
				"CursorReadEzuagMixedNext",
				{
					cursor: mixed_first.cursor_read_ezuag.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				mixed_second.cursor_read_ezuag.nodes.map(function (node) {
					return `${node.attributes.gauze__ezuag__text1}:${node.attributes.gauze__ezuag__text2}`;
				}),
				["cursor-ezuag-mixed-b:b", "cursor-ezuag-mixed-b:a"],
			);
			assert.equal(mixed_second.cursor_read_ezuag.page_info.has_previous_page, true);
			assert.equal(mixed_second.cursor_read_ezuag.page_info.has_next_page, false);

			const null_first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagNulls($where_like: Ezuag_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ezuag(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadEzuagNulls",
				{
					where_like: {
						gauze__ezuag__text1: "cursor-ezuag-null-%",
					},
					limit: 2,
					order: [{ column: "gauze__ezuag__deleted_at", order: "asc", nulls: "first" }],
				},
			);
			assert.deepEqual(
				null_first.cursor_read_ezuag.nodes.map(function (node) {
					return node.attributes.gauze__ezuag__text1;
				}),
				["cursor-ezuag-null-001", "cursor-ezuag-null-002"],
			);
			assert.equal(null_first.cursor_read_ezuag.page_info.has_next_page, true);

			const null_second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagNullsNext($cursor: String) {
				cursor_read_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_previous_page has_next_page previous_cursor }
				}
			}
			`,
				"CursorReadEzuagNullsNext",
				{
					cursor: null_first.cursor_read_ezuag.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				null_second.cursor_read_ezuag.nodes.map(function (node) {
					return node.attributes.gauze__ezuag__text1;
				}),
				["cursor-ezuag-null-003"],
			);
			assert.equal(null_second.cursor_read_ezuag.page_info.has_previous_page, true);
			assert.equal(null_second.cursor_read_ezuag.page_info.has_next_page, false);

			const null_previous = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagNullsPrevious($cursor: String) {
				cursor_read_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadEzuagNullsPrevious",
				{
					cursor: null_second.cursor_read_ezuag.page_info.previous_cursor,
				},
			);
			assert.deepEqual(
				null_previous.cursor_read_ezuag.nodes.map(function (node) {
					return node.attributes.gauze__ezuag__text1;
				}),
				["cursor-ezuag-null-001", "cursor-ezuag-null-002"],
			);
			assert.equal(null_previous.cursor_read_ezuag.page_info.has_previous_page, false);
			assert.equal(null_previous.cursor_read_ezuag.page_info.has_next_page, true);
		});
	});

	await test.it("pages ezuag and uses cursor_delete_ezuag continuation", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateEzuag(
				$a: Ezuag_Mutation__Attributes
				$b: Ezuag_Mutation__Attributes
				$c: Ezuag_Mutation__Attributes
			) {
				a: create_ezuag(attributes: $a) { attributes { gauze__ezuag__id } }
				b: create_ezuag(attributes: $b) { attributes { gauze__ezuag__id } }
				c: create_ezuag(attributes: $c) { attributes { gauze__ezuag__id } }
			}
			`,
				"CursorCreateEzuag",
				{
					a: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000021",
						gauze__ezuag__text1: "cursor-ezuag-delete-001",
						gauze__ezuag__text2: "keep",
					},
					b: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000022",
						gauze__ezuag__text1: "cursor-ezuag-delete-002",
						gauze__ezuag__text2: "keep",
					},
					c: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000023",
						gauze__ezuag__text1: "cursor-ezuag-delete-003",
						gauze__ezuag__text2: "keep",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorDeleteEzuag(
				$where_like: Ezuag_Mutation__Where
				$limit: Int
				$order: [Order]
			) {
				cursor_delete_ezuag(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorDeleteEzuag",
				{
					where_like: {
						gauze__ezuag__text1: "cursor-ezuag-delete-%",
					},
					limit: 2,
					order: [{ column: "gauze__ezuag__text1", order: "asc" }],
				},
			);
			assert.deepEqual(
				first.cursor_delete_ezuag.nodes.map(function (node) {
					return node.attributes.gauze__ezuag__text1;
				}),
				["cursor-ezuag-delete-001", "cursor-ezuag-delete-002"],
			);
			assert.equal(first.cursor_delete_ezuag.page_info.has_next_page, true);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorDeleteEzuagNext($cursor: String) {
				cursor_delete_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 } }
					page_info { has_next_page }
				}
			}
			`,
				"CursorDeleteEzuagNext",
				{
					cursor: first.cursor_delete_ezuag.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				second.cursor_delete_ezuag.nodes.map(function (node) {
					return node.attributes.gauze__ezuag__text1;
				}),
				["cursor-ezuag-delete-003"],
			);
			assert.equal(second.cursor_delete_ezuag.page_info.has_next_page, false);
		});
	});
});
