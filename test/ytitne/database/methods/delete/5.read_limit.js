const description = `Read ytitne objects after limited delete`;
const operation_name = "ReadLimitedDeletedYtitne";
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
		id: ["20000000-0000-0000-0000-000000000001", "20000000-0000-0000-0000-000000000002", "20000000-0000-0000-0000-000000000003"],
	},
};
const expected = `{
    "data": {
        "read_ytitne": [
            {
                "attributes": {
                    "id": "20000000-0000-0000-0000-000000000001",
                    "text": "limit-delete-one"
                }
            },
            {
                "attributes": {
                    "id": "20000000-0000-0000-0000-000000000003",
                    "text": "limit-delete-three"
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
