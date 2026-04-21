const description = `Create an invalid ytitne access control environment`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateInvalidYtitneAccessControlEnvironment";
const operation_source = `
mutation ${operation_name}(
	$agent1: Whitelist_Mutation__Attributes,
	$agent2: Whitelist_Mutation__Attributes
) {
	agent1: create_whitelist(attributes: $agent1) {
		_metadata {
			id
		}
	}
	agent2: create_whitelist(attributes: $agent2) {
		_metadata {
			id
		}
	}
}
`;
const operation_variables = {
	agent1: {
		gauze__whitelist__id: "f33ef22c-ce18-4d8d-ac0b-fa4c0c9f7d99",
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__agent_user",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000001",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: null,
		gauze__whitelist__method: "create",
	},
	agent2: {
		gauze__whitelist__id: "85eac1fb-3b5d-429f-9c14-857afad3a3f0",
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__agent_user",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: null,
		gauze__whitelist__method: "create",
	},
};
const expected = `{
    "data": {
        "agent1": [
            {
                "_metadata": {
                    "id": "f33ef22c-ce18-4d8d-ac0b-fa4c0c9f7d99"
                }
            }
        ],
        "agent2": [
            {
                "_metadata": {
                    "id": "85eac1fb-3b5d-429f-9c14-857afad3a3f0"
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
