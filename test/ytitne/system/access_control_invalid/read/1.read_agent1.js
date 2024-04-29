const description = `Read a ytitne object`;
const context = {
	agent_id: "1",
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
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "read_ytitne": []
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
