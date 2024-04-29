const description = `Update a ytitne object`;
const context = {
	agent_id: "2",
};
const operation_name = "UpdateYtitne";
const operation_source = `
mutation ${operation_name}(
	$where: Ytitne_Mutation__Attributes,
	$ytitne: Ytitne_Mutation__Attributes,
) {
	update_ytitne(where: $where, attributes: $ytitne) {
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
	ytitne: {
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
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
