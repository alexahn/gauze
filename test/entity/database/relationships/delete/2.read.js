const description = `Read a entity object`;
const operation_name = "ReadEntity";
const operation_source = `
query ${operation_name}($where: Entity_Query__Attributes, $where2: Entity_Query__Attributes) {
	read_entity(where: $where) {
		attributes {
			id
			text
		}
	}
	read_entity2: read_entity(where: $where2) {
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
	where2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "read_entity": [],
        "read_entity2": [
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
