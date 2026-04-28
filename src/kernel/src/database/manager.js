import * as $abstract from "./../../../abstract/index.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

import knex from "knex";

class DatabaseManager {
	// config is top level database config
	constructor(config) {
		const self = this;
		self.validate_config(config);
		self.config = config;
		// key for connections map is the shard key
		self.connections = {};
		self.databases = self.create_connections(config);
		self.relationship_table = $abstract.entities.relationship ? $abstract.entities.relationship.default($abstract).table_name : "undefined";
		self.whitelist_table = $abstract.entities.whitelist ? $abstract.entities.whitelist.default($abstract).table_name : "undefined";
		self.blacklist_table = $abstract.entities.blacklist ? $abstract.entities.blacklist.default($abstract).table_name : "undefined";
	}
	validate_config(config) {
		function is_non_null_object(value) {
			return value !== null && typeof value === "object";
		}
		const valid_environment_keys = {};
		Object.keys($abstract.entities).forEach(function (key) {
			const entity = $abstract.entities[key].default($abstract);
			valid_environment_keys[entity.table_name] = true;
		});

		const required_table_keys = {
			previous: true,
			current: true,
			next: true,
		};

		const valid_table_keys = {
			...required_table_keys,
			connection_router: true,
		};

		const valid_shard_keys = {
			id: true,
			start: true,
			end: true,
			read: true,
			write: true,
		};

		const valid_shard_node_keys = {
			id: true,
			transaction_isolation_level: true,
			config: true,
		};

		const valid_knex_config_keys = {
			client: true,
			connection: true,
			migrations: true,
			seeds: true,
		};

		const valid_knex_migration_config_keys = {
			directory: true,
		};

		const valid_knex_seed_config_keys = {
			directory: true,
		};

		function validate_knex_seeds(path, seeds, key) {
			if (!is_non_null_object(seeds)) throw new Error(`Database config property '${path}' must be of type 'object', ${seeds} is not of type 'object'`);
			Object.keys(valid_knex_seed_config_keys).forEach(function (key) {
				const seed_path = `${path}.${key}`;
				if (seeds[key] === undefined) throw new Error(`Database config property '${seed_path}' must be defined`);
			});
		}

		function validate_knex_migrations(path, migrations, key) {
			if (!is_non_null_object(migrations)) throw new Error(`Database config property '${path}' must be of type 'object', ${migrations} is not of type 'object'`);
			Object.keys(valid_knex_migration_config_keys).forEach(function (key) {
				const migration_path = `${path}.${key}`;
				if (migrations[key] === undefined) throw new Error(`Database config property '${migration_path}' must be defined`);
			});
		}

		function validate_knex_config(path, knex_config, key) {
			if (!is_non_null_object(knex_config)) throw new Error(`Database config property '${path}' must be of type 'object', ${knex_config} is not of type 'object'`);
			Object.keys(valid_knex_config_keys).forEach(function (key) {
				const knex_config_path = `${path}.${key}`;
				if (knex_config[key] === undefined) throw new Error(`Database config property '${knex_config_path}' must be defined`);
			});
			Object.keys(knex_config).forEach(function (key) {
				const knex_config_path = `${path}.${key}`;
				if (key === "client") {
					const client = knex_config[key];
					if (typeof client !== "string") throw new Error(`Database config property '${knex_config_path}' must be of type 'string', ${client} is not of type 'string'`);
				} else if (key === "connection") {
					const connection = knex_config[key];
					if (!is_non_null_object(connection)) throw new Error(`Database config property '${knex_config_path}' must be of type 'object', ${connection} is not of type 'object'`);
				} else if (key === "migrations") {
					const migrations = knex_config[key];
					validate_knex_migrations(knex_config_path, migrations, key);
				} else if (key === "seeds") {
					const seeds = knex_config[key];
					validate_knex_seeds(knex_config_path, seeds, key);
				} else {
					// allow other keys, don't throw an error
				}
			});
		}

		function validate_shard_node(path, shard_node, key) {
			if (!is_non_null_object(shard_node)) throw new Error(`Database config property '${path}' must be of type 'object', ${shard_node} is not of type 'object'`);
			Object.keys(valid_shard_node_keys).forEach(function (key) {
				const shard_node_path = `${path}.${key}`;
				if (shard_node[key] === undefined) throw new Error(`Database config property '${shard_node_path}' must be defined`);
			});
			Object.keys(shard_node).forEach(function (key) {
				const shard_node_path = `${path}.${key}`;
				if (key === "id") {
					const id = shard_node[key];
					if (typeof id !== "string") throw new Error(`Database config property '${shard_node_path}' must be of type 'string', ${id} is not of type 'string'`);
				} else if (key === "transaction_isolation_level") {
					const transaction_isolation_level = shard_node[key];
					if (typeof transaction_isolation_level !== "string")
						throw new Error(`Database config property '${shard_node_path}' must be of type 'string', ${transaction_isolation_level} is not of type 'string'`);
				} else if (key === "config") {
					const knex_config = shard_node[key];
					validate_knex_config(shard_node_path, knex_config, key);
				} else {
					throw new Error(`Database config property '${shard_node_path}' is invalid, property '${key}' must be one of: ${Object.keys(valid_shard_node_keys)}`);
				}
			});
		}

		function validate_shard_type(path, shard_type, key) {
			if (!Array.isArray(shard_type)) throw new Error(`Database config property '${path}' must be of type 'Array', ${shard_type} is not of type 'Array'`);
			if (shard_type.length === 0) throw new Error(`Database config property '${path}' must contain at least one shard node`);
			const shard_node_ids = {};
			Object.keys(shard_type).forEach(function (key) {
				const shard_type_path = `${path}.${key}`;
				const shard_node = shard_type[key];
				validate_shard_node(shard_type_path, shard_node, key);
				if (shard_node_ids[shard_node.id]) {
					throw new Error(`Database config property '${shard_type_path}.id' is invalid, shard node id '${shard_node.id}' must be unique within ${path}`);
				}
				shard_node_ids[shard_node.id] = true;
			});
		}

		function validate_shard(path, shard, key) {
			if (!is_non_null_object(shard)) throw new Error(`Database config property '${path}' must be of type 'object', ${shard} is not of type 'object'`);
			Object.keys(valid_shard_keys).forEach(function (key) {
				const shard_path = `${path}.${key}`;
				if (shard[key] === undefined) throw new Error(`Database config property '${shard_path}' must be defined`);
			});
			Object.keys(shard).forEach(function (key) {
				const shard_path = `${path}.${key}`;
				if (key === "id") {
					const id = shard[key];
					if (typeof id !== "string") throw new Error(`Database config property '${shard_path}' must be of type 'string', ${id} is not of type 'string'`);
				} else if (key === "start") {
					const start = shard[key];
					if (typeof start !== "bigint") throw new Error(`Database config property '${shard_path}' must be of type 'bigint', ${start} is not of type 'bigint'`);
				} else if (key === "end") {
					const end = shard[key];
					if (typeof end !== "bigint") throw new Error(`Database config property '${shard_path}' must be of type 'bigint', ${end} is not of type 'bigint'`);
				} else if (key === "read") {
					const read = shard[key];
					validate_shard_type(shard_path, read, key);
				} else if (key === "write") {
					const write = shard[key];
					validate_shard_type(shard_path, write, key);
				} else {
					throw new Error(`Database config property '${path}' is invalid, property '${key}' must be one of: ${Object.keys(valid_shard_keys)}`);
				}
			});
		}

		function validate_sequence_fields(path, sequence) {
			const shard_ids = {};
			Object.keys(sequence).forEach(function (key) {
				const sequence_path = `${path}.${key}`;
				const shard = sequence[key];
				validate_shard(sequence_path, shard, key);
				if (shard_ids[shard.id]) {
					throw new Error(`Database config property '${sequence_path}.id' is invalid, shard id '${shard.id}' must be unique within ${path}`);
				}
				shard_ids[shard.id] = true;
				if (shard.start > shard.end) {
					throw new Error(`Database config property '${sequence_path}' is invalid, shard.start must be less than or equal to shard.end`);
				}
			});
		}

		function validate_sequence_ranges(path, sequence) {
			const minimum_primary_key = 0n;
			const maximum_primary_key = 340282366920938463463374607431768211455n;
			const sorted_sequence = sequence
				.map(function (shard, original_idx) {
					return { shard, original_idx };
				})
				.sort(function (left, right) {
					if (left.shard.start < right.shard.start) return -1;
					if (left.shard.start > right.shard.start) return 1;
					return 0;
				});
			let previous_end = null;
			sorted_sequence.forEach(function ({ shard, original_idx }) {
				if (previous_end === null) {
					if (shard.start !== minimum_primary_key) {
						throw new Error(`Database config property '${path}.${original_idx}.start' must be ${minimum_primary_key}n`);
					}
				} else if (shard.start !== previous_end + 1n) {
					throw new Error(`Database config property '${path}.${original_idx}.start' must immediately follow the previous shard end`);
				}
				if (previous_end !== null && shard.start <= previous_end) {
					throw new Error(`Database config property '${path}.${original_idx}.start' overlaps with another shard range`);
				}
				previous_end = shard.end;
			});
			if (previous_end !== null && previous_end !== maximum_primary_key) {
				throw new Error(`Database config property '${path}' must end at ${maximum_primary_key}n`);
			}
		}

		function validate_sequence(path, sequence, key) {
			if (!Array.isArray(sequence)) throw new Error(`Database config property '${path}' must be of type 'Array', ${sequence} is not of type 'Array'`);
			if (sequence.length === 0) {
				if (key === "current") {
					throw new Error(`Database config property '${path}' must contain at least one shard`);
				}
				return;
			}
			validate_sequence_fields(path, sequence);
			validate_sequence_ranges(path, sequence);
		}

		function validate_table(path, table, key) {
			if (!is_non_null_object(table)) throw new Error(`Database config property '${path}' must be of type 'object', ${table} is not of type 'object'`);
			Object.keys(required_table_keys).forEach(function (key) {
				const table_path = `${path}.${key}`;
				if (table[key] === undefined) throw new Error(`Database config property '${table_path}' must be defined`);
			});
			Object.keys(table).forEach(function (key) {
				const table_path = `${path}.${key}`;
				if (key === "connection_router") {
					const connection_router = table[key];
					if (typeof connection_router !== "function") {
						throw new Error(`Database config property '${table_path}' must be of type 'function', ${connection_router} is not of type 'function'`);
					}
				} else if (valid_table_keys[key]) {
					const sequence = table[key];
					validate_sequence(table_path, sequence, key);
				} else {
					throw new Error(`Database config property '${path}' is invalid, property '${key}' must be one of: ${Object.keys(valid_table_keys)}`);
				}
			});
		}

		function validate_environment(path, environment, key) {
			if (!is_non_null_object(environment)) throw new Error(`Database config property '${path}' must be of type 'object', ${environment} is not of type 'object'`);
			Object.keys(valid_environment_keys).forEach(function (key) {
				const environment_path = `${path}.${key}`;
				if (environment[key] === undefined) throw new Error(`Database config property '${environment_path}' must be defined`);
			});
			Object.keys(environment).forEach(function (key) {
				const environment_path = `${path}.${key}`;
				if (!valid_environment_keys[key]) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write(
						"5",
						import.meta.filename,
						"DatabaseManager.validate_config:WARNING",
						new Error(`Database config property '${environment_path}' does not match a registered entity table name yet`),
					);
				}
				const table = environment[key];
				validate_table(environment_path, table, key);
			});
		}

