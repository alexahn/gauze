const description = `Update a ytitne object`;
const agent1 = "00000000-0000-0000-0000-000000000001";
const agent2 = "00000000-0000-0000-0000-000000000002";
const context = {
	agent: {
		agent_id: agent2,
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "UpdateYtitne";
const operation_source = `
mutation ${operation_name}(
	$where: Ytitne_Mutation__Attributes,
	$ytitne: Ytitne_Mutation__Attributes,
) {
	update_ytitne(where: $where, attributes: $ytitne) {
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
	ytitne: {
		text: "world",
	},
};
const expected = `{
    "data": {
        "update_ytitne": []
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
