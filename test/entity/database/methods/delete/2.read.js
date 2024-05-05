const description = `Read a entity object`;
const operation_name = "ReadEntity";
const operation_source = `
query ${operation_name}($where: Entity_Query__Attributes) {
	read_entity(where: $where) {
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
        "read_entity": []
    }
}`;

export default {
	step: 2,
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
