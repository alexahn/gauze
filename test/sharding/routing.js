import * as $gauze from "./../../src/index.js";

import test from "node:test";
import assert from "node:assert/strict";

const YTITNE_MODEL = $gauze.database.models.ytitne.MODEL__YTITNE__MODEL__DATABASE;
const RELATIONSHIP_MODEL = $gauze.database.models.relationship.MODEL__RELATIONSHIP__MODEL__DATABASE;
const WHITELIST_MODEL = $gauze.database.models.whitelist.MODEL__WHITELIST__MODEL__DATABASE;
const BLACKLIST_MODEL = $gauze.database.models.blacklist.MODEL__BLACKLIST__MODEL__DATABASE;
const AGENT_ROOT_MODEL = $gauze.database.models.agent_root.MODEL__AGENT_ROOT__MODEL__DATABASE;

const PRIMARY_KEYS = {
	shard1: "00000000-0000-0000-0000-00000000000a",
	shard2: "40000000-0000-0000-0000-00000000000a",
	shard3: "80000000-0000-0000-0000-00000000000a",
	shard4: "c0000000-0000-0000-0000-00000000000a",
};

const RANGE_SHARD_2_TO_3 = ["40000000-0000-0000-0000-000000000000", "80000000-0000-0000-0000-00000000000f"];
const RANGE_SHARD_3_TO_4 = ["80000000-0000-0000-0000-000000000000", "c0000000-0000-0000-0000-00000000000f"];

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

function expected_current_node_ids(database_manager, model, shard_type) {
	return node_ids_for_shards(current_shards(database_manager, model.table_name), shard_type);
}

function expected_primary_key_node_id(database_manager, table_name, primary_key, shard_type) {
	return node_ids_for_shards(shards_for_primary_keys(database_manager, table_name, [primary_key]), shard_type)[0];
}

function expected_primary_key_node_ids(database_manager, table_name, primary_keys, shard_type) {
	return node_ids_for_shards(shards_for_primary_keys(database_manager, table_name, primary_keys), shard_type);
}

