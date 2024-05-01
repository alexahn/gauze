import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { v4 as uuidv4 } from "uuid";

import * as $structure from "./../../structure/index.js";

import { Model } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

class SystemModel extends Model {
	constructor(root_config, graphql_config) {
		super(root_config);
		const self = this;
		const { schema, schema_name } = graphql_config;
		self.schema = schema;
		self.schema_name = schema_name;
		if ($structure.whitelist) {
			self.whitelist_table = $structure.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${self.name}.constructor:WARNING`, new Error("Whitelist structure not found"));
		}
		if ($structure.blacklist) {
			self.blacklist_table = $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${self.name}.constructor:WARNING`, new Error("Blacklist structure not found"));
		}
		self.name = self.__name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.constructor:exit`);
	}
	static _class_name(schema_name) {
		return schema_name ? `(${schema_name})[${super._class_name()}]SystemModel` : `[${super._class_name()}]SystemModel`;
	}
	__name() {
		const self = this;
		return SystemModel._class_name(self.schema_name);
	}
	_read_null_whitelist(context, access, method) {
		const self = this;
		const { database, transaction } = context;
		const { entity_type, agent_id } = access;
		const sql = database(self.whitelist_table)
			.where({
				gauze__whitelist__realm: "system",
				gauze__whitelist__agent_id: agent_id,
				gauze__whitelist__entity_type: entity_type,
				gauze__whitelist__method: method,
			})
			.whereNull("gauze__whitelist__entity_id")
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_whitelist:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.gauze__whitelist__entity_id;
			});
		});
	}
	// should return a list of ids
	_read_whitelist(context, access, method) {
		const self = this;
		const { database, transaction } = context;
		const { entity_type, agent_id } = access;
		const sql = database(self.whitelist_table)
			.where({
				gauze__whitelist__realm: "system",
				gauze__whitelist__agent_id: agent_id,
				gauze__whitelist__entity_type: entity_type,
				gauze__whitelist__method: method,
			})
			.whereNotNull("gauze__whitelist__entity_id")
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_whitelist:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.gauze__whitelist__entity_id;
			});
		});
	}
	_read_null_blacklist(context, access, method) {
		const self = this;
		const { database, transaction } = context;
		const { entity_type, agent_id } = access;
		const sql = database(self.blacklist_table)
			.where({
				gauze__blacklist__realm: "system",
				gauze__blacklist__agent_id: agent_id,
				gauze__blacklist__entity_type: entity_type,
				gauze__blacklist__method: method,
			})
			.whereNull("gauze__blacklist__entity_id")
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_blacklist:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.gauze__blacklist__entity_id;
			});
		});
	}
	// should return a list of ids
	_read_blacklist(context, access, method) {
		const self = this;
		const { database, transaction } = context;
		const { entity_type, agent_id } = access;
		const sql = database(self.blacklist_table)
			.where({
				gauze__blacklist__realm: "system",
				gauze__blacklist__agent_id: agent_id,
				gauze__blacklist__entity_type: entity_type,
				gauze__blacklist__method: method,
			})
			.whereNotNull("gauze__blacklist__entity_id")
			.limit(4294967296)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_blacklist:debug_sql`, sql.toString());
		}
		return sql.then(function (rows) {
			return rows.map(function (row) {
				return row.gauze__blacklist__entity_id;
			});
		});
	}
	_execute(context, operation_source, operation_variables) {
		const self = this;
		const { operation, operation_name } = operation_source;
		return EXECUTE__GRAPHQL__SHELL__KERNEL({
			schema: self.schema,
			context,
			operation,
			operation_name,
			operation_variables,
		}).then(function (data) {
			if (data.errors && data.errors.length) {
				// should we make a new error here?
				// todo: figure out if we need to log here or not
				console.log(data.errors);
				// throw the first error
				throw data.errors[0];
			} else {
				return Promise.resolve(data);
			}
		});
	}
	_access_execute(context, input, access, method, operation) {
		const self = this;
		const { source, database, transaction } = context;
		if (self.entity.methods[method].privacy === "private") {
			// null is table wide whitelist
			return self._read_null_whitelist(context, access, method).then(function (valid_null_ids) {
				if (valid_null_ids && valid_null_ids.length) {
					LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}:_access_execute`, "access:agent_id", access.agent_id);
					LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}:_access_execute`, "access:valid_null_ids", valid_null_ids);
					return self._execute(context, operation, input);
				} else {
					if (method === "create") {
						// todo: change this to return an empty response
						throw new Error("Agent does not have access to this method");
					} else {
						return self._read_whitelist(context, access, method).then(function (valid_ids) {
							LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}:_access_execute`, "access:agent_id", access.agent_id);
							LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}:_access_execute`, "access:valid_ids", valid_ids);
							// construct a where in array
							// make a key and store the array in lru cache
							// send the key into the query as cached_where_in
							// replace input.where_in for now, but do intersection logic in the future
							input.where_in = {
								[self.entity.primary_key]: valid_ids,
							};
							return self._execute(context, operation, input);
						});
					}
				}
			});
		} else if (self.entity.methods[method].privacy === "public") {
			// null is table wide blacklist
			return self._read_null_blacklist(context, access, method).then(function (valid_null_ids) {
				if (valid_null_ids && valid_null_ids.length) {
					// we don't know the shape of the query here
					// todo: we need to add a parameter to all operations for the database graphql interface so that it just short circuits and returns no results
					// note: for now just throw an error
					throw new Error("Agent does not have access to this method");
				} else {
					if (method === "create") {
						return self._execute(context, operation, input);
					} else {
						return self._read_blacklist(context, access, method).then(function (invalid_ids) {
							LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}:_access_execute`, "access:agent_id", access.agent_id);
							LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}:_access_execute`, "access:invalid_ids", invalid_ids);
							input.where_not_in = {
								[self.entity.primary_key]: invalid_ids,
							};
							return self._execute(context, operation, input);
						});
					}
				}
			});
		} else {
			return Promise.reject(new Error("Privacy policy does not exist for this method"));
		}
	}
	_create(context, input, access, operation) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			input.parent = source._metadata;
		}
		if (!input.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		if (!input.attributes[self.entity.primary_key]) {
			input.attributes[self.entity.primary_key] = uuidv4();
		}
		input.whitelist_create = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: access.agent_id,
			gauze__whitelist__entity_type: access.entity_type,
			gauze__whitelist__entity_id: input.attributes[self.entity.primary_key],
			gauze__whitelist__method: "create",
		};
		input.whitelist_read = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: access.agent_id,
			gauze__whitelist__entity_type: access.entity_type,
			gauze__whitelist__entity_id: input.attributes[self.entity.primary_key],
			gauze__whitelist__method: "read",
		};
		input.whitelist_update = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: access.agent_id,
			gauze__whitelist__entity_type: access.entity_type,
			gauze__whitelist__entity_id: input.attributes[self.entity.primary_key],
			gauze__whitelist__method: "update",
		};
		input.whitelist_delete = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: access.agent_id,
			gauze__whitelist__entity_type: access.entity_type,
			gauze__whitelist__entity_id: input.attributes[self.entity.primary_key],
			gauze__whitelist__method: "delete",
		};
		return self._access_execute(context, input, access, "create", operation);
	}
	_read(context, input, access, operation) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			input.parent = source._metadata;
		}
		return self._access_execute(context, input, access, "read", operation);
	}
	_update(context, input, access, operation) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			input.parent = source._metadata;
		}
		if (!input.attributes) {
			throw new Error("Field 'attributes' is required");
		}
		return self._access_execute(context, input, access, "update", operation);
	}
	_delete(context, input, access, operation) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			input.parent = source._metadata;
		}
		return self._access_execute(context, input, access, "delete", operation);
	}
}

export { SystemModel };
