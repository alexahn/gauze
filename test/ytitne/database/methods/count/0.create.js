const description = `Create a ytitne object`;
const operation_name = "CreateYtitne";
const operation_source = `
mutation ${operation_name}($attributes: Ytitne_Mutation__Attributes) {
	create_ytitne(attributes: $attributes) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	attributes: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		text: "hello",
	},
};
const expected = `{
    "data": {
        "create_ytitne": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "hello"
                }
            }
        ]
    }
}`;

export default {
	step: 0,
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
