const description = `Delete a blacklist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "DeleteBlacklist";
const operation_source = `
mutation ${operation_name}(
	$where: Blacklist_Mutation__Attributes,
) {
	delete_blacklist(where: $where) {
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
`;
const operation_variables = {
	where: {
		gauze__blacklist__id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "delete_blacklist": [
            {
                "attributes": {
                    "gauze__blacklist__realm": "system",
                    "gauze__blacklist__agent_type": "gauze__agent_user",
                    "gauze__blacklist__agent_role": "trunk",
                    "gauze__blacklist__agent_id": "00000000-0000-0000-0000-000000000002",
                    "gauze__blacklist__entity_type": "gauze__entity",
                    "gauze__blacklist__entity_id": "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
                    "gauze__blacklist__method": "read"
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
