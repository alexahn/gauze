const description = `Update a entity object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent_id: agent2,
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
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	entity: {
		text: "world",
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
