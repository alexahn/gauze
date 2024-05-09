const description = `Delete a relationship object`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000002",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "DeleteRelationship";
const operation_source = `
mutation ${operation_name}(
	$where: Relationship_Mutation__Attributes,
) {
	delete_relationship(where: $where) {
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
                "delete_relationship"
            ]
        }
    ],
    "data": {
        "delete_relationship": null
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
