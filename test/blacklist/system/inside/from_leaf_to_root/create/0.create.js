const description = `Create a blacklist`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000001",
};
const operation_name = "CreateBlacklist";
const operation_source = `
mutation ${operation_name}(
	$blacklist: Blacklist_Mutation__Attributes,
) {
	create_blacklist(attributes: $blacklist) {
		attributes {
			gauze__blacklist__id
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
	blacklist: {
		gauze__blacklist__id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_type: "gauze__user",
		gauze__blacklist__agent_role: "root",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__blacklist__method: "read",
	},
};
const expected = `{
    "errors": [
        {
            "message": "Target agent's role cannot be higher than initiator's role",
            "locations": [
                {
                    "line": 5,
                    "column": 2
                }
            ],
            "path": [
                "create_blacklist"
            ]
        }
    ],
    "data": {
        "create_blacklist": null
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
