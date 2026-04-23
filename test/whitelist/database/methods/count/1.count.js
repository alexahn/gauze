const description = `Count a whitelist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountWhitelist";
const operation_source = `
query ${operation_name}(
	$where: Whitelist_Query__Where
) {
	count_whitelist(where: $where) {
		select
		count
	}
}
`;
const operation_variables = {
	where: {
		gauze__whitelist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "count_whitelist": [
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
