const description = `Count a blacklist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountBlacklist";
const operation_source = `query CountBlacklist(
	$blacklist: Blacklist_Query__Where,
) {
	count_blacklist(where: $blacklist) {
		select
		count
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
        "count_blacklist": [
            {
                "select": "b55c1f0fb7b44454d6186e16409262a1dc53a27f52c996c64bc56bff53dd7f8e",
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
