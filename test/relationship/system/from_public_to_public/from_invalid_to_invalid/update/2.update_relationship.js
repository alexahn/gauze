const description = `Update a relationship object`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000002",
};
const operation_name = "UpdateRelationship";
const operation_source = `
mutation ${operation_name}(
	$where: Relationship_Mutation__Attributes,
	$relationship: Relationship_Mutation__Attributes,
) {
	update_relationship(where: $where, attributes: $relationship) {
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
		gauze__relationship__id: "ad0007d2-9c8f-4c97-92b6-f48e393b00c9",
	},
	relationship: {
		gauze__relationship__from_type: "gauze__entity",
		gauze__relationship__from_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__relationship__to_type: "gauze__entity",
		gauze__relationship__to_id: "45f5266f-1971-4b9a-985d-ac650449b589",
	},
};
const expected = `{
    "errors": [
        {
            "message": "Agent does not have access to target method",
            "locations": [
                {
                    "line": 6,
                    "column": 2
                }
            ],
            "path": [
                "update_relationship"
            ]
        }
    ],
    "data": {
        "update_relationship": null
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
