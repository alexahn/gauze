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
	get_shard_node_key(shard_node_config) {
		if (shard_node_config.client === "better-sqlite3") {
			return shard_node_config.connection.filename;
		} else {
			return JSON.stringify({
				host: shard_node_config.connection.host,
				port: shard_node_config.connection.port,
				user: shard_node_config.connection.user,
				database: shard_node_config.connection.database,
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
					const node_key = self.get_shard_node_key(node.config);
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
					tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
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
		if (shard_type === "read") {
			console.log("hit");
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
					// return all sets
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
					// should be impossible
					return [];
				}
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
						const entity_shard_node = self.get_one_shard_node(entity_shard, shard_type);
						const to_shard_node = self.get_one_shard_node(to_shard, shard_type);
						const from_shard_node = self.get_one_shard_node(from_shard, shard_type);
						return [entity_shard_node, to_shard_node, from_shard_node];
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
		return [];
	}
	route_entity_connections(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		if (relationships === undefined) {
			// non-relationship query
			// primary key check
			if (parameters.where) {
				if (parameters.where[model.primary_key]) {
					const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
					/*
					const model_shard = self.databases[model.table_name].current.find(function (shard) {
						return shard.start <= primary_key_number && primary_key_number <= shard.end;
					});
					*/
					const model_shards = self.find_shards(model.table_name, primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						/*
						const model_shard_nodes = model_shard[shard_type];
						return [model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)]];
						*/
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else {
					// return all shards, selecting one random per shard type allocation
					/*
					return self.databases[model.table_name].current.map(function (model_shard) {
						const model_shard_nodes = model_shard[shard_type];
						return model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)];
					});
					*/
					return self.get_all_shards_nodes(model.table_name, shard_type);
				}
			} else if (parameters.attributes) {
				if (parameters.attributes[model.primary_key]) {
					const primary_key_number = self.uuid_to_big_int(parameters.attributes[model.primary_key]);
					/*
					const model_shard = self.databases[model.table_name].current.find(function (shard) {
						return shard.start <= primary_key_number && primary_key_number <= shard.end;
					});
					*/
					const model_shards = self.find_shards(model.table_name, primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						/*
						const model_shard_nodes = model_shard[shard_type];
						return [model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)]];
						*/
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else {
					// should not be possible
					return [];
					// return all shards, selecting one random per shard type allocation
					/*
					return self.databases[model.table_name].current.map(function (model_shard) {
						const model_shard_nodes = model_shard[shard_type];
						return model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)];
					});
					*/
				}
			} else {
				return [];
			}
		} else if (Array.isArray(relationships)) {
			// relationship query
			if (parameters.where) {
				if (parameters.where[model.primary_key]) {
					const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
					/*
					const model_shard = self.databases[model.table_name].current.find(function (shard) {
						return shard.start <= primary_key_number && primary_key_number <= shard.end;
					});
					*/
					const model_shards = self.find_shards(model.table_name, primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						/*
						const model_shard_nodes = model_shard[shard_type];
						return [model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)]];
						*/
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else {
					// use relationships to constrain the set of connections we need to check
					return [];
				}
			} else if (parameters.attributes) {
				if (parameters.attributes[model.primary_key]) {
					const primary_key_number = self.uuid_to_big_int(parameters.attributes[model.primary_key]);
					/*
					const model_shard = self.databases[model.table_name].current.find(function (shard) {
						return shard.start <= primary_key_number && primary_key_number <= shard.end;
					});
					*/
					const model_shards = self.find_shards(model.table_name, primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						/*
						const model_shard_nodes = model_shard[shard_type];
						return [model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)]];
						*/
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
					}
				} else {
					// should not be possible
					return [];
				}
			} else {
				return [];
			}
		} else {
			throw new Error("Invalid relationships, must be either undefined or an array");
		}
	}
	route_connections(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		if (!self.databases[model.table_name]) throw new Error(`Database routing/sharding configuration is not defined for table: ${model.table_name}`);
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
		//console.log("connections", connections);
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
					console.log("FOUND");
					return context.transactions[connection.key].then(function (transaction) {
						return {
							connection: self.get_connection(connection.key),
							transaction: transaction,
						};
					});
				} else {
					console.log("NOT FOUND");
					const transaction_promise = new Promise(function (resolve, reject) {
						connection.knex.transaction(function (transaction) {
							resolve(transaction);
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
	commit_transactions(context) {
		console.log("committing transactions");
		return Promise.all(Object.values(transactions)).then(function (transactions) {
			return Promise.all(
				transactions.map(function (transaction) {
					return transaction.commit();
				}),
			);
		});
	}
	rollback_transactions(transactions) {
		console.log("rolling back transactions");
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
		console.log("destroying connections");
		return Object.values(self.connections).map(function (connection) {
			delete self.connections[connection.key];
			return connection.destroy();
		});
	}
}

const DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL = DatabaseManager;

export { DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL };
