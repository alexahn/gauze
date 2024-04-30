const description = `Delete a ytitne object`;
const context = {
	agent_id: "1",
};
const operation_name = "DeleteYtitne";
const operation_source = `
mutation ${operation_name}(
	$where: Ytitne_Mutation__Attributes,
) {
	delete_ytitne(where: $where) {
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
};
const expected = `{
    "data": {
        "delete_ytitne": []
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
