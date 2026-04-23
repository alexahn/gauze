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
		gauze__whitelist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
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
                "count_whitelist"
            ]
        }
    ],
    "data": {
        "count_whitelist": null
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
