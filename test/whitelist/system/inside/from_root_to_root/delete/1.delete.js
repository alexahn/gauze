const description = `Delete a whitelist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "DeleteWhitelist";
const operation_source = `
mutation ${operation_name}(
	$where: Whitelist_Mutation__Where,
) {
	delete_whitelist(where: $where) {
		attributes {
			gauze__whitelist__realm
			gauze__whitelist__agent_type
			gauze__whitelist__agent_role
			gauze__whitelist__agent_id
			gauze__whitelist__entity_type
			gauze__whitelist__entity_id
			gauze__whitelist__method
		}
	}
}
`;
const operation_variables = {
	where: {
		gauze__whitelist__id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
};
const expected = `{
    "data": {
        "delete_whitelist": []
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
