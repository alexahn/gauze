const description = `Create a relationship object`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000002",
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
		gauze__relationship__to_type: "gauze__entity",
		gauze__relationship__to_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "errors": [
        {
            "message": "Agent does not have access to target method",
            "locations": [
                {
                    "line": 5,
                    "column": 2
                }
            ],
            "path": [
                "create_relationship"
            ]
        }
    ],
    "data": {
        "create_relationship": null
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
