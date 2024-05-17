const description = `Update a ytitne object`;
const operation_name = "UpdateYtitne";
const operation_source = `
mutation ${operation_name}($where: Ytitne_Mutation__Where, $attributes: Ytitne_Mutation__Attributes) {
	update_ytitne(where: $where, attributes: $attributes) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	where: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	attributes: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		text: "world",
	},
};
const expected = `{
    "data": {
        "update_ytitne": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "world"
                }
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
