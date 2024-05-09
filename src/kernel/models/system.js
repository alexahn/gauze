import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { v4 as uuidv4 } from "uuid";

import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import DataLoader from "./../dataloader.js";
import TTLLRUCache from "./../lru.js";

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
		self.auth_loader = new DataLoader(self._auth_batch, {
			cacheMap: new TTLLRUCache(1024, 1024),
		});
		self.auth_loader.model = self;
		self.model_loader = new DataLoader(self._model_batch, {
			cacheMap: new TTLLRUCache(1024, 1024),
		});
		self.model_loader.model = self;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.constructor:exit`);
	}
	static _class_name(schema_name) {
		return schema_name ? `(${schema_name})[${super._class_name()}]SystemModel` : `[${super._class_name()}]SystemModel`;
	}
	__name() {
		const self = this;
		return SystemModel._class_name(self.schema_name);
	}
	_auth_batch_key(realm, agent, entity, method) {
		return JSON.stringify({
			realm: realm,
			agent: agent,
			entity: entity,
			method: method,
		});
	}
	_auth_batch(contexts, keys) {
		// this is the dataloader instance
		const self = this;
		return Promise.all(
			keys.map(function (key, index) {
				const parsed = JSON.parse(key);
				if (parsed.method === "authorization") {
					return self.model._authorization(contexts[index], parsed.realm, parsed.agent, parsed.entity);
				} else if (parsed.method === "authorization_element") {
					return self.model._authorization_element(contexts[index], parsed.realm, parsed.agent, parsed.entity);
				} else if (parsed.method === "authorization_set") {
					return self.model._authorization_set(contexts[index], parsed.realm, parsed.agent, parsed.entity);
				} else if (parsed.method === "authorization_filter") {
					return self.model._authorization_filter(contexts[index], parsed.realm, parsed.agent, parsed.entity);
				} else {
					throw new Error("Internal error: invalid batch operation");
				}
			}),
		).then(function (results) {
			// tests will only pass if cache is turned off
			if (process.env.GAUZE_ENV === "TEST") {
				self.clearAll();
			}
			return results;
		});
	}
	_model_batch_key(parameters, realm, method) {
		// only take operation_name from operation
		return JSON.stringify({
			parameters: parameters,
			realm: realm,
			method: method,
		});
	}
	_model_batch(contexts, keys) {
		const self = this;
		return Promise.all(
			keys.map(function (key, index) {
				const parsed = JSON.parse(key);
				if (parsed.method === "create") {
					return self.model._root_create(contexts[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else if (parsed.method === "read") {
					return self.model._root_read(contexts[index], parsed.parameters, parsed.realm);
				} else if (parsed.method === "update") {
					return self.model._root_update(contexts[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else if (parsed.method === "delete") {
					return self.model._root_delete(contexts[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else {
					throw new Error("Internal error: invalid batch operation");
				}
			}),
		).then(function (results) {
			if (process.env.GAUZE_ENV === "TEST") {
				self.clearAll();
			}
			return results;
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
	// both agent and entity must be fully formed
	// authorization will check for authorization on both set and element scopes
	authorization(context, realm, agent, entity) {
		const self = this;
		const key = self._auth_batch_key(realm, agent, entity, "authorization");
		return self.auth_loader.load(context, key);
	}
	_authorization(context, realm, agent, entity) {
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
	authorization_element(context, realm, agent, entity) {
		const self = this;
		const key = self._auth_batch_key(realm, agent, entity, "authorization_element");
		return self.auth_loader.load(context, key);
	}
	// only checks element authorization (e.g. entity id cannot be null)
	_authorization_element(context, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		if (!agent) {
			//throw new Error("Authorization failed: missing agent");
			agent = {}
			agent.agent_id = null
			agent.agent_type = null
		}
		if (agent.agent_id !== null && typeof agent.agent_id !== "string") {
			throw new Error("Authorization failed: field 'agent_id' must be either null or of type string");
		}
		/*
		// note: we should be able to handle a null agent_id and have all authorization logic still work
		if (!agent.agent_id) {
			throw new Error("Authorization failed: agent is missing 'agent_id' field");
		}
		*/
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
					// note: only leaf is applied to blacklist authorization
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
	authorization_set(context, realm, agent, entity) {
		const self = this;
		const key = self._auth_batch_key(realm, agent, entity, "authorization_set");
		return self.auth_loader.load(context, key);
	}
	// only checks set authorization (e.g. entity_id must be null)
	_authorization_set(context, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		if (!agent) {
			//throw new Error("Authorization failed: missing agent");
			agent = {}
			agent.agent_id = null
			agent.agent_type = null
		}
		if (agent.agent_id !== null && typeof agent.agent_id !== "string") {
			throw new Error("Authorization failed: field 'agent_id' must be either null or of type string");
		}
		/*
		// note: authorization logic should work with a null agent_id
		if (!agent.agent_id) {
			throw new Error("Authorization failed: agent is missing 'agent_id' field");
		}
		*/
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
	authorization_filter(context, realm, agent, entity) {
		const self = this;
		const key = self._auth_batch_key(realm, agent, entity, "authorization_filter");
		return self.auth_loader.load(context, key);
	}
	// method and entity_type must be set
	// this function is used to set where in and where not in
	_authorization_filter(context, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		if (!agent) {
			//throw new Error("Authorization failed: missing agent");
			agent = {}
			agent.agent_id = null
			agent.agent_type = null
		}
		if (agent.agent_id !== null && typeof agent.agent_id !== "string") {
			throw new Error("Authorization failed: field 'agent_id' must be either null or of type string");
		}
		/*
		// note: authorization logic should work with a null agent_id
		if (!agent.agent_id) {
			throw new Error("Authorization failed: agent is missing 'agent_id' field");
		}
		*/
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
						LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._authorization_filter:debug_sql`, sql.toString());
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
						LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._authorization_filter:debug_sql`, sql.toString());
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
	_root_create(context, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		entity.entity_method = "create";
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
	_create(context, parameters, realm) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		const key = self._model_batch_key(parameters, realm, "create");
		return self.model_loader.load(context, key);
	}
	_root_read(context, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		entity.entity_method = "read";
		return self.authorized_execute(context, parameters, agent, entity, operation);
	}
	_read(context, parameters, realm) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		const key = self._model_batch_key(parameters, realm, "read");
		return self.model_loader.load(context, key);
	}
	_root_update(context, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		entity.entity_method = "update";
		return self.authorized_execute(context, parameters, agent, entity, operation);
	}
	_update(context, parameters, realm) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		const key = self._model_batch_key(parameters, realm, "update");
		return self.model_loader.load(context, key);
	}
	_root_delete(context, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		entity.entity_method = "delete";
		return self.authorized_execute(context, parameters, agent, entity, operation);
	}
	_delete(context, parameters, realm) {
		const self = this;
		const { source } = context;
		if (source && source._metadata) {
			parameters.parent = source._metadata;
		}
		const key = self._model_batch_key(parameters, realm, "delete");
		return self.model_loader.load(context, key);
	}
}

export { SystemModel };
