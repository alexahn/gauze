import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import { SystemModel } from "./system.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

// todo: replace sql queries with database graphql queries?
class RelationshipSystemModel extends SystemModel {
	constructor(root_config, relationship_config) {
		super(root_config, relationship_config);
		const self = this;
		self.name = self.__name();
		self.relations_map = self._create_relations_map();
	}
	static _class_name(schema_name) {
		return schema_name ? `(${schema_name})[${super._class_name()}]RelationshipSystemModel` : `[${super._class_name()}]RelationshipSystemModel`;
	}
	__name() {
		const self = this;
		return RelationshipSystemModel._class_name(self.schema_name);
	}
	_create_relations_map() {
		// iterate over $abstract.entities
		const map = {};
		Object.keys($abstract.entities).forEach(function (name) {
			const entity = $abstract.entities[name].default($abstract);
			map[entity.graphql_meta_type] = {};
		});
		// iterate over $structure.relationships.SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE
		Object.keys($structure.relationships.SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE).forEach(function (from) {
			$structure.relationships.SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE[from].forEach(function (to) {
				map[from][to] = true;
			});
		});
		return map;
	}
	_authorized_relationship(context, scope, relationship, agent, method) {
		const self = this;
		const from_entity = {
			entity_type: relationship.gauze__relationship__from_type,
			entity_id: relationship.gauze__relationship__from_id,
			entity_method: method,
		};
		const to_entity = {
			entity_type: relationship.gauze__relationship__to_type,
			entity_id: relationship.gauze__relationship__to_id,
			entity_method: method,
		};
		const targets = [from_entity, to_entity];
		return Promise.all(
			targets.map(function (target) {
				return self.authorization_element(context, scope, "system", agent, target);
			}),
		).then(function (authorizations) {
			const passed = authorizations.filter(function (auth) {
				return auth.status === true;
			});
			if (passed.length === authorizations.length) {
				return authorizations;
			} else {
				throw new Error("Agent does not have access to target method");
			}
		});
	}
	_validate_relationship(attributes) {
		if (!attributes) {
			throw new Error("Field 'attributes' is required'");
		}
		if (!attributes.gauze__relationship__from_id) {
			throw new Error("Field 'attributes.gauze__relationship__from_id' is required");
		}
		if (!attributes.gauze__relationship__from_type) {
			throw new Error("Field 'attributes.gauze__relationship__from_type' is required");
		}
		if (!attributes.gauze__relationship__to_id) {
			throw new Error("Field 'attributes.gauze__relationship__to_id' is required");
		}
		if (!attributes.gauze__relationship__to_type) {
			throw new Error("Field 'attributes.gauze__relationship__to_type' is required");
		}
	}
	_connected_relationship(attributes) {
		const self = this;
		const from_type = $structure.gauze.resolvers.SQL_TABLE_TO_GRAPHQL_TYPE__RESOLVER__STRUCTURE[attributes.gauze__relationship__from_type];
		const to_type = $structure.gauze.resolvers.SQL_TABLE_TO_GRAPHQL_TYPE__RESOLVER__STRUCTURE[attributes.gauze__relationship__to_type];
		if (self.relations_map[from_type]) {
			if (self.relations_map[from_type][to_type]) {
				return true;
			} else {
				throw new Error("Entities are not configured to have relationships to each other");
			}
		} else {
			throw new Error("Entities are not configured to have relationships to each other");
		}
	}
	_preread(database, transaction, id) {
		const self = this;
		const sql = database(self.entity.table_name)
			.where({
				gauze__relationship__id: id,
			})
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._preread:debug_sql`, sql.toString());
		}
		return sql;
	}
	_root_create(context, scope, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		const access = { ...agent, ...entity };
		self._connected_relationship(parameters.attributes);
		return self._authorized_relationship(context, scope, parameters.attributes, agent, "create").then(function () {
			return self._execute(context, operation, parameters);
		});
	}
	_create(context, scope, parameters, realm) {
		const self = this;
		const { attributes } = parameters;
		self._validate_relationship(attributes);
		const key = self._model_batch_key(parameters, realm, "create");
		return self.model_loader.load(context, scope, key);
	}
	// todo: parallelize the sql queries
	_filter_access(context, scope, parameters, realm, relationship_rows, method) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		const { agent_id } = agent;
		const valid_to_ids = relationship_rows.map(function (relationship) {
			return relationship.gauze__relationship__to_id;
		});
		// use relationships to do a where in query on both whitelist and blacklist
		const sql = database(self.whitelist_table)
			.where({
				gauze__whitelist__agent_id: agent_id,
				gauze__whitelist__method: method,
			})
			.whereIn("gauze__whitelist__entity_id", valid_to_ids)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._filter_access:debug_sql`, sql.toString());
		}
		return sql.then(function (whitelist_rows) {
			const sql = database(self.blacklist_table)
				.where({
					gauze__blacklist__agent_id: agent_id,
					gauze__blacklist__method: method,
				})
				.whereIn("gauze__blacklist__entity_id", valid_to_ids)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._filter_access:debug_sql`, sql.toString());
			}
			return sql.then(function (blacklist_rows) {
				// in memory join here
				const modules = {};
				const whitelist = {};
				const blacklist = {};
				// todo: can move this logic into the filter if we want, but this is easier to implement
				relationship_rows.forEach(function (row) {
					if (modules[row.gauze__relationship__to_type]) {
						// skip
					} else {
						const module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[row.gauze__relationship__to_type];
						const module = $abstract.entities[module_name].default($abstract);
						modules[row.gauze__relationship__to_type] = module;
					}
					if (modules[row.gauze__relationship_from_type]) {
						// skip
					} else {
						const module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[row.gauze__relationship__to_type];
						const module = $abstract.entities[module_name].default($abstract);
						modules[row.gauze__relationship__from_type] = module;
					}
				});
				whitelist_rows.forEach(function (row) {
					whitelist[row.gauze__whitelist__entity_id] = row;
				});
				blacklist_rows.forEach(function (row) {
					blacklist[row.gauze__blacklist__entity_id] = row;
				});
				function access_filter(entity_type, entity_id) {
					const method_privacy = modules[entity_type].methods[method].privacy;
					if (method_privacy === "private") {
						const whitelist_row = whitelist[entity_id];
						if (whitelist_row) {
							// check to make sure everything aligns
							if (
								whitelist_row.gauze__whitelist__realm === "system" &&
								whitelist_row.gauze__whitelist__agent_id === agent_id &&
								whitelist_row.gauze__whitelist__entity_type === entity_type &&
								whitelist_row.gauze__whitelist__entity_id === entity_id &&
								method === method
							) {
								return true;
							} else {
								return false;
							}
						} else {
							return false;
						}
					} else if (method_privacy === "public") {
						const blacklist_row = blacklist[entity_id];
						if (blacklist_row) {
							// check to make sure everything aligns
							if (
								blacklist_row.gauze__blacklist__realm === "system" &&
								blacklist_row.gauze__blacklist__agent_id === agent_id &&
								blacklist_row.gauze__blacklist__entity_type === entity_type &&
								blacklist_row.gauze__blacklist__entity_id === entity_id &&
								method === method
							) {
								return false;
							} else {
								return true;
							}
						} else {
							return true;
						}
					} else {
						// note: this is kind of brutal because it will prevent any results from showing up
						// throw new Error("Privacy policy does not exist for this method")
						// note: let's just return false here to filter it out
						return false;
					}
				}
				const filtered = relationship_rows.filter(function (relationship) {
					const valid_to = access_filter(relationship.gauze__relationship__to_type, relationship.gauze__relationship__to_id);
					const valid_from = access_filter(relationship.gauze__relationship__from_type, relationship.gauze__relationship__from_id);
					return valid_to && valid_from;
				});
				// use filtered to construct a where in
				const valid_ids = filtered.map(function (row) {
					return row.gauze__relationship__id;
				});
				return valid_ids;
			});
		});
	}
	_read_entity(context, scope, parameters, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		const { agent_id } = agent;
		const method = "read";
		const { where_in = {}, where_not_in = {} } = parameters;
		console.log("REACHED");
		const sql = database(self.entity.table_name)
			.where(function (builder) {
				Object.keys(where_in).forEach(function (key) {
					builder.whereIn(key, where_in[key]);
				});
				Object.keys(where_not_in).forEach(function (key) {
					builder.whereNotIn(key, where_not_in[key]);
				});
			})
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_entity:debug_sql`, sql.toString());
		}
		return sql.then(function (relationship_rows) {
			console.log("reached", relationship_rows);
			return self._filter_access(context, scope, parameters, realm, relationship_rows, "read").then(function (valid_ids) {
				parameters.where_in = {
					[self.entity.primary_key]: valid_ids,
				};
				// note: should we just return the relationships here instead of executing a graphql query?
				return self._execute(context, operation, parameters);
			});
		});
	}
	_read_from(context, scope, parameters, realm) {
		// check that from policy aligns
		// get list of relationship
		// intersect with agent whitelist or blacklist based on policy by doing a where in query (this could work if we leverage the fact that uuids rarely have collisions)
		// the problem is that every to target has its own policy
		// do an in memory join basically
		// final set of relationships the user has access to
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		const { agent_id } = agent;
		const method = "read";

		const from_entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[parameters.where.gauze__relationship__from_type];
		const from_entity_module = $abstract.entities[from_entity_module_name].default($abstract);
		const from_entity_method_privacy = from_entity_module.methods[method].privacy;

		return self
			.authorization_element(context, scope, "system", agent, {
				entity_id: parameters.where.gauze__relationship__from_id,
				entity_type: parameters.where.gauze__relationship__from_type,
				entity_method: method,
			})
			.then(function (auth) {
				if (auth.status === true) {
					const sql = database(self.entity.table_name)
						.where({
							gauze__relationship__from_type: parameters.where.gauze__relationship__from_type,
							gauze__relationship__from_id: parameters.where.gauze__relationship__from_id,
						})
						.transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_from:debug_sql`, sql.toString());
					}
					return sql.then(function (relationship_rows) {
						return self._filter_access(context, scope, parameters, realm, relationship_rows, "read").then(function (valid_ids) {
							parameters.where_in = {
								[self.entity.primary_key]: valid_ids,
							};
							// note: should we just return the relationships here instead of executing a graphql query?
							return self._execute(context, operation, parameters);
						});
					});
				} else {
					throw new Error("Agent does not have access to target method");
				}
			});
	}
	// note: this method will not be able to navigate relationships
	// note: for private methods, user will have to use the whitelist methods to see what entities they have read access to
	// note: for public methods, user will need to have exposure to an entity before they can explore its relationships
	// requires where.id or where.from_id and where.from_type
	_root_read(context, scope, parameters, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		entity.entity_method = "read";
		// todo: where_in.from_id and where_in.to_id
		if (parameters.where && parameters.where.gauze__relationship__id) {
			return self._preread(database, transaction, parameters.where.gauze__relationship__id).then(function (relationships) {
				if (relationships && relationships.length) {
					const relationship = relationships[0];
					return self._authorized_relationship(context, scope, relationship, agent, "read").then(function () {
						// note: should we just return the relationship here instead of executing a graphql query?
						return self._execute(context, operation, parameters);
					});
				} else {
					return {
						data: {
							read_relationship: [],
						},
					};
				}
			});
		} else if (
			parameters.where_in &&
			parameters.where_in.gauze__relationship__from_id &&
			parameters.where_in.gauze__relationship__from_id.length &&
			parameters.where_in.gauze__relationship__to_id &&
			parameters.where_in.gauze__relationship__to_id.length
		) {
			return self._read_entity(context, scope, parameters, realm);
		} else if (parameters.where && parameters.where.gauze__relationship__from_id && parameters.where.gauze__relationship__from_type) {
			return self._read_from(context, scope, parameters, realm);
		} else {
			throw new Error(
				"Field 'where.gauze__relationship__id' is required or (Field 'where_in.gauze__relationship__from_id' and where_in.gauze__relationship__to_id' are required) or (Field 'where.gauze__relationship__from_id' and 'where.gauze__relationship__from_type' are required)",
			);
		}
	}
	_read(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "read");
		return self.model_loader.load(context, scope, key);
	}
	// requires where.id
	_root_update(context, scope, parameters, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		entity.entity_method = "update";
		if (parameters.where && parameters.where.gauze__relationship__id) {
			return self._preread(database, transaction, parameters.where.gauze__relationship__id).then(function (relationships) {
				if (relationships && relationships.length) {
					const relationship = relationships[0];
					const staged = { ...relationship, ...parameters.attributes };
					self._connected_relationship(staged);
					return self._authorized_relationship(context, scope, relationship, agent, "update").then(function () {
						return self._authorized_relationship(context, scope, staged, agent, "update").then(function () {
							return self._execute(context, operation, parameters);
						});
					});
				} else {
					return {
						data: {
							update_relationship: [],
						},
					};
				}
			});
		} else {
			throw new Error("Field 'where.gauze__relationship__id' is required");
		}
	}
	_update(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "update");
		return self.model_loader.load(context, scope, key);
	}
	// requires where.id
	_root_delete(context, scope, parameters, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		entity.entity_method = "delete";
		if (parameters.where && parameters.where.gauze__relationship__id) {
			return self._preread(database, transaction, parameters.where.gauze__relationship__id).then(function (relationships) {
				if (relationships && relationships.length) {
					const relationship = relationships[0];
					return self._authorized_relationship(context, scope, relationship, agent, "delete").then(function () {
						return self._execute(context, operation, parameters);
					});
				} else {
					return {
						data: {
							delete_relationship: [],
						},
					};
				}
			});
		} else {
			throw new Error("Field 'where.gauze__relationship__id' is required");
		}
	}
	_delete(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "delete");
		return self.model_loader.load(context, scope, key);
	}
}

export { RelationshipSystemModel };
