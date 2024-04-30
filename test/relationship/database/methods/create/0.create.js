const description = `Create a relationship object`;
const operation_name = "CreateRelationship";
const operation_source = `
mutation ${operation_name}($attributes: Relationship_Mutation__Attributes) {
	create_relationship(attributes: $attributes) {
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
	attributes: {
		gauze__relationship__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__relationship__from_type: "gauze__ytitne",
		gauze__relationship__from_id: "00000000-0000-0000-0000-000000000004",
		gauze__relationship__to_type: "gauze__ytitne",
		gauze__relationship__to_id: "00000000-0000-0000-0000-000000000004",
	},
};
const expected = `{
    "data": {
        "create_relationship": [
            {
                "attributes": {
                    "gauze__relationship__id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "gauze__relationship__from_type": "gauze__ytitne",
                    "gauze__relationship__from_id": "00000000-0000-0000-0000-000000000004",
                    "gauze__relationship__to_type": "gauze__ytitne",
                    "gauze__relationship__to_id": "00000000-0000-0000-0000-000000000004"
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
