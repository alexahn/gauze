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
	$blacklist: Blacklist_Query__Where,
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
		gauze__blacklist__id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "read_blacklist": [
            {
                "_metadata": {
                    "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc"
                },
                "attributes": {
                    "gauze__blacklist__agent_id": "00000000-0000-0000-0000-000000000002",
                    "gauze__blacklist__agent_role": "leaf"
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
