const description = `Update a entity object`;
const operation_name = "UpdateEntity";
const operation_source = `
mutation ${operation_name}(
	$where: Entity_Mutation__Attributes,
	$attributes: Entity_Mutation__Attributes,
	$where2: Entity_Mutation__Attributes,
	$attributes2: Entity_Mutation__Attributes
) {
	update_entity(where: $where, attributes: $attributes) {
		attributes {
			id
			text
		}
		mutation {
			update_entity(where: $where2, attributes: $attributes2) {
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
        "update_entity": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "world"
                },
                "mutation": {
                    "update_entity": [
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
