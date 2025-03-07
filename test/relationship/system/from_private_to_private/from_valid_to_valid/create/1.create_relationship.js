const description = `Create a relationship object`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000002",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateRelationship";
const operation_source = `
mutation ${operation_name}(
	$relationship: Relationship_Mutation__Attributes,
) {
	create_relationship(attributes: $relationship) {
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
	relationship: {
		gauze__relationship__id: "ad0007d2-9c8f-4c97-92b6-f48e393b00c9",
		gauze__relationship__from_type: "gauze__ytitne",
		gauze__relationship__from_id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__relationship__to_type: "gauze__ytitne",
		gauze__relationship__to_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "create_relationship": [
            {
                "attributes": {
                    "gauze__relationship__id": "ad0007d2-9c8f-4c97-92b6-f48e393b00c9",
                    "gauze__relationship__from_type": "gauze__ytitne",
                    "gauze__relationship__from_id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "gauze__relationship__to_type": "gauze__ytitne",
                    "gauze__relationship__to_id": "55c29b50-5e24-447d-8505-75e82c2aa8cc"
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
