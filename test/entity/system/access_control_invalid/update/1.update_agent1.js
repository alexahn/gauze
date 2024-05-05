const description = `Update a entity object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent_id: agent1,
};
const operation_name = "UpdateEntity";
const operation_source = `
mutation ${operation_name}(
	$where: Entity_Mutation__Attributes,
	$entity: Entity_Mutation__Attributes,
) {
	update_entity(where: $where, attributes: $entity) {
		attributes {
			id
			text
		}
	}
}
`;
const operation_variables = {
	where: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
	entity: {
		text: "hello",
	},
};
const expected = `{
    "data": {
        "update_entity": []
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
