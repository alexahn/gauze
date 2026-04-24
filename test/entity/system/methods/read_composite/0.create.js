const description = `Create entity objects for composite where_between`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const context = {
	agent: {
		agent_id: agent1,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateEntityCompositeWhereBetween";
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
		id: "00000000-0000-0000-0000-000000000001",
		text: "hello",
	},
	attributes2: {
		id: "00000000-0000-0000-0000-000000000002",
		text: "hello",
	},
	attributes3: {
		id: "00000000-0000-0000-0000-000000000003",
		text: "hello",
	},
};
const expected = `{
    "data": {
        "first": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000001",
                    "text": "hello"
                }
            }
        ],
        "second": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000002",
                    "text": "hello"
                }
            }
        ],
        "third": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-000000000003",
                    "text": "hello"
                }
            }
        ]
    }
}`;

export default {
	step: 0,
	description: description,
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
