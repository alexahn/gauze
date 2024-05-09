const description = `Create a relationship environment`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateRelationshipEnvironment";
const operation_source = `
mutation ${operation_name}(
	$ytitne: Ytitne_Mutation__Attributes,
	$ytitne2: Ytitne_Mutation__Attributes,
	$ytitne3: Ytitne_Mutation__Attributes,
	$ytitne4: Ytitne_Mutation__Attributes,
	$ytitne_whitelist: Whitelist_Mutation__Attributes,
	$ytitne2_whitelist: Whitelist_Mutation__Attributes,
	$ytitne3_whitelist: Whitelist_Mutation__Attributes,
	$ytitne4_whitelist: Whitelist_Mutation__Attributes
) {
	create_ytitne(attributes: $ytitne) {
		_metadata {
			id
		}
		mutation {
			create_whitelist(attributes: $ytitne_whitelist) {
				_metadata {
					type
				}
			}
		}
	}
	ytitne2: create_ytitne(attributes: $ytitne2) {
		_metadata {
			id
		}
		mutation {
			create_whitelist(attributes: $ytitne2_whitelist) {
				_metadata {
					type
				}
			}
		}
	}
	ytitne3: create_ytitne(attributes: $ytitne3) {
		_metadata {
			id
		}
		mutation {
			create_whitelist(attributes: $ytitne3_whitelist) {
				_metadata {
					type
				}
			}
		}
	}
	ytitne4: create_ytitne(attributes: $ytitne4) {
		_metadata {
			id
		}
		mutation {
			create_whitelist(attributes: $ytitne4_whitelist) {
				_metadata {
					type
				}
			}
		}
	}
}
`;
const operation_variables = {
	ytitne: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		text: "hello",
	},
	ytitne2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		text: "goodbye",
	},
	ytitne3: {
		id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		text: "nothing",
	},
	ytitne4: {
		id: "45f5266f-1971-4b9a-985d-ac650449b589",
		text: "everything",
	},
	ytitne_whitelist: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "leaf",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__whitelist__method: "delete",
	},
	ytitne2_whitelist: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "leaf",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__whitelist__method: "delete",
	},
	ytitne3_whitelist: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "leaf",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__whitelist__method: "delete",
	},
	ytitne4_whitelist: {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "leaf",
		gauze__whitelist__agent_type: "gauze__user",
		gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__whitelist__entity_type: "gauze__ytitne",
		gauze__whitelist__entity_id: "45f5266f-1971-4b9a-985d-ac650449b589",
		gauze__whitelist__method: "delete",
	},
};
const expected = `{
    "data": {
        "create_ytitne": [
            {
                "_metadata": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce"
                },
                "mutation": {
                    "create_whitelist": [
                        {
                            "_metadata": {
                                "type": "WHITELIST"
                            }
                        }
                    ]
                }
            }
        ],
        "ytitne2": [
            {
                "_metadata": {
                    "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc"
                },
                "mutation": {
                    "create_whitelist": [
                        {
                            "_metadata": {
                                "type": "WHITELIST"
                            }
                        }
                    ]
                }
            }
        ],
        "ytitne3": [
            {
                "_metadata": {
                    "id": "7f84c508-b714-41c1-b986-2d6ed64fc5e9"
                },
                "mutation": {
                    "create_whitelist": [
                        {
                            "_metadata": {
                                "type": "WHITELIST"
                            }
                        }
                    ]
                }
            }
        ],
        "ytitne4": [
            {
                "_metadata": {
                    "id": "45f5266f-1971-4b9a-985d-ac650449b589"
                },
                "mutation": {
                    "create_whitelist": [
                        {
                            "_metadata": {
                                "type": "WHITELIST"
                            }
                        }
                    ]
                }
            }
        ]
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