function expected_range_node_ids(database_manager, table_name, primary_key_range, shard_type) {
	return node_ids_for_shards(shards_for_range(database_manager, table_name, primary_key_range), shard_type);
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

function expected_constrained_write_node_ids(database_manager, model, primary_key, parameters, node_ids) {
	const constrained_node_ids = expected_primary_filter_node_ids(database_manager, model, parameters, "write", shards_for_primary_keys(database_manager, model.table_name, [primary_key]));
	if (constrained_node_ids.length === 0) {
		return [];
	}
	return node_ids;
}

function relationship_where(from_primary_key, to_primary_key) {
	return {
		gauze__relationship__from_id: from_primary_key,
		gauze__relationship__from_type: YTITNE_MODEL.table_name,
		gauze__relationship__to_id: to_primary_key,
		gauze__relationship__to_type: YTITNE_MODEL.table_name,
	};
}

function relationship_attributes(primary_key, from_primary_key, to_primary_key) {
	return {
		[RELATIONSHIP_MODEL.primary_key]: primary_key,
		...relationship_where(from_primary_key, to_primary_key),
	};
}

function access_field_names(model) {
	return {
		agent_id: `${model.table_name}__agent_id`,
		agent_type: `${model.table_name}__agent_type`,
		entity_id: `${model.table_name}__entity_id`,
		entity_type: `${model.table_name}__entity_type`,
	};
}

function access_where(model, entity_primary_key, agent_primary_key) {
	const fields = access_field_names(model);
	return {
		[fields.entity_id]: entity_primary_key,
		[fields.entity_type]: YTITNE_MODEL.table_name,
		[fields.agent_id]: agent_primary_key,
		[fields.agent_type]: AGENT_ROOT_MODEL.table_name,
	};
}

function access_attributes(model, primary_key, entity_primary_key, agent_primary_key) {
	return {
		[model.primary_key]: primary_key,
		...access_where(model, entity_primary_key, agent_primary_key),
	};
}

function with_random(value, callback) {
	const original_random = Math.random;
	Math.random = function () {
		return value;
	};
	try {
		return callback();
	} finally {
		Math.random = original_random;
	}
}

test.describe("sharding connection routing", async function (suite_ctx) {
	test.before(function () {
		suite_ctx.database_manager = new $gauze.kernel.src.database.manager.DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL($gauze.database.config.default);
	});
	test.after(function () {
		suite_ctx.database_manager.destroy_connections();
	});
	await test.it("routes unfiltered reads and non-primary filters across current shards", function () {
		// With no filters on a regular entity, read routing should include every current ytitne read shard.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, {}, YTITNE_MODEL, "read"), expected_current_node_ids(suite_ctx.database_manager, YTITNE_MODEL, "read"));
		// With a non-primary `where_like` filter, read routing cannot narrow by shard and should include every current ytitne read shard.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where_like: { text: "%shard%" } }, YTITNE_MODEL, "read"),
			expected_current_node_ids(suite_ctx.database_manager, YTITNE_MODEL, "read"),
		);
		// With an exact non-primary `where` filter, read routing cannot narrow by shard and should include every current ytitne read shard.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: { text: "shard-entity-1" } }, YTITNE_MODEL, "read"),
			expected_current_node_ids(suite_ctx.database_manager, YTITNE_MODEL, "read"),
		);
		// With no filters on the relationship table, read routing should include every current relationship read shard.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, {}, RELATIONSHIP_MODEL, "read"),
			expected_current_node_ids(suite_ctx.database_manager, RELATIONSHIP_MODEL, "read"),
		);
		// With only a whitelist method filter, there is no entity or agent anchor, so read routing should include every current whitelist read shard.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: { gauze__whitelist__method: "read" } }, WHITELIST_MODEL, "read"),
			expected_current_node_ids(suite_ctx.database_manager, WHITELIST_MODEL, "read"),
		);
		// With no filters on the blacklist table, read routing should include every current blacklist read shard.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, {}, BLACKLIST_MODEL, "read"), expected_current_node_ids(suite_ctx.database_manager, BLACKLIST_MODEL, "read"));
	});
	await test.it("routes regular entity reads and filtered writes by cumulative primary key filters", function () {
		const exact_parameters = {
			where: {
				[YTITNE_MODEL.primary_key]: PRIMARY_KEYS.shard1,
			},
		};
		const set_and_range_parameters = {
			where_in: {
				[YTITNE_MODEL.primary_key]: [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard3],
			},
			where_between: {
				[YTITNE_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
			},
		};
		const incompatible_parameters = {
			where: {
				[YTITNE_MODEL.primary_key]: PRIMARY_KEYS.shard1,
			},
			where_between: {
				[YTITNE_MODEL.primary_key]: RANGE_SHARD_3_TO_4,
			},
		};
		// With an exact primary-key `where` for shard1, read routing should target only the ytitne read node for shard1.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, exact_parameters, YTITNE_MODEL, "read"), [
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard1, "read"),
		]);
		// With primary-key `where_in` values on shard1 and shard3, read routing should target the matching ytitne read nodes.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where_in: {
						[YTITNE_MODEL.primary_key]: [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard3],
					},
				},
				YTITNE_MODEL,
				"read",
			),
			expected_primary_key_node_ids(suite_ctx.database_manager, YTITNE_MODEL.table_name, [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard3], "read"),
		);
		// With a primary-key range spanning shard2 through shard3, read routing should target the overlapping ytitne read nodes.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where_between: {
						[YTITNE_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
					},
				},
				YTITNE_MODEL,
				"read",
			),
			expected_range_node_ids(suite_ctx.database_manager, YTITNE_MODEL.table_name, RANGE_SHARD_2_TO_3, "read"),
		);
		// With `where_in` on shard1 and shard3 plus a shard2-to-shard3 range, read routing should intersect the filters to shard3 only.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, set_and_range_parameters, YTITNE_MODEL, "read"), [
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard3, "read"),
		]);
		// With an exact shard1 primary key plus a shard3-to-shard4 range, read routing should return no nodes because the primary-key filters do not overlap.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, incompatible_parameters, YTITNE_MODEL, "read"),
			expected_primary_filter_node_ids(suite_ctx.database_manager, YTITNE_MODEL, incompatible_parameters, "read"),
		);
		// With write attributes and cumulative primary-key filters, write routing should use the intersected ytitne write node set.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { ...set_and_range_parameters, attributes: { text: "shard-update" } }, YTITNE_MODEL, "write"),
			expected_primary_filter_node_ids(suite_ctx.database_manager, YTITNE_MODEL, set_and_range_parameters, "write"),
		);
		// With create attributes containing a shard4 primary key, write routing should target only the ytitne write node for shard4.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { attributes: { [YTITNE_MODEL.primary_key]: PRIMARY_KEYS.shard4, text: "shard-create" } }, YTITNE_MODEL, "write"),
			[expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard4, "write")],
		);
		// With create attributes missing the primary key, write routing cannot infer a destination shard and should return no nodes.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { attributes: { text: "missing-primary-key" } }, YTITNE_MODEL, "write"), []);
	});
	await test.it("routes relationship table reads by anchors before row primary key filters", function () {
		const from_anchor_parameters = {
			where: {
				gauze__relationship__from_id: PRIMARY_KEYS.shard1,
				gauze__relationship__from_type: YTITNE_MODEL.table_name,
			},
			where_between: {
				[RELATIONSHIP_MODEL.primary_key]: RANGE_SHARD_3_TO_4,
			},
		};
		const to_anchor_parameters = {
			where: {
				gauze__relationship__to_id: PRIMARY_KEYS.shard3,
				gauze__relationship__to_type: YTITNE_MODEL.table_name,
			},
			where_between: {
				[RELATIONSHIP_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
			},
		};
		const both_anchor_parameters = {
			where: relationship_where(PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard4),
			where_between: {
				[RELATIONSHIP_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
			},
		};
		// With a relationship `from` anchor on shard1, read routing should prefer the anchor over the row primary-key range and target shard1.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, from_anchor_parameters, RELATIONSHIP_MODEL, "read"), [
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard1, "read"),
		]);
		// With a relationship `to` anchor on shard3, read routing should prefer the anchor over the row primary-key range and target shard3.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, to_anchor_parameters, RELATIONSHIP_MODEL, "read"), [
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard3, "read"),
		]);
		// With both relationship anchors and a low random value, read routing should choose the `from` anchor and target shard1.
		assert.deepStrictEqual(
			with_random(0.4, function () {
				return route_node_ids(suite_ctx.database_manager, {}, both_anchor_parameters, RELATIONSHIP_MODEL, "read");
			}),
			[expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard1, "read")],
		);
		// With both relationship anchors and a high random value, read routing should choose the `to` anchor and target shard4.
		assert.deepStrictEqual(
			with_random(0.6, function () {
				return route_node_ids(suite_ctx.database_manager, {}, both_anchor_parameters, RELATIONSHIP_MODEL, "read");
			}),
			[expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard4, "read")],
		);
		// With no relationship anchor and a row primary-key range, read routing should fall back to the overlapping relationship table read shards.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where: {},
					where_between: {
						[RELATIONSHIP_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
					},
				},
				RELATIONSHIP_MODEL,
				"read",
			),
			expected_range_node_ids(suite_ctx.database_manager, RELATIONSHIP_MODEL.table_name, RANGE_SHARD_2_TO_3, "read"),
		);
		// With no relationship anchor and row primary-key `where_in` values, read routing should fall back to the matching relationship table read shards.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where_in: {
						[RELATIONSHIP_MODEL.primary_key]: [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard4],
					},
				},
				RELATIONSHIP_MODEL,
				"read",
			),
			expected_primary_key_node_ids(suite_ctx.database_manager, RELATIONSHIP_MODEL.table_name, [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard4], "read"),
		);
	});
	await test.it("routes relationship table writes for creates and constrained deletes", function () {
		const attributes = relationship_attributes(PRIMARY_KEYS.shard2, PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard3);
		const expected_write_node_ids = [
			expected_primary_key_node_id(suite_ctx.database_manager, RELATIONSHIP_MODEL.table_name, PRIMARY_KEYS.shard2, "write"),
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard1, "write"),
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard3, "write"),
		];
		// With complete relationship create attributes, write routing should include the relationship row shard plus the `from` and `to` entity shards.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { attributes }, RELATIONSHIP_MODEL, "write"), expected_write_node_ids);
		// With only the relationship row primary key in create attributes, write routing lacks endpoint anchors and should return no nodes.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { attributes: { [RELATIONSHIP_MODEL.primary_key]: PRIMARY_KEYS.shard2 } }, RELATIONSHIP_MODEL, "write"), []);
		// With update-style parameters that include a row primary key but no endpoint anchors, write routing should return no nodes.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{ where: { [RELATIONSHIP_MODEL.primary_key]: PRIMARY_KEYS.shard2 }, attributes: { text: "ignored" } },
				RELATIONSHIP_MODEL,
				"write",
			),
			[],
		);
		// With complete relationship fields in `where`, delete routing should include the relationship row shard plus both endpoint entity shards.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { where: attributes }, RELATIONSHIP_MODEL, "write"), expected_write_node_ids);
		const constrained_delete_parameters = {
			where: attributes,
			where_between: {
				[RELATIONSHIP_MODEL.primary_key]: RANGE_SHARD_3_TO_4,
			},
		};
		// With complete delete fields constrained by a non-overlapping row primary-key range, write routing should return no nodes.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, constrained_delete_parameters, RELATIONSHIP_MODEL, "write"),
			expected_constrained_write_node_ids(suite_ctx.database_manager, RELATIONSHIP_MODEL, PRIMARY_KEYS.shard2, constrained_delete_parameters, expected_write_node_ids),
		);
		// With only a relationship row primary-key `where_in`, write routing lacks endpoint anchors and should return no nodes.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where_in: {
						[RELATIONSHIP_MODEL.primary_key]: [PRIMARY_KEYS.shard2],
					},
				},
				RELATIONSHIP_MODEL,
				"write",
			),
			[],
		);
	});
	await test.it("routes access table reads by anchors before row primary key filters", function () {
		const whitelist_fields = access_field_names(WHITELIST_MODEL);
		const blacklist_range_parameters = {
			where: {},
			where_between: {
				[BLACKLIST_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
			},
		};
		// With a whitelist entity anchor on shard1, read routing should prefer the entity anchor over the whitelist row primary-key range.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where: {
						[whitelist_fields.entity_id]: PRIMARY_KEYS.shard1,
						[whitelist_fields.entity_type]: YTITNE_MODEL.table_name,
					},
					where_between: {
						[WHITELIST_MODEL.primary_key]: RANGE_SHARD_3_TO_4,
					},
				},
				WHITELIST_MODEL,
				"read",
			),
			[expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard1, "read")],
		);
		// With a whitelist agent anchor on shard3, read routing should prefer the agent anchor over the whitelist row primary-key range.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where: {
						[whitelist_fields.agent_id]: PRIMARY_KEYS.shard3,
						[whitelist_fields.agent_type]: AGENT_ROOT_MODEL.table_name,
					},
					where_between: {
						[WHITELIST_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
					},
				},
				WHITELIST_MODEL,
				"read",
			),
			[expected_primary_key_node_id(suite_ctx.database_manager, AGENT_ROOT_MODEL.table_name, PRIMARY_KEYS.shard3, "read")],
		);
		// With no blacklist entity or agent anchor and a row primary-key range, read routing should use the overlapping blacklist read shards.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, blacklist_range_parameters, BLACKLIST_MODEL, "read"),
			expected_range_node_ids(suite_ctx.database_manager, BLACKLIST_MODEL.table_name, RANGE_SHARD_2_TO_3, "read"),
		);
		// With no whitelist entity or agent anchor and row primary-key `where_in` values, read routing should use the matching whitelist read shards.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where_in: {
						[WHITELIST_MODEL.primary_key]: [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard4],
					},
				},
				WHITELIST_MODEL,
				"read",
			),
			expected_primary_key_node_ids(suite_ctx.database_manager, WHITELIST_MODEL.table_name, [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard4], "read"),
		);
	});
	await test.it("routes access table writes for creates and constrained deletes", function () {
		const whitelist_attributes = access_attributes(WHITELIST_MODEL, PRIMARY_KEYS.shard2, PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard3);
		const blacklist_attributes = access_attributes(BLACKLIST_MODEL, PRIMARY_KEYS.shard4, PRIMARY_KEYS.shard2, PRIMARY_KEYS.shard1);
		const expected_whitelist_write_node_ids = [
			expected_primary_key_node_id(suite_ctx.database_manager, WHITELIST_MODEL.table_name, PRIMARY_KEYS.shard2, "write"),
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard1, "write"),
			expected_primary_key_node_id(suite_ctx.database_manager, AGENT_ROOT_MODEL.table_name, PRIMARY_KEYS.shard3, "write"),
		];
		const expected_blacklist_write_node_ids = [
			expected_primary_key_node_id(suite_ctx.database_manager, BLACKLIST_MODEL.table_name, PRIMARY_KEYS.shard4, "write"),
			expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard2, "write"),
			expected_primary_key_node_id(suite_ctx.database_manager, AGENT_ROOT_MODEL.table_name, PRIMARY_KEYS.shard1, "write"),
		];
		// With complete whitelist create attributes, write routing should include the whitelist row shard plus entity and agent shards.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { attributes: whitelist_attributes }, WHITELIST_MODEL, "write"), expected_whitelist_write_node_ids);
		// With complete blacklist create attributes, write routing should include the blacklist row shard plus entity and agent shards.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { attributes: blacklist_attributes }, BLACKLIST_MODEL, "write"), expected_blacklist_write_node_ids);
		// With only the whitelist row primary key in create attributes, write routing lacks entity and agent anchors and should return no nodes.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { attributes: { [WHITELIST_MODEL.primary_key]: PRIMARY_KEYS.shard2 } }, WHITELIST_MODEL, "write"), []);
		// With update-style whitelist parameters that include a row primary key but no anchors, write routing should return no nodes.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { where: { [WHITELIST_MODEL.primary_key]: PRIMARY_KEYS.shard2 }, attributes: { text: "ignored" } }, WHITELIST_MODEL, "write"),
			[],
		);
		// With complete whitelist fields in `where`, delete routing should include the whitelist row shard plus entity and agent shards.
		assert.deepStrictEqual(route_node_ids(suite_ctx.database_manager, {}, { where: whitelist_attributes }, WHITELIST_MODEL, "write"), expected_whitelist_write_node_ids);
		const constrained_delete_parameters = {
			where: whitelist_attributes,
			where_between: {
				[WHITELIST_MODEL.primary_key]: RANGE_SHARD_3_TO_4,
			},
		};
		// With complete whitelist delete fields constrained by a non-overlapping row primary-key range, write routing should return no nodes.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, constrained_delete_parameters, WHITELIST_MODEL, "write"),
			expected_constrained_write_node_ids(suite_ctx.database_manager, WHITELIST_MODEL, PRIMARY_KEYS.shard2, constrained_delete_parameters, expected_whitelist_write_node_ids),
		);
		// With only a whitelist row primary-key range on a write, routing lacks anchors and should return no nodes.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					where_between: {
						[WHITELIST_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
					},
				},
				WHITELIST_MODEL,
				"write",
			),
			[],
		);
	});
	await test.it("routes relationship traversal candidates and source variants", function () {
		const to_relationships = [
			{
				gauze__relationship__to_type: YTITNE_MODEL.table_name,
				gauze__relationship__to_id: PRIMARY_KEYS.shard1,
			},
			{
				gauze__relationship__to_type: YTITNE_MODEL.table_name,
				gauze__relationship__to_id: PRIMARY_KEYS.shard3,
			},
			{
				gauze__relationship__to_type: AGENT_ROOT_MODEL.table_name,
				gauze__relationship__to_id: PRIMARY_KEYS.shard4,
			},
		];
		const to_source = {
			_metadata: {
				type: "gauze__ytitne",
				id: PRIMARY_KEYS.shard2,
			},
			_direction: "to",
		};
		// With a `to` traversal source and relationship candidates, read routing should keep only ytitne `to` candidates on shard1 and shard3.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, { source: to_source }, {}, YTITNE_MODEL, "read", to_relationships),
			expected_primary_key_node_ids(suite_ctx.database_manager, YTITNE_MODEL.table_name, [PRIMARY_KEYS.shard1, PRIMARY_KEYS.shard3], "read"),
		);
		// With the same `to` traversal plus a shard3-to-shard4 primary-key range, read routing should intersect the candidates to shard3.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{ source: to_source },
				{
					where_between: {
						[YTITNE_MODEL.primary_key]: RANGE_SHARD_3_TO_4,
					},
				},
				YTITNE_MODEL,
				"read",
				to_relationships,
			),
			[expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard3, "read")],
		);

		const from_relationships = [
			{
				gauze__relationship__from_type: YTITNE_MODEL.table_name,
				gauze__relationship__from_id: PRIMARY_KEYS.shard2,
			},
			{
				gauze__relationship__from_type: YTITNE_MODEL.table_name,
				gauze__relationship__from_id: PRIMARY_KEYS.shard4,
			},
		];
		const from_source = {
			_metadata: {
				type: "gauze__ytitne",
				id: PRIMARY_KEYS.shard1,
			},
			_direction: "from",
		};
		// With a `from` traversal source in parameters, read routing should use the ytitne `from` candidates on shard2 and shard4.
		assert.deepStrictEqual(
			route_node_ids(suite_ctx.database_manager, {}, { source: from_source }, YTITNE_MODEL, "read", from_relationships),
			expected_primary_key_node_ids(suite_ctx.database_manager, YTITNE_MODEL.table_name, [PRIMARY_KEYS.shard2, PRIMARY_KEYS.shard4], "read"),
		);
		// With a `from` traversal plus a shard2-to-shard3 primary-key range, write routing should intersect the candidates to shard2.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{},
				{
					source: from_source,
					where_between: {
						[YTITNE_MODEL.primary_key]: RANGE_SHARD_2_TO_3,
					},
				},
				YTITNE_MODEL,
				"write",
				from_relationships,
			),
			[expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard2, "write")],
		);
		// With relationship traversal context and create attributes containing a shard4 primary key, write routing should target the new row shard.
		assert.deepStrictEqual(
			route_node_ids(
				suite_ctx.database_manager,
				{ source: to_source },
				{
					attributes: {
						[YTITNE_MODEL.primary_key]: PRIMARY_KEYS.shard4,
					},
				},
				YTITNE_MODEL,
				"write",
				to_relationships,
			),
			[expected_primary_key_node_id(suite_ctx.database_manager, YTITNE_MODEL.table_name, PRIMARY_KEYS.shard4, "write")],
		);
		// With relationship candidates but no source, routing should reject the configuration because it cannot infer traversal direction.
		assert.throws(function () {
			route_node_ids(suite_ctx.database_manager, {}, {}, YTITNE_MODEL, "read", to_relationships);
		}, /Relationship routing requires a source/);
		// With an unsupported source direction, routing should reject the configuration instead of choosing candidate shards.
		assert.throws(function () {
			route_node_ids(
				suite_ctx.database_manager,
				{
					source: {
						_metadata: {
							type: "gauze__ytitne",
							id: PRIMARY_KEYS.shard1,
						},
						_direction: "sideways",
					},
				},
				{},
				YTITNE_MODEL,
				"read",
				to_relationships,
			);
		}, /Invalid source direction/);
	});
});
