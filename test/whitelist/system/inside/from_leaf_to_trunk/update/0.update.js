const description = `Update a whitelist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "UpdateWhitelist";
const operation_source = `
mutation ${operation_name}(
	$where: Whitelist_Mutation__Attributes,
	$whitelist: Whitelist_Mutation__Attributes,
) {
	update_whitelist(where: $where, attributes: $whitelist) {
		_metadata {
			id
		}
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
		gauze__whitelist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	whitelist: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_role: "trunk",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000003",
		gauze__whitelist__entity_type: "gauze__entity",
		gauze__whitelist__entity_id: "45f5266f-1971-4b9a-985d-ac650449b589",
		gauze__whitelist__method: "create",
	},
};
const expected = `{
    "errors": [
        {
            "message": "Target agent does not have access to this method",
            "locations": [
                {
                    "line": 6,
                    "column": 2
                }
            ],
            "path": [
                "update_whitelist"
            ]
        }
    ],
    "data": {
        "update_whitelist": null
    }
}`;

export default {
	step: 0,
	description: description,
	context: context,
	operation: {
		name: operation_name,
		source: operation_source,
		variables: operation_variables,
	},
	expected: expected,
};
