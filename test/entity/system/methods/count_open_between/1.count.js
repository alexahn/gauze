const description = `Count entity objects with open-ended where_between`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const context = {
	agent: {
		agent_id: agent1,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountEntityOpenWhereBetween";
const operation_source = `
query ${operation_name}(
	$where: Entity_Query__Where
	$plain_lower: Entity_Query__Where_Array
	$plain_upper: Entity_Query__Where_Array
	$composite_lower: Entity_Query__Where_Array
	$composite_upper: Entity_Query__Where_Array
	$order: [Order]
) {
	plain_lower: count_entity(where: $where, where_between: $plain_lower) {
		select
		count
	}
	plain_upper: count_entity(where: $where, where_between: $plain_upper) {
		select
		count
	}
	composite_lower: count_entity(where: $where, where_between: $composite_lower, order: $order) {
		select
		count
	}
	composite_upper: count_entity(where: $where, where_between: $composite_upper, order: $order) {
		select
		count
	}
}
`;
const operation_variables = {
	where: {
		text: "open-between",
	},
	plain_lower: {
		id: ["00000000-0000-0000-0000-000000000102", null],
	},
	plain_upper: {
		id: [null, "00000000-0000-0000-0000-000000000102"],
	},
	composite_lower: {
		text: ["open-between", null],
		id: ["00000000-0000-0000-0000-000000000101", null],
	},
	composite_upper: {
		text: [null, "open-between"],
		id: [null, "00000000-0000-0000-0000-000000000103"],
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
        "plain_lower": [
            {
                "select": "count(*)",
                "count": 2
            }
        ],
        "plain_upper": [
            {
                "select": "count(*)",
                "count": 2
            }
        ],
        "composite_lower": [
            {
                "select": "count(*)",
                "count": 2
            }
        ],
        "composite_upper": [
            {
                "select": "count(*)",
                "count": 2
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