		let path = "";
		Object.keys(config).forEach(function (key) {
			path = key;
			const environment = config[key];
			validate_environment(path, environment, key);
		});
	}
	uuid_to_big_int(uuid) {
		const bigIntValue = BigInt("0x" + uuid.replace(/-/g, ""));
		return bigIntValue;
	}
	big_int_to_uuid(big_int) {
		// Convert BigInt to hex and pad to 32 characters (128 bits)
		let hex = big_int.toString(16).padStart(32, "0");

		// Insert hyphens at 8-4-4-4-12 positions
		return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
	}
	get_shard_node_connection_key(shard_node) {
		if (shard_node.config.client === "better-sqlite3" || shard_node.config.client === "sqlite3") {
			// we only key on the fields that identify the underlying database target; other knex config fields are intentionally ignored
			return JSON.stringify({
				client: shard_node.config.client,
				transaction_isolation_level: shard_node.transaction_isolation_level,
				filename: shard_node.config.connection.filename,
			});
		} else {
			// we only key on the fields that identify the underlying database target; other knex config fields are intentionally ignored
			return JSON.stringify({
				client: shard_node.config.client,
				transaction_isolation_level: shard_node.transaction_isolation_level,
				host: shard_node.config.connection.host,
				port: shard_node.config.connection.port,
				user: shard_node.config.connection.user,
				database: shard_node.config.connection.database,
				searchPath: shard_node.config.searchPath,
				ssl: shard_node.config.connection.ssl,
			});
		}
	}
	get_shard_node_migration_key(shard_node) {
		if (shard_node.config.client === "better-sqlite3" || shard_node.config.client === "sqlite3") {
			return JSON.stringify({
				client: shard_node.config.client,
				filename: shard_node.config.connection.filename,
				directory: shard_node.config.migrations.directory,
			});
		} else {
			return JSON.stringify({
				client: shard_node.config.client,
				host: shard_node.config.connection.host,
				port: shard_node.config.connection.port,
				user: shard_node.config.connection.user,
				database: shard_node.config.connection.database,
				searchPath: shard_node.config.searchPath,
				ssl: shard_node.config.connection.ssl,
				directory: shard_node.config.migrations.directory,
			});
		}
	}
	get_shard_node_seed_key(shard_node) {
		if (shard_node.config.client === "better-sqlite3" || shard_node.config.client === "sqlite3") {
			return JSON.stringify({
				client: shard_node.config.client,
				filename: shard_node.config.connection.filename,
				directory: shard_node.config.seeds.directory,
			});
		} else {
			return JSON.stringify({
				client: shard_node.config.client,
				host: shard_node.config.connection.host,
				port: shard_node.config.connection.port,
				user: shard_node.config.connection.user,
				database: shard_node.config.connection.database,
				searchPath: shard_node.config.searchPath,
				ssl: shard_node.config.connection.ssl,
				directory: shard_node.config.seeds.directory,
			});
		}
	}
	get_connection(shard_node_key) {
		const self = this;
		return self.connections[shard_node_key];
	}
	get_shard_node_key(shard_node) {
		const self = this;
		return self.get_shard_node_connection_key(shard_node);
	}
	get_shard_node_knex(shard_node) {
		const self = this;
		return self.get_connection(self.get_shard_node_key(shard_node));
	}
	// create knex connections for every shard, every shard node will have a knex attribute with the instantiated knex object
	create_connections(config) {
		if (process.env.GAUZE_ENV === undefined) {
			// note: we are assuming the CLI is being used for the first time
			// note: maybe we should create these connections when we run applications instead of in the constructor?
			return {};
		} else {
			if (!config[process.env.GAUZE_ENV]) throw new Error(`Database config is not defined for environment ${process.env.GAUZE_ENV}`);
		}
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
					if (!self.connections[node_key]) {
						self.connections[node_key] = knex(node.config);
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
		return self.connections;
	}
	get_table_database(table_name) {
		const self = this;
		const table_database = self.databases[table_name];
		if (!table_database) {
			throw new Error(`Database routing/sharding configuration is not defined for table: ${table_name}`);
		}
		return table_database;
	}
	find_shards(table_name, primary_key_number) {
		const self = this;
		const table_database = self.get_table_database(table_name);
		return table_database.current.filter(function (shard) {
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
		return self.unique_shards(mapped_shards);
	}
	get_current_shards(table_name) {
		const self = this;
		return self.get_table_database(table_name).current;
	}
	unique_shards(shards) {
		const unique_shards = [
			...new Map(
				shards.map(function (shard) {
					return [shard.id, shard];
				}),
			).values(),
		];
		return unique_shards;
	}
	intersect_shards(shards, constraint_shards) {
		const constraint_shard_ids = new Set(
			constraint_shards.map(function (shard) {
				return shard.id;
			}),
		);
		return shards.filter(function (shard) {
			return constraint_shard_ids.has(shard.id);
		});
	}
	find_shards_for_range(table_name, primary_key_range) {
		const self = this;
		const table_database = self.get_table_database(table_name);
		const [start_primary_key, end_primary_key] = primary_key_range;
		const has_start_primary_key = start_primary_key !== null && typeof start_primary_key !== "undefined";
		const has_end_primary_key = end_primary_key !== null && typeof end_primary_key !== "undefined";
		const start_primary_key_number = has_start_primary_key
			? self.uuid_to_big_int(start_primary_key)
			: table_database.current.reduce(function (min, shard) {
					return shard.start < min ? shard.start : min;
				}, table_database.current[0].start);
		const end_primary_key_number = has_end_primary_key
			? self.uuid_to_big_int(end_primary_key)
			: table_database.current.reduce(function (max, shard) {
					return shard.end > max ? shard.end : max;
				}, table_database.current[0].end);
		if (end_primary_key_number < start_primary_key_number) {
			return [];
		}
		return table_database.current.filter(function (shard) {
			return shard.start <= end_primary_key_number && start_primary_key_number <= shard.end;
		});
	}
	find_shards_for_between(table_name, primary_key, where_between) {
		const self = this;
		if (!where_between || !Object.prototype.hasOwnProperty.call(where_between, primary_key)) {
			return null;
		}
		return self.find_shards_for_range(table_name, where_between[primary_key]);
	}
	filter_shards_for_between(shards, table_name, primary_key, where_between) {
		const self = this;
		const between_shards = self.find_shards_for_between(table_name, primary_key, where_between);
		if (between_shards === null) {
			return shards;
		}
		return self.intersect_shards(shards, between_shards);
	}
	find_shard_for_primary_key(table_name, primary_key) {
		const self = this;
		const primary_key_number = self.uuid_to_big_int(primary_key);
		const shards = self.find_shards(table_name, primary_key_number);
		const shard = shards[0];
		if (shard) {
			return shard;
		} else {
			throw new Error(`Could not find shard for table: ${table_name} and primary key: ${primary_key}`);
		}
	}
	filter_shards_for_primary_key_filters(shards, table_name, primary_key, parameters = {}) {
		const self = this;
		parameters = parameters || {};
		let filtered_shards = shards;
		const where_filter_exists = parameters.where && Object.prototype.hasOwnProperty.call(parameters.where, primary_key);
		const where_in_filter_exists = parameters.where_in && Object.prototype.hasOwnProperty.call(parameters.where_in, primary_key);
		if (where_filter_exists) {
			const primary_key_shard = self.find_shard_for_primary_key(table_name, parameters.where[primary_key]);
			filtered_shards = self.intersect_shards(filtered_shards, [primary_key_shard]);
		}
		if (where_in_filter_exists) {
			const primary_key_numbers = parameters.where_in[primary_key].map(function (primary_key) {
				return self.uuid_to_big_int(primary_key);
			});
			const primary_key_shards = self.find_shards_for_set(table_name, primary_key_numbers);
			filtered_shards = self.intersect_shards(filtered_shards, primary_key_shards);
		}
		filtered_shards = self.filter_shards_for_between(filtered_shards, table_name, primary_key, parameters.where_between);
		return self.filter_shards_for_between(filtered_shards, table_name, primary_key, parameters.cursor_where_between);
	}
	get_route_shard_nodes(context, shards, shard_type) {
		const self = this;
		if (shard_type === "read") {
			return self.get_preferred_read_shard_nodes(context, shards);
		} else if (shard_type === "write") {
			return self.get_shard_nodes(shards, shard_type);
		} else {
			throw new Error("Invalid shard type, must be either read or write");
		}
	}
	get_preferred_read_shard_nodes(context, shards) {
		const self = this;
		return shards.map(function (shard) {
			return self.get_preferred_read_shard_node(context, shard);
		});
	}
	get_shard_nodes(shards, shard_type) {
		const self = this;
		return shards.map(function (shard) {
			return self.get_one_shard_node(shard, shard_type);
		});
	}
	// randomly selects one node for the shard type on the shard
	get_one_shard_node(shard, shard_type) {
		const shard_nodes = shard[shard_type];
		return shard_nodes[Math.floor(Math.random() * shard_nodes.length)];
	}
	get_open_write_shard_node(context, shard) {
		const self = this;
		return shard.write.find(function (write_shard_node) {
			return context.transactions[self.get_shard_node_key(write_shard_node)];
		});
	}
	get_preferred_read_shard_node(context, shard) {
		const self = this;
		const write_shard_node = self.get_open_write_shard_node(context, shard);
		if (write_shard_node) {
			return write_shard_node;
		} else {
			return self.get_one_shard_node(shard, "read");
		}
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
							const from_shard_node = self.get_preferred_read_shard_node(context, from_shard);
							return [from_shard_node];
						} else {
							throw new Error(`Could not find shard for table: ${from_type} and primary key: ${from_id}`);
						}
					} else {
						if (to_shard) {
							const to_shard_node = self.get_preferred_read_shard_node(context, to_shard);
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
						const from_shard_node = self.get_preferred_read_shard_node(context, from_shard);
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
						const to_shard_node = self.get_preferred_read_shard_node(context, to_shard);
						return [to_shard_node];
					} else {
						throw new Error(`Could not find shard for table: ${to_type} and primary key: ${to_id}`);
					}
				} else {
					// shard-informative primary key filters should be applied here
					const shards = self.filter_shards_for_primary_key_filters(self.get_current_shards(model.table_name), model.table_name, model.primary_key, parameters);
					return self.get_route_shard_nodes(context, shards, shard_type);
				}
			} else {
				// shard-informative primary key filters should be applied here
				const shards = self.filter_shards_for_primary_key_filters(self.get_current_shards(model.table_name), model.table_name, model.primary_key, parameters);
				return self.get_route_shard_nodes(context, shards, shard_type);
			}
		} else if (shard_type === "write") {
			if (parameters.where) {
				if (parameters.attributes) {
					// updates are intentionally disabled for relationship rows
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

						if (entity_shard) {
							const constrained_entity_shards = self.filter_shards_for_primary_key_filters([entity_shard], entity_type, model.primary_key, parameters);
							if (constrained_entity_shards.length === 0) {
								return [];
							}
						}

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
				if (entity_id_attribute in parameters.where && entity_type_attribute in parameters.where) {
					const entity_id = parameters.where[entity_id_attribute];
					const entity_primary_key_number = entity_id === null ? 0n : self.uuid_to_big_int(entity_id);
					const entity_table_name = parameters.where[entity_type_attribute];
					const model_shards = self.find_shards(entity_table_name, entity_primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						return [self.get_preferred_read_shard_node(context, model_shard)];
					} else {
						throw new Error(`Could not find shard for table: ${entity_table_name} and primary key: ${entity_id}`);
					}
				} else if (agent_id_attribute in parameters.where && agent_type_attribute in parameters.where) {
					const agent_id = parameters.where[agent_id_attribute];
					const agent_primary_key_number = self.uuid_to_big_int(agent_id);
					const agent_table_name = parameters.where[agent_type_attribute];
					const model_shards = self.find_shards(agent_table_name, agent_primary_key_number);
					const model_shard = model_shards[0];
					if (model_shard) {
						return [self.get_preferred_read_shard_node(context, model_shard)];
					} else {
						throw new Error(`Could not find shard for table: ${agent_table_name} and primary key: ${agent_id}`);
					}
				} else {
					// shard-informative primary key filters should be applied here
					const shards = self.filter_shards_for_primary_key_filters(self.get_current_shards(model.table_name), model.table_name, model.primary_key, parameters);
					return self.get_route_shard_nodes(context, shards, shard_type);
				}
			} else {
				// shard-informative primary key filters should be applied here
				const shards = self.filter_shards_for_primary_key_filters(self.get_current_shards(model.table_name), model.table_name, model.primary_key, parameters);
				return self.get_route_shard_nodes(context, shards, shard_type);
			}
		} else if (shard_type === "write") {
			if (parameters.where) {
				if (parameters.attributes) {
					// updates are intentionally disabled for whitelist and blacklist rows
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
						const entity_primary_key_number = entity_id === null ? 0n : self.uuid_to_big_int(entity_id);

						const agent_id = parameters.where[agent_id_attribute];
						const agent_type = parameters.where[agent_type_attribute];
						const agent_primary_key_number = self.uuid_to_big_int(agent_id);

						const access_shards = self.find_shards(access_type, access_primary_key_number);
						const access_shard = access_shards[0];

						const entity_shards = self.find_shards(entity_type, entity_primary_key_number);
						const entity_shard = entity_shards[0];

						const agent_shards = self.find_shards(agent_type, agent_primary_key_number);
						const agent_shard = agent_shards[0];

						if (access_shard) {
							const constrained_access_shards = self.filter_shards_for_primary_key_filters([access_shard], access_type, model.primary_key, parameters);
							if (constrained_access_shards.length === 0) {
								return [];
							}
						}

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
						const entity_primary_key_number = entity_id === null ? 0n : self.uuid_to_big_int(entity_id);

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
				const shards = self.filter_shards_for_primary_key_filters(self.get_current_shards(model.table_name), model.table_name, model.primary_key, parameters);
				return self.get_route_shard_nodes(context, shards, shard_type);
			} else if (shard_type === "write") {
				const filters_exist =
					parameters.where || parameters.where_in || parameters.where_not_in || parameters.where_between || parameters.cursor_where_between || parameters.where_like;
				if (filters_exist) {
					const shards = self.filter_shards_for_primary_key_filters(self.get_current_shards(model.table_name), model.table_name, model.primary_key, parameters);
					return self.get_route_shard_nodes(context, shards, shard_type);
				} else if (parameters.attributes) {
					// create
					if (parameters.attributes[model.primary_key]) {
						const model_shard = self.find_shard_for_primary_key(model.table_name, parameters.attributes[model.primary_key]);
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						return [];
					}
				} else {
					return [];
				}
			} else {
				throw new Error("Invalid shard type, must be either read or write");
			}
		} else if (Array.isArray(relationships)) {
			function _parse_source(scope = {}, parameters = {}) {
				const { source } = scope || {};
				if (source && source._metadata && source._direction) {
					return source;
				} else {
					if (parameters && parameters.source && parameters.source._metadata && parameters.source._direction) {
						return parameters.source;
					} else {
						return null;
					}
				}
			}
			// relationship query
			const source = _parse_source(scope, parameters);
			if (!source) {
				throw new Error("Relationship routing requires a source with _metadata and _direction");
			}
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
			if (shard_type === "read") {
				const shards = self.filter_shards_for_primary_key_filters(relationship_shards, model.table_name, model.primary_key, parameters);
				return self.get_route_shard_nodes(context, shards, shard_type);
			} else if (shard_type === "write") {
				const filters_exist =
					parameters.where || parameters.where_in || parameters.where_not_in || parameters.where_between || parameters.cursor_where_between || parameters.where_like;
				if (filters_exist) {
					const shards = self.filter_shards_for_primary_key_filters(relationship_shards, model.table_name, model.primary_key, parameters);
					return self.get_route_shard_nodes(context, shards, shard_type);
				} else if (parameters.attributes) {
					// create
					if (parameters.attributes[model.primary_key]) {
						const model_shard = self.find_shard_for_primary_key(model.table_name, parameters.attributes[model.primary_key]);
						return [self.get_one_shard_node(model_shard, shard_type)];
					} else {
						return [];
					}
				} else {
					return [];
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
		const table_database = self.get_table_database(model.table_name);
		if (table_database.connection_router) {
			// note: allows for custom connection routing (for instances where someone wants to set up their own sharding scheme)
			return table_database.connection_router(context, scope, parameters, model, shard_type, relationships, self);
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
					return [self.get_shard_node_key(connection), connection];
				}),
			).values(),
		];
		// use context.transactions
		// for each connection, check to see if we have an open transaction on it for the context
		//console.log("unique connections in route_transactions", unique_connections);
		return Promise.all(
			unique_connections.map(function (connection) {
				// key is shard node key
				const connection_key = self.get_shard_node_key(connection);
				if (context.transactions[connection_key]) {
					return context.transactions[connection_key].then(function (transaction) {
						return {
							connection: self.get_connection(connection_key),
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
						return self
							.get_shard_node_knex(connection)
							.transaction(transaction_config)
							.then(function (trx) {
								return resolve(trx);
							})
							.catch(function (err) {
								return reject(err);
							});
					});
					context.transactions[connection_key] = transaction_promise;
					return transaction_promise
						.then(function (transaction) {
							return {
								connection: self.get_connection(connection_key),
								transaction,
							};
						})
						.catch(function (err) {
							delete context.transactions[connection_key];
							throw err;
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
		return self.commit_transactions(context.transactions).finally(function () {
			Object.keys(context.transactions).forEach(function (key) {
				delete context.transactions[key];
			});
		});
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
		return self.rollback_transactions(context.transactions).finally(function () {
			Object.keys(context.transactions).forEach(function (key) {
				delete context.transactions[key];
			});
		});
	}
	destroy_connections() {
		const self = this;
		return Promise.all(
			Object.entries(self.connections).map(function ([key, connection]) {
				delete self.connections[key];
				return connection.destroy();
			}),
		);
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
			return self.get_shard_node_knex(shard_node).migrate.make(name, shard_node.config.migrations);
		});
	}
	migrate_latest() {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			return self.get_shard_node_knex(shard_node).migrate.latest(shard_node.config.migrations);
		});
	}
	migrate_rollback() {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			return self.get_shard_node_knex(shard_node).migrate.rollback(shard_node.config.migrations);
		});
	}
	migrate_up(name) {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			const config = JSON.parse(JSON.stringify(shard_node.config.migrations));
			config.name = name;
			return self.get_shard_node_knex(shard_node).migrate.up(config);
		});
	}
	migrate_down(name) {
		const self = this;
		const migration_nodes = self.get_migration_nodes();
		return self.run_with_nodes(migration_nodes, function (table_name, shard, shard_node) {
			const config = JSON.parse(JSON.stringify(shard_node.config.migrations));
			config.name = name;
			return self.get_shard_node_knex(shard_node).migrate.down(config);
		});
	}
	migrate_current_version() {
		const self = this;
		const write_shards = self.get_write_shard_nodes();
		return Promise.all(
			write_shards.map(function (write_shard) {
				return self
					.get_shard_node_knex(write_shard.shard_node)
					.migrate.currentVersion(write_shard.shard_node.config.migrations)
					.then(function (version) {
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
				return self
					.get_shard_node_knex(write_shard.shard_node)
					.migrate.list(write_shard.shard_node.config.migrations)
					.then(function (list) {
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
			return self.get_shard_node_knex(shard_node).migrate.unlock(shard_node.config.migrations);
		});
	}
	seed_make(name) {
		const self = this;
		const seed_nodes = self.get_seed_nodes();
		return self.run_with_nodes(seed_nodes, function (table_name, shard, shard_node) {
			return self.get_shard_node_knex(shard_node).seed.make(name, shard_node.config.seeds);
		});
	}
	seed_run() {
		const self = this;
		const seed_nodes = self.get_seed_nodes();
		return self.run_with_nodes(seed_nodes, function (table_name, shard, shard_node) {
			return self.get_shard_node_knex(shard_node).seed.run(shard_node.config.seeds);
		});
	}
	shard_plan(depth, order) {
		// order is either time or key
		function split(ranges, order) {
			const divided = ranges
				.map(function (range) {
					const size = range[1] - range[0] + 1n;
					const midpoint = size / 2n;
					const first_end = range[0] + midpoint - 1n;
					const second_start = first_end + 1n;
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
