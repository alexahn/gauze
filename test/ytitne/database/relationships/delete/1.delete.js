const description = `Delete a ytitne object`;
const operation_name = "DeleteYtitne";
const operation_source = `
mutation ${operation_name}($where: Ytitne_Mutation__Attributes, $where2: Ytitne_Mutation__Attributes) {
	delete_ytitne(where: $where) {
		attributes {
			id
			text
		}
		relationships {
			delete_ytitne(where: $where2) {
				attributes {
					id
					text
				}
			}
		}
	}
}
`;
const operation_variables = {
	where: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	where2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "delete_ytitne": [
            {
                "attributes": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "text": "hello"
                },
                "relationships": {
                    "delete_ytitne": []
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
