const description = `Update only the selected ytitne object with limit and offset`;
const operation_name = "UpdateLimitedYtitne";
const operation_source = `
mutation ${operation_name}(
	$where_in: Ytitne_Mutation__Where_Array,
	$where_like: Ytitne_Mutation__Where,
	$attributes: Ytitne_Mutation__Attributes,
	$limit: Int,
	$offset: Int
) {
	update_ytitne(
		where_in: $where_in,
		where_like: $where_like,
		attributes: $attributes,
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
		id: ["10000000-0000-0000-0000-000000000001", "10000000-0000-0000-0000-000000000002", "10000000-0000-0000-0000-000000000003"],
	},
	where_like: {
		text: "limit-update-%",
	},
	attributes: {
		text: "limit-update-selected",
	},
	limit: 1,
	offset: 1,
};
const expected = `{
    "data": {
        "update_ytitne": [
            {
                "attributes": {
                    "id": "10000000-0000-0000-0000-000000000002",
                    "text": "limit-update-selected"
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
