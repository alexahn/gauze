import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { v4 as uuidv4 } from "uuid";

import * as $abstract from "./../../abstract/index.js";
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
		if ($structure.entities.whitelist) {
			self.whitelist_table = $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${self.name}.constructor:WARNING`, new Error("Whitelist structure not found"));
		}
		if ($structure.entities.blacklist) {
			self.blacklist_table = $structure.entities.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE;
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
	// both agent and entity must be fully formed
	// authorization will check for authorization on both set and element scopes
	authorization(context, realm, agent, entity) {
		const self = this;
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		return self.authorization_set(context, realm, agent, entity).then(function (set_authorization) {
			if (method_privacy === "private") {
				if (set_authorization.status === true) {
					return set_authorization;
				} else {
					return self.authorization_element(context, realm, agent, entity);
				}
			} else if (method_privacy === "public") {
				if (set_authorization.status === false) {
					return set_authorization;
				} else {
					return self.authorization_element(context, realm, agent, entity);
				}
			} else {
				new Error("Authorization failed: privacy policy does not exist for this method");
			}
		});
	}
	// only checks element authorization (e.g. entity id cannot be null)
	authorization_element(context, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		if (!agent) {
			throw new Error("Authorization failed: missing agent");
		}
		if (!agent.agent_id) {
			throw new Error("Authorization failed: agent is missing 'agent_id' field");
		}
		if (!entity) {
			throw new Error("Authorization failed: missing entity");
		}
		if (!entity.entity_id) {
			throw new Error("Authorization failed: entity is missing 'entity_id' field");
		}
		if (!entity.entity_type) {
			throw new Error("Authorization failed: entity is missing 'entity_type' field");
		}
		if (!entity.entity_method) {
			throw new Error("Authorization failed: entity missing 'entity_method' field");
		}
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		if (method_privacy === "private") {
			const sql = database(self.whitelist_table)
				.where({
					gauze__whitelist__realm: realm,
					gauze__whitelist__agent_id: agent.agent_id,
					gauze__whitelist__entity_type: entity.entity_type,
					gauze__whitelist__entity_id: entity.entity_id,
					gauze__whitelist__method: entity.entity_method,
				})
				.whereNotNull("gauze__whitelist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_element:debug_sql`, sql.toString());
			}
			return sql.then(function (rows) {
				return {
					status: Boolean(rows && rows.length),
					scope: "element",
					agent: agent,
					entity: entity,
					privacy: method_privacy,
					records: rows,
				};
			});
		} else if (method_privacy === "public") {
			const sql = database(self.blacklist_table)
				.where({
					gauze__blacklist__realm: realm,
					gauze__blacklist__agent_role: "leaf",
					gauze__blacklist__agent_id: agent.agent_id,
					gauze__blacklist__entity_type: entity.entity_type,
					gauze__blacklist__entity_id: entity.entity_id,
					gauze__blacklist__method: entity.entity_method,
				})
				.whereNotNull("gauze__blacklist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_element:debug_sql`, sql.toString());
			}
			return sql.then(function (rows) {
				return {
					status: Boolean(!(rows && rows.length)),
					scope: "element",
					agent: agent,
					entity: entity,
					privacy: method_privacy,
					records: rows,
				};
			});
		} else {
			new Error("Authorization failed: privacy policy does not exist for this method");
		}
	}
	// only checks set authorization (e.g. entity_id must be null)
	authorization_set(context, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		if (!agent) {
			throw new Error("Authorization failed: missing agent");
		}
		if (!agent.agent_id) {
			throw new Error("Authorization failed: agent is missing 'agent_id' field");
		}
		if (!entity) {
			throw new Error("Authorization failed: missing entity");
		}
		if (!entity.entity_type) {
			throw new Error("Authorization failed: entity is missing 'entity_type' field");
		}
		if (!entity.entity_method) {
			throw new Error("Authorization failed: entity missing 'entity_method' field");
		}
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		if (method_privacy === "private") {
			const sql = database(self.whitelist_table)
				.where({
					gauze__whitelist__realm: realm,
					gauze__whitelist__agent_id: agent.agent_id,
					gauze__whitelist__entity_type: entity.entity_type,
					gauze__whitelist__method: entity.entity_method,
				})
				.whereNull("gauze__whitelist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_set:debug_sql`, sql.toString());
			}
			return sql.then(function (null_rows) {
				return {
					status: Boolean(null_rows && null_rows.length),
					scope: "set",
					agent: agent,
					entity: entity,
					privacy: method_privacy,
					records: null_rows,
				};
			});
		} else if (method_privacy === "public") {
			const sql = database(self.blacklist_table)
				.where({
					gauze__blacklist__realm: realm,
					// note: only leaf is applied to black list filter
					gauze__blacklist__agent_role: "leaf",
					gauze__blacklist__agent_id: agent.agent_id,
					gauze__blacklist__entity_type: entity.entity_type,
					gauze__blacklist__method: entity.entity_method,
				})
				.whereNull("gauze__blacklist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_set:debug_sql`, sql.toString());
			}
			return sql.then(function (null_rows) {
				// agent is unauthorized to act on set scope
				return {
					status: Boolean(!(null_rows && null_rows.length)),
					scope: "set",
					agent: agent,
					entity: entity,
					privacy: method_privacy,
					records: null_rows,
				};
			});
		} else {
			new Error("Authorization failed: privacy policy does not exist for this method");
		}
	}
	// method and entity_type must be set
	// this function is used to set where in and where not in
	authorization_filter(context, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		if (!agent) {
			throw new Error("Authorization failed: missing agent");
		}
		if (!agent.agent_id) {
			throw new Error("Authorization failed: agent is missing 'agent_id' field");
		}
		if (!entity) {
			throw new Error("Authorization failed: missing entity");
		}
		if (!entity.entity_type) {
			throw new Error("Authorization failed: entity is missing 'entity_type' field");
		}
		if (!entity.entity_method) {
			throw new Error("Authorization failed: entity missing 'entity_method' field");
		}
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		return self.authorization_set(context, realm, agent, entity).then(function (set_authorization) {
			if (method_privacy === "private") {
				if (set_authorization.status === true) {
					return set_authorization;
				} else {
					const sql = database(self.whitelist_table)
						.where({
							gauze__whitelist__realm: realm,
							gauze__whitelist__agent_id: agent.agent_id,
							gauze__whitelist__entity_type: entity.entity_type,
							gauze__whitelist__method: entity.entity_method,
						})
						.whereNotNull("gauze__whitelist__entity_id")
						.limit(4294967296)
						.transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_whitelist:debug_sql`, sql.toString());
					}
					return sql.then(function (rows) {
						return {
							status: null,
							scope: "element",
							agent: agent,
							entity: entity,
							privacy: method_privacy,
							records: rows,
						};
					});
				}
			} else if (method_privacy === "public") {
				if (set_authorization.status === false) {
					return set_authorization;
				} else {
					const sql = database(self.blacklist_table)
						.where({
							gauze__blacklist__realm: realm,
							gauze__blacklist__agent_role: "leaf",
							gauze__blacklist__agent_id: agent.agent_id,
							gauze__blacklist__entity_type: entity.entity_type,
							gauze__blacklist__method: entity.entity_method,
						})
						.whereNotNull("gauze__blacklist__entity_id")
						.limit(4294967296)
						.transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_whitelist:debug_sql`, sql.toString());
					}
					return sql.then(function (rows) {
						return {
							status: null,
							scope: "element",
							agent: agent,
							entity: entity,
							privacy: method_privacy,
							records: rows,
						};
					});
				}
			} else {
				new Error("Authorization failed: privacy policy does not exist for this method");
			}
		});
	}
	authorized_execute(context, parameters, agent, entity, operation) {
		const self = this;
		return self.authorization_filter(context, "system", agent, entity).then(function (auth) {
			if (auth.privacy === "private") {
				if (auth.scope === "set") {
					if (auth.status === true) {
						return self._execute(context, operation, parameters);
					} else if (auth.status === false) {
						throw new Error("Agent does not have access to this method");
					} else {
						throw new Error("Agent does not have access to this method: internal error: undefined");
					}
				} else if (auth.scope === "element") {
					if (entity.entity_method === "create") {
						throw new Error("Agent does not have access to this method");
					} else {
						const valid_ids = auth.records.map(function (record) {
							return record.gauze__whitelist__entity_id;
						});
						parameters.where_in = {
							[self.entity.primary_key]: valid_ids,
						};
						return self._execute(context, operation, parameters);
					}
				} else {
					throw new Error("Agent does not have access to this method: internal error: invalid scope");
				}
			} else if (auth.privacy === "public") {
				if (auth.scope === "set") {
					if (auth.status === true) {
						return self._execute(context, operation, parameters);
					} else if (auth.status === false) {
						throw new Error("Agent does not have access to this method");
					} else {
						throw new Error("Agent does not have access to this method: internal error: undefined");
					}
				} else if (auth.scope === "element") {
					if (entity.entity_method === "create") {
						return self._execute(context, operation, parameters);
					} else {
						const invalid_ids = auth.records.map(function (record) {
							return record.gauze__blacklist__entity_id;
						});
						parameters.where_not_in = {
							[self.entity.primary_key]: invalid_ids,
						};
						return self._execute(context, operation, parameters);
					}
				} else {
					throw new Error("Agent does not have access to this method: internal error");
				}
			} else {
				throw new Error("Privacy policy does not exist for this method");
			}
		});
	}
	_create(context, parameters, realm) {
		const self = this;
		const { source } = context;
		const { agent, entity, operation } = realm;
		entity.entity_method = "create";
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		// note: our architecture requires that the key is a uuid
		if (!parameters.attributes[self.entity.primary_key]) {
			parameters.attributes[self.entity.primary_key] = uuidv4();
		}
		parameters.whitelist_create = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "create",
		};
		parameters.whitelist_read = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "read",
		};
		parameters.whitelist_update = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "update",
		};
		parameters.whitelist_delete = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "delete",
		};
		parameters.blacklist_create = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "create",
		};
		parameters.blacklist_read = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "read",
		};
		parameters.blacklist_update = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "update",
		};
		parameters.blacklist_delete = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: "gauze__user", // change this based on agent type later but for now, let's use gauze__user
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "delete",
		};
		return self.authorized_execute(context, parameters, agent, entity, operation);
	}
	_read(context, parameters, realm) {
		const self = this;
		const { source } = context;
		const { agent, entity, operation } = realm;
		entity.entity_method = "read";
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		return self.authorized_execute(context, parameters, agent, entity, operation);
	}
	_update(context, parameters, realm) {
		const self = this;
		const { source } = context;
		const { agent, entity, operation } = realm;
		entity.entity_method = "update";
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		return self.authorized_execute(context, parameters, agent, entity, operation);
	}
	_delete(context, parameters, realm) {
		const self = this;
		const { source } = context;
		const { agent, entity, operation } = realm;
		entity.entity_method = "delete";
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		return self.authorized_execute(context, parameters, agent, entity, operation);
	}
}

export { SystemModel };
