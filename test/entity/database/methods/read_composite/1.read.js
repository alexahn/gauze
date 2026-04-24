const description = `Read entity objects with composite where_between`;
const operation_name = "ReadEntityCompositeWhereBetween";
const operation_source = `
query ${operation_name}(
	$where_between: Entity_Query__Where_Array
	$order: [Order]
) {
	read_entity(where_between: $where_between, order: $order) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	where_between: {
		text: ["hello", "hello"],
		id: ["00000000-0000-0000-0000-000000000001", "00000000-0000-0000-0000-000000000003"],
	},
	order: [
		{
			column: "id",
			order: "asc",
		},
	],
};
const expected = `{
    "data": {
        "read_entity": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000002",
                    "text": "hello"
                }
            }
        ]
    }
}`;

export default {
	step: 1,
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
