const description = `Update a ytitne object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent1,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "UpdateYtitne";
const operation_source = `
mutation ${operation_name}(
	$where: Ytitne_Mutation__Where,
	$attributes: Ytitne_Mutation__Attributes,
	$where2: Ytitne_Mutation__Where,
	$attributes2: Ytitne_Mutation__Attributes
) {
	update_ytitne(where: $where, attributes: $attributes) {
		attributes {
			id
			text
		}
		mutation {
			update_ytitne(where: $where2, attributes: $attributes2) {
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
	where: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	attributes: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		text: "world",
	},
	where2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
	attributes2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		text: "hello",
	},
};
const expected = `{
    "data": {
        "update_ytitne": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "world"
                },
                "mutation": {
                    "update_ytitne": [
                        {
                            "attributes": {
                                "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                                "text": "hello"
                            }
                        }
                    ]
                }
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
