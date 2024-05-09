const description = `Create a whitelist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateWhitelist";
const operation_source = `
mutation ${operation_name}(
	$whitelist: Whitelist_Mutation__Attributes,
) {
	create_whitelist(attributes: $whitelist) {
		attributes {
			gauze__whitelist__id
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
`;
const operation_variables = {
	whitelist: {
		gauze__whitelist__id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_role: "leaf",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__whitelist__method: "read",
	},
};
const expected = `{
    "data": {
        "create_whitelist": [
            {
                "attributes": {
                    "gauze__whitelist__id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                    "gauze__whitelist__realm": "system",
                    "gauze__whitelist__agent_type": "gauze__user",
                    "gauze__whitelist__agent_role": "leaf",
                    "gauze__whitelist__agent_id": "00000000-0000-0000-0000-000000000002",
                    "gauze__whitelist__entity_type": "gauze__ytitne",
                    "gauze__whitelist__entity_id": "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
                    "gauze__whitelist__method": "read"
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
