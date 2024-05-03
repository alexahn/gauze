const description = `Read a blacklist`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000001",
};
const operation_name = "ReadBlacklist";
const operation_source = `
query ${operation_name}(
	$blacklist: Blacklist_Query__Attributes
) {
	read_blacklist(where: $blacklist) {
		attributes {
			gauze__blacklist__id
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
	blacklist: {
		gauze__blacklist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
};
const expected = `{
    "data": {
        "read_blacklist": []
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
