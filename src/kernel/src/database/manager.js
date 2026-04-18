import * as $abstract from "./../../../abstract/index.js";

import knex from "knex";

class DatabaseManager {
	// config is top level database config
	constructor(config) {
		const self = this;
		self.config = config;
		// key for connections map is the shard key
		self.connections = {};
		self.databases = self.create_connections(config);
		self.relationship_table = $abstract.entities.relationship ? $abstract.entities.relationship.default($abstract).table_name : "undefined";
		self.whitelist_table = $abstract.entities.whitelist ? $abstract.entities.whitelist.default($abstract).table_name : "undefined";
		self.blacklist_table = $abstract.entities.blacklist ? $abstract.entities.blacklist.default($abstract).table_name : "undefined";
	}
	uuid_to_big_int(uuid) {
		const bigIntValue = BigInt("0x" + uuid.replace(/-/g, ""));
		return bigIntValue;
	}
	big_int_to_uuid(big_int) {
		// Convert BigInt to hex and pad to 32 characters (128 bits)
		let hex = bigInt.toString(16).padStart(32, "0");

		// Insert hyphens at 8-4-4-4-12 positions
		return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
	}
	get_shard_node_connection_key(shard_node) {
		if (shard_node.config.client === "better-sqlite3") {
			return JSON.stringify({
				transaction_isolation_level: shard_node.transaction_isolation_level,
				filename: shard_node.config.connection.filename,
			});
		} else {
			return JSON.stringify({
				transaction_isolation_level: shard_node.transaction_isolation_level,
				host: shard_node.config.connection.host,
				port: shard_node.config.connection.port,
				user: shard_node.config.connection.user,
				database: shard_node.config.connection.database,
			});
		}
	}
	get_shard_node_migration_key(shard_node) {
		const self = this;
		if (shard_node.config.client === "better-sqlite3") {
			return JSON.stringify({
				filename: shard_node.config.connection.filename,
				directory: shard_node.config.migrations.directory,
			});
		} else {
			return JSON.stringify({
				host: shard_node.config.connection.host,
				port: shard_node.config.connection.port,
				user: shard_node.config.connection.user,
				database: shard_node.config.connection.database,
				directory: shard_node.config.migrations.directory,
			});
		}
	}
	get_shard_node_seed_key(shard_node) {
		const self = this;
		const connection_key = self.get_shard_node_connection_key(shard_node);
		if (shard_node.config.client === "better-sqlite3") {
			return JSON.stringify({
				filename: shard_node.config.connection.filename,
				directory: shard_node.config.seeds.directory,
			});
		} else {
			return JSON.stringify({
				host: shard_node.config.connection.host,
				port: shard_node.config.connection.port,
				user: shard_node.config.connection.user,
				database: shard_node.config.connection.database,
				directory: shard_node.config.seeds.directory,
			});
		}
	}
	get_connection(shard_node_key) {
		const self = this;
		return self.connections[shard_node_key];
	}
	// create knex connections for every shard, every shard node will have a knex attribute with the instantiated knex object
	create_connections(config) {
		if (!config[process.env.GAUZE_ENV]) throw new Error(`Database config is not defined for environment ${process.env.GAUZE_ENV}`);
		const self = this;
		const database_environment = config[process.env.GAUZE_ENV];
		const database_tables = Object.keys(database_environment);
		database_tables.forEach(function (table_name) {
			const table = config[process.env.GAUZE_ENV][table_name];
			const current_shards = table.current;
			current_shards.forEach(function (shard) {
				const read_nodes = shard.read;
				const write_nodes = shard.write;
				function create_connections(node) {
					const node_key = self.get_shard_node_connection_key(node);
					node.key = node_key;
					if (self.connections[node_key]) {
						node.knex = self.connections[node_key];
					} else {
						self.connections[node_key] = knex(node.config);
						node.knex = self.connections[node_key];
					}
				}
				read_nodes.forEach(create_connections);
				write_nodes.forEach(create_connections);
			});
		});
		return config[process.env.GAUZE_ENV];
	}
	get_connections() {
		const self = this;
		return self.databases;
	}
	find_shards(table_name, primary_key_number) {
		const self = this;
		return self.databases[table_name].current.filter(function (shard) {
			return shard.start <= primary_key_number && primary_key_number <= shard.end;
		});
	}
	find_shards_for_set(table_name, primary_key_numbers) {
		const self = this;
		const mapped_shards = primary_key_numbers
			.map(function (primary_key_number) {
				return self.find_shards(table_name, primary_key_number);
			})
			.flat();
		const unique_shards = [
			...new Map(
				mapped_shards.map(function (shard) {
					return [shard.id, shard];
				}),
			).values(),
		];
		return unique_shards;
	}
	// randomly selects one node for the shard type on the shard
	get_one_shard_node(shard, shard_type) {
		const shard_nodes = shard[shard_type];
		return shard_nodes[Math.floor(Math.random() * shard_nodes.length)];
	}
	// randomly selects one node for each shard
	get_all_shards_nodes(table_name, shard_type) {
		const self = this;
		return self.databases[table_name].current.map(function (shard) {
			const shard_nodes = shard[shard_type];
			return shard_nodes[Math.floor(Math.random() * shard_nodes.length)];
		});
	}
	// context is graphql context
	// note: we need to choose whether to return normalized connections
	/*
		returns something like:
		{
			id: `${DEVELOPMENT_ENVIRONMENT}.${relationship__table}.shard.1.read.1`,
			config: {
				client: "better-sqlite3",
				connection: {
					filename: path.join(__dirname, "../../", `${DEVELOPMENT_ENVIRONMENT}.sqlite3`),
				},
				migrations: {
					tableName: "knex_migrations",
					directory: path.join(__dirname, "migrations"),
				},
				seeds: {
					directory: path.join(__dirname, "seeds", DEVELOPMENT_ENVIRONMENT),
				},
			},
		}
	*/
	route_relationship_connections(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		const from_id_key = "gauze__relationship__from_id";
		const from_type_key = "gauze__relationship__from_type";
		const to_id_key = "gauze__relationship__to_id";
		const to_type_key = "gauze__relationship__to_type";
		if (shard_type === "read") {
			if (parameters.where) {
				if (parameters.where[model.primary_key]) {
					const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
					const model_shards = self.find_shards(model.table_name, primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else {
					const from_required_parameters = [from_id_key, from_type_key];
					const to_required_parameters = [to_id_key, to_type_key];
					const from_required_parameters_exist = from_required_parameters.every(function (key) {
						return key in parameters.where;
					});
					const to_required_parameters_exist = to_required_parameters.every(function (key) {
						return key in parameters.where;
					});
					if (from_required_parameters_exist && to_required_parameters_exist) {
						// flip a coin and route
						const flip = Math.random() < 0.5;

						const from_id = parameters.where.gauze__relationship__from_id;
						const from_type = parameters.where.gauze__relationship__from_type;
						const from_primary_key_number = self.uuid_to_big_int(from_id);

						const to_id = parameters.where.gauze__relationship__to_id;
						const to_type = parameters.where.gauze__relationship__to_type;
						const to_primary_key_number = self.uuid_to_big_int(to_id);

						const from_shards = self.find_shards(from_type, from_primary_key_number);
						const from_shard = from_shards[0];

						const to_shards = self.find_shards(to_type, to_primary_key_number);
						const to_shard = to_shards[0];

						if (flip) {
							if (from_shard) {
								const from_shard_node = self.get_one_shard_node(from_shard, shard_type);
								return [from_shard_node];
							} else {
								throw new Error(`Could not find shard for table: ${from_type} and primary key: ${from_id}`);
							}
						} else {
							if (to_shard) {
								const to_shard_node = self.get_one_shard_node(to_shard, shard_type);
								return [to_shard_node];
							} else {
								throw new Error(`Could not find shard for table: ${to_type} and primary key: ${to_id}`);
							}
						}
					} else if (from_required_parameters_exist) {
						const from_id = parameters.where.gauze__relationship__from_id;
						const from_type = parameters.where.gauze__relationship__from_type;
						const from_primary_key_number = self.uuid_to_big_int(from_id);

						const from_shards = self.find_shards(from_type, from_primary_key_number);
						const from_shard = from_shards[0];

						if (from_shard) {
							const from_shard_node = self.get_one_shard_node(from_shard, shard_type);
							return [from_shard_node];
						} else {
							throw new Error(`Could not find shard for table: ${from_type} and primary key: ${from_id}`);
						}
					} else if (to_required_parameters_exist) {
						const to_id = parameters.where.gauze__relationship__to_id;
						const to_type = parameters.where.gauze__relationship__to_type;
						const to_primary_key_number = self.uuid_to_big_int(to_id);

						const to_shards = self.find_shards(to_type, to_primary_key_number);
						const to_shard = to_shards[0];

						if (to_shard) {
							const to_shard_node = self.get_one_shard_node(to_shard, shard_type);
							return [to_shard_node];
						} else {
							throw new Error(`Could not find shard for table: ${to_type} and primary key: ${to_id}`);
						}
					} else if (parameters.where_in) {
						// note: we need to copy this here because where is bootstrapped for us
						if (parameters.where_in[model.primary_key]) {
							const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
								return self.uuid_to_big_int(primary_key);
							});
							const shards = self.find_shards_for_set(model.table_name, primary_key_numbers);
							const shard_nodes = shards.map(function (shard) {
								return self.get_one_shard_node(shard, shard_type);
							});
							return shard_nodes;
						} else {
							return self.get_all_shards_nodes(model.table_name, shard_type);
						}
					} else {
						return self.get_all_shards_nodes(model.table_name, shard_type);
					}
				}
			} else if (parameters.where_in) {
				if (parameters.where_in[model.primary_key]) {
					const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
						return self.uuid_to_big_int(primary_key);
					});
					const shards = self.find_shards_for_set(model.table_name, primary_key_numbers);
					const shard_nodes = shards.map(function (shard) {
						return self.get_one_shard_node(shard, shard_type);
					});
					return shard_nodes;
				} else {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				}
			} else {
				return self.get_all_shards_nodes(model.table_name, shard_type);
			}
		} else if (shard_type === "write") {
			if (parameters.where) {
				if (parameters.attributes) {
					// update
					return [];
				} else {
					// delete
					const required_where = ["gauze__relationship__from_id", "gauze__relationship__from_type", "gauze__relationship__to_id", "gauze__relationship__to_type"];
					const required_where_exist = required_where.every(function (key) {
						return key in parameters.where;
					});
					if (parameters.where[model.primary_key] && required_where_exist) {
						const entity_id = parameters.where[model.primary_key];
						const entity_type = model.table_name;
						const entity_primary_key_number = self.uuid_to_big_int(entity_id);

						const from_id = parameters.where.gauze__relationship__from_id;
						const from_type = parameters.where.gauze__relationship__from_type;
						const from_primary_key_number = self.uuid_to_big_int(from_id);

						const to_id = parameters.where.gauze__relationship__to_id;
						const to_type = parameters.where.gauze__relationship__to_type;
						const to_primary_key_number = self.uuid_to_big_int(to_id);

						const entity_shards = self.find_shards(entity_type, entity_primary_key_number);
						const entity_shard = entity_shards[0];

						const from_shards = self.find_shards(from_type, from_primary_key_number);
						const from_shard = from_shards[0];

						const to_shards = self.find_shards(to_type, to_primary_key_number);
						const to_shard = to_shards[0];

						if (entity_shard && from_shard && to_shard) {
							const entity_shard_node = self.get_one_shard_node(entity_shard, shard_type);
							const from_shard_node = self.get_one_shard_node(from_shard, shard_type);
							const to_shard_node = self.get_one_shard_node(to_shard, shard_type);

							return [entity_shard_node, from_shard_node, to_shard_node];
						} else {
							if (!entity_shard) {
								throw new Error(`Could not find shard for table: ${entity_type} and primary key: ${entity_id}`);
							}
							if (!from_shard) {
								throw new Error(`Could not find shard for table: ${from_type} and primary key: ${from_id}`);
							}
							if (!to_shard) {
								throw new Error(`Could not find shard for table: ${to_type} and primary key: ${to_id}`);
							}
						}
					} else {
						// not allowed to edit relationships across multiple nodes
						return [];
					}
				}
			} else if (parameters.where_in) {
				return [];
			} else if (parameters.where_not_in) {
				return [];
			} else if (parameters.where_between) {
				return [];
			} else if (parameters.where_like) {
				return [];
			} else {
				if (parameters.attributes) {
					// create
					const required_attributes = ["gauze__relationship__from_id", "gauze__relationship__from_type", "gauze__relationship__to_id", "gauze__relationship__to_type"];
					const required_attributes_exist = required_attributes.every(function (key) {
						return key in parameters.attributes;
					});
					if (parameters.attributes[model.primary_key] && required_attributes_exist) {
						const entity_id = parameters.attributes[model.primary_key];
						const entity_type = model.table_name;
						const entity_primary_key_number = self.uuid_to_big_int(entity_id);

						const from_id = parameters.attributes.gauze__relationship__from_id;
						const from_type = parameters.attributes.gauze__relationship__from_type;
						const from_primary_key_number = self.uuid_to_big_int(from_id);

						const to_id = parameters.attributes.gauze__relationship__to_id;
						const to_type = parameters.attributes.gauze__relationship__to_type;
						const to_primary_key_number = self.uuid_to_big_int(to_id);

						const entity_shards = self.find_shards(entity_type, entity_primary_key_number);
						const entity_shard = entity_shards[0];

						const from_shards = self.find_shards(from_type, from_primary_key_number);
						const from_shard = from_shards[0];

						const to_shards = self.find_shards(to_type, to_primary_key_number);
						const to_shard = to_shards[0];

						if (entity_shard && from_shard && to_shard) {
							const entity_shard_node = self.get_one_shard_node(entity_shard, shard_type);
							const from_shard_node = self.get_one_shard_node(from_shard, shard_type);
							const to_shard_node = self.get_one_shard_node(to_shard, shard_type);

							return [entity_shard_node, from_shard_node, to_shard_node];
						} else {
							if (!entity_shard) {
								throw new Error(`Could not find shard for table: ${entity_type} and primary key: ${entity_id}`);
							}
							if (!from_shard) {
								throw new Error(`Could not find shard for table: ${from_type} and primary key: ${from_id}`);
							}
							if (!to_shard) {
								throw new Error(`Could not find shard for table: ${to_type} and primary key: ${to_id}`);
							}
						}
					} else {
						return [];
					}
				} else {
					return [];
				}
			}
		} else {
			throw new Error("Invalid shard type, must be either read or write");
		}
	}
	// for blacklist and whitelist
	route_access_connections(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		let agent_id_attribute;
		let agent_type_attribute;
		let entity_id_attribute;
		let entity_type_attribute;
		if (model.table_name === "gauze__whitelist") {
			agent_id_attribute = "gauze__whitelist__agent_id";
			agent_type_attribute = "gauze__whitelist__agent_type";
			entity_id_attribute = "gauze__whitelist__entity_id";
			entity_type_attribute = "gauze__whitelist__entity_type";
		} else if (model.table_name === "gauze__blacklist") {
			agent_id_attribute = "gauze__blacklist__agent_id";
			agent_type_attribute = "gauze__blacklist__agent_type";
			entity_id_attribute = "gauze__blacklist__entity_id";
			entity_type_attribute = "gauze__blacklist__entity_type";
		} else {
			throw new Error(`Invalid access model type: ${model.table_name}`);
		}
		if (shard_type === "read") {
			if (parameters.where) {
				if (parameters.where[entity_id_attribute] && parameters.where[entity_type_attribute]) {
					const entity_primary_key_number = self.uuid_to_big_int(parameters.where[entity_id_attribute]);
					const entity_table_name = parameters.where[entity_type_attribute];
					const model_shards = self.find_shards(entity_table_name, entity_primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else if (parameters.where[agent_id_attribute] && parameters.where[agent_type_attribute]) {
					const agent_primary_key_number = self.uuid_to_big_int(parameters.where[agent_id_attribute]);
					const agent_table_name = parameters.where[agent_type_attribute];
					const model_shards = self.find_shards(agent_table_name, agent_primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else if (parameters.where[model.primary_key]) {
					const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
					const model_shards = self.find_shards(model.table_name, primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else if (parameters.where_in) {
					// note: we need to copy this here because where is bootstrapped for us
					if (parameters.where_in[model.primary_key]) {
						const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
							return self.uuid_to_big_int(primary_key);
						});
						const shards = self.find_shards_for_set(model.table_name, primary_key_numbers);
						const shard_nodes = shards.map(function (shard) {
							return self.get_one_shard_node(shard, shard_type);
						});
						return shard_nodes;
					} else {
						return self.get_all_shards_nodes(model.table_name, shard_type);
					}
				} else {
					// return all sets
					return self.get_all_shards_nodes(model.table_name, shard_type);
				}
			} else if (parameters.where_in) {
				if (parameters.where_in[model.primary_key]) {
					const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
						return self.uuid_to_big_int(primary_key);
					});
					const shards = self.find_shards_for_set(model.table_name, primary_key_numbers);
					const shard_nodes = shards.map(function (shard) {
						return self.get_one_shard_node(shard, shard_type);
					});
					return shard_nodes;
				} else {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				}
			} else {
				// return all sets
				return self.get_all_shards_nodes(model.table_name, shard_type);
			}
		} else if (shard_type === "write") {
			if (parameters.where) {
				if (parameters.attributes) {
					// update
					return [];
				} else {
					// delete
					const required_attributes = [agent_id_attribute, agent_type_attribute, entity_id_attribute, entity_type_attribute];
					const required_attributes_exist = required_attributes.every(function (key) {
						return key in parameters.where;
					});

					if (parameters.where[model.primary_key] && required_attributes_exist) {
						const access_id = parameters.where[model.primary_key];
						const access_type = model.table_name;
						const access_primary_key_number = self.uuid_to_big_int(access_id);

						const entity_id = parameters.where[entity_id_attribute];
						const entity_type = parameters.where[entity_type_attribute];
						const entity_primary_key_number = self.uuid_to_big_int(entity_id);

						const agent_id = parameters.where[agent_id_attribute];
						const agent_type = parameters.where[agent_type_attribute];
						const agent_primary_key_number = self.uuid_to_big_int(agent_id);

						const access_shards = self.find_shards(access_type, access_primary_key_number);
						const access_shard = access_shards[0];

						const entity_shards = self.find_shards(entity_type, entity_primary_key_number);
						const entity_shard = entity_shards[0];

						const agent_shards = self.find_shards(agent_type, agent_primary_key_number);
						const agent_shard = agent_shards[0];

						if (access_shard && entity_shard && agent_shard) {
							const access_shard_node = self.get_one_shard_node(access_shard, shard_type);
							const entity_shard_node = self.get_one_shard_node(entity_shard, shard_type);
							const agent_shard_node = self.get_one_shard_node(agent_shard, shard_type);
							return [access_shard_node, entity_shard_node, agent_shard_node];
						} else {
							if (!access_shard) {
								throw new Error(`Could not find shard for table: ${access_type} and primary key: ${access_id}`);
							}
							if (!entity_shard) {
								throw new Error(`Could not find shard for table: ${entity_type} and primary key: ${entity_id}`);
							}
							if (!agent_shard) {
								throw new Error(`Could not find shard for table: ${agent_type} and primary key: ${agent_id}`);
							}
						}
					} else {
						// not allowed to edit whitelist or blacklist across multiple nodes
						return [];
					}
				}
			} else if (parameters.where_in) {
				return [];
			} else if (parameters.where_not_in) {
				return [];
			} else if (parameters.where_between) {
				return [];
			} else if (parameters.where_like) {
				return [];
			} else {
				if (parameters.attributes) {
					// create
					const required_attributes = [agent_id_attribute, agent_type_attribute, entity_id_attribute, entity_type_attribute];
					const required_attributes_exist = required_attributes.every(function (key) {
						return key in parameters.attributes;
					});

					if (parameters.attributes[model.primary_key] && required_attributes_exist) {
						const access_id = parameters.attributes[model.primary_key];
						const access_type = model.table_name;
						const access_primary_key_number = self.uuid_to_big_int(access_id);

						const entity_id = parameters.attributes[entity_id_attribute];
						const entity_type = parameters.attributes[entity_type_attribute];
						const entity_primary_key_number = self.uuid_to_big_int(entity_id);

						const agent_id = parameters.attributes[agent_id_attribute];
						const agent_type = parameters.attributes[agent_type_attribute];
						const agent_primary_key_number = self.uuid_to_big_int(agent_id);

						const access_shards = self.find_shards(access_type, access_primary_key_number);
						const access_shard = access_shards[0];

						const entity_shards = self.find_shards(entity_type, entity_primary_key_number);
						const entity_shard = entity_shards[0];

						const agent_shards = self.find_shards(agent_type, agent_primary_key_number);
						const agent_shard = agent_shards[0];

						if (access_shard && entity_shard && agent_shard) {
							const access_shard_node = self.get_one_shard_node(access_shard, shard_type);
							const entity_shard_node = self.get_one_shard_node(entity_shard, shard_type);
							const agent_shard_node = self.get_one_shard_node(agent_shard, shard_type);
							return [access_shard_node, entity_shard_node, agent_shard_node];
						} else {
							if (!access_shard) {
								throw new Error(`Could not find shard for table: ${access_type} and primary key: ${access_id}`);
							}
							if (!entity_shard) {
								throw new Error(`Could not find shard for table: ${entity_type} and primary key: ${entity_id}`);
							}
							if (!agent_shard) {
								throw new Error(`Could not find shard for table: ${agent_type} and primary key: ${agent_id}`);
							}
						}
					} else {
						return [];
					}
				} else {
					return [];
				}
			}
		} else {
			throw new Error("Invalid shard type, must be either read or write");
		}
	}
	route_entity_connections(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		if (relationships === undefined) {
			// non-relationship query
			if (shard_type === "read") {
				// read
				if (parameters.where) {
					if (parameters.where[model.primary_key]) {
						const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
						const model_shards = self.find_shards(model.table_name, primary_key_number);
						const model_shard = model_shards[0];
						if (model_shard) {
							// if a write connection is already open, then use it
							const write_shard_node = self.get_one_shard_node(model_shard, "write");
							if (context.transactions[write_shard_node.key]) {
								return [write_shard_node];
							} else {
								return [self.get_one_shard_node(model_shard, shard_type)];
							}
						} else {
							throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
						}
					} else if (parameters.where_in) {
						// note: we need to add this here because our graphql logic bootstraps a where for us
						if (parameters.where_in[model.primary_key]) {
							const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
								return self.uuid_to_big_int(primary_key);
							});
							const shards = self.find_shards_for_set(model.table_name, primary_key_numbers);
							const shard_nodes = shards.map(function (shard) {
								const write_shard_node = self.get_one_shard_node(shard, "write");
								if (context.transactions[write_shard_node.key]) {
									return write_shard_node;
								} else {
									return self.get_one_shard_node(shard, shard_type);
								}
							});
							return shard_nodes;
						} else {
							return self.get_all_shards_nodes(model.table_name, shard_type);
						}
					} else {
						return self.get_all_shards_nodes(model.table_name, shard_type);
					}
				} else if (parameters.where_in) {
					if (parameters.where_in[model.primary_key]) {
						const shards = self.find_shards_for_set(model.table_name, parameters.where_in);
						const shard_nodes = shards.map(function (shard) {
							const write_shard_node = self.get_one_shard_node(model_shard, "write");
							if (context.transactions[write_shard_node.key]) {
								return write_shard_node;
							} else {
								return self.get_one_shard_node(shard, shard_type);
							}
						});
						return shard_nodes;
					} else {
						return self.get_all_shards_nodes(model.table_name, shard_type);
					}
				} else if (parameters.where_not_in) {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				} else if (parameters.where_between) {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				} else if (parameters.where_like) {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				} else {
					return [];
				}
			} else if (shard_type === "write") {
				if (parameters.where) {
					if (parameters.where[model.primary_key]) {
						const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
						const model_shards = self.find_shards(model.table_name, primary_key_number);
						const model_shard = model_shards[0];
						if (model_shard) {
							return [self.get_one_shard_node(model_shard, shard_type)];
						} else {
							throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
						}
					} else {
						return self.get_all_shards_nodes(model.table_name, shard_type);
					}
				} else if (parameters.where_in) {
					if (parameters.where_in[model.primary_key]) {
						const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
							return self.uuid_to_big_int(primary_key);
						});
						const shards = self.find_shards_for_set(model.table_name, primary_key_numbers);
						const shard_nodes = shards.map(function (shard) {
							return self.get_one_shard_node(shard, shard_type);
						});
						return shard_nodes;
					} else {
						return self.get_all_shards_nodes(model.table_name, shard_type);
					}
				} else if (parameters.where_not_in) {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				} else if (parameters.where_between) {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				} else if (parameters.where_like) {
					return self.get_all_shards_nodes(model.table_name, shard_type);
				} else {
					if (parameters.attributes) {
						// create
						if (parameters.attributes[model.primary_key]) {
							const primary_key_number = self.uuid_to_big_int(parameters.attributes[model.primary_key]);
							const model_shards = self.find_shards(model.table_name, primary_key_number);
							const model_shard = model_shards[0];
							if (model_shard) {
								return [self.get_one_shard_node(model_shard, shard_type)];
							} else {
								throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
							}
						} else {
							return [];
						}
					} else {
						return [];
					}
				}
			} else {
				throw new Error("Invalid shard type, must be either read or write");
			}
		} else if (Array.isArray(relationships)) {
			function _parse_source(scope, parameters) {
				const { source } = scope;
				if (source && source._metadata && source._direction) {
					return source;
				} else {
					if (parameters.source && parameters.source._metadata && parameters.source._direction) {
						return parameters.source;
					} else {
						return null;
					}
				}
			}
			// relationship query
			const source = _parse_source(scope, parameters);
			let relationship_primary_keys = [];
			if (source._direction === "to") {
				relationship_primary_keys = relationships
					.filter(function (relationship) {
						return relationship.gauze__relationship__to_type === model.table_name;
					})
					.map(function (relationship) {
						return relationship.gauze__relationship__to_id;
					});
			} else if (source._direction === "from") {
				relationship_primary_keys = relationships
					.filter(function (relationship) {
						return relationship.gauze__relationship__from_type === model.table_name;
					})
					.map(function (relationship) {
						return relationship.gauze__relationship__from_id;
					});
			} else {
				throw new Error("Invalid source direction");
			}
			const relationship_primary_key_numbers = relationship_primary_keys.map(function (relationship_primary_key_number) {
				return self.uuid_to_big_int(relationship_primary_key_number);
			});
			const relationship_shards = self.find_shards_for_set(model.table_name, relationship_primary_key_numbers);
			const relationship_shards_index = new Set(
				relationship_shards.map(function (item) {
					return item.id;
				}),
			);
			const relationship_shard_nodes = relationship_shards.map(function (shard) {
				return self.get_one_shard_node(shard, shard_type);
			});
			if (shard_type === "read") {
				// read
				if (parameters.where) {
					if (parameters.where[model.primary_key]) {
						const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
						const model_shards = self.find_shards(model.table_name, primary_key_number);
						const model_shard = model_shards[0];
						if (model_shard) {
							return [self.get_one_shard_node(model_shard, shard_type)];
						} else {
							throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
						}
					} else if (parameters.where_in) {
						// note: we need to add this here because our graphql logic bootstraps a where for us
						if (parameters.where_in[model.primary_key]) {
							const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
								return self.uuid_to_big_int(primary_key);
							});
							const shards = self.find_shards_for_set(model.table_name, primary_key_numbers).filter(function (shard) {
								return relationship_shards_index.has(shard.id);
							});
							const shard_nodes = shards.map(function (shard) {
								return self.get_one_shard_node(shard, shard_type);
							});
							return shard_nodes;
						} else {
							return relationship_shard_nodes;
						}
					} else {
						return relationship_shard_nodes;
					}
				} else if (parameters.where_in) {
					if (parameters.where_in[model.primary_key]) {
						const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
							return self.uuid_to_big_int(primary_key);
						});
						const shards = self.find_shards_for_set(model.table_name, primary_key_numbers).filter(function (shard) {
							return relationship_shards_index.has(shard.id);
						});
						const shard_nodes = shards.map(function (shard) {
							return self.get_one_shard_node(shard, shard_type);
						});
						return shard_nodes;
					} else {
						return relationship_shard_nodes;
					}
				} else if (parameters.where_not_in) {
					return relationship_shard_nodes;
				} else if (parameters.where_between) {
					return relationship_shard_nodes;
				} else if (parameters.where_like) {
					return relationship_shard_nodes;
				} else {
					return [];
				}
			} else if (shard_type === "write") {
				if (parameters.where) {
					if (parameters.where[model.primary_key]) {
						const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
						const model_shards = self.find_shards(model.table_name, primary_key_number);
						const model_shard = model_shards[0];
						if (model_shard) {
							return [self.get_one_shard_node(model_shard, shard_type)];
						} else {
							throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
						}
					} else {
						return relationship_shard_nodes;
					}
				} else if (parameters.where_in) {
					if (parameters.where_in[model.primary_key]) {
						const primary_key_numbers = parameters.where_in[model.primary_key].map(function (primary_key) {
							return self.uuid_to_big_int(primary_key);
						});
						const shards = self.find_shards_for_set(model.table_name, primary_key_numbers).filter(function (shard) {
							return relationship_shards_index.has(shard.id);
						});
						const shard_nodes = shards.map(function (shard) {
							return self.get_one_shard_node(shard, shard_type);
						});
						return shard_nodes;
					} else {
						return relationship_shard_nodes;
					}
				} else if (parameters.where_not_in) {
					return relationship_shard_nodes;
				} else if (parameters.where_between) {
					return relationship_shard_nodes;
				} else if (parameters.where_like) {
					return relationship_shard_nodes;
				} else {
					if (parameters.attributes) {
						// create
						if (parameters.attributes[model.primary_key]) {
							const primary_key_number = self.uuid_to_big_int(parameters.attributes[model.primary_key]);
							const model_shards = self.find_shards(model.table_name, primary_key_number);
							const model_shard = model_shards[0];
							if (model_shard) {
								return [self.get_one_shard_node(model_shard, shard_type)];
							} else {
								throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
							}
						} else {
							return [];
						}
					} else {
						return [];
					}
				}
			} else {
				throw new Error("Invalid shard type, must be either read or write");
			}
		} else {
			throw new Error("Invalid relationships, must be either undefined or an array");
		}
	}
	route_connections(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		if (!self.databases[model.table_name]) {
			throw new Error(`Database routing/sharding configuration is not defined for table: ${model.table_name}`);
		}
		if (self.databases[model.table_name].connection_router) {
			// note: allows for custom connection routing (for instances where someone wants to set up their own sharding scheme)
			return self.database[model.table_name].connection_router(context, scope, parameters, model, shard_type, relationships, self);
		} else if (model.table_name === self.relationship_table) {
			return self.route_relationship_connections(context, scope, parameters, model, shard_type, relationships);
		} else if (model.table_name === self.whitelist_table) {
			return self.route_access_connections(context, scope, parameters, model, shard_type, relationships);
		} else if (model.table_name === self.blacklist_table) {
			return self.route_access_connections(context, scope, parameters, model, shard_type, relationships);
		} else {
			return self.route_entity_connections(context, scope, parameters, model, shard_type, relationships);
		}
	}
	// context is graphql context
	// should return an array of { connection, transaction }
	// shard_type is "read" or "write"
	route_transactions(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		const connections = self.route_connections(context, scope, parameters, model, shard_type, relationships);
		const unique_connections = [
			...new Map(
				connections.map(function (connection) {
					return [connection.key, connection];
				}),
			).values(),
		];
		// use context.transactions
		// for each connection, check to see if we have an open transaction on it for the context
		//console.log("unique connections in route_transactions", unique_connections);
		return Promise.all(
			unique_connections.map(function (connection) {
				// key is shard node key
				if (context.transactions[connection.key]) {
					return context.transactions[connection.key].then(function (transaction) {
						return {
							connection: self.get_connection(connection.key),
							transaction: transaction,
						};
					});
				} else {
					const transaction_promise = new Promise(function (resolve, reject) {
						// note: pass an empty object for better-sqlite3 so we don't get spammed with warnings that sqlite3 only supports serializable isolation level
						const transaction_config =
							connection.config.client === "better-sqlite3" || connection.config.client === "sqlite3"
								? {}
								: {
										isolationLevel: connection.transaction_isolation_level,
									};
						return connection.knex
							.transaction(transaction_config)
							.then(function (trx) {
								return resolve(trx);
							})
							.catch(function (err) {
								return reject(err);
							});
					});
					context.transactions[connection.key] = transaction_promise;
					return transaction_promise.then(function (transaction) {
						return {
							connection: self.get_connection(connection.key),
							transaction,
						};
					});
				}
			}),
		);
	}
	// context is graphql context
	commit_transactions(transactions) {
		return Promise.all(Object.values(transactions)).then(function (transactions) {
			return Promise.all(
				transactions.map(function (transaction) {
					return transaction.commit();
				}),
			);
		});
	}
	commit_context_transactions(context) {
		const self = this;
		return self.commit_transactions(context.transactions);
	}
	rollback_transactions(transactions) {
		return Promise.all(Object.values(transactions)).then(function (transactions) {
			return Promise.all(
				transactions.map(function (transaction) {
					return transaction.rollback();
				}),
			);
		});
	}
	// context is graphql context
	rollback_context_transactions(context) {
		const self = this;
		return self.rollback_transactions(context.transactions);
	}
	destroy_connections() {
		const self = this;
		return Object.values(self.connections).map(function (connection) {
			delete self.connections[connection.key];
			return connection.destroy();
		});
	}
	get_write_shard_nodes() {
		const self = this;
		const write_shards = Object.keys(self.databases)
			.map(function (table_name) {
				const table = self.databases[table_name];
				const shards = table.current;
				return shards
					.map(function (shard) {
						const write_shards = shard.write;
						return write_shards.map(function (write_shard) {
							return {
								table_name: table_name,
								shard: shard,
								shard_node: write_shard,
							};
						});
					})
					.flat();
			})
			.flat();
		return write_shards;
	}
	get_migration_nodes() {
		const self = this;
		const write_shards = self.get_write_shard_nodes();
		const write_shards_with_keys = write_shards.map(function (write_shard) {
			return {
				...write_shard,
				key: self.get_shard_node_migration_key(write_shard.shard_node),
			};
		});
		const migration_nodes = [
			...new Map(
				write_shards_with_keys.map(function (item) {
					return [item.key, item];
				}),
			).values(),
		];
		return migration_nodes;
	}
	get_seed_nodes() {
		const self = this;
		const write_shards = self.get_write_shard_nodes();
		const write_shards_with_keys = write_shards.map(function (write_shard) {
			return {
				...write_shard,
				key: self.get_shard_node_seed_key(write_shard.shard_node),
			};
		});
		const seed_nodes = [
			...new Map(
				write_shards_with_keys.map(function (item) {
					return [item.key, item];
				}),
			).values(),
		];
		return seed_nodes;
	}
	run_with_first_write_shard_node(run) {
		const self = this;
		const write_shards = self.get_write_shard_nodes();
		if (write_shards && write_shards.length) {
			const first_write_shard = write_shards[0];
			return run(first_write_shard.table_name, first_write_shard.shard, first_write_shard.shard_node);
		} else {
			throw new Error("No write shards found in database configuration");
		}
	}
	// accepts a function (table_name, shard, shard_node)
	run_with_write_shard_nodes(run) {
		const self = this;
		const write_shards = self.get_write_shard_nodes();
		return Promise.all(
			write_shards.map(function (write_shard) {
				return run(write_shard.table_name, write_shard.shard, write_shard.shard_node);
			}),
		);
	}
	run_with_nodes(nodes, run) {
		const self = this;
		return Promise.all(
			nodes.map(function (node) {
				return run(node.table_name, node.shard, node.shard_node);
			}),
		);
	}
	migrate_make(name) {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			return shard_node.knex.migrate.make(name, shard_node.config.migrations);
		});
	}
	migrate_latest() {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			return shard_node.knex.migrate.latest(shard_node.config.migrations);
		});
	}
	migrate_rollback() {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			return shard_node.knex.migrate.rollback(shard_node.config.migrations);
		});
	}
	migrate_up(name) {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			const config = JSON.parse(JSON.stringify(shard_node.config.migrations));
			config.name = name;
			return shard_node.knex.migrate.up(config);
		});
	}
	migrate_down(name) {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			const config = JSON.parse(JSON.stringify(shard_node.config.migrations));
			config.name = name;
			return shard_node.knex.migrate.down(config);
		});
	}
	migrate_current_version() {
		const self = this;
		const write_shards = self.get_write_shard_nodes();
		return Promise.all(
			write_shards.map(function (write_shard) {
				return write_shard.shard_node.knex.migrate.currentVersion(write_shard.shard_node.config.migrations).then(function (version) {
					return {
						table_name: write_shard.table_name,
						shard_id: write_shard.shard.id,
						shard_node_id: write_shard.shard_node.id,
						version: version,
					};
				});
			}),
		);
	}
	migrate_list() {
		const self = this;
		const write_shards = self.get_write_shard_nodes();
		return Promise.all(
			write_shards.map(function (write_shard) {
				return write_shard.shard_node.knex.migrate.list(write_shard.shard_node.config.migrations).then(function (list) {
					return {
						table_name: write_shard.table_name,
						shard_id: write_shard.shard.id,
						shard_node_id: write_shard.shard_node.id,
						completed_migrations: list[0],
						pending_migrations: list[1],
					};
				});
			}),
		);
	}
	migrate_unlock() {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			return shard_node.knex.migrate.unlock(shard_node.config.migrations);
		});
	}
	seed_make(name) {
		const self = this;
		const seed_nodes = self.get_seed_nodes();
		return self.run_with_nodes(seed_nodes, function (table_name, shard, shard_node) {
			return shard_node.knex.seed.make(name, shard_node.config.seeds);
		});
	}
	seed_run(mode) {
		const self = this;
		const seed_nodes = self.get_seed_nodes();
		return self.run_with_nodes(seed_nodes, function (table_name, shard, shard_node) {
			return shard_node.knex.seed.run(shard_node.config.seeds);
		});
	}
	shard_plan(depth, order) {
		// order is either time or key
		function split(ranges, order) {
			const divided = ranges
				.map(function (range) {
					const first_end = range[0] + (range[1] - range[0]) / 2n - 1n;
					const second_start = range[0] + (range[1] - range[0]) / 2n;
					return [
						[range[0], first_end],
						[second_start, range[1]],
					];
				})
				.flat();
			if (order === "time") {
				return order_ranges(divided);
			} else if (order === "key") {
				return divided;
			} else {
				return divided;
			}
		}
		function order_ranges(ranges) {
			const even = ranges.filter(function (range, idx) {
				return idx % 2 === 0;
			});
			const odd = ranges.filter(function (range, idx) {
				return idx % 2 === 1;
			});
			return even.concat(odd);
		}
		function ranges(depth, order) {
			const initial_range = [[0n, 340282366920938463463374607431768211455n]];
			let divided = initial_range;
			for (var i = 0; i < depth; i += 1) {
				divided = split(divided, order);
			}
			return divided.map(function (segment) {
				return {
					start: segment[0],
					end: segment[1],
				};
			});
		}
		return new Promise(function (resolve, reject) {
			return resolve(ranges(depth, order));
		});
	}
}

const DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL = DatabaseManager;

export { DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL };
