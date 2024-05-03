const description = `Create a blacklist environment`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000001",
};
const operation_name = "CreateBlacklistEnvironment";
const operation_source = `
mutation ${operation_name}(
	$blacklist: Blacklist_Mutation__Attributes
) {
	create_blacklist(attributes: $blacklist) {
		_metadata {
			id
		}
	}
}
`;
const operation_variables = {
	blacklist: {
		gauze__blacklist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_type: "gauze__user",
		gauze__blacklist__agent_role: "leaf",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000001",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__blacklist__method: "read",
	},
};
const expected = `{
    "data": {
        "create_blacklist": [
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
