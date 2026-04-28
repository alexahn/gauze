const description = `Create entity objects for open-ended where_between`;
const operation_name = "CreateEntityOpenWhereBetween";
const operation_source = `
mutation ${operation_name}(
	$attributes1: Entity_Mutation__Attributes
	$attributes2: Entity_Mutation__Attributes
	$attributes3: Entity_Mutation__Attributes
) {
	first: create_entity(attributes: $attributes1) {
		attributes {
			id
			text
		}
	}
	second: create_entity(attributes: $attributes2) {
		attributes {
			id
			text
		}
	}
	third: create_entity(attributes: $attributes3) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	attributes1: {
		id: "00000000-0000-0000-0000-000000000101",
		text: "open-between",
	},
	attributes2: {
		id: "00000000-0000-0000-0000-000000000102",
		text: "open-between",
	},
	attributes3: {
		id: "00000000-0000-0000-0000-000000000103",
		text: "open-between",
	},
};
const expected = `{
    "data": {
        "first": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000101",
                    "text": "open-between"
                }
            }
        ],
        "second": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000102",
                    "text": "open-between"
                }
            }
        ],
        "third": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000103",
                    "text": "open-between"
                }
            }
        ]
    }
}`;

export default {
	step: 0,
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
