const description = `Count a ytitne object`;
const operation_name = "CountYtitne";
const operation_source = `
query ${operation_name}(
	$where: Ytitne_Query__Where
) {
	count_ytitne(where: $where) {
		select
		count
	}
}
`;
const operation_variables = {
	where: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "count_ytitne": [
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
	context: {
		agent_id: "1",
	},
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
