const description = `Read a relationship object`;
const operation_name = "ReadRelationship";
const operation_source = `
query ${operation_name}($where: Relationship_Query__Where) {
	read_relationship(where: $where) {
		attributes {
			gauze__relationship__id
			gauze__relationship__from_type
			gauze__relationship__from_id
			gauze__relationship__to_type
			gauze__relationship__to_id
		}
	}
}
`;
const operation_variables = {
	where: {
		gauze__relationship__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "read_relationship": []
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
