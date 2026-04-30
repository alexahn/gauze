const description = `Count entity objects with composite where_between`;
const operation_name = "CountEntityCompositeWhereBetween";
const operation_source = `
query ${operation_name}(
	$where_between: Entity_Query__Where_Array
	$order: [Order]
) {
	count_entity(where_between: $where_between, order: $order) {
		select
		count
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
			column: "text",
			order: "asc",
		},
		{
			column: "id",
			order: "asc",
		},
	],
};
const expected = `{
    "data": {
        "count_entity": [
            {
                "select": "count(*)",
                "count": 1
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
