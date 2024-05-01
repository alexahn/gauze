const description = `Read a relationship object`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000001",
};
const operation_name = "ReadRelationship";
const operation_source = `
query ${operation_name}(
	$relationship: Relationship_Query__Attributes,
) {
	read_relationship(where: $relationship) {
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
	},
};
const expected = `{
    "data": {
        "read_relationship": []
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
