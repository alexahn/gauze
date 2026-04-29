import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";

import { SystemModel } from "./system.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

import { EXECUTE__GRAPHQL__SHELL__SRC__KERNEL } from "./../shell/graphql.js";

import { v4 as uuidv4 } from "uuid";

class AccessSystemModel extends SystemModel {
	constructor(root_config, access_config) {
		super(root_config, access_config);
		const self = this;
		self.name = self.__name();
		self.key_id = `${self.entity.table_name}__id`;
		self.key_realm = `${self.entity.table_name}__realm`;
		self.key_agent_role = `${self.entity.table_name}__agent_role`;
		self.key_agent_type = `${self.entity.table_name}__agent_type`;
		self.key_agent_id = `${self.entity.table_name}__agent_id`;
		self.key_entity_type = `${self.entity.table_name}__entity_type`;
		self.key_entity_id = `${self.entity.table_name}__entity_id`;
		self.key_method = `${self.entity.table_name}__method`;
		self.table_name = self.entity.table_name;
		self.primary_key = self.entity.primary_key;
		self.empty_create_response = {
			data: {
				[`create_${self.entity.name}`]: [],
			},
		};
		self.generate_create_response = function (rows) {
			return {
				data: {
					[`create_${self.entity.name}`]: rows,
				},
			};
		};
		self.empty_read_response = {
			data: {
				[`read_${self.entity.name}`]: [],
			},
		};
		self.generate_read_response = function (rows) {
			return {
				data: {
					[`read_${self.entity.name}`]: rows,
				},
			};
		};
		self.empty_update_response = {
			data: {
				[`update_${self.entity.name}`]: [],
			},
		};
		self.generate_update_response = function (rows) {
			return {
				data: {
					[`update_${self.entity.name}`]: rows,
				},
			};
		};
		self.empty_delete_response = {
			data: {
				[`delete_${self.entity.name}`]: [],
			},
		};
		self.generate_delete_response = function (rows) {
			return {
				data: {
					[`delete_${self.entity.name}`]: rows,
				},
			};
		};
		self.empty_count_response = {
			data: {
				[`count_${self.entity.name}`]: [],
			},
		};
		self.generate_count_response = function (rows) {
			return {
				data: {
					[`count_${self.entity.name}`]: rows,
				},
			};
		};
		self.valid_realm = {
			system: true,
		};
		self.valid_agent_role = {
			root: true,
			trunk: true,
			leaf: true,
		};
		self.valid_agent_types = {};
		if ($abstract.entities.agent_root) {
			self.agent_root = $abstract.entities.agent_root.default($abstract);
			self.valid_agent_types[self.agent_root.table_name] = true;
		}
		if ($abstract.entities.agent_account) {
			self.agent_account = $abstract.entities.agent_account.default($abstract);
			self.valid_agent_types[self.agent_account.table_name] = true;
		}
		if ($abstract.entities.agent_user) {
			self.agent_user = $abstract.entities.agent_user.default($abstract);
			self.valid_agent_types[self.agent_user.table_name] = true;
		}
		if ($abstract.entities.agent_person) {
			self.agent_person = $abstract.entities.agent_person.default($abstract);
			self.valid_agent_types[self.agent_person.table_name] = true;
		}
		if ($abstract.entities.agent_character) {
			self.agent_character = $abstract.entities.agent_character.default($abstract);
			self.valid_agent_types[self.agent_character.table_name] = true;
		}
		self.valid_entity_types = {};
		Object.keys($abstract.entities).forEach(function (name) {
			const entity = $abstract.entities[name].default($abstract);
			self.valid_entity_types[entity.table_name] = true;
		});
	}
	static _class_name(schema_name) {
		return schema_name ? `(${schema_name})[${super._class_name()}]AccessSystemModel` : `[${super._class_name()}]AccessSystemModel`;
	}
	__name() {
		const self = this;
		return AccessSystemModel._class_name(self.schema_name);
	}
	_valid_access(context, agent, method, record) {
		//const self = this
		//const { database, transaction } = context
		//return self._valid_access_transaction(context, agent, method, record, database, transaction)
		const self = this;
		const entity_id = record[self.key_entity_id];
		const entity_table_name = record[self.key_entity_type];
		const entity_primary_key = $structure.gauze.resolvers.SQL_TABLE_TO_SQL_PRIMARY_KEY__RESOLVER__STRUCTURE[entity_table_name];
		const parameters = {
			where: {
				[self.key_entity_id]: record[self.key_entity_id],
				[self.key_entity_type]: record[self.key_entity_type],
				[self.key_method]: record[self.key_method],
				[self.key_agent_id]: agent.agent_id,
				[self.key_agent_type]: agent.agent_type,
			},
		};
		// route transactions here
		return context.database_manager.route_transactions(context, {}, parameters, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._valid_access_transaction(context, agent, method, record, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
	}
	_valid_access_transaction(context, agent, method, record, database, transaction) {
		const self = this;
		return self._initiator_records(context, record, agent, database, transaction).then(function (access_records) {
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
	_initiator_records(context, entity, agent, database, transaction) {
		const self = this;
		const sql = database(self.entity.table_name)
			.where({
				[self.key_entity_type]: entity[self.key_entity_type],
				[self.key_entity_id]: entity[self.key_entity_id],
				[self.key_method]: entity[self.key_method],
				[self.key_agent_id]: agent.agent_id,
				[self.key_agent_type]: agent.agent_type,
			})
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._initiator_records:debug_sql`, sql.toString());
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
		// sorted in descending authority (root first, trunk second, leaf last)
		const sorted = records.sort(function (a, b) {
			return ranking[a[self.key_agent_role]] - ranking[b[self.key_agent_role]];
		});
		return sorted[0];
	}
	_validate_hierarchy(initiator_record, target_record, method) {
		const self = this;
		const initiator_role = initiator_record[self.key_agent_role];
		const target_role = target_record[self.key_agent_role];
		if (initiator_role === "root") {
			// root can create trunk or leaf
			if (target_role === "root") {
				if ((method === "read" || method === "count") && initiator_record[self.key_id] === target_record[self.key_id]) {
					return true;
				} else {
					throw new Error("Target agent's role cannot be root");
				}
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
				if (method === "read" || method === "count") {
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
			LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._preread:debug_sql`, sql.toString());
		}
		return sql;
	}
	_validate_model(attributes) {
		const self = this;
		if (!attributes[self.key_realm]) {
			throw new Error(`Field '${self.key_realm}' is required`);
		}
		if (!self.valid_realm[attributes[self.key_realm]]) {
			throw new Error(`Field '${self.key_realm}' must be one of: ${Object.keys(self.valid_realm)}`);
		}
		if (!attributes[self.key_agent_role]) {
			throw new Error(`Field '${self.key_agent_role}' is required`);
		}
		if (!self.valid_agent_role[attributes[self.key_agent_role]]) {
			throw new Error(`Field '${self.key_agent_role}' must be one of: ${Object.keys(self.valid_agent_role)}`);
		}
		if (!attributes[self.key_agent_type]) {
			throw new Error(`Field '${self.key_agent_type}' is required`);
		}
		if (!self.valid_agent_types[attributes[self.key_agent_type]]) {
			throw new Error(`Field '${self.key_agent_type}' must be one of: ${Object.keys(self.valid_agent_types)}`);
		}
		if (!attributes[self.key_agent_id]) {
			throw new Error(`Field '${self.key_agent_id}' is required`);
		}
		if (!attributes[self.key_entity_type]) {
			throw new Error(`Field '${self.key_entity_type}' is required`);
		}
		if (!self.valid_entity_types[attributes[self.key_entity_type]]) {
			throw new Error(`Field '${self.key_entity_type}' must be one of: ${Object.keys(self.valid_entity_types)}`);
		}
		if (!attributes[self.key_entity_id]) {
			throw new Error(`Field '${self.key_entity_id}' is required`);
		}
		if (!attributes[self.key_method]) {
			throw new Error(`Field '${self.key_method}' is required`);
		}
	}
	_root_create(context, scope, input, realm) {
		const self = this;
		if (!input.attributes[self.primary_key]) {
			const primary_key = uuidv4();
			input.attributes[self.primary_key] = primary_key;
		}
		// skip getting a transaction since _root_create_transaction doesn't use one
		// note: shard type is read because if we used write, we could potentially get three transactions, and we would execute three graphql queries, which each would get three transactions
		/*
		return context.database_manager.route_transactions(context, {}, input, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_create_transaction(context, {}, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				// stitch together results and build response
				const rows = results
					.map(function (result) {
						return result.data[`create_${self.entity.name}`];
					})
					.flat();
				return self.generate_create_response(rows);
				//return results.flat();
			});
		});
		*/
		return self._root_create_transaction(context, {}, input, realm, null, null);
	}
	// requires a valid record
	_root_create_transaction(context, scope, input, realm, database, transaction) {
		const self = this;
		const { agent, entity, operation } = realm;
		const method = "create";
		const target_record = input.attributes;
		self._validate_model(target_record);
		return self._valid_access(context, agent, method, target_record).then(function () {
			return self._execute(context, operation, input);
		});
	}
	_create(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "create");
		return self.model_loader.load(context, scope, key);
	}
	_read_agent(context, scope, input, realm) {
		const self = this;
		const agent_id = input.where[self.key_agent_id];
		const agent_table_name = input.where[self.key_agent_type];
		const agent_primary_key = $structure.gauze.resolvers.SQL_TABLE_TO_SQL_PRIMARY_KEY__RESOLVER__STRUCTURE[agent_table_name];
		const parameters = {
			where: {
				[agent_primary_key]: agent_id,
			},
		};
		const model = {
			table_name: agent_table_name,
			primary_key: agent_primary_key,
		};
		// route transactions here
		return context.database_manager.route_transactions(context, scope, parameters, model, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._read_agent_transaction(context, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
	}
	_read_agent_transaction(context, input, realm, database, transaction) {
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
		const entity_id = input.where[self.key_entity_id];
		const entity_table_name = input.where[self.key_entity_type];
		const entity_primary_key = $structure.gauze.resolvers.SQL_TABLE_TO_SQL_PRIMARY_KEY__RESOLVER__STRUCTURE[entity_table_name];
		const parameters = {
			where: {
				[entity_primary_key]: entity_id,
			},
		};
		const model = {
			table_name: entity_table_name,
			primary_key: entity_primary_key,
		};
		// route transactions here
		return context.database_manager.route_transactions(context, {}, parameters, model, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._read_entity_transaction(context, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
		//return self._read_entity_transaction(context, input, realm, database, transaction)
	}
	_read_entity_transaction(context, input, realm, database, transaction) {
		const self = this;
		const { agent, entity, operation } = realm;
		// get highest record for initiator
		// get list of records based on entity_id, entity_type, and method
		// filter list of records based on role hierarchy
		// root initiator can see everything, trunk can see trunk and leaf, leaf can only see itself
		return self._initiator_records(context, input.where, agent, database, transaction).then(function (access_records) {
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
	_root_read(context, scope, input, realm) {
		const self = this;
		return context.database_manager.route_transactions(context, scope, input, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_read_transaction(context, scope, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				//return results.flat();
				// stitch together results and build response
				const rows = results
					.map(function (result) {
						return result.data[`read_${self.entity.name}`];
					})
					.flat();
				return self.generate_read_response(rows);
			});
		});
	}
	// requires where.id or where.agent_id or (where.entity_id and where.entity_type and where.method)
	_root_read_transaction(context, scope, input, realm, database, transaction) {
		const self = this;
		const { agent, entity, operation } = realm;
		const method = "read";
		if (input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, method, target_record, database, transaction).then(function () {
						return self._execute(context, operation, input);
					});
				} else {
					return self.empty_read_response;
				}
			});
		} else if (input.where && input.where[self.key_agent_id] && input.where[self.key_agent_type]) {
			return self._read_agent_transaction(context, input, realm, database, transaction);
		} else if (input.where && input.where[self.key_entity_id] && input.where[self.key_entity_type] && input.where[self.key_method]) {
			return self._read_entity_transaction(context, input, realm, database, transaction);
		} else {
			// todo: move this to system interface
			throw new Error(
				`Field 'where.${self.key_id}' or ('where.${self.key_agent_id}' and 'where.${self.key_agent_type}') or ('where.${self.key_entity_id}' and 'where.${self.key_entity_type}' and 'where.${self.key_method}') are required`,
			);
		}
	}
	_cursor_read_authorized_ids(context, scope, input, realm) {
		const self = this;
		return context.database_manager.route_transactions(context, scope, input, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._cursor_read_authorized_ids_transaction(context, scope, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
	}
	_cursor_read_authorized_ids_transaction(context, scope, input, realm, database, transaction) {
		const self = this;
		const { agent } = realm;
		const method = "read";
		if (input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, method, target_record).then(function () {
						return [target_record[self.key_id]];
					});
				} else {
					return [];
				}
			});
		} else if (input.where && input.where[self.key_agent_id] && input.where[self.key_agent_type]) {
			if (input.where[self.key_agent_id] === agent.agent_id) {
				const sql = database(self.entity.table_name).where(input.where).transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._cursor_read_agent:debug_sql`, sql.toString());
				}
				return sql.then(function (target_records) {
					return target_records.map(function (record) {
						return record[self.key_id];
					});
				});
			} else {
				throw new Error(`Field '${self.key_agent_id}' must be equal to the initiating agent's id`);
			}
		} else if (input.where && input.where[self.key_entity_id] && input.where[self.key_entity_type] && input.where[self.key_method]) {
			return self._initiator_records(context, input.where, agent, database, transaction).then(function (access_records) {
				if (access_records && access_records.length) {
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
						return filtered.map(function (record) {
							return record[self.key_id];
						});
					});
				} else {
					throw new Error("Agent does not have access to this method");
				}
			});
		} else {
			throw new Error(
				`Field 'where.${self.key_id}' or ('where.${self.key_agent_id}' and 'where.${self.key_agent_type}') or ('where.${self.key_entity_id}' and 'where.${self.key_entity_type}' and 'where.${self.key_method}') are required`,
			);
		}
	}
	_cursor_read(context, scope, parameters = {}, realm) {
		const self = this;
		const request = self._cursor_request_from_parameters(parameters, "read");
		return self._cursor_read_authorized_ids(context, scope, request.parameters, realm).then(function (valid_ids) {
			const execute_parameters = self._cursor_cache_where_in(parameters, self.key_id, valid_ids);
			return self._execute(context, realm.operation, execute_parameters);
		});
	}
	_read(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "read");
		return self.model_loader.load(context, scope, key);
	}
	_cursor_update(context, scope, parameters, realm) {
		throw new Error("cursor_update is not supported for access system models");
	}
	_root_update(context, scope, input, realm) {
		const self = this;
		// note: shard type is read because _root_create_transaction could read permissions
		return context.database_manager.route_transactions(context, {}, input, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_update_transaction(context, {}, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				// stitch together results and build response
				const rows = results
					.map(function (result) {
						return result.data[`update_${self.entity.name}`];
					})
					.flat();
				return self.generate_update_response(rows);
			});
		});
	}
	// requires where.id
	_root_update_transaction(context, scope, input, realm, database, transaction) {
		const self = this;
		// new access records cannot be updated, due to distributed storage
		const { agent, entity, operation } = realm;
		const method = "update";
		const change_record = input.attributes;
		if (input && input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, method, target_record).then(function () {
						const staged = { ...target_record, ...change_record };
						self._validate_model(staged);
						return self._valid_access(context, agent, method, staged).then(function () {
							// should we throw an error or return an empty set?
							//throw new Error("Access record cannot be modified")
							return self.empty_update_response;

							//return self._execute(context, operation, input);
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
	_update(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "update");
		return self.model_loader.load(context, scope, key);
	}
	_root_delete(context, scope, input, realm, database, transaction) {
		const self = this;
		// note: shard type is read because _root_delete_transaction only does a read
		return context.database_manager.route_transactions(context, scope, input, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_delete_transaction(context, scope, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				// stitch together results and build response
				const rows = results
					.map(function (result) {
						return result.data[`delete_${self.entity.name}`];
					})
					.flat();
				return self.generate_delete_response(rows);
			});
		});
	}
	// requires where.id
	_root_delete_transaction(context, scope, input, realm, database, transaction) {
		const self = this;
		const { agent, entity, operation } = realm;
		const method = "delete";
		if (input && input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, method, target_record).then(function () {
						// augment input with necessary sharding information
						if (input.where[self.key_entity_id] && input.where[self.key_entity_id] !== target_record[self.key_entity_id]) {
							return self.empty_delete_response;
						} else {
							input.where[self.key_entity_id] = target_record[self.key_entity_id];
						}
						if (input.where[self.key_entity_type] && input.where[self.key_entity_type] !== target_record[self.key_entity_type]) {
							return self.empty_delete_response;
						} else {
							input.where[self.key_entity_type] = target_record[self.key_entity_type];
						}
						if (input.where[self.key_agent_id] && input.where[self.key_agent_id] !== target_record[self.key_agent_id]) {
							return self.empty_delete_response;
						} else {
							input.where[self.key_agent_id] = target_record[self.key_agent_id];
						}
						if (input.where[self.key_agent_type] && input.where[self.key_agent_type] !== target_record[self.key_agent_type]) {
							return self.empty_delete_response;
						} else {
							input.where[self.key_agent_type] = target_record[self.key_agent_type];
						}
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
	_delete(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "delete");
		return self.model_loader.load(context, scope, key);
	}
	_cursor_delete(context, scope, parameters, realm) {
		throw new Error("cursor_delete is not supported for access system models");
	}
	_count_agent(context, scope, input, realm) {
		const self = this;
		const agent_id = input.where[self.key_agent_id];
		const agent_table_name = input.where[self.key_agent_type];
		const agent_primary_key = $structure.gauze.resolvers.SQL_TABLE_TO_SQL_PRIMARY_KEY__RESOLVER__STRUCTURE[agent_table_name];
		const parameters = {
			where: {
				[agent_primary_key]: agent_id,
			},
		};
		const model = {
			table_name: agent_table_name,
			primary_key: agent_primary_key,
		};
		// route transactions here
		return context.database_manager.route_transactions(context, scope, parameters, model, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._count_agent_transaction(context, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
	}
	_count_agent_transaction(context, input, realm, database, transaction) {
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
	_count_entity(context, input, realm) {
		const self = this;
		const entity_id = input.where[self.key_entity_id];
		const entity_table_name = input.where[self.key_entity_type];
		const entity_primary_key = $structure.gauze.resolvers.SQL_TABLE_TO_SQL_PRIMARY_KEY__RESOLVER__STRUCTURE[entity_table_name];
		const parameters = {
			where: {
				[entity_primary_key]: entity_id,
			},
		};
		const model = {
			table_name: entity_table_name,
			primary_key: entity_primary_key,
		};
		// route transactions here
		return context.database_manager.route_transactions(context, {}, parameters, model, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._count_entity_transaction(context, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				//return results.flat();
				// stitch together results and build response
				const rows = results
					.map(function (result) {
						return result.data[`count_${self.entity.name}`];
					})
					.flat();
				return self.generate_count_response(rows);
			});
		});
	}
	_count_entity_transaction(context, input, realm, database, transaction) {
		const self = this;
		const { agent, entity, operation } = realm;
		// get highest record for initiator
		// get list of records based on entity_id, entity_type, and method
		// filter list of records based on role hierarchy
		// root initiator can see everything, trunk can see trunk and leaf, leaf can only see itself
		return self._initiator_records(context, input.where, agent, database, transaction).then(function (access_records) {
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
					// TODO: intersect with existing where_in
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
	_root_count(context, scope, input, realm) {
		const self = this;
		return context.database_manager.route_transactions(context, scope, input, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_count_transaction(context, scope, input, realm, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				// stitch together results and build response
				const rows = results
					.map(function (result) {
						return result.data[`count_${self.entity.name}`];
					})
					.flat();
				const count_rows = self._merge_count_rows(rows, input.count);
				return self.generate_count_response(count_rows);
			});
		});
	}
	// requires where.id or where.agent_id or (where.entity_id and where.entity_type and where.method)
	_root_count_transaction(context, scope, input, realm, database, transaction) {
		const self = this;
		const { agent, entity, operation } = realm;
		const method = "count";
		if (input.where && input.where[self.key_id]) {
			return self._preread(database, transaction, input.where).then(function (target_records) {
				if (target_records && target_records.length) {
					const target_record = target_records[0];
					return self._valid_access(context, agent, method, target_record).then(function () {
						return self._execute(context, operation, input);
					});
				} else {
					return self.empty_count_response;
				}
			});
		} else if (input.where && input.where[self.key_agent_id]) {
			return self._count_agent_transaction(context, input, realm, database, transaction);
		} else if (input.where && input.where[self.key_entity_id] && input.where[self.key_entity_type] && input.where[self.key_method]) {
			return self._count_entity_transaction(context, input, realm, database, transaction);
		} else {
			// todo: move this to system interface
			throw new Error(
				`Field 'where.${self.key_id}' or 'where.${self.key_agent_id}' or ('where.${self.key_entity_id}' and 'where.${self.key_entity_type}' and 'where.${self.key_method}') are required`,
			);
		}
	}
	_count(context, scope, parameters, realm) {
		const self = this;
		const key = self._model_batch_key(parameters, realm, "count");
		return self.model_loader.load(context, scope, key);
	}
}

export { AccessSystemModel };
