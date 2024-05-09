const description = `Create a ytitne object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent2,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateYtitne";
const operation_source = `
mutation ${operation_name}(
	$ytitne: Ytitne_Mutation__Attributes,
	$whitelist_read: Whitelist_Mutation__Attributes,
	$whitelist_delete: Whitelist_Mutation__Attributes
) {
	create_ytitne(attributes: $ytitne) {
		attributes {
			id
			text
		}
		mutation {
			read_whitelist: create_whitelist(attributes: $whitelist_read) {
				attributes {
					gauze__whitelist__realm
					gauze__whitelist__agent_type
					gauze__whitelist__agent_role
					gauze__whitelist__agent_id
					gauze__whitelist__entity_type
					gauze__whitelist__entity_id
					gauze__whitelist__method
				}
			}
			delete_whitelist: create_whitelist(attributes: $whitelist_delete) {
				attributes {
					gauze__whitelist__realm
					gauze__whitelist__agent_type
					gauze__whitelist__agent_role
					gauze__whitelist__agent_id
					gauze__whitelist__entity_type
					gauze__whitelist__entity_id
					gauze__whitelist__method
				}
			}
		}
	}
}
`;
const operation_variables = {
	whitelist_read: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__agent_user",
		gauze__whitelist__agent_role: "leaf",
		gauze__whitelist__agent_id: agent1,
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__whitelist__method: "read",
	},
	whitelist_delete: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__agent_user",
		gauze__whitelist__agent_role: "leaf",
		gauze__whitelist__agent_id: agent1,
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__whitelist__method: "delete",
	},
	ytitne: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		text: "world",
	},
};
const expected = `{
    "data": {
        "create_ytitne": [
            {
                "attributes": {
                    "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                    "text": "world"
                },
                "mutation": {
                    "read_whitelist": [
                        {
                            "attributes": {
                                "gauze__whitelist__realm": "system",
                                "gauze__whitelist__agent_type": "gauze__agent_user",
                                "gauze__whitelist__agent_role": "leaf",
                                "gauze__whitelist__agent_id": "00000000-0000-0000-0000-000000000001",
                                "gauze__whitelist__entity_type": "gauze__ytitne",
                                "gauze__whitelist__entity_id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                                "gauze__whitelist__method": "read"
                            }
                        }
                    ],
                    "delete_whitelist": [
                        {
                            "attributes": {
                                "gauze__whitelist__realm": "system",
                                "gauze__whitelist__agent_type": "gauze__agent_user",
                                "gauze__whitelist__agent_role": "leaf",
                                "gauze__whitelist__agent_id": "00000000-0000-0000-0000-000000000001",
                                "gauze__whitelist__entity_type": "gauze__ytitne",
                                "gauze__whitelist__entity_id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                                "gauze__whitelist__method": "delete"
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
