const description = `Read a ytitne object`;
const context = {
	agent_id: "2",
};
const operation_name = "ReadYtitne";
const operation_source = `
query ${operation_name}(
	$ytitne: Ytitne_Query__Attributes,
) {
	read_ytitne(where: $ytitne) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	ytitne: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "read_ytitne": []
    }
}`;

export default {
	step: 2,
	description: description,
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
