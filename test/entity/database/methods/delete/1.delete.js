const description = `Delete a entity object`;
const operation_name = "DeleteEntity";
const operation_source = `
mutation ${operation_name}(
	$where: Entity_Mutation__Where
) {
	delete_entity(where: $where) {
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
        "delete_entity": [
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
