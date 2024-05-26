const description = `Create a ytitne object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent1,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateYtitne";
const operation_source = `
mutation ${operation_name}(
	$attributes: Ytitne_Mutation__Attributes,
	$attributes2: Ytitne_Mutation__Attributes
) {
	create_ytitne(attributes: $attributes) {
		attributes {
			id
			text
		}
		relationships_to {
			create_ytitne(attributes: $attributes2) {
				attributes {
					id
					text
				}
			}
		}
	}
}
`;
const operation_variables = {
	/*
	relationship: {
		gauze__relationship__from_id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__relationship__from_type: "gauze__ytitne",
		gauze__relationship__to_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__relationship__to_type: "gauze__ytitne",
	},
	*/
	attributes: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		text: "hello",
	},
	attributes2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		text: "world",
	},
};
const expected = `{
    "data": {
        "create_ytitne": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "hello"
                },
                "relationships_to": {
                    "create_ytitne": [
                        {
                            "attributes": {
                                "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                                "text": "world"
                            }
                        }
                    ]
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
