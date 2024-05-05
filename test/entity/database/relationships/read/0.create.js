const description = `Create a entity object`;
const operation_name = "CreateEntity";
const operation_source = `
mutation ${operation_name}(
	$relationship: Relationship_Mutation__Attributes
	$attributes: Entity_Mutation__Attributes,
	$attributes2: Entity_Mutation__Attributes
) {
	create_relationship(attributes: $relationship) {
		mutation {
			create_entity(attributes: $attributes) {
				attributes {
					id
					text
				}
				relationships {
					create_entity(attributes: $attributes2) {
						attributes {
							id
							text
						}
					}
				}
			}
		}
	}
}
`;
const operation_variables = {
	relationship: {
		gauze__relationship__from_id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__relationship__from_type: "gauze__entity",
		gauze__relationship__to_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__relationship__to_type: "gauze__entity",
	},
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
        "create_relationship": [
            {
                "mutation": {
                    "create_entity": [
                        {
                            "attributes": {
                                "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                                "text": "hello"
                            },
                            "relationships": {
                                "create_entity": [
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
