const description = `Create a ytitne methods environment`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateYtitneMethodsEnvironment";
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
		gauze__whitelist__id: "4f7f91fd-c4f8-4e7e-b763-4cf4199bea3d",
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__agent_user",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000001",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: null,
		gauze__whitelist__method: "create",
	},
	agent2: {
		gauze__whitelist__id: "98d3923c-7d6c-479c-9ccb-25c0d7cd532e",
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
                    "id": "4f7f91fd-c4f8-4e7e-b763-4cf4199bea3d"
                }
            }
        ],
        "agent2": [
            {
                "_metadata": {
                    "id": "98d3923c-7d6c-479c-9ccb-25c0d7cd532e"
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
