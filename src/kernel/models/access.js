import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import { Model } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__KERNEL } from "./../shell/graphql.js";

// semantics:
// who is changing
// 	- all actions must ensure that the role hierarchy is honored
//		- all actions cannot affect access units that have a higher role than the initiator
//			- someone cannot read, update, or delete a record that has a role set higher than the initiator
//		- all modifications cannot effectively elevate the initiator's role
//			- create and update cannot set agent role to a higher role than the one who is initiating the change
// 		- by induction, terminal roles can only effectively read or delete their own record
// what is changing
//	- the units of change should be agent id, agent type, and agent role
//  - realm, entity id, entity type, and method (rename to entity method?) are locked
class AccessSystemModel extends Model {
	constructor(root_config, access_config) {
		super(root_config);
		const self = this;
		const { schema, schema_name } = access_config;
		self.schema = schema;
		self.schema_name = schema_name;
		self.key_id = `${self.entity.table_name}__id`;
		self.key_realm = `${self.entity.table_name}__realm`;
		self.key_agent_role = `${self.entity.table_name}__agent_role`;
		self.key_agent_type = `${self.entity.table_name}__agent_type`;
		self.key_agent_id = `${self.entity.table_name}__agent_id`;
		self.key_entity_type = `${self.entity.table_name}__entity_type`;
		self.key_entity_id = `${self.entity.table_name}__entity_id`;
		self.key_method = `${self.entity.table_name}__method`;
		self.empty_read_response = {
			data: {
				[`read_${self.entity.name}`]: [],
			},
		};
		self.empty_update_response = {
			data: {
				[`update_${self.entity.name}`]: [],
			},
		};
		self.empty_delete_response = {
			data: {
				[`delete_${self.entity.name}`]: [],
			},
		};
		self.name = self.__name();
	}
	static _class_name(schema_name) {
		return schema_name ? `(${schema_name})[${super._class_name()}]AccessSystemModel` : `[${super._class_name()}]AccessSystemModel`;
	}
	__name() {
		const self = this;
		return AccessSystemModel._class_name(self.schema_name);
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
	_valid_access(context, agent, method, record) {
		const self = this;
		return self._initiator_records(context, record, agent).then(function (access_records) {
			if (access_records && access_records.length) {
				// get record for the highest role
				const highest_record = self._highest_record(access_records);
				self._validate_hierarchy(highest_record, record, method);
				return highest_record;
			} else {
				throw new Error("Agent does not have access to this method");
			}
		});
	}
	// get the access records for the initiator
	_initiator_records(context, entity, agent) {
		const self = this;
		const { database, transaction } = context;
		const sql = database(self.entity.table_name)
			.where({
				[self.key_entity_type]: entity[self.key_entity_type],
				[self.key_entity_id]: entity[self.key_entity_id],
				[self.key_method]: entity[self.key_method],
				[self.key_agent_id]: agent.agent_id,
			})
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._initiator_records:debug_sql`, sql.toString());
		}
		return sql;
	}
	_highest_record(records) {
		const self = this;
		const ranking = {
			root: 0,
			trunk: 1,
			leaf: 2,
		};
		const sorted = records.sort(function (a, b) {
			return ranking[a[self.key_agent_role]] - ranking[b[self.key_agent_role]];
		});
		return sorted[0];
	}
	_validate_target(record) {}
	_validate_hierarchy(initiator_record, target_record, method) {
		const self = this;
		const initiator_role = initiator_record[self.key_agent_role];
		const target_role = target_record[self.key_agent_role];
		if (initiator_role === "root") {
			// root can create trunk or leaf
			if (target_role === "root") {
				throw new Error("Target agent's role cannot be root");
			} else if (target_role === "trunk") {
				return true;
			} else if (target_role === "leaf") {
				return true;
			} else {
				throw new Error("Target agent's role must be either trunk, or leaf");
			}
		} else if (initiator_role === "trunk") {
			// trunk can create trunk or leaf
			if (target_role === "root") {
				throw new Error("Target agent role cannot be higher than initiator's role");
			} else if (target_role === "trunk") {
				return true;
			} else if (target_role === "leaf") {
				return true;
			} else {
				throw new Error("Target agent's role must be either trunk, or leaf");
			}
		} else if (initiator_role === "leaf") {
			// leaf cannot create anything
			if (target_role === "root") {
				throw new Error("Target agent's role cannot be higher than initiator's role");
			} else if (target_role === "trunk") {
				throw new Error("Target agent's role cannot be higher than initiator's role");
			} else if (target_role === "leaf") {
				if (method === "read") {
					return true;
				} else if (method === "delete") {
					return true;
				} else {
					throw new Error("Target agent does not have access to this method");
				}
			} else {
				throw new Error("Target agent's role must be either trunk, or leaf");
			}
		} else {
			throw new Error("Initiator agent's role must be either root, trunk, or leaf");
		}
	}
	_preread(database, transaction, where) {
		const self = this;
		const sql = database(self.entity.table_name).where(where).transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._preread:debug_sql`, sql.toString());
		}
		return sql;
	}
	// requires a valid record
	_create(context, input, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		const target_record = input.attributes;
		return self._valid_access(context, agent, "create", target_record).then(function () {
			return self._execute(context, operation, input);
		});
	}
	_read_agent(context, input, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		if (input.where[self.key_agent_id] === agent.agent_id) {
			// agent should be able to see all their own records
			return self._execute(context, operation, input);
		} else {
			// agent should not be able to see anyone else's records
			throw new Error(`Field '${self.key_agent_id}' must be equal to the initiating agent's id`);
		}
	}
	_read_entity(context, input, realm) {
		const self = this;
		const { agent, entity, operation } = realm;
		// get highest record for initiator
		// get list of records based on entity_id, entity_type, and method
		// filter list of records based on role hierarchy
		// root initiator can see everything, trunk can see trunk and leaf, leaf can only see itself
		return self._initiator_records(context, input.where, agent).then(function (access_records) {
			if (access_records && access_records.length) {
				// get record for the highest role
				const highest_record = self._highest_record(access_records);
				return self._preread(database, transaction, input.where).then(function (target_records) {
					const highest_id = highest_record[self.key_id];
					const highest_role = highest_record[self.key_agent_role];
					const filtered = target_records.filter(function (record) {
						const target_id = record[self.key_id];
						const target_role = record[self.key_agent_role];
						if (highest_role === "root") {
							return true;
						} else if (highest_role === "trunk") {
							if (target_role === "trunk") {
								return true;
							} else if (target_role === "leaf") {
								return true;
							} else {
								return false;
							}
						} else if (highest_role === "leaf") {
							if (target_id == highest_id) {
								return true;
							} else {
								return false;
							}
						} else {
							return false;
						}
					});
					const valid_ids = filtered.map(function (record) {
						return record[self.key_id];
					});
					input.where_in = {
						[self.key_id]: valid_ids,
					};
					// we could manually construct the response from the filtered object here instead?
					return self._execute(context, operation, input);
				});
			} else {
				throw new Error("Agent does not have access to this method");
			}
		});
	}
	// requires where.id or where.agent_id or (where.entity_id and where.entity_type and where.method)
	_read(context, input, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		if (input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, "read", target_record).then(function () {
						return self._execute(context, operation, input);
					});
				} else {
					return self.empty_read_response;
				}
			});
		} else if (input.where && input.where[self.key_agent_id]) {
			return self._read_agent(context, input, agent, operation);
		} else if (input.where && input.where[self.key_entity_id] && input.where[self.key_entity_type] && input.where[self.key_method]) {
			return self._read_entity(context, input, agent, operation);
		} else {
			// todo: move this to system interface
			throw new Error(
				`Field 'where.${self.key_id}' or 'where.${self.key_agent_id}' or ('where.${self.key_entity_id}' and 'where.${self.key_entity_type}' and 'where.${self.key_method}') are required`,
			);
		}
	}
	// requires where.id
	_update(context, input, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		delete input.attributes[self.key_realm];
		delete input.attributes[self.key_entity_type];
		delete input.attributes[self.key_entity_id];
		delete input.attributes[self.key_method];
		const change_record = input.attributes;
		if (input && input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, "update", target_record).then(function () {
						const staged = { ...target_record, ...change_record };
						return self._valid_access(context, agent, "update", staged).then(function () {
							return self._execute(context, operation, input);
						});
					});
				} else {
					return self.empty_update_response;
				}
			});
		} else {
			throw new Error(`Field 'where.${self.key_id}' is required`);
		}
	}
	// requires where.id
	_delete(context, input, realm) {
		const self = this;
		const { database, transaction } = context;
		const { agent, entity, operation } = realm;
		if (input && input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, "delete", target_record).then(function () {
						return self._execute(context, operation, input);
					});
				} else {
					return self.empty_delete_response;
				}
			});
		} else {
			throw new Error(`Field 'where.${self.key_id}' is required`);
		}
	}
}

export { AccessSystemModel };
