import * as $gauze from "./../../src/index.js";

import test from "node:test";
import assert from "node:assert/strict";

const YTITNE_MODEL = $gauze.database.models.ytitne.MODEL__YTITNE__MODEL__DATABASE;
const RELATIONSHIP_MODEL = $gauze.database.models.relationship.MODEL__RELATIONSHIP__MODEL__DATABASE;
const WHITELIST_MODEL = $gauze.database.models.whitelist.MODEL__WHITELIST__MODEL__DATABASE;
const AGENT_ROOT_MODEL = $gauze.database.models.agent_root.MODEL__AGENT_ROOT__MODEL__DATABASE;

function route_node_ids(database_manager, scope, parameters, model, shard_type, relationships) {
	const nodes = database_manager.route_connections({ transactions: {} }, scope, parameters, model, shard_type, relationships);
	return nodes.map(function (node) {
		return node.id;
	});
}

function unique_shards(shards) {
	return [
		...new Map(
			shards.map(function (shard) {
				return [shard.id, shard];
			}),
		).values(),
	];
}

function intersect_shards(shards, constraint_shards) {
	const constraint_shard_ids = new Set(
		constraint_shards.map(function (shard) {
			return shard.id;
		}),
	);
	return shards.filter(function (shard) {
		return constraint_shard_ids.has(shard.id);
	});
}

function node_ids_for_shards(shards, shard_type) {
	return shards.map(function (shard) {
		return shard[shard_type][0].id;
	});
}

function current_shards(database_manager, table_name) {
	return database_manager.get_table_database(table_name).current;
}

function shards_for_primary_keys(database_manager, table_name, primary_keys) {
	return unique_shards(
		primary_keys
			.map(function (primary_key) {
				return database_manager.find_shards(table_name, database_manager.uuid_to_big_int(primary_key));
			})
			.flat(),
	);
}

function shards_for_range(database_manager, table_name, primary_key_range) {
	const [start_primary_key, end_primary_key] = primary_key_range;
	const start_primary_key_number = database_manager.uuid_to_big_int(start_primary_key);
	const end_primary_key_number = database_manager.uuid_to_big_int(end_primary_key);
	if (end_primary_key_number < start_primary_key_number) {
		return [];
	}
	return current_shards(database_manager, table_name).filter(function (shard) {
		return shard.start <= end_primary_key_number && start_primary_key_number <= shard.end;
	});
}

function expected_range_node_ids(database_manager, table_name, primary_key_range, shard_type) {
	return node_ids_for_shards(shards_for_range(database_manager, table_name, primary_key_range), shard_type);
}

function expected_primary_key_node_id(database_manager, table_name, primary_key, shard_type) {
	return node_ids_for_shards(shards_for_primary_keys(database_manager, table_name, [primary_key]), shard_type)[0];
}

function expected_primary_filter_node_ids(database_manager, model, parameters, shard_type, candidate_shards) {
	let shards = candidate_shards || current_shards(database_manager, model.table_name);
	if (parameters.where && parameters.where[model.primary_key]) {
		shards = intersect_shards(shards, shards_for_primary_keys(database_manager, model.table_name, [parameters.where[model.primary_key]]));
	}
	if (parameters.where_in && parameters.where_in[model.primary_key]) {
		shards = intersect_shards(shards, shards_for_primary_keys(database_manager, model.table_name, parameters.where_in[model.primary_key]));
	}
	if (parameters.where_between && Object.prototype.hasOwnProperty.call(parameters.where_between, model.primary_key)) {
		shards = intersect_shards(shards, shards_for_range(database_manager, model.table_name, parameters.where_between[model.primary_key]));
	}
	return node_ids_for_shards(shards, shard_type);
}

