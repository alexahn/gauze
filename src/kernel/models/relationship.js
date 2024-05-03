import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import { Model } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

// todo: replace sql queries with database graphql queries?
class RelationshipSystemModel extends Model {
	constructor(root_config, relationship_config) {
		super(root_config);
		const self = this;
		const { schema, schema_name } = relationship_config;
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
		// iterate over $structure.relationships.SYSTEM_RELATIONSHIP_STRUCTURE
		Object.keys($structure.relationships.SYSTEM_RELATIONSHIP_STRUCTURE).forEach(function (from) {
			$structure.relationships.SYSTEM_RELATIONSHIP_STRUCTURE[from].forEach(function (to) {
				map[from][to] = true;
			});
		});
		return map;
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
	_access_relationship(context, relationship, agent, method) {
		const self = this;
		const { agent_id } = agent;
		self._validate_relationship(relationship);
		const from_entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[relationship.gauze__relationship__from_type];
		const from_entity_module = $abstract.entities[from_entity_module_name].default($abstract);
		const to_entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[relationship.gauze__relationship__to_type];
		const to_entity_module = $abstract.entities[to_entity_module_name].default($abstract);
		const from_entity_method_privacy = from_entity_module.methods[method].privacy;
		const to_entity_methid_privacy = to_entity_module.methods[method].privacy;
		const targets = [
			{
				agent_id: agent_id,
				entity_id: relationship.gauze__relationship__from_id,
				entity_type: relationship.gauze__relationship__from_type,
				method: method,
				method_privacy: from_entity_method_privacy,
			},
			{
				agent_id: agent_id,
				entity_id: relationship.gauze__relationship__to_id,
				entity_type: relationship.gauze__relationship__to_type,
				method: method,
				method_privacy: to_entity_methid_privacy,
			},
		];
		return Promise.all(
			targets.map(function (target) {
				return self._access_target(context, target);
			}),
		);
	}
	_access_target(context, target) {
		const self = this;
		const { database, transaction } = context;
		const { agent_id, entity_type, entity_id, method, method_privacy } = target;
		if (method_privacy === "private") {
			// check to make sure whitelist entry exists
			const sql = database(self.whitelist_table)
				.where({
					gauze__whitelist__realm: "system",
					// todo: spec out agent_type
					// gauze__whitelist__agent_type: "user",
					gauze__whitelist__agent_id: agent_id,
					gauze__whitelist__entity_type: entity_type,
					gauze__whitelist__entity_id: entity_id,
					gauze__whitelist__method: method,
				})
				// should never exceed 12 based on architecture, so 16 should be a safe number
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._validate_target:debug_sql`, sql.toString());
			}
			return sql.then(function (rows) {
				if (rows.length) {
					return Promise.resolve(rows);
				} else {
					throw new Error("Agent does not have access to target method");
				}
			});
		} else if (method_privacy === "public") {
			// check to make sure blacklist entry does not exist
			const sql = database(self.blacklist_table)
				.where({
					gauze__blacklist__realm: "system",
					// todo: spec out agent_type
					// gauze__whitelist__agent_type: "user",
					gauze__blacklist__agent_id: agent_id,
					gauze__blacklist__entity_type: entity_type,
					gauze__blacklist__entity_id: entity_id,
					gauze__blacklist__method: method,
				})
				// should never exceed 12 based on architecture, so 16 should be a safe number
				.limit(16)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._validate_target:debug_sql`, sql.toString());
			}
			return sql.then(function (rows) {
				if (rows.length) {
					throw new Error("Agent does not have access to target method");
				} else {
					return Promise.resolve(rows);
				}
			});
		} else {
			throw new Error("Privacy policy does not exist for target method");
		}
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
		if (self.relations_map[from_type][to_type]) {
			return true;
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
	_create(context, parameters, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		const access = { ...agent, ...entity };
		self._connected_relationship(parameters.attributes);
		return self._access_relationship(context, parameters.attributes, access, "create").then(function () {
			return self._execute(context, operation, parameters);
		});
	}
	_read_from(context, parameters, access, operation) {
		// check that from policy aligns
		// get list of relationship
		// intersect with agent whitelist or blacklist based on policy by doing a where in query (this could work if we leverage the fact that uuids rarely have collisions)
		// the problem is that every to target has its own policy
		// do an in memory join basically
		// final set of relationships the user has access to
		const self = this;
		const { database, transaction } = context;
		const { agent_id } = access;
		const method = "read";
		const from_entity_module_name = $structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[relationship.gauze__relationship__from_type];
		const from_entity_module = $abstract.entities[from_entity_module_name].default($abstract);
		const from_entity_method_privacy = from_entity_module.methods[method].privacy;
		return self
			._access_target(context, {
				agent_id: agent_id,
				entity_id: parameters.where.gauze__relationship__from_id,
				entity_type: parameters.where.gauze__relationship__from_type,
				method: method,
				method_privacy: from_entity_method_privacy,
			})
			.then(function () {
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
						LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_from:debug_sql`, sql.toString());
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
							LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._read_from:debug_sql`, sql.toString());
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
							});
							whitelist_rows.forEach(function (row) {
								whitelist[row.gauze__whitelist__entity_id] = row;
							});
							blacklist_rows.forEach(function (row) {
								blacklist[row.gauze__blacklist__entity_id] = row;
							});
							const filtered = relationship_rows.filter(function (relationship) {
								// to_id
								// to_type
								// get method privacy for to_type
								// look at whitelist if method is private
								// look at blacklist if method is public
								const method_privacy = modules[relationship.gauze__relationship__to_type].methods.read.privacy;
								if (method_privacy === "private") {
									const whitelist_row = whitelist[relationship.gauze__relationship__to_id];
									if (whitelist_row) {
										// check to make sure everything aligns
										if (
											whitelist_row.gauze__whitelist__realm === "system" &&
											whitelist_row.gauze__whitelist__agent_id === agent_id &&
											whitelist_row.gauze__whitelist__entity_type === relationship.gauze__relationship__to_type &&
											whitelist_row.gauze__whitelist__entity_id === relationship.gauze__relationship__to_id &&
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
									const blacklist_row = blacklist[relationship.gauze__relationship__to_id];
									if (blacklist_row) {
										// check to make sure everything aligns
										if (
											blacklist_row.gauze__blacklist__realm === "system" &&
											blacklist_row.gauze__blacklist__agent_id === agent_id &&
											blacklist_row.gauze__blacklist__entity_type === relationship.gauze__relationship__to_type &&
											blacklist_row.gauze__blacklist__entity_id === relationship.gauze__relationship__to_id &&
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
							});
							// use filtered to construct a where in
							const valid_ids = filtered.map(function (row) {
								return row.gauze__relationship__id;
							});
							parameters.where_in = {
								[self.entity.primary_key]: valid_ids,
							};
							// note: should we just return the relationships here instead of executing a graphql query?
							return self._execute(context, operation, parameters);
						});
					});
				});
			});
	}
	// note: this method will not be able to navigate relationships
	// note: for private methods, user will have to use the whitelist methods to see what entities they have read access to
	// note: for public methods, user will need to have exposure to an entity before they can explore its relationships
	// requires where.id or where.from_id and where.from_type
	_read(context, parameters, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		const access = { ...agent, ...entity };
		if (parameters.where && parameters.where.gauze__relationship__id) {
			return self._preread(database, transaction, parameters.where.gauze__relationship__id).then(function (relationships) {
				if (relationships && relationships.length) {
					const relationship = relationships[0];
					return self._access_relationship(context, relationship, access, "read").then(function () {
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
		} else {
			if (parameters.where && parameters.where.gauze__relationship__from_id && parameters.where.gauze__relationship__from_type) {
				return self._read_from(context, parameters, access, operation);
			} else {
				throw new Error("Field 'where.gauze__relationship__id' is required or (Field 'where.gauze__relationship__from_id' and 'where.gauze__relationship__from_type' are required)");
			}
		}
	}
	// requires where.id
	_update(context, parameters, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		const access = { ...agent, ...entity };
		if (parameters.where && parameters.where.gauze__relationship__id) {
			return self._preread(database, transaction, parameters.where.gauze__relationship__id).then(function (relationships) {
				if (relationships && relationships.length) {
					const relationship = relationships[0];
					const staged = { ...relationship, ...parameters.attributes };
					self._connected_relationship(staged);
					return self._access_relationship(context, relationship, access, "update").then(function () {
						return self._access_relationship(context, parameters.attributes, access, "update").then(function () {
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
	// requires where.id
	_delete(context, parameters, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		const access = { ...agent, ...entity };
		if (parameters.where && parameters.where.gauze__relationship__id) {
			return self._preread(database, transaction, parameters.where.gauze__relationship__id).then(function (relationships) {
				if (relationships && relationships.length) {
					const relationship = relationships[0];
					return self._access_relationship(context, relationship, access, "delete").then(function () {
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
}

export { RelationshipSystemModel };
