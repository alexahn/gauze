const description = `Read deleted ytitne objects across all shards`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "ReadDeletedShardedYtitne";
const operation_source = `
query ${operation_name}($where_in: Ytitne_Query__Where_Array, $where_like: Ytitne_Query__Where) {
	fanout: read_ytitne(where_in: $where_in, order: "id", order_direction: "asc") {
		attributes {
			id
			text
		}
	}
	scan: read_ytitne(where_like: $where_like, order: "id", order_direction: "asc") {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	where_in: {
		id: ["00000000-0000-0000-0000-00000000000a", "40000000-0000-0000-0000-000000000009", "80000000-0000-0000-0000-000000000009", "c0000000-0000-0000-0000-000000000009"],
	},
	where_like: {
		text: "shard-entity-%",
	},
};
const expected = `{
    "data": {
        "fanout": [],
        "scan": []
    }
}`;

export default {
	step: 2,
	description: description,
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
