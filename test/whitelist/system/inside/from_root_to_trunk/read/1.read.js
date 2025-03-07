const description = `Read a whitelist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "ReadWhitelist";
const operation_source = `
query ${operation_name}(
	$whitelist: Whitelist_Query__Where,
) {
	read_whitelist(where: $whitelist) {
		_metadata {
			id
		}
		attributes {
			gauze__whitelist__agent_id
			gauze__whitelist__agent_role
		}
	}
}
`;
const operation_variables = {
	whitelist: {
		gauze__whitelist__id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "read_whitelist": [
            {
                "_metadata": {
                    "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc"
                },
                "attributes": {
                    "gauze__whitelist__agent_id": "00000000-0000-0000-0000-000000000002",
                    "gauze__whitelist__agent_role": "trunk"
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
