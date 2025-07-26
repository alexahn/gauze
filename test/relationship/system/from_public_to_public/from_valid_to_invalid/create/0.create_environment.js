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
	$entity: Entity_Mutation__Attributes,
	$entity2: Entity_Mutation__Attributes,
	$entity3: Entity_Mutation__Attributes,
	$entity4: Entity_Mutation__Attributes,
	$entity_blacklist: Blacklist_Mutation__Attributes,
	$entity2_blacklist: Blacklist_Mutation__Attributes,
	$entity3_blacklist: Blacklist_Mutation__Attributes,
	$entity4_blacklist: Blacklist_Mutation__Attributes
) {
	create_entity(attributes: $entity) {
		_metadata {
			id
		}
		mutation {
			create_blacklist(attributes: $entity_blacklist) {
				_metadata {
					type
				}
			}
		}
	}
	entity2: create_entity(attributes: $entity2) {
		_metadata {
			id
		}
		mutation {
			create_blacklist(attributes: $entity2_blacklist) {
				_metadata {
					type
				}
			}
		}
	}
	entity3: create_entity(attributes: $entity3) {
		_metadata {
			id
		}
		mutation {
			create_blacklist(attributes: $entity3_blacklist) {
				_metadata {
					type
				}
			}
		}
	}
	entity4: create_entity(attributes: $entity4) {
		_metadata {
			id
		}
		mutation {
			create_blacklist(attributes: $entity4_blacklist) {
				_metadata {
					type
				}
			}
		}
	}
}
`;
const operation_variables = {
	entity: {
		id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		text: "hello",
	},
	entity2: {
		id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		text: "goodbye",
	},
	entity3: {
		id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		text: "nothing",
	},
	entity4: {
		id: "45f5266f-1971-4b9a-985d-ac650449b589",
		text: "everything",
	},
	entity_blacklist: {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "leaf",
		gauze__blacklist__agent_type: "gauze__agent_user",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000003",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "3ab515f4-5391-4af9-a2c9-a7119ad262ce",
		gauze__blacklist__method: "create",
	},
	entity2_blacklist: {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "leaf",
		gauze__blacklist__agent_type: "gauze__agent_user",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "55c29b50-5e24-447d-8505-75e82c2aa8cc",
		gauze__blacklist__method: "create",
	},
	entity3_blacklist: {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "leaf",
		gauze__blacklist__agent_type: "gauze__agent_user",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000003",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "7f84c508-b714-41c1-b986-2d6ed64fc5e9",
		gauze__blacklist__method: "create",
	},
	entity4_blacklist: {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "leaf",
		gauze__blacklist__agent_type: "gauze__agent_user",
		gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000002",
		gauze__blacklist__entity_type: "gauze__entity",
		gauze__blacklist__entity_id: "45f5266f-1971-4b9a-985d-ac650449b589",
		gauze__blacklist__method: "create",
	},
};
const expected = `{
    "data": {
        "create_entity": [
            {
                "_metadata": {
                    "id": "3ab515f4-5391-4af9-a2c9-a7119ad262ce"
                },
                "mutation": {
                    "create_blacklist": [
                        {
                            "_metadata": {
                                "type": "BLACKLIST"
                            }
                        }
                    ]
                }
            }
        ],
        "entity2": [
            {
                "_metadata": {
                    "id": "55c29b50-5e24-447d-8505-75e82c2aa8cc"
                },
                "mutation": {
                    "create_blacklist": [
                        {
                            "_metadata": {
                                "type": "BLACKLIST"
                            }
                        }
                    ]
                }
            }
        ],
        "entity3": [
            {
                "_metadata": {
                    "id": "7f84c508-b714-41c1-b986-2d6ed64fc5e9"
                },
                "mutation": {
                    "create_blacklist": [
                        {
                            "_metadata": {
                                "type": "BLACKLIST"
                            }
                        }
                    ]
                }
            }
        ],
        "entity4": [
            {
                "_metadata": {
                    "id": "45f5266f-1971-4b9a-985d-ac650449b589"
                },
                "mutation": {
                    "create_blacklist": [
                        {
                            "_metadata": {
                                "type": "BLACKLIST"
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
