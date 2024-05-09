const description = `Delete a entity object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent1,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "DeleteEntity";
const operation_source = `
mutation ${operation_name}($where: Entity_Mutation__Attributes, $where2: Entity_Mutation__Attributes) {
	delete_entity(where: $where) {
		attributes {
			id
			text
		}
		relationships {
			delete_entity(where: $where2) {
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
	where2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "delete_entity": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "hello"
                },
                "relationships": {
                    "delete_entity": []
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
