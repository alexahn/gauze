const description = `Read ytitne objects after limited update`;
const operation_name = "ReadLimitedUpdatedYtitne";
const operation_source = `
query ${operation_name}($where_in: Ytitne_Query__Where_Array) {
	read_ytitne(where_in: $where_in, order: [{column: "id", order: "asc"}]) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	where_in: {
		id: ["10000000-0000-0000-0000-000000000001", "10000000-0000-0000-0000-000000000002", "10000000-0000-0000-0000-000000000003"],
	},
};
const expected = `{
    "data": {
        "read_ytitne": [
            {
                "attributes": {
                    "id": "10000000-0000-0000-0000-000000000001",
                    "text": "limit-update-one"
                }
            },
            {
                "attributes": {
                    "id": "10000000-0000-0000-0000-000000000002",
                    "text": "limit-update-selected"
                }
            },
            {
                "attributes": {
                    "id": "10000000-0000-0000-0000-000000000003",
                    "text": "limit-update-three"
                }
            }
        ]
    }
}`;

export default {
	step: 5,
	description: description,
	context: {
		agent_id: "1",
	},
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
