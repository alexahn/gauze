const description = `Read ytitne objects through routed and fan-out shard queries`;
const context = {
	agent: {
		agent_id: "00000000-0000-0000-0000-000000000001",
		agent_type: "gauze__agent_user",
	},
};
const operation_name = "ReadShardedYtitne";
const operation_source = `
query ${operation_name}(
	$where_in: Ytitne_Query__Where_Array,
	$where_like: Ytitne_Query__Where,
	$where1: Ytitne_Query__Where,
	$where2: Ytitne_Query__Where,
	$where3: Ytitne_Query__Where,
	$where4: Ytitne_Query__Where
) {
	fanout: read_ytitne(where_in: $where_in, order: "id", order_direction: "asc") {
		attributes {
			id
			text
		}
	}
	scan: read_ytitne(where_like: $where_like, order: "id", order_direction: "asc") {
		attributes {
			id
			text
		}
	}
	root: read_ytitne(where: $where1) {
		attributes {
			id
			text
		}
		relationships_to {
			read_ytitne(where: $where2) {
				attributes {
					id
					text
				}
				relationships_to {
					read_ytitne(where: $where3) {
						attributes {
							id
							text
						}
						relationships_to {
							read_ytitne(where: $where4) {
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
	where_in: {
		id: ["00000000-0000-0000-0000-00000000000a", "40000000-0000-0000-0000-000000000009", "80000000-0000-0000-0000-000000000009", "c0000000-0000-0000-0000-000000000009"],
	},
	where_like: {
		text: "shard-entity-%",
	},
	where1: {
		id: "00000000-0000-0000-0000-00000000000a",
	},
	where2: {
		id: "40000000-0000-0000-0000-000000000009",
	},
	where3: {
		id: "80000000-0000-0000-0000-000000000009",
	},
	where4: {
		id: "c0000000-0000-0000-0000-000000000009",
	},
};
const expected = `{
    "data": {
        "fanout": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-00000000000a",
                    "text": "shard-entity-1"
                }
            },
            {
                "attributes": {
                    "id": "40000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-2"
                }
            },
            {
                "attributes": {
                    "id": "80000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-3"
                }
            },
            {
                "attributes": {
                    "id": "c0000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-4"
                }
            }
        ],
        "scan": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-00000000000a",
                    "text": "shard-entity-1"
                }
            },
            {
                "attributes": {
                    "id": "40000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-2"
                }
            },
            {
                "attributes": {
                    "id": "80000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-3"
                }
            },
            {
                "attributes": {
                    "id": "c0000000-0000-0000-0000-000000000009",
                    "text": "shard-entity-4"
                }
            }
        ],
        "root": [
            {
                "attributes": {
                    "id": "00000000-0000-0000-0000-00000000000a",
                    "text": "shard-entity-1"
                },
                "relationships_to": {
                    "read_ytitne": [
                        {
                            "attributes": {
                                "id": "40000000-0000-0000-0000-000000000009",
                                "text": "shard-entity-2"
                            },
                            "relationships_to": {
                                "read_ytitne": [
                                    {
                                        "attributes": {
                                            "id": "80000000-0000-0000-0000-000000000009",
                                            "text": "shard-entity-3"
                                        },
                                        "relationships_to": {
                                            "read_ytitne": [
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
