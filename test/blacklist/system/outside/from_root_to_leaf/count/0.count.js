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
		gauze__blacklist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "errors": [
        {
            "message": "Agent does not have access to this method",
            "locations": [
                {
                    "line": 4,
                    "column": 2
                }
            ],
            "path": [
                "count_blacklist"
            ]
        }
    ],
    "data": {
        "count_blacklist": null
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
