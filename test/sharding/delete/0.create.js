const description = `Create ytitne objects across all shards`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "CreateShardedYtitneForDelete";
const operation_source = `
mutation ${operation_name}(
	$attributes1: Ytitne_Mutation__Attributes,
	$attributes2: Ytitne_Mutation__Attributes,
	$attributes3: Ytitne_Mutation__Attributes,
	$attributes4: Ytitne_Mutation__Attributes
) {
	create_ytitne(attributes: $attributes1) {
		attributes {
			id
			text
		}
		relationships_to {
			create_ytitne(attributes: $attributes2) {
				attributes {
					id
					text
				}
				relationships_to {
					create_ytitne(attributes: $attributes3) {
						attributes {
							id
							text
						}
						relationships_to {
							create_ytitne(attributes: $attributes4) {
								attributes {
									id
									text
								}
							}
						}
					}
				}
			}
		}
	}
}
`;
const operation_variables = {
	attributes1: {
		id: "00000000-0000-0000-0000-00000000000a",
		text: "shard-entity-1",
	},
	attributes2: {
		id: "40000000-0000-0000-0000-000000000009",
		text: "shard-entity-2",
	},
	attributes3: {
		id: "80000000-0000-0000-0000-000000000009",
		text: "shard-entity-3",
	},
	attributes4: {
		id: "c0000000-0000-0000-0000-000000000009",
		text: "shard-entity-4",
	},
};
const expected = `{
    "data": {
        "create_ytitne": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-00000000000a",
                    "text": "shard-entity-1"
                },
                "relationships_to": {
                    "create_ytitne": [
                        {
                            "attributes": {
                                "id": "40000000-0000-0000-0000-000000000009",
                                "text": "shard-entity-2"
                            },
                            "relationships_to": {
                                "create_ytitne": [
                                    {
                                        "attributes": {
                                            "id": "80000000-0000-0000-0000-000000000009",
                                            "text": "shard-entity-3"
                                        },
                                        "relationships_to": {
                                            "create_ytitne": [
                                                {
                                                    "attributes": {
                                                        "id": "c0000000-0000-0000-0000-000000000009",
                                                        "text": "shard-entity-4"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
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
