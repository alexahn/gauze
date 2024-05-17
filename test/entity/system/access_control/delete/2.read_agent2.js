const description = `Read a entity object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent2,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "ReadEntity";
const operation_source = `
query ${operation_name}(
	$entity: Entity_Query__Where,
) {
	read_entity(where: $entity) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	entity: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "read_entity": []
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
