import * as $abstract from "./../../../abstract/index.js";

import knex from "knex";

class DatabaseManager {
	// config is top level database config
	constructor(config) {
		const self = this;
		self.config = config;
		self.databases = self.create_connections(config);
		// key for connections map is the shard key
		self.connections = {};
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
	// create knex connections for every shard, every shard node will have a knex attribute with the instantiated knex object
	create_connections(config) {
		if (!config[process.env.GAUZE_ENV]) throw new Error(`Database config is not defined for environment ${process.env.GAUZE_ENV}`);
		const self = this;
		const database_environment = config[process.env.GAUZE_ENV];
		const database_tables = Object.keys(database_environment);
		database_tables.forEach(function (table) {
			const current_shards = table.current;
			current_shard.forEach(function (shard) {
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
	route_connections(context) {
		const self = this;
	}
	// context is graphql context
	route_transactions(context, query) {
		const self = this;
		const connections = self.route_connections(context);
		// use context.transactions
	}
	// context is graphql context
	commit_transactions(context) {
		// use context.transactions
	}
	// context is graphql context
	rollback_transactions(context) {
		// use context.transactions
	}
}

const DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL = DatabaseManager;

export { DATABASE_MANAGER__MANAGER__DATABASE__SRC__KERNEL };
