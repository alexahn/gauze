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
	$whitelist: Whitelist_Query__Attributes,
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
		gauze__whitelist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "errors": [
        {
            "message": "Agent does not have access to this method",
            "locations": [
                {
                    "line": 5,
                    "column": 2
                }
            ],
            "path": [
                "read_whitelist"
            ]
        }
    ],
    "data": {
        "read_whitelist": null
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
