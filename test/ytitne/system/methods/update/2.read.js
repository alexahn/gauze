const description = `Read a ytitne object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent_id: agent1,
};
const operation_name = "ReadYtitne";
const operation_source = `
query ${operation_name}($where: Ytitne_Query__Attributes) {
	read_ytitne(where: $where) {
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
};
const expected = `{
    "data": {
        "read_ytitne": [
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
