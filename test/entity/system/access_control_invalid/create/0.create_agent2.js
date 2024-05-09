const description = `Create a entity object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent2,
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
		gauze__blacklist__agent_id: agent1,
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__blacklist__method: "create",
	},
	entity: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		text: "world",
	},
};
const expected = `{
    "data": {
        "create_entity": [
            {
                "attributes": {
                    "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                    "text": "world"
                },
                "mutation": {
                    "create_blacklist": [
                        {
                            "attributes": {
                                "gauze__blacklist__realm": "system",
                                "gauze__blacklist__agent_type": "user",
                                "gauze__blacklist__agent_role": "leaf",
                                "gauze__blacklist__agent_id": "00000000-0000-0000-0000-000000000001",
                                "gauze__blacklist__entity_type": "gauze__entity",
                                "gauze__blacklist__entity_id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
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
