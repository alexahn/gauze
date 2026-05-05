const description = `Read a whitelist with a caller where_in filter`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "ReadWhitelistWithWhereIn";
const operation_source = `
query ${operation_name}(
	$whitelist: Whitelist_Query__Where,
	$whitelist_ids: Whitelist_Query__Where_Array,
) {
	read_whitelist(where: $whitelist, where_in: $whitelist_ids) {
		_metadata {
			id
		}
		attributes {
			gauze__whitelist__agent_id
			gauze__whitelist__agent_role
		}
	}
}
`;
const operation_variables = {
	whitelist: {
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__whitelist__method: "read",
	},
	whitelist_ids: {
		gauze__whitelist__id: ["00000000-0000-0000-0000-000000000000"],
	},
};
const expected = `{
    "data": {
        "read_whitelist": []
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
