const description = `Update a blacklist`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
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
		gauze__blacklist__id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
	},
	blacklist: {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_type: "gauze__agent_user",
		gauze__blacklist__agent_role: "trunk",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000003",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "45f5266f-1971-4b9a-985d-ac650449b589",
		gauze__blacklist__method: "create",
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
                "update_blacklist"
            ]
        }
    ],
    "data": {
        "update_blacklist": null
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
