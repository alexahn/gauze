const description = `Create a ytitne object`;
const context = {
	agent_id: "2",
};
const operation_name = "CreateYtitne";
const operation_source = `
mutation ${operation_name}(
	$ytitne: Ytitne_Mutation__Attributes,
) {
	create_ytitne(attributes: $ytitne) {
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
		text: "world",
	},
};
const expected = `{
    "data": {
        "create_ytitne": [
            {
                "attributes": {
                    "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc",
                    "text": "world"
                }
            }
        ]
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
