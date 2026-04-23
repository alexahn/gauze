const description = `Count a blacklist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountBlacklist";
const operation_source = `
query ${operation_name}(
	$where: Blacklist_Query__Where
) {
	count_blacklist(where: $where) {
		select
		count
	}
}
`;
const operation_variables = {
	where: {
		gauze__blacklist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "count_blacklist": [
            {
                "select": "count(*)",
                "count": 1
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
