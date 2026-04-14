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
	route_connections(context, scope, parameters, model, shard_type, relationships) {
		const self = this;
		if (model.table_name === self.relationship_table) {
			return [];
		} else if (model.table_name === self.whitelist_table) {
			return [];
		} else if (model.table_name === self.blacklist_table) {
			return [];
		} else {
			if (relationships === undefined) {
				// non-relationship query
				// primary key check
				if (parameters.where) {
					if (parameters.where[model.primary_key]) {
						const primary_key_number = self.uuid_to_big_int(parameters.where[model.primary_key]);
						const model_shard = self.databases[model.table_name].current.find(function (shard) {
							return shard.start <= primary_key_number && primary_key_number <= shard.end;
						});
						if (model_shard) {
							const model_shard_nodes = model_shard[shard_type];
							return [model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)]];
						} else {
							throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
						}
					} else {
						// return all shards, selecting one random per shard type allocation
						return self.databases[model.table_name].current.map(function (model_shard) {
							const model_shard_nodes = model_shard[shard_type];
							return model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)];
						});
					}
				} else if (parameters.attributes) {
					if (parameters.attributes[model.primary_key]) {
						const primary_key_number = self.uuid_to_big_int(parameters.attributes[model.primary_key]);
						const model_shard = self.databases[model.table_name].current.find(function (shard) {
							return shard.start <= primary_key_number && primary_key_number <= shard.end;
						});
						if (model_shard) {
							const model_shard_nodes = model_shard[shard_type];
							return [model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)]];
						} else {
							throw new Error(`Could not find shard for table: ${model.table_name} and primary key: ${parameters.where[model.primary_key]}`);
						}
					} else {
						// return all shards, selecting one random per shard type allocation
						return self.databases[model.table_name].current.map(function (model_shard) {
							const model_shard_nodes = model_shard[shard_type];
							return model_shard_nodes[Math.floor(Math.random() * model_shard_nodes.length)];
						});
					}
				} else {
				}
			} else if (Array.isArray(relationships)) {
				// relationship query
				if (parameters.where[model.primary_key]) {
					return [];
				} else {
					// use relationships to constrain the set of connections we need to check
					return [];
				}
			} else {
				throw new Error("Invalid relationships, must be either undefined or an array");
			}
		}
	}
	// context is graphql context
	// should return an array of { connection, transaction }
	// shard_type is "read" or "write"
	route_transactions(context, scope, parameters, model, shard_type) {
		const self = this;
		const connections = self.route_connections(context, scope, parameters, model, shard_type);
		const unique_connections = [
			...new Map(
				connections.map(function (connection) {
					return [connection.key, connection];
				}),
			).values(),
		];
		// use context.transactions
		// for each connection, check to see if we have an open transaction on it for the context
		//console.log('unique connections in route_transactions', unique_connections)
		return Promise.all(
			unique_connections.map(function (connection) {
				// key is shard node key
				if (context.transactions[connection.key]) {
					console.log("FOUND");
					return {
						connection: self.get_connection(connection.key),
						transaction: context.transactions[connection.key],
					};
					//return context.transactions[connection.key];
				} else {
					return new Promise(function (resolve, reject) {
						connection.knex.transaction(function (transaction) {
							context.transactions[connection.key] = transaction;
							resolve({
								connection: self.get_connection(connection.key),
								transaction,
							});
						});
					});
					//return null;
				}
			}),
		);
	}
	// context is graphql context
	commit_transactions(context) {
		// use context.transactions
		/*
			context.transactions = { [shard_node_key]: transaction }
		*/
		return Promise.all(
			Object.values(context.transactions).map(function (transaction) {
				return transaction.commit();
			}),
		);
	}
	rollback_transactions(transactions) {
		//console.log("t", Object.values(transactions));
		return Promise.all(
			Object.values(transactions).map(function (transaction) {
				//console.log("r");
				return transaction.rollback();
			}),
		);
	}
	// context is graphql context
	rollback_context_transactions(context) {
		console.log("rolling back context transactions", context.transactions);
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
