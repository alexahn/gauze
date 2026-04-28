const description = `Delete only the selected ytitne object with limit and offset`;
const operation_name = "DeleteLimitedYtitne";
const operation_source = `
mutation ${operation_name}(
	$where_in: Ytitne_Mutation__Where_Array,
	$where_like: Ytitne_Mutation__Where,
	$limit: Int,
	$offset: Int
) {
	delete_ytitne(
		where_in: $where_in,
		where_like: $where_like,
		limit: $limit,
		offset: $offset,
		order: [{column: "id", order: "asc"}]
	) {
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
	where_like: {
		text: "limit-delete-%",
	},
	limit: 1,
	offset: 1,
};
const expected = `{
    "data": {
        "delete_ytitne": [
            {
                "attributes": {
                    "id": "20000000-0000-0000-0000-000000000002",
                    "text": "limit-delete-two"
                }
            }
        ]
    }
}`;

export default {
	step: 4,
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
