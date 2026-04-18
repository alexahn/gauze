const description = `Create a entity object`;
const operation_name = "CreateEntity";
const operation_source = `
mutation ${operation_name}($attributes: Entity_Mutation__Attributes) {
	create_entity(attributes: $attributes) {
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
        "create_entity": [
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
