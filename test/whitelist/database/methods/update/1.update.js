const description = `Update a whitelist`;
const context = {
	agent_id: "00000000-0000-0000-0000-000000000001",
};
const operation_name = "UpdateWhitelist";
const operation_source = `
mutation ${operation_name}(
	$where: Whitelist_Mutation__Attributes
	$whitelist: Whitelist_Mutation__Attributes
) {
	update_whitelist(where: $where, attributes: $whitelist) {
		attributes {
			gauze__whitelist__id
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
		gauze__whitelist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	whitelist: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_role: "trunk",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__whitelist__entity_type: "gauze__entity",
		gauze__whitelist__entity_id: "bbcb337c-08b6-4903-9f2a-638155c82a57",
		gauze__whitelist__method: "create",
	},
};
const expected = `{
    "data": {
        "update_whitelist": [
            {
                "attributes": {
                    "gauze__whitelist__id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
                    "gauze__whitelist__realm": "system",
                    "gauze__whitelist__agent_type": "gauze__user",
                    "gauze__whitelist__agent_role": "trunk",
                    "gauze__whitelist__agent_id": "00000000-0000-0000-0000-000000000002",
                    "gauze__whitelist__entity_type": "gauze__ytitne",
                    "gauze__whitelist__entity_id": "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
                    "gauze__whitelist__method": "read"
                }
            }
        ]
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
