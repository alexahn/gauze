const description = `Delete ytitne objects across all shards with where_in`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "DeleteShardedYtitne";
const operation_source = `
mutation ${operation_name}($where_in: Ytitne_Mutation__Where_Array) {
	delete_ytitne(where_in: $where_in, order: [{column: "id", order: "asc"}]) {
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
};
const expected = `{
    "data": {
        "delete_ytitne": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-00000000000a",
                    "text": "shard-entity-1"
                }
            },
            {
                "attributes": {
                    "id": "40000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-2"
                }
            },
            {
                "attributes": {
                    "id": "80000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-3"
                }
            },
            {
                "attributes": {
                    "id": "c0000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-4"
                }
            }
        ]
    }
}`;

export default {
	step: 1,
	description: description,
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
