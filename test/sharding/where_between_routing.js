import * as $gauze from "./../../src/index.js";

import test from "node:test";
import assert from "node:assert/strict";

const YTITNE_MODEL = $gauze.database.models.ytitne.MODEL__YTITNE__MODEL__DATABASE;
const RELATIONSHIP_MODEL = $gauze.database.models.relationship.MODEL__RELATIONSHIP__MODEL__DATABASE;
const WHITELIST_MODEL = $gauze.database.models.whitelist.MODEL__WHITELIST__MODEL__DATABASE;

function route_node_ids(database_manager, scope, parameters, model, shard_type, relationships) {
	const nodes = database_manager.route_connections({ transactions: {} }, scope, parameters, model, shard_type, relationships);
	return nodes.map(function (node) {
		return node.id;
	});
}

function expected_range_node_ids(database_manager, table_name, primary_key_range, shard_type) {
	const [start_primary_key, end_primary_key] = primary_key_range;
	const start_primary_key_number = database_manager.uuid_to_big_int(start_primary_key);
	const end_primary_key_number = database_manager.uuid_to_big_int(end_primary_key);
	if (end_primary_key_number < start_primary_key_number) {
		return [];
	}
	return database_manager
		.get_table_database(table_name)
		.current.filter(function (shard) {
			return shard.start <= end_primary_key_number && start_primary_key_number <= shard.end;
		})
		.map(function (shard) {
			return shard[shard_type][0].id;
		});
}

function expected_relationship_range_node_ids(database_manager, model, relationship_primary_keys, primary_key_range, shard_type) {
	const relationship_shards = [
		...new Map(
			relationship_primary_keys
				.map(function (primary_key) {
					return database_manager.find_shards(model.table_name, database_manager.uuid_to_big_int(primary_key));
				})
				.flat()
				.map(function (shard) {
					return [shard.id, shard];
				}),
		).values(),
	];
	const range_shard_ids = new Set(
		expected_range_node_ids(database_manager, model.table_name, primary_key_range, shard_type).map(function (node_id) {
			return node_id.replace(`.${shard_type}.1`, "");
		}),
	);
	return relationship_shards
		.filter(function (shard) {
			return range_shard_ids.has(shard.id);
		})
		.map(function (shard) {
			return shard[shard_type][0].id;
		});
}

test.describe("sharding where_between routing", async function (suite_ctx) {
	test.before(function () {
		suite_ctx.database_manager = new $gauze.kernel.src.database.manager.DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL($gauze.database.config.default);
	});
	test.after(function () {
		suite_ctx.database_manager.destroy_connections();
	});
	await test.it("route primary key ranges", function () {
		const primary_key_range = ["40000000-0000-0000-0000-000000000000", "80000000-0000-0000-0000-00000000000f"];
		const ytitne_where_between = {
			[YTITNE_MODEL.primary_key]: primary_key_range,
		};
		const relationship_where_between = {
			[RELATIONSHIP_MODEL.primary_key]: primary_key_range,
		};
		const whitelist_where_between = {
			[WHITELIST_MODEL.primary_key]: primary_key_range,
		};
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: {}, where_between: ytitne_where_between }, YTITNE_MODEL, "read"),
			expected_range_node_ids(suite_ctx.database_manager, YTITNE_MODEL.table_name, primary_key_range, "read"),
		);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where_in: { text: ["shard-entity-2"] }, where_between: ytitne_where_between }, YTITNE_MODEL, "read"),
			expected_range_node_ids(suite_ctx.database_manager, YTITNE_MODEL.table_name, primary_key_range, "read"),
		);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: {}, where_between: ytitne_where_between, attributes: { text: "shard-range" } }, YTITNE_MODEL, "write"),
			expected_range_node_ids(suite_ctx.database_manager, YTITNE_MODEL.table_name, primary_key_range, "write"),
		);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: {}, where_between: relationship_where_between }, RELATIONSHIP_MODEL, "read"),
			expected_range_node_ids(suite_ctx.database_manager, RELATIONSHIP_MODEL.table_name, primary_key_range, "read"),
		);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: {}, where_between: whitelist_where_between }, WHITELIST_MODEL, "read"),
			expected_range_node_ids(suite_ctx.database_manager, WHITELIST_MODEL.table_name, primary_key_range, "read"),
		);

		const relationship_primary_keys = [
			"00000000-0000-0000-0000-00000000000a",
			"40000000-0000-0000-0000-000000000009",
			"80000000-0000-0000-0000-000000000009",
			"c0000000-0000-0000-0000-000000000009",
		];
		const relationships = relationship_primary_keys.map(function (primary_key) {
			return {
				gauze__relationship__to_type: YTITNE_MODEL.table_name,
				gauze__relationship__to_id: primary_key,
			};
		});
		const source = {
			_metadata: {
				type: "gauze__ytitne",
				id: relationship_primary_keys[0],
			},
			_direction: "to",
		};
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, { source }, { where: {}, where_between: ytitne_where_between }, YTITNE_MODEL, "read", relationships),
			expected_relationship_range_node_ids(suite_ctx.database_manager, YTITNE_MODEL, relationship_primary_keys, primary_key_range, "read"),
		);
	});
});
