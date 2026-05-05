const description = `Count a relationship object with a caller where_in filter`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000002",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CountRelationshipWithWhereIn";
const operation_source = `
query ${operation_name}(
	$relationship: Relationship_Query__Where,
	$relationship_ids: Relationship_Query__Where_Array,
) {
	count_relationship(where: $relationship, where_in: $relationship_ids) {
		select
		count
	}
}
`;
const operation_variables = {
	relationship: {
		gauze__relationship__from_type: "gauze__entity",
		gauze__relationship__from_id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	relationship_ids: {
		gauze__relationship__id: ["00000000-0000-0000-0000-000000000000"],
	},
};
const expected = `{
    "data": {
        "count_relationship": [
            {
                "select": "count(*)",
                "count": 0
            }
        ]
    }
}`;

export default {
	step: 3,
	description: description,
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
