import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { v4 as uuidv4 } from "uuid";

//import * as $project from "./../../gauze.js";
import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__SRC__KERNEL } from "./../shell/graphql.js";

import { SMALL_CACHE__LRU__CACHE__SRC__KERNEL, TIERED_CACHE__LRU__CACHE__SRC__KERNEL } from "./../cache/lru.js";

import DataLoader from "./../dataloader.js";
import TTLLRUCache from "./../lru.js";

import { Model } from "./class.js";

class SystemModel extends Model {
	constructor(root_config, graphql_config) {
		super(root_config);
		const self = this;
		const { schema, schema_name, relationship_model } = graphql_config;
		self.schema = schema;
		self.schema_name = schema_name;
		self.relationship_model = relationship_model;
		if ($structure.entities.whitelist) {
			self.whitelist_table = $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("5", __RELATIVE_FILEPATH, `${self.name}.constructor:WARNING`, new Error("Whitelist structure not found"));
		}
		if ($structure.entities.blacklist) {
			self.blacklist_table = $structure.entities.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("5", __RELATIVE_FILEPATH, `${self.name}.constructor:WARNING`, new Error("Blacklist structure not found"));
		}
		self.name = self.__name();
		self.auth_loader = new DataLoader(self._auth_batch, {
			cacheMap: new TTLLRUCache(1024, 8192),
		});
		self.auth_loader.model = self;
		self.model_loader = new DataLoader(self._model_batch, {
			cacheMap: new TTLLRUCache(1024, 8192),
		});
		self.model_loader.model = self;
		self.allowed_method_agent_types = {};
		Object.keys(self.entity.methods).forEach(function (method) {
			const map = {};
			self.entity.methods[method].allowed_agent_types.forEach(function (agent_type) {
				map[agent_type] = true;
			});
			self.allowed_method_agent_types[method] = map;
		});
		self.allowed_fields_agent_types = {};
		Object.keys(self.entity.fields).forEach(function (field_key) {
			const field = self.entity.fields[field_key];
			field.allowed_agent_types.forEach(function (agent_type) {
				if (self.allowed_fields_agent_types[agent_type]) {
					self.allowed_fields_agent_types[agent_type].push(field.name);
				} else {
					self.allowed_fields_agent_types[agent_type] = [field.name];
				}
			});
		});
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.constructor:exit`);
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
	_auth_batch(contexts, scopes, keys) {
		// this is the dataloader instance
		const self = this;
		return Promise.all(
			keys.map(function (key, index) {
				const parsed = JSON.parse(key);
				if (parsed.method === "authorization") {
					return self.model._authorization(contexts[index], scopes[index], parsed.realm, parsed.agent, parsed.entity);
				} else if (parsed.method === "authorization_element") {
					return self.model._authorization_element(contexts[index], scopes[index], parsed.realm, parsed.agent, parsed.entity);
				} else if (parsed.method === "authorization_set") {
					return self.model._authorization_set(contexts[index], scopes[index], parsed.realm, parsed.agent, parsed.entity);
				} else if (parsed.method === "authorization_filter") {
					return self.model._authorization_filter(contexts[index], scopes[index], parsed.realm, parsed.agent, parsed.entity);
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
	_model_batch(contexts, scopes, keys) {
		const self = this;
		return Promise.all(
			keys.map(function (key, index) {
				const parsed = JSON.parse(key);
				if (parsed.method === "create") {
					return self.model._root_create(contexts[index], scopes[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else if (parsed.method === "read") {
					return self.model._root_read(contexts[index], scopes[index], parsed.parameters, parsed.realm);
				} else if (parsed.method === "update") {
					return self.model._root_update(contexts[index], scopes[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else if (parsed.method === "delete") {
					return self.model._root_delete(contexts[index], scopes[index], parsed.parameters, parsed.realm).then(function (data) {
						self.clearAll();
						return data;
					});
				} else if (parsed.method === "count") {
					return self.model._root_count(contexts[index], scopes[index], parsed.parameters, parsed.realm);
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
		return EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
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
	authorization(context, scope, realm, agent, entity) {
		const self = this;
		const key = self._auth_batch_key(realm, agent, entity, "authorization");
		return self.auth_loader.load(context, scope, key);
	}
	_authorization(context, scope, realm, agent, entity) {
		const self = this;
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		return self.authorization_set(context, scope, realm, agent, entity).then(function (set_authorization) {
			if (method_privacy === "private") {
				if (set_authorization.status === true) {
					return set_authorization;
				} else {
					return self.authorization_element(context, scope, realm, agent, entity);
				}
			} else if (method_privacy === "public") {
				if (set_authorization.status === false) {
					return set_authorization;
				} else {
					return self.authorization_element(context, scope, realm, agent, entity);
				}
			} else {
				new Error("Authorization failed: privacy policy does not exist for this method");
			}
		});
	}
	authorization_element(context, scope, realm, agent, entity) {
		const self = this;
		self._validate_agent(agent);
		self._validate_entity(entity);
		const key = self._auth_batch_key(realm, agent, entity, "authorization_element");
		return self.auth_loader.load(context, scope, key);
	}
	// only checks element authorization (e.g. entity id cannot be null)
	_authorization_element(context, scope, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		if (method_privacy === "private") {
			const sql = database(self.whitelist_table)
				.where({
					gauze__whitelist__realm: realm,
					gauze__whitelist__agent_id: agent.agent_id,
					gauze__whitelist__agent_type: agent.agent_type,
					gauze__whitelist__entity_type: entity.entity_type,
					gauze__whitelist__entity_id: entity.entity_id,
					gauze__whitelist__method: entity.entity_method,
				})
				.whereNotNull("gauze__whitelist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_element:debug_sql`, sql.toString());
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
					gauze__blacklist__agent_type: agent.agent_type,
					gauze__blacklist__entity_type: entity.entity_type,
					gauze__blacklist__entity_id: entity.entity_id,
					gauze__blacklist__method: entity.entity_method,
				})
				.whereNotNull("gauze__blacklist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_element:debug_sql`, sql.toString());
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
	authorization_set(context, scope, realm, agent, entity) {
		const self = this;
		self._validate_agent(agent);
		self._validate_entity(entity);
		const key = self._auth_batch_key(realm, agent, entity, "authorization_set");
		return self.auth_loader.load(context, scope, key);
	}
	// only checks set authorization (e.g. entity_id must be null)
	_authorization_set(context, scope, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		if (method_privacy === "private") {
			const sql = database(self.whitelist_table)
				.where({
					gauze__whitelist__realm: realm,
					gauze__whitelist__agent_id: agent.agent_id,
					gauze__whitelist__agent_type: agent.agent_type,
					gauze__whitelist__entity_type: entity.entity_type,
					gauze__whitelist__method: entity.entity_method,
				})
				.whereNull("gauze__whitelist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_set:debug_sql`, sql.toString());
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
					gauze__blacklist__agent_type: agent.agent_type,
					gauze__blacklist__entity_type: entity.entity_type,
					gauze__blacklist__method: entity.entity_method,
				})
				.whereNull("gauze__blacklist__entity_id")
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.authorization_set:debug_sql`, sql.toString());
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
	authorization_filter(context, scope, realm, agent, entity) {
		const self = this;
		self._validate_agent(agent);
		self._validate_entity(entity);
		const key = self._auth_batch_key(realm, agent, entity, "authorization_filter");
		return self.auth_loader.load(context, scope, key);
	}
	// method and entity_type must be set
	// this function is used to set where in and where not in
	_authorization_filter(context, scope, realm, agent, entity) {
		const self = this;
		const { database, transaction } = context;
		const entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity.entity_type];
		const entity_module = $abstract.entities[entity_module_name].default($abstract);
		const method_privacy = entity_module.methods[entity.entity_method].privacy;
		return self.authorization_set(context, scope, realm, agent, entity).then(function (set_authorization) {
			if (method_privacy === "private") {
				if (set_authorization.status === true) {
					return set_authorization;
				} else {
					const sql = database(self.whitelist_table)
						.where({
							gauze__whitelist__realm: realm,
							gauze__whitelist__agent_id: agent.agent_id,
							gauze__whitelist__agent_type: agent.agent_type,
							gauze__whitelist__entity_type: entity.entity_type,
							gauze__whitelist__method: entity.entity_method,
						})
						.whereNotNull("gauze__whitelist__entity_id")
						.limit(4294967296)
						.transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._authorization_filter:debug_sql`, sql.toString());
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
							gauze__blacklist__agent_type: agent.agent_type,
							gauze__blacklist__entity_type: entity.entity_type,
							gauze__blacklist__method: entity.entity_method,
						})
						.whereNotNull("gauze__blacklist__entity_id")
						.limit(4294967296)
						.transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._authorization_filter:debug_sql`, sql.toString());
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
	authorized_execute(context, scope, parameters, agent, entity, operation) {
		const self = this;
		function agent_is_admin(project, agent) {
			// note: if we inject project config into context, then we can have a centralized configuration scheme
			// note: the problem is that we actually want siloed configurations if we want reusable systems
			// note: it would be better to import $project like we did before. why did we change it?
			if (project) {
				if (agent.agent_type && agent.agent_id) {
					if (project.default[process.env.GAUZE_ENV]) {
						const admin = project.default[process.env.GAUZE_ENV].admins.find(function (admin) {
							return admin[agent.agent_type] === agent.agent_id;
						});
						return Boolean(admin);
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		if (agent_is_admin(context.project, agent)) {
			return self._execute(context, operation, parameters);
		} else {
			return self.authorization_filter(context, scope, "system", agent, entity).then(function (auth) {
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
							// note: we can avoid a heavy penalty parsing millions of keys in graphql by using an intermediary data store (lru cache) to communicate the values
							// generate a uuidv4 as a cache key, put the valid ids into the cache using the cache key, and set the value of cache_where_in to the cache key
							// from the database side, we use the cache key to pull the values from the lru cache
							const cache_key = String(uuidv4());
							TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set(cache_key, valid_ids, valid_ids.length);
							parameters.cache_where_in = {
								[self.entity.primary_key]: cache_key,
							};
							/*
							parameters.where_in = {
								[self.entity.primary_key]: valid_ids,
							};
							*/
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
							// note: we can avoid a heavy penalty parsing millions of keys in graphql by using an intermediary data store (lru cache) to communicate the values
							// generate a uuidv4 as a cache key, put the invalid ids into the cache using the cache key, and set the value of cache_where_not_in to the cache key
							// from the database side, we use the cache key to pull the values from the lru cache
							const cache_key = String(uuidv4());
							TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set(cache_key, invalid_ids, invalid_ids.length);
							parameters.cache_where_not_in = {
								[self.entity.primary_key]: cache_key,
							};
							/*
							parameters.where_not_in = {
								[self.entity.primary_key]: invalid_ids,
							};
							*/
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
	}
	_validate_agent(agent) {
		const self = this;
		if (!agent) {
			throw new Error("Authorization failed: missing agent");
		}
		if (!agent.agent_id) {
			throw new Error("Authorization failed: agent is missing 'agent_id' field");
		}
		if (!agent.agent_type) {
			throw new Error("Authorization failed: agent is missing 'agent_type' field");
		}
	}
	_validate_entity(entity) {
		const self = this;
		if (!entity) {
			throw new Error("Authorization failed: missing entity");
		}
		if (!entity.entity_type) {
			throw new Error("Authorization failed: entity is missing 'entity_type' field");
		}
		if (!entity.entity_method) {
			throw new Error("Authorization failed: entity missing 'entity_method' field");
		}
	}
	_validate_method(agent, method) {
		const self = this;
		if (!self.allowed_method_agent_types[method][agent.agent_type]) {
			throw new Error("Authorization failed: agent type is not allowed for this method");
		}
	}
	agent_filter(agent, attributes) {
		const self = this;
		const filtered = {};
		if (self.allowed_fields_agent_types[agent.agent_type]) {
			self.allowed_fields_agent_types[agent.agent_type].forEach(function (field) {
				filtered[field] = attributes[field];
			});
			return filtered;
		} else {
			return filtered;
		}
	}
	_root_create(context, scope, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		// note: our architecture requires that the key is a uuid
		// todo: move this to a middleware
		if (!parameters.attributes[self.entity.primary_key]) {
			parameters.attributes[self.entity.primary_key] = uuidv4();
		}
		parameters.whitelist_create = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: agent.agent_type,
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "create",
		};
		parameters.whitelist_read = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: agent.agent_type,
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "read",
		};
		parameters.whitelist_update = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: agent.agent_type,
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "update",
		};
		parameters.whitelist_delete = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: agent.agent_type,
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "delete",
		};
		parameters.whitelist_count = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: agent.agent_type,
			gauze__whitelist__agent_id: agent.agent_id,
			gauze__whitelist__entity_type: entity.entity_type,
			gauze__whitelist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__whitelist__method: "count",
		};
		parameters.blacklist_create = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: agent.agent_type,
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "create",
		};
		parameters.blacklist_read = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: agent.agent_type,
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "read",
		};
		parameters.blacklist_update = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: agent.agent_type,
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "update",
		};
		parameters.blacklist_delete = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: agent.agent_type,
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "delete",
		};
		parameters.blacklist_count = {
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: agent.agent_type,
			gauze__blacklist__agent_id: agent.agent_id,
			gauze__blacklist__entity_type: entity.entity_type,
			gauze__blacklist__entity_id: parameters.attributes[self.entity.primary_key],
			gauze__blacklist__method: "count",
		};
		if (parameters.source && parameters.source._metadata && parameters.source._direction) {
			return self.authorized_execute(context, scope, parameters, agent, entity, operation).then(function (data) {
				let relationship_attributes;
				const source_type = $structure.gauze.resolvers.GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE[parameters.source._metadata.type];
				const source_id = parameters.source._metadata.id;
				if (parameters.source._direction === "to") {
					relationship_attributes = {
						gauze__relationship__from_id: source_id,
						gauze__relationship__from_type: source_type,
						gauze__relationship__to_id: parameters.attributes[self.entity.primary_key],
						gauze__relationship__to_type: entity.entity_type,
					};
				} else if (parameters.source._direction === "from") {
					relationship_attributes = {
						gauze__relationship__from_id: parameters.attributes[self.entity.primary_key],
						gauze__relationship__from_type: entity.entity_type,
						gauze__relationship__to_id: source_id,
						gauze__relationship__to_type: source_type,
					};
				} else {
					throw new Error("Invalid source direction");
				}
				const relationship_parameters = { attributes: relationship_attributes };
				return self.relationship_model.create(context, scope, relationship_parameters).then(function (relationship) {
					return data;
				});
			});
		} else {
			return self.authorized_execute(context, scope, parameters, agent, entity, operation);
		}
	}
	_create(context, scope, parameters, realm) {
		const self = this;
		const method = "create";
		const { source } = scope;
		const { agent, entity } = realm;
		entity.entity_method = method;
		self._validate_agent(agent);
		self._validate_entity(entity);
		self._validate_method(agent, method);
		if (source && source._metadata && source._direction) {
			parameters.source = source;
		}
		const key = self._model_batch_key(parameters, realm, method);
		return self.model_loader.load(context, scope, key);
	}
	_root_read(context, scope, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		return self.authorized_execute(context, scope, parameters, agent, entity, operation);
	}
	_read(context, scope, parameters, realm) {
		const self = this;
		const method = "read";
		const { source } = scope;
		const { agent, entity } = realm;
		entity.entity_method = method;
		self._validate_agent(agent);
		self._validate_entity(entity);
		self._validate_method(agent, method);
		if (source && source._metadata && source._direction) {
			parameters.source = source;
		}
		const key = self._model_batch_key(parameters, realm, method);
		return self.model_loader.load(context, scope, key);
	}
	_root_update(context, scope, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		return self.authorized_execute(context, scope, parameters, agent, entity, operation);
	}
	_update(context, scope, parameters, realm) {
		const self = this;
		const method = "update";
		const { source } = scope;
		const { agent, entity } = realm;
		entity.entity_method = method;
		self._validate_agent(agent);
		self._validate_entity(entity);
		self._validate_method(agent, method);
		if (source && source._metadata && source._direction) {
			parameters.source = source;
		}
		const key = self._model_batch_key(parameters, realm, method);
		return self.model_loader.load(context, scope, key);
	}
	_root_delete(context, scope, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		return self.authorized_execute(context, scope, parameters, agent, entity, operation);
	}
	_delete(context, scope, parameters, realm) {
		const self = this;
		const method = "delete";
		const { source } = scope;
		const { agent, entity } = realm;
		entity.entity_method = method;
		self._validate_agent(agent);
		self._validate_entity(entity);
		self._validate_method(agent, method);
		if (source && source._metadata && source._direction) {
			parameters.source = source;
		}
		const key = self._model_batch_key(parameters, realm, method);
		return self.model_loader.load(context, scope, key);
	}
	_root_count(context, scope, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		return self.authorized_execute(context, scope, parameters, agent, entity, operation);
	}
	_count(context, scope, parameters, realm) {
		const self = this;
		const method = "count";
		const { source } = scope;
		const { agent, entity } = realm;
		entity.entity_method = method;
		self._validate_agent(agent);
		self._validate_entity(entity);
		self._validate_method(agent, method);
		if (source && source._metadata && source._direction) {
			parameters.source = source;
		}
		const key = self._model_batch_key(parameters, realm, method);
		return self.model_loader.load(context, scope, key);
	}
}

export { SystemModel };
