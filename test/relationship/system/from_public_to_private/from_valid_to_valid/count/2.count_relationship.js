const description = `Count a relationship object`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000002",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountRelationship";
const operation_source = `
query ${operation_name}(
	$relationship: Relationship_Query__Where,
) {
	count_relationship(where: $relationship) {
		select
		count
	}
}
`;
const operation_variables = {
	relationship: {
		gauze__relationship__id: "ad0007d2-9c8f-4c97-92b6-f48e393b00c9",
	},
};
const expected = `{
    "data": {
        "count_relationship": [
            {
                "select": "count(*)",
                "count": 1
            }
        ]
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