function expected_relationship_range_node_ids(database_manager, model, relationship_primary_keys, primary_key_range, shard_type) {
	return expected_primary_filter_node_ids(
		database_manager,
		model,
		{
			where_between: {
				[model.primary_key]: primary_key_range,
			},
		},
		shard_type,
		shards_for_primary_keys(database_manager, model.table_name, relationship_primary_keys),
	);
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
			route_node_ids(suite_ctx.database_manager, {}, { where_between: relationship_where_between }, RELATIONSHIP_MODEL, "read"),
			expected_range_node_ids(suite_ctx.database_manager, RELATIONSHIP_MODEL.table_name, primary_key_range, "read"),
		);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: {}, where_between: whitelist_where_between }, WHITELIST_MODEL, "read"),
			expected_range_node_ids(suite_ctx.database_manager, WHITELIST_MODEL.table_name, primary_key_range, "read"),
		);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where_between: whitelist_where_between }, WHITELIST_MODEL, "read"),
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
	await test.it("intersect primary key routing filters", function () {
		const exact_primary_key = "00000000-0000-0000-0000-00000000000a";
		const range_primary_key = "80000000-0000-0000-0000-00000000000a";
		const primary_key_range = ["80000000-0000-0000-0000-000000000000", "c0000000-0000-0000-0000-00000000000f"];
		const ytitne_where_between = {
			[YTITNE_MODEL.primary_key]: primary_key_range,
		};
		const exact_and_range_parameters = {
			where: {
				[YTITNE_MODEL.primary_key]: exact_primary_key,
			},
			where_between: ytitne_where_between,
		};
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, exact_and_range_parameters, YTITNE_MODEL, "read"),
			expected_primary_filter_node_ids(suite_ctx.database_manager, YTITNE_MODEL, exact_and_range_parameters, "read"),
		);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { ...exact_and_range_parameters, attributes: { text: "shard-update" } }, YTITNE_MODEL, "write"),
			expected_primary_filter_node_ids(suite_ctx.database_manager, YTITNE_MODEL, exact_and_range_parameters, "write"),
		);

		const set_and_range_parameters = {
			where_in: {
				[YTITNE_MODEL.primary_key]: [exact_primary_key, range_primary_key],
			},
			where_between: ytitne_where_between,
		};
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, set_and_range_parameters, YTITNE_MODEL, "read"),
			expected_primary_filter_node_ids(suite_ctx.database_manager, YTITNE_MODEL, set_and_range_parameters, "read"),
		);

		const relationship_primary_keys = [range_primary_key];
		const relationships = relationship_primary_keys.map(function (primary_key) {
			return {
				gauze__relationship__to_type: YTITNE_MODEL.table_name,
				gauze__relationship__to_id: primary_key,
			};
		});
		const source = {
			_metadata: {
				type: "gauze__ytitne",
				id: exact_primary_key,
			},
			_direction: "to",
		};
		const relationship_candidate_shards = shards_for_primary_keys(suite_ctx.database_manager, YTITNE_MODEL.table_name, relationship_primary_keys);
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, { source }, { where: { [YTITNE_MODEL.primary_key]: exact_primary_key } }, YTITNE_MODEL, "read", relationships),
			expected_primary_filter_node_ids(
				suite_ctx.database_manager,
				YTITNE_MODEL,
				{
					where: {
						[YTITNE_MODEL.primary_key]: exact_primary_key,
					},
				},
				"read",
				relationship_candidate_shards,
			),
		);

		const relationship_parameters = {
			where: {
				gauze__relationship__from_id: exact_primary_key,
				gauze__relationship__from_type: YTITNE_MODEL.table_name,
			},
			where_between: {
				[RELATIONSHIP_MODEL.primary_key]: primary_key_range,
			},
		};
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, relationship_parameters, RELATIONSHIP_MODEL, "read"), [
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, exact_primary_key, "read"),
		]);

		const whitelist_parameters = {
			where: {
				gauze__whitelist__entity_id: exact_primary_key,
				gauze__whitelist__entity_type: YTITNE_MODEL.table_name,
			},
			where_between: {
				[WHITELIST_MODEL.primary_key]: primary_key_range,
			},
		};
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, whitelist_parameters, WHITELIST_MODEL, "read"), [
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, exact_primary_key, "read"),
		]);

		const whitelist_agent_parameters = {
			where: {
				gauze__whitelist__agent_id: exact_primary_key,
				gauze__whitelist__agent_type: AGENT_ROOT_MODEL.table_name,
			},
			where_between: {
				[WHITELIST_MODEL.primary_key]: primary_key_range,
			},
		};
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, whitelist_agent_parameters, WHITELIST_MODEL, "read"), [
			expected_primary_key_node_id(suite_ctx.database_manager, AGENT_ROOT_MODEL.table_name, exact_primary_key, "read"),
		]);
	});
});
