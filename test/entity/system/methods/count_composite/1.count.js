const description = `Count entity objects with composite where_between`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const context = {
	agent: {
		agent_id: agent1,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountEntityCompositeWhereBetween";
const operation_source = `
query ${operation_name}(
	$where_between: Entity_Query__Where_Array
) {
	count_entity(where_between: $where_between) {
		select
		count
	}
}
`;
const operation_variables = {
	where_between: {
		text: ["hello", "hello"],
		id: ["00000000-0000-0000-0000-000000000001", "00000000-0000-0000-0000-000000000002"],
	},
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
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
