const description = `Update a relationship object`;
const operation_name = "UpdateRelationship";
const operation_source = `
mutation ${operation_name}($where: Relationship_Mutation__Attributes, $attributes: Relationship_Mutation__Attributes) {
	update_relationship(where: $where, attributes: $attributes) {
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
	attributes: {
		gauze__relationship__from_type: "gauze__entity",
		gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
	},
};
const expected = `{
    "data": {
        "update_relationship": [
            {
                "attributes": {
                    "gauze__relationship__id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "gauze__relationship__from_type": "gauze__entity",
                    "gauze__relationship__from_id": "00000000-0000-0000-0000-000000000001",
                    "gauze__relationship__to_type": "gauze__ytitne",
                    "gauze__relationship__to_id": "00000000-0000-0000-0000-000000000004"
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
