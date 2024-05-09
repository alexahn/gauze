const description = `Create a entity object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent1,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateEntity";
const operation_source = `
mutation ${operation_name}(
	$entity: Entity_Mutation__Attributes,
	$blacklist: Blacklist_Mutation__Attributes
) {
	create_entity(attributes: $entity) {
		attributes {
			id
			text
		}
		mutation {
			create_blacklist(attributes: $blacklist) {
				attributes {
					gauze__blacklist__realm
					gauze__blacklist__agent_type
					gauze__blacklist__agent_role
					gauze__blacklist__agent_id
					gauze__blacklist__entity_type
					gauze__blacklist__entity_id
					gauze__blacklist__method
				}
			}
		}
	}
}
`;
const operation_variables = {
	blacklist: {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_type: "user",
		gauze__blacklist__agent_role: "leaf",
		gauze__blacklist__agent_id: agent2,
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__blacklist__method: "create",
	},
	entity: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		text: "hello",
	},
};
const expected = `{
    "data": {
        "create_entity": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "hello"
                },
                "mutation": {
                    "create_blacklist": [
                        {
                            "attributes": {
                                "gauze__blacklist__realm": "system",
                                "gauze__blacklist__agent_type": "user",
                                "gauze__blacklist__agent_role": "leaf",
                                "gauze__blacklist__agent_id": "00000000-0000-0000-0000-000000000002",
                                "gauze__blacklist__entity_type": "gauze__entity",
                                "gauze__blacklist__entity_id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                                "gauze__blacklist__method": "create"
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
