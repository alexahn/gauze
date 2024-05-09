const description = `Read a blacklist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "ReadBlacklist";
const operation_source = `
query ${operation_name}(
	$blacklist: Blacklist_Query__Attributes,
) {
	read_blacklist(where: $blacklist) {
		_metadata {
			id
		}
		attributes {
			gauze__blacklist__agent_id
			gauze__blacklist__agent_role
		}
	}
}
`;
const operation_variables = {
	blacklist: {
		gauze__blacklist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "read_blacklist": [
            {
                "_metadata": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce"
                },
                "attributes": {
                    "gauze__blacklist__agent_id": "00000000-0000-0000-0000-000000000001",
                    "gauze__blacklist__agent_role": "leaf"
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
