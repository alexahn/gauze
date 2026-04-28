const description = `Read entity objects with open-ended where_between`;
const operation_name = "ReadEntityOpenWhereBetween";
const operation_source = `
query ${operation_name}(
	$where: Entity_Query__Where
	$plain_lower: Entity_Query__Where_Array
	$plain_upper: Entity_Query__Where_Array
	$composite_lower: Entity_Query__Where_Array
	$composite_upper: Entity_Query__Where_Array
	$order: [Order]
) {
	plain_lower: read_entity(where: $where, where_between: $plain_lower, order: $order) {
		attributes {
			id
			text
		}
	}
	plain_upper: read_entity(where: $where, where_between: $plain_upper, order: $order) {
		attributes {
			id
			text
		}
	}
	composite_lower: read_entity(where: $where, where_between: $composite_lower, order: $order) {
		attributes {
			id
			text
		}
	}
	composite_upper: read_entity(where: $where, where_between: $composite_upper, order: $order) {
		attributes {
			id
			text
		}
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
			column: "id",
			order: "asc",
		},
	],
};
const expected = `{
    "data": {
        "plain_lower": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000102",
                    "text": "open-between"
                }
            },
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000103",
                    "text": "open-between"
                }
            }
        ],
        "plain_upper": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000101",
                    "text": "open-between"
                }
            },
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000102",
                    "text": "open-between"
                }
            }
        ],
        "composite_lower": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000102",
                    "text": "open-between"
                }
            },
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000103",
                    "text": "open-between"
                }
            }
        ],
        "composite_upper": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000101",
                    "text": "open-between"
                }
            },
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000102",
                    "text": "open-between"
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
