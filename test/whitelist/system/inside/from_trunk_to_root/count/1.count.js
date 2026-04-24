const description = `Count a whitelist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountWhitelist";
const operation_source = `query CountWhitelist(
	$whitelist: Whitelist_Query__Where,
) {
	count_whitelist(where: $whitelist) {
		select
		count
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
        "count_whitelist": [
            {
                "select": "count(*)",
                "count": 0
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
