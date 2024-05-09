const description = `Create a whitelist environment`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateWhitelistEnvironment";
const operation_source = `
mutation ${operation_name}(
	$whitelist: Whitelist_Mutation__Attributes
) {
	create_whitelist(attributes: $whitelist) {
		_metadata {
			id
		}
	}
}
`;
const operation_variables = {
	whitelist: {
		gauze__whitelist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000001",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__whitelist__method: "read",
	},
};
const expected = `{
    "data": {
        "create_whitelist": [
            {
                "_metadata": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce"
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
