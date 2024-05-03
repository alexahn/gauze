const description = `Update a blacklist`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000001",
};
const operation_name = "UpdateBlacklist";
const operation_source = `
mutation ${operation_name}(
	$where: Blacklist_Mutation__Attributes,
	$blacklist: Blacklist_Mutation__Attributes,
) {
	update_blacklist(where: $where, attributes: $blacklist) {
		_metadata {
			id
		}
		attributes {
			gauze__blacklist__realm
			gauze__blacklist__agent_type
			gauze__blacklist__agent_role
			gauze__blacklist__agent_id
			gauze__blacklist__entity_type
			gauze__blacklist__entity_id
			gauze__blacklist__method
		}
	}
}
`;
const operation_variables = {
	where: {
		gauze__blacklist__id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
	},
	blacklist: {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_type: "gauze__user",
		gauze__blacklist__agent_role: "trunk",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000003",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "45f5266f-1971-4b9a-985d-ac650449b589",
		gauze__blacklist__method: "create",
	},
};
const expected = `{
    "data": {
        "update_blacklist": []
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
