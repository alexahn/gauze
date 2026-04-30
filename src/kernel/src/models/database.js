import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

import { TIERED_CACHE__LRU__CACHE__SRC__KERNEL } from "./../cache/lru.js";
import { ENCODE_PAYLOAD__CURSOR__SRC__KERNEL, DECODE_PAYLOAD__CURSOR__SRC__KERNEL } from "./../cursor.js";

import DataLoader from "./../dataloader.js";
import TTLLRUCache from "./../lru.js";

import { Model } from "./class.js";

import { v4 as uuidv4 } from "uuid";

function process_knex_error_sqlite3(self, err) {
	const unique_constraint_regex = new RegExp("UNIQUE constraint failed: (?<column>(.*))$");
	const unique_constraint = err.message.match(unique_constraint_regex);
	if (unique_constraint) {
		const unique_constraint_split = unique_constraint.groups.column.split(".");
		const unique_constraint_table = unique_constraint_split[0];
		const unique_constraint_column = unique_constraint_split[1];
		if (unique_constraint_table === self.entity.table_name && self.entity.fields[unique_constraint_column]) {
			const constraint_err = $abstract.gauze.errors.UNIQUE_CONSTRAINT__ERROR_GAUZE__ABSTRACT(self.entity, self.entity.fields[unique_constraint_column], err.message);
			throw constraint_err;
		}
	}
	// additional constraints go here
	throw err;
}

function process_knex_error_postgresql(self, err) {
	throw err;
}

class DatabaseModel extends Model {
	constructor(root_config, database_config, manager) {
		if (!root_config) throw new Error("DatabaseModel cannot be instantiated without root config");
		super(root_config);
		const self = this;
		if (!database_config) throw new Error("DatabaseModel cannot be instantiated without database config");
		const { table_name, primary_key } = database_config;
		self.table_name = table_name;
		self.primary_key = primary_key;
		if (!manager) throw new Error("DatabaseModel cannot be instantiated without a database manager");
		self.manager = manager;
		self.limit_max = parseInt(process.env.GAUZE_SQL_MAX_LIMIT, 10);
		self.breadth_max = parseInt(process.env.GAUZE_SQL_MAX_BREADTH, 10);
		self.transactions_max = parseInt(process.env.GAUZE_SQL_MAX_TRANSACTIONS, 10);
		if ($structure.entities.relationship) {
			self.relationship_table_name = $structure.entities.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE;
			self.relationship_primary_key = $structure.entities.relationship.database.sql.PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("5", __RELATIVE_FILEPATH, `${this.name}.constructor:WARNING`, new Error("Relationship structure not found"));
		}
		if ($structure.entities.whitelist) {
			self.whitelist_table_name = $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE;
			self.whitelist_primary_key = $structure.entities.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("5", __RELATIVE_FILEPATH, `${self.name}.constructor:WARNING`, new Error("Whitelist structure not found"));
		}
		if ($structure.entities.blacklist) {
			self.blacklist_table_name = $structure.entities.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE;
			self.blacklist_primary_key = $structure.entities.blacklist.database.sql.PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("5", __RELATIVE_FILEPATH, `${self.name}.constructor:WARNING`, new Error("Blacklist structure not found"));
		}
		self.name = self.__name();
		self.loader = new DataLoader(self._batch, {
			cacheMap: new TTLLRUCache(1024, 8192),
		});
		self.loader.model = self;
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	static _class_name(table_name) {
		return table_name ? `(${table_name})[${super._class_name()}]DatabaseModel` : `[${super._class_name()}]DatabaseModel`;
	}
	__name() {
		const self = this;
		return DatabaseModel._class_name(self.table_name);
	}
	_batch_key(source, parameters, method) {
		const key = {
			source: source,
			parameters: parameters,
			method: method,
		};
		return JSON.stringify(key);
	}
	_batch(contexts, scopes, keys) {
		const self = this;
		// group keys according to operation and params
		// e.g. 1:1:1, 2:1:1 1:2:2:, 3:2:2, 4:2:2 will become [1:1:1, 2:1:1], [1:2:2, 3:2:2, 4:2:2]
		// in effect the source attribute will become the only active variable if we treat operation and params as a subkey
		// for source null, we just map each item to some of the existing logic
		// for source non null, we need to do a full database join using where in for the from_id and from_type
		// we will need to manually construct the result set for each subgroup (e.g. by manually handling limit, order, offset, etc)
		// my original idea was to avoid data batching because at extreme scales, i'm not convinced this approach is feasible
		// the problem with software engineering is that things appear inefficient in the simple use cases, but they might actually be the right way at large scale
		// to do a full database join and sort through the results in memory for millions or billions of records will not scale
		// at that point, it would be better to shard the database to thousands of nodes and accept the increase in number of queries and put a hard cap to the number of results that can be returned at once
		// and also put a limit to the depth of nested queries/mutations/relationships
		// e.g. as an example you can set the limit for returning results to be 128, with a max nested depth of 3
		// the maximum number of queries initiated on the backend would be 2097152, which seems like a lot, but if you can shard your data to an arbitrary resolution, then you could have for example 100000 database nodes
		// and not all of them would be hit at once because those potential 2097152 queries would be aggregated to the nodes that hold the data
		// on average, each database would only be seeing about 20 queries in the example above, and the architecture would avoid doing any in memory joins, so there would be a near constant latency
		const subkey_map = {};
		keys.forEach(function (key, index) {
			const parsed = JSON.parse(key);
			const subkey = JSON.stringify({
				method: parsed.method,
				parameters: parsed.parameters,
			});
			if (subkey_map[subkey]) {
				subkey_map[subkey].push({
					index: index,
					source: parsed.source,
					raw_key: key,
				});
			} else {
				subkey_map[subkey] = [
					{
						index: index,
						source: parsed.source,
						raw_key: key,
					},
				];
			}
		});
		// convert to array format so we can easily use it in promises
		// [[{ source:, operation:, parameters}, ...], [{ source:, operation:, parameters:}...]]
		const groups_without_source = Object.keys(subkey_map).map(function (key) {
			const parsed = JSON.parse(key);
			const sources = subkey_map[key];
			return sources
				.map(function (item) {
					return {
						method: parsed.method,
						parameters: parsed.parameters,
						source: item.source,
						index: item.index,
						raw_key: item.raw_key,
					};
				})
				.filter(function (item) {
					return item.source === null;
				});
		});
		const groups_with_source = Object.keys(subkey_map).map(function (key) {
			const parsed = JSON.parse(key);
			const sources = subkey_map[key];
			return sources
				.map(function (item) {
					return {
						method: parsed.method,
						parameters: parsed.parameters,
						source: item.source,
						index: item.index,
						raw_key: item.raw_key,
					};
				})
				.filter(function (item) {
					return item.source !== null;
				});
		});
		function handle_groups_without_source(groups) {
			// map each to a basic method
			return Promise.all(
				groups.map(function (group) {
					return Promise.all(
						group.map(function (key) {
							// rich typed parameters (post graphql parsing) pulled from cache
							const cached = TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(key.raw_key);
							const parameters = cached ? cached.value : JSON.parse(key.raw_key).parameters;
							if (key.method === "create") {
								return self.model._root_create(contexts[key.index], scopes[key.index], parameters).then(function (data) {
									self.clearAll();
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "read") {
								return self.model._root_read(contexts[key.index], scopes[key.index], parameters).then(function (data) {
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "update") {
								return self.model._root_update(contexts[key.index], scopes[key.index], parameters).then(function (data) {
									self.clearAll();
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "delete") {
								return self.model._root_delete(contexts[key.index], scopes[key.index], parameters).then(function (data) {
									self.clearAll();
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "count") {
								return self.model._root_count(contexts[key.index], scopes[key.index], parameters).then(function (data) {
									self.clearAll();
									return {
										index: key.index,
										data: data,
									};
								});
							} else {
								throw new Error("Internal error: invalid batch operation");
							}
						}),
					);
				}),
			);
		}
		function handle_groups_with_source(groups) {
			// aggregate all source keys and use them to do a where in join
			if (process.env.GAUZE_MONOLITHIC === "TRUE") {
				// we need to essentially do multiple full queries as one query
				// it seems possible to do this using a sql query, but we would need to construct it by hand because knex does not support partition by
				// example sql: https://stackoverflow.com/questions/30768144/limit-number-of-rows-per-group-from-join-not-to-1-row
				// knex partition by support: https://github.com/knex/knex/issues/3391
				// using knex.raw is unpleasant because we would need to handle all the combinations of query/mutation arguments

				// for now we can just do a total join based on entity types and entity ids and return all the results
				// where, where_in, where_not_in, order, limit, and offset would all be done in memory
				// seems like this could easily become a source of problems

				// afterwards, we call a single method at the end with a set of ids
				return Promise.resolve([]);
			} else {
				return Promise.all(
					groups.map(function (group) {
						return Promise.all(
							group.map(function (key) {
								// rich typed parameters (post graphql parsing) pulled from cache
								const cached = TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(key.raw_key);
								const parameters = cached ? cached.value : JSON.parse(key.raw_key).parameters;
								if (key.method === "create") {
									return self.model._relationship_create(contexts[key.index], scopes[key.index], parameters).then(function (data) {
										self.clearAll();
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "read") {
									return self.model._relationship_read(contexts[key.index], scopes[key.index], parameters).then(function (data) {
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "update") {
									return self.model._relationship_update(contexts[key.index], scopes[key.index], parameters).then(function (data) {
										self.clearAll();
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "delete") {
									return self.model._relationship_delete(contexts[key.index], scopes[key.index], parameters).then(function (data) {
										self.clearAll();
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "count") {
									return self.model._relationship_count(contexts[key.index], scopes[key.index], parameters).then(function (data) {
										self.clearAll();
										return {
											index: key.index,
											data: data,
										};
									});
								} else {
									throw new Error("Internal error: invalid batch operation");
								}
							}),
						);
					}),
				);
			}
		}
		return Promise.all([handle_groups_without_source(groups_without_source), handle_groups_with_source(groups_with_source)])
			.then(function (resolved) {
				const groups_without_source = resolved[0];
				const groups_with_source = resolved[1];
				const output = Array(keys.length).fill(null);
				groups_without_source.forEach(function (group) {
					group.forEach(function (result) {
						output[result.index] = result.data;
					});
				});
				groups_with_source.forEach(function (group) {
					group.forEach(function (result) {
						output[result.index] = result.data;
					});
				});
				return output;
			})
			.then(function (result) {
				if (process.env.GAUZE_ENV === "test" || process.env.GAUZE_ENV === "test_monolithic" || process.env.GAUZE_ENV === "test_sharded") {
					self.clearAll();
				}
				return result;
			});
	}
	// makes sure we are below the maximum breadth (number of rows returned from the database) and transaction limit
	_check_constraints(context) {
		const self = this;
		context.breadth_count = context.breadth_count || 0;
		context.transaction_count = context.transaction_count || 0;
		if (self.breadth_max < context.breadth_count) throw new Error(`Maximum breadth exceeded: (current: ${context.breadth_count}, max: ${self.breadth_max})`);
		if (self.transactions_max < context.transaction_count) throw new Error(`Maximum transactions exceeded (current: ${context.transaction_count}, max: ${self.transactions_max})`);
	}
	// todo: see if we can remove the conditional checks before we unwrap the keys (the default value might always be an empty object)
	_validate_parameters(parameters) {
		const self = this;
		if (parameters.where) {
			Object.keys(parameters.where).forEach(function (key) {
				if (!self.entity.fields[key].indexed) {
					throw new Error(`Input argument 'where.${key}' is invalid: ${key} is not an indexed field`);
				}
			});
		}
		if (parameters.where_in) {
			Object.keys(parameters.where_in).forEach(function (key) {
				if (!self.entity.fields[key].indexed) {
					throw new Error(`Input argument 'where_in.${key}' is invalid: ${key} is not an indexed field`);
				}
			});
		}
		if (parameters.where_not_in) {
			Object.keys(parameters.where_not_in).forEach(function (key) {
				if (!self.entity.fields[key].indexed) {
					throw new Error(`Input argument 'where_not_in.${key}' is invalid: ${key} is not an indexed field`);
				}
			});
		}
		if (parameters.cache_where_in) {
			Object.keys(parameters.cache_where_in).forEach(function (key) {
				if (!self.entity.fields[key].indexed) {
					throw new Error(`Input argument 'cache_where_in.${key}' is invalid: ${key} is not an indexed field`);
				}
			});
		}
		if (parameters.cache_where_not_in) {
			Object.keys(parameters.cache_where_not_in).forEach(function (key) {
				if (!self.entity.fields[key].indexed) {
					throw new Error(`Input argument 'cache_where_not_in.${key}' is invalid: ${key} is not an indexed field`);
				}
			});
		}
		if (parameters.where_like) {
			Object.keys(parameters.where_like).forEach(function (key) {
				if (!self.entity.fields[key].indexed) {
					throw new Error(`Input argument 'where_like.${key}' is invalid: ${key} is not an indexed field`);
				}
			});
		}
		if (parameters.where_between) {
			Object.keys(parameters.where_between).forEach(function (key) {
				if (!self.entity.fields[key].indexed) {
					throw new Error(`Input argument 'where_between.${key}' is invalid: ${key} is not an indexed field`);
				}
			});
		}
		if (parameters.order) {
			self._validate_order(parameters.order);
		}
	}
	_validate_order(order) {
		const self = this;
		if (!Array.isArray(order)) {
			throw new Error("Input argument 'order' is invalid: order must be an array");
		}
		order.forEach(function (item, index) {
			if (!item || typeof item !== "object" || Array.isArray(item)) {
				throw new Error(`Input argument 'order.${index}' is invalid: order item must be an object`);
			}
			const { column, order, nulls } = item;
			if (typeof column !== "string") {
				throw new Error(`Input argument 'order.${index}.column' is invalid: column must be a string`);
			}
			if (self.entity.fields[column]) {
				if (!self.entity.fields[column].indexed) {
					throw new Error(`Input argument 'order.${index}.column' is invalid: ${column} is not an indexed field`);
				}
			} else {
				throw new Error(`Input argument 'order.${index}.column' is invalid: ${column} is not a valid field`);
			}
			if (typeof order !== "undefined" && order !== "asc" && order !== "desc") {
				throw new Error(`Input argument 'order.${index}.order' is invalid: order must be "asc" or "desc"`);
			}
			if (typeof nulls !== "undefined" && nulls !== "first" && nulls !== "last") {
				throw new Error(`Input argument 'order.${index}.nulls' is invalid: nulls must be "first" or "last"`);
			}
		});
	}
	_normalize_order(order) {
		const self = this;
		if (Array.isArray(order) && order.length) {
			return order.map(function (item) {
				return {
					column: item.column,
					order: item.order || self.entity.default_order_direction || "asc",
					nulls: item.nulls || "first",
				};
			});
		} else {
			return [
				{
					column: self.entity.default_order || self.primary_key,
					order: self.entity.default_order_direction || "asc",
					nulls: "first",
				},
			];
		}
	}
	_apply_order(builder, resolved_order, database) {
		const client = database && database.client && database.client.config ? database.client.config.client : null;
		if (client === "sqlite3" || client === "better-sqlite3") {
			resolved_order.forEach(function (item) {
				if (item.nulls) {
					const null_order = item.nulls === "first" ? "asc" : "desc";
					builder.orderByRaw(`(?? is not null) ${null_order}`, [item.column]);
				}
				builder.orderBy(item.column, item.order);
			});
			return builder;
		} else {
			return builder.orderBy(resolved_order);
		}
	}
	_order_column_sql_type(column) {
		const self = this;
		return column && self.entity && self.entity.fields && self.entity.fields[column] ? self.entity.fields[column].sql_type : null;
	}
	_is_numeric_sql_type(sql_type) {
		if (typeof sql_type !== "string") {
			return false;
		}
		const normalized = sql_type.toLowerCase().replace(/\(.*/, "").trim();
		return [
			"bigint",
			"bigserial",
			"decimal",
			"double precision",
			"float",
			"float4",
			"float8",
			"int",
			"int2",
			"int4",
			"int8",
			"integer",
			"numeric",
			"number",
			"real",
			"serial",
			"serial2",
			"serial4",
			"serial8",
			"smallint",
		].includes(normalized);
	}
	_decimal_from_string(value) {
		const decimal = String(value).trim();
		if (decimal === "NaN") {
			return { special: "nan" };
		}
		if (decimal === "Infinity" || decimal === "+Infinity") {
			return { special: "infinity", sign: 1 };
		}
		if (decimal === "-Infinity") {
			return { special: "infinity", sign: -1 };
		}
		const match = decimal.match(/^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))$/);
		if (!match) {
			return null;
		}
		const sign = match[1] === "-" ? -1 : 1;
		const integer = (match[2] || "0").replace(/^0+/, "") || "0";
		const fraction = (match[3] || match[4] || "").replace(/0+$/, "");
		if (integer === "0" && fraction === "") {
			return {
				sign: 0,
				integer: "0",
				fraction: "",
			};
		}
		return {
			sign,
			integer,
			fraction,
		};
	}
	_decimal_from_value(value) {
		if (typeof value === "bigint") {
			return this._decimal_from_string(value.toString());
		}
		if (typeof value === "number") {
			if (Number.isNaN(value)) {
				return { special: "nan" };
			}
			if (value === Infinity) {
				return { special: "infinity", sign: 1 };
			}
			if (value === -Infinity) {
				return { special: "infinity", sign: -1 };
			}
			return this._decimal_from_string(value.toString());
		}
		if (typeof value === "string") {
			return this._decimal_from_string(value);
		}
		return null;
	}
	_compare_decimal_values(left, right) {
		const left_decimal = this._decimal_from_value(left);
		const right_decimal = this._decimal_from_value(right);
		if (!left_decimal || !right_decimal) {
			return null;
		}
		if (left_decimal.special || right_decimal.special) {
			if (left_decimal.special === right_decimal.special && left_decimal.sign === right_decimal.sign) {
				return 0;
			}
			if (left_decimal.special === "nan") {
				return 1;
			}
			if (right_decimal.special === "nan") {
				return -1;
			}
			if (left_decimal.special === "infinity" && right_decimal.special !== "infinity") {
				return left_decimal.sign < 0 ? -1 : 1;
			}
			if (right_decimal.special === "infinity" && left_decimal.special !== "infinity") {
				return right_decimal.sign < 0 ? 1 : -1;
			}
			return left_decimal.sign < right_decimal.sign ? -1 : 1;
		}
		if (left_decimal.sign !== right_decimal.sign) {
			return left_decimal.sign < right_decimal.sign ? -1 : 1;
		}
		if (left_decimal.sign === 0) {
			return 0;
		}
		let comparison = 0;
		if (left_decimal.integer.length !== right_decimal.integer.length) {
			comparison = left_decimal.integer.length < right_decimal.integer.length ? -1 : 1;
		} else if (left_decimal.integer !== right_decimal.integer) {
			comparison = left_decimal.integer < right_decimal.integer ? -1 : 1;
		} else {
			const length = Math.max(left_decimal.fraction.length, right_decimal.fraction.length);
			for (let i = 0; i < length; i++) {
				const left_digit = left_decimal.fraction[i] || "0";
				const right_digit = right_decimal.fraction[i] || "0";
				if (left_digit !== right_digit) {
					comparison = left_digit < right_digit ? -1 : 1;
					break;
				}
			}
		}
		return left_decimal.sign < 0 ? -comparison : comparison;
	}
	_compare_numeric_order_values(left, right) {
		const left_nan = typeof left === "number" && Number.isNaN(left);
		const right_nan = typeof right === "number" && Number.isNaN(right);
		if (left_nan || right_nan) {
			if (left_nan && right_nan) {
				return 0;
			}
			return left_nan ? 1 : -1;
		}
		if (left < right) {
			return -1;
		}
		if (left > right) {
			return 1;
		}
		return 0;
	}
	_order_type_rank(value) {
		if (value === null) {
			return 0;
		}
		if (typeof value === "undefined") {
			return 1;
		}
		if (typeof value === "boolean") {
			return 2;
		}
		if (typeof value === "number" || typeof value === "bigint") {
			return 3;
		}
		if (typeof value === "string") {
			return 4;
		}
		if (value instanceof Date) {
			return 5;
		}
		if (value instanceof Uint8Array) {
			return 6;
		}
		if (Array.isArray(value)) {
			return 7;
		}
		if (typeof value === "object") {
			return 8;
		}
		return 9;
	}
	_is_order_interval(value) {
		return (
			value &&
			typeof value === "object" &&
			typeof value.toPostgres === "function" &&
			["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"].some(function (key) {
				return Object.prototype.hasOwnProperty.call(value, key);
			})
		);
	}
	_interval_order_value(value) {
		const months = (value.years || 0) * 12 + (value.months || 0);
		const days = months * 30 + (value.days || 0);
		const hours = days * 24 + (value.hours || 0);
		const minutes = hours * 60 + (value.minutes || 0);
		const seconds = minutes * 60 + (value.seconds || 0);
		return seconds * 1000 + (value.milliseconds || 0);
	}
	_is_order_point(value) {
		return value && typeof value === "object" && typeof value.x === "number" && typeof value.y === "number" && (typeof value.radius === "undefined" || typeof value.radius === "number");
	}
	_compare_order_object_fields(left, right, fields, defaults = {}) {
		for (const field of fields) {
			const left_value = Object.prototype.hasOwnProperty.call(left, field) ? left[field] : defaults[field];
			const right_value = Object.prototype.hasOwnProperty.call(right, field) ? right[field] : defaults[field];
			const comparison = this._compare_order_values(left_value, right_value);
			if (comparison !== 0) {
				return comparison;
			}
		}
		return 0;
	}
	_compare_order_objects(left, right) {
		if (this._is_order_interval(left) && this._is_order_interval(right)) {
			return this._compare_numeric_order_values(this._interval_order_value(left), this._interval_order_value(right));
		}
		if (this._is_order_point(left) && this._is_order_point(right)) {
			return this._compare_order_object_fields(left, right, ["x", "y", "radius"], { radius: 0 });
		}
		const left_keys = Object.keys(left).sort();
		const right_keys = Object.keys(right).sort();
		const length = Math.min(left_keys.length, right_keys.length);
		for (let i = 0; i < length; i++) {
			const key_comparison = this._compare_order_values(left_keys[i], right_keys[i]);
			if (key_comparison !== 0) {
				return key_comparison;
			}
			const value_comparison = this._compare_order_values(left[left_keys[i]], right[right_keys[i]]);
			if (value_comparison !== 0) {
				return value_comparison;
			}
		}
		if (left_keys.length < right_keys.length) {
			return -1;
		}
		if (left_keys.length > right_keys.length) {
			return 1;
		}
		return 0;
	}
	_compare_order_values(left, right, column = null) {
		if (left === right) {
			return 0;
		}
		const left_is_null = left === null || typeof left === "undefined";
		const right_is_null = right === null || typeof right === "undefined";
		if (left_is_null || right_is_null) {
			if (left_is_null && right_is_null) {
				return 0;
			}
			return left_is_null ? -1 : 1;
		}
		if (this._is_numeric_sql_type(this._order_column_sql_type(column))) {
			const comparison = this._compare_decimal_values(left, right);
			if (comparison !== null) {
				return comparison;
			}
		}
		if ((typeof left === "number" || typeof left === "bigint") && (typeof right === "number" || typeof right === "bigint")) {
			return this._compare_numeric_order_values(left, right);
		}
		if (left instanceof Date && right instanceof Date) {
			return this._compare_numeric_order_values(left.getTime(), right.getTime());
		}
		if (left instanceof Uint8Array && right instanceof Uint8Array) {
			const length = Math.min(left.length, right.length);
			for (let i = 0; i < length; i++) {
				if (left[i] < right[i]) {
					return -1;
				}
				if (left[i] > right[i]) {
					return 1;
				}
			}
			if (left.length < right.length) {
				return -1;
			}
			if (left.length > right.length) {
				return 1;
			}
			return 0;
		}
		if (Array.isArray(left) && Array.isArray(right)) {
			const length = Math.min(left.length, right.length);
			for (let i = 0; i < length; i++) {
				const comparison = this._compare_order_values(left[i], right[i]);
				if (comparison !== 0) {
					return comparison;
				}
			}
			if (left.length < right.length) {
				return -1;
			}
			if (left.length > right.length) {
				return 1;
			}
			return 0;
		}
		if (typeof left === "object" && typeof right === "object") {
			return this._compare_order_objects(left, right);
		}
		if (left < right) {
			return -1;
		}
		if (left > right) {
			return 1;
		}
		const left_rank = this._order_type_rank(left);
		const right_rank = this._order_type_rank(right);
		if (left_rank < right_rank) {
			return -1;
		}
		if (left_rank > right_rank) {
			return 1;
		}
		return 0;
	}
	_compare_rows_by_order(left, right, resolved_order) {
		const self = this;
		for (const item of resolved_order) {
			const left_value = left[item.column];
			const right_value = right[item.column];
			const left_is_null = left_value === null || typeof left_value === "undefined";
			const right_is_null = right_value === null || typeof right_value === "undefined";
			if (left_is_null || right_is_null) {
				if (left_is_null && right_is_null) {
					continue;
				}
				return left_is_null === (item.nulls === "first") ? -1 : 1;
			}
			const comparison = self._compare_order_values(left_value, right_value, item.column);
			if (comparison !== 0) {
				return item.order === "desc" ? -comparison : comparison;
			}
		}
		return 0;
	}
	_sort_rows(rows, order) {
		const self = this;
		const resolved_order = self._normalize_order(order);
		const primary_key_ordered = resolved_order.some(function (item) {
			return item.column === self.primary_key;
		});
		const total_order = primary_key_ordered
			? resolved_order
			: resolved_order.concat([
					{
						column: self.primary_key,
						order: "asc",
						nulls: "last",
					},
				]);
		return rows.slice().sort(function (left, right) {
			return self._compare_rows_by_order(left, right, total_order);
		});
	}
	_cursor_encode(payload) {
		return ENCODE_PAYLOAD__CURSOR__SRC__KERNEL(payload);
	}
	_cursor_decode(cursor) {
		const self = this;
		const payload = DECODE_PAYLOAD__CURSOR__SRC__KERNEL(cursor);
		if (!payload || payload.v !== 1 || payload.entity !== self.table_name) {
			throw new Error("Invalid cursor payload");
		}
		return payload;
	}
	_cursor_has_value(value) {
		if (typeof value === "undefined" || value === null) {
			return false;
		}
		if (Array.isArray(value)) {
			return value.length > 0;
		}
		if (typeof value === "object") {
			return Object.keys(value).length > 0;
		}
		return true;
	}
	_cursor_external_arguments(parameters = {}) {
		const self = this;
		return Object.keys(parameters).filter(function (key) {
			return key !== "cursor" && !self._cursor_internal_argument(key) && self._cursor_has_value(parameters[key]);
		});
	}
	_cursor_internal_argument(key) {
		return key === "cache_where_in" || key === "cache_where_not_in";
	}
	_cursor_merge_internal_arguments(cursor_parameters = {}, parameters = {}) {
		const self = this;
		const merged = {
			...cursor_parameters,
		};
		Object.keys(parameters).forEach(function (key) {
			if (self._cursor_internal_argument(key) && self._cursor_has_value(parameters[key])) {
				merged[key] = parameters[key];
			}
		});
		return merged;
	}
	_cursor_payload_parameters(parameters = {}) {
		const self = this;
		const payload_parameters = {};
		Object.keys(parameters).forEach(function (key) {
			if (!self._cursor_internal_argument(key)) {
				payload_parameters[key] = parameters[key];
			}
		});
		return payload_parameters;
	}
	_cursor_clean_parameters(parameters = {}) {
		const clean = {};
		Object.keys(parameters).forEach(function (key) {
			if (key === "cursor" || key === "offset") {
				return;
			}
			const value = parameters[key];
			if (typeof value === "undefined" || value === null) {
				return;
			}
			clean[key] = value;
		});
		return clean;
	}
	_cursor_total_order(order) {
		const self = this;
		const resolved_order = self._normalize_order(order);
		const primary_key_ordered = resolved_order.some(function (item) {
			return item.column === self.primary_key;
		});
		const total_order = primary_key_ordered
			? resolved_order
			: resolved_order.concat([
					{
						column: self.primary_key,
						order: "asc",
						nulls: "last",
					},
				]);
		return total_order;
	}
	_cursor_reverse_order(order) {
		return order.map(function (item) {
			return {
				...item,
				order: item.order === "asc" ? "desc" : "asc",
				nulls: item.nulls === "first" ? "last" : "first",
			};
		});
	}
	_cursor_boundary_values(row, order) {
		return order.map(function (item) {
			return {
				column: item.column,
				value: row[item.column],
			};
		});
	}
	_cursor_boundary(row, order, direction) {
		const self = this;
		if (!row) {
			return null;
		}
		const values = self._cursor_boundary_values(row, order);
		if (direction === "next") {
			return {
				type: "lexicographic",
				start: values,
				end: null,
			};
		}
		if (direction === "previous") {
			return {
				type: "lexicographic",
				start: null,
				end: values,
			};
		}
		throw new Error("Invalid cursor direction");
	}
	_cursor_request_from_parameters(parameters, method) {
		const self = this;
		if (parameters.cursor) {
			const external_arguments = self._cursor_external_arguments(parameters);
			if (external_arguments.length) {
				throw new Error("Field 'cursor' cannot be combined with other cursor operation arguments");
			}
			const payload = self._cursor_decode(parameters.cursor);
			if (payload.method !== method) {
				throw new Error("Invalid cursor method");
			}
			const page = payload[payload.page];
			if (!page) {
				throw new Error("Invalid cursor page");
			}
			return {
				parameters: self._cursor_merge_internal_arguments(payload.parameters || {}, parameters),
				page,
				page_name: payload.page,
				pages: {
					previous: payload.previous || null,
					current: payload.current || null,
					next: payload.next || null,
				},
			};
		}
		const page = {
			direction: "current",
			cursor_where_between: null,
		};
		return {
			parameters: self._cursor_clean_parameters(parameters),
			page,
			page_name: "current",
			pages: {
				previous: null,
				current: page,
				next: null,
			},
		};
	}
	_cursor_select_parameters(parameters, page) {
		const self = this;
		const limit = Math.min(parameters.limit || 16, self.limit_max);
		const order = self._cursor_total_order(parameters.order);
		const select_order = page.direction === "previous" ? self._cursor_reverse_order(order) : order;
		return {
			...parameters,
			limit: limit + 1,
			offset: 0,
			order: select_order,
			cursor_order: order,
			cursor_where_between: page.cursor_where_between || null,
		};
	}
	_cursor_encode_page(parameters, page, previous, current, next) {
		const self = this;
		if (!page) {
			return null;
		}
		return self._cursor_encode({
			v: 1,
			entity: self.table_name,
			method: parameters.__cursor_method,
			parameters: parameters.__cursor_parameters,
			page,
			previous,
			current,
			next,
		});
	}
	_cursor_page_info_response(method, cursor_parameters, nodes, previous, current, next, has_previous_page, has_next_page) {
		const self = this;
		const limit = Math.min(cursor_parameters.limit || 16, self.limit_max);
		const order = self._cursor_total_order(cursor_parameters.order);
		const page_previous = has_previous_page ? previous : null;
		const page_next = has_next_page ? next : null;
		const payload_parameters = {
			...self._cursor_payload_parameters(cursor_parameters),
			limit,
			order,
		};
		const encode_parameters = {
			__cursor_method: method,
			__cursor_parameters: payload_parameters,
		};
		return {
			nodes,
			page_info: {
				has_previous_page,
				has_next_page,
				previous_cursor: page_previous ? self._cursor_encode_page(encode_parameters, "previous", page_previous, current, page_next) : null,
				current_cursor: self._cursor_encode_page(encode_parameters, "current", page_previous, current, page_next),
				next_cursor: page_next ? self._cursor_encode_page(encode_parameters, "next", page_previous, current, page_next) : null,
			},
		};
	}
	_cursor_empty_page_info(method, cursor_parameters, request) {
		const self = this;
		const request_page = request.page;
		const request_pages = request.pages || {};
		const current = {
			direction: request_page.direction,
			cursor_where_between: request_page.cursor_where_between || null,
		};
		let previous = null;
		let next = null;
		if (request.page_name === "previous") {
			next = request_pages.current || null;
		} else if (request.page_name === "next") {
			previous = request_pages.current || null;
		} else {
			previous = request_pages.previous || null;
			next = request_pages.next || null;
		}
		return self._cursor_page_info_response(method, cursor_parameters, [], previous, current, next, Boolean(previous), Boolean(next));
	}
	_cursor_page_info(method, cursor_parameters, request, rows, has_extra_row) {
		const self = this;
		const request_page = request.page;
		const limit = Math.min(cursor_parameters.limit || 16, self.limit_max);
		const order = self._cursor_total_order(cursor_parameters.order);
		const nodes = rows.slice(0, limit);
		if (nodes.length === 0) {
			return self._cursor_empty_page_info(method, cursor_parameters, request);
		}
		const first = nodes[0] || null;
		const last = nodes[nodes.length - 1] || null;
		const previous =
			first && (request_page.direction !== "current" || request_page.cursor_where_between)
				? {
						direction: "previous",
						cursor_where_between: self._cursor_boundary(first, order, "previous"),
					}
				: null;
		const current = {
			direction: request_page.direction,
			cursor_where_between: request_page.cursor_where_between || null,
		};
		const next =
			last && (request_page.direction === "previous" || has_extra_row)
				? {
						direction: "next",
						cursor_where_between: self._cursor_boundary(last, order, "next"),
					}
				: null;
		return self._cursor_page_info_response(
			method,
			cursor_parameters,
			nodes,
			previous,
			current,
			next,
			request_page.direction === "previous" ? has_extra_row : Boolean(previous),
			request_page.direction === "previous" ? Boolean(next) : has_extra_row,
		);
	}
	_has_range_bound(value) {
		return value !== null && typeof value !== "undefined";
	}
	_apply_plain_where_between(builder, qualified_key, range) {
		const self = this;
		const [start_value, end_value] = range;
		const has_start = self._has_range_bound(start_value);
		const has_end = self._has_range_bound(end_value);

		if (has_start && has_end) {
			builder.whereBetween(qualified_key, range);
		} else if (has_start) {
			builder.where(qualified_key, ">=", start_value);
		} else if (has_end) {
			builder.where(qualified_key, "<=", end_value);
		}
	}
	_cursor_boundary_value(boundary, index, item) {
		if (!Array.isArray(boundary)) {
			throw new Error("Invalid cursor boundary");
		}
		const entry = boundary[index];
		if (!entry || entry.column !== item.column || !Object.prototype.hasOwnProperty.call(entry, "value")) {
			throw new Error("Invalid cursor boundary");
		}
		return entry.value;
	}
	_apply_cursor_order_equality(builder, qualified_key, value) {
		const self = this;
		if (self._has_range_bound(value)) {
			builder.where(qualified_key, value);
		} else {
			builder.whereNull(qualified_key);
		}
	}
	_cursor_order_relation_operator(item, relation, inclusive = false) {
		if (relation === "after") {
			return item.order === "desc" ? (inclusive ? "<=" : "<") : inclusive ? ">=" : ">";
		}
		if (relation === "before") {
			return item.order === "desc" ? (inclusive ? ">=" : ">") : inclusive ? "<=" : "<";
		}
		throw new Error("Invalid cursor relation");
	}
	_cursor_order_relation_possible(item, value, relation) {
		const self = this;
		if (self._has_range_bound(value)) {
			return true;
		}
		if (relation === "after") {
			return item.nulls === "first";
		}
		if (relation === "before") {
			return item.nulls === "last";
		}
		throw new Error("Invalid cursor relation");
	}
	_apply_cursor_order_relation(builder, item, qualified_key, value, relation, inclusive = false) {
		const self = this;
		if (!self._cursor_order_relation_possible(item, value, relation)) {
			builder.whereRaw("1 = 0");
			return;
		}
		if (!self._has_range_bound(value)) {
			builder.whereNotNull(qualified_key);
			return;
		}
		const operator = self._cursor_order_relation_operator(item, relation, inclusive);
		const include_nulls = (relation === "after" && item.nulls === "last") || (relation === "before" && item.nulls === "first");
		if (include_nulls) {
			builder.where(function () {
				this.whereNull(qualified_key).orWhere(qualified_key, operator, value);
			});
		} else {
			builder.where(qualified_key, operator, value);
		}
	}
	_apply_cursor_lexicographic_bound(builder, order, boundary, relation, table_name = null) {
		const self = this;
		if (!boundary) {
			return builder;
		}
		let branches = 0;
		builder.where(function () {
			const outer = this;
			order.forEach(function (item, depth) {
				const value = self._cursor_boundary_value(boundary, depth, item);
				if (!self._cursor_order_relation_possible(item, value, relation)) {
					return;
				}
				branches += 1;
				outer.orWhere(function () {
					for (let index = 0; index < depth; index++) {
						const equality_item = order[index];
						const equality_key = table_name ? `${table_name}.${equality_item.column}` : equality_item.column;
						const equality_value = self._cursor_boundary_value(boundary, index, equality_item);
						self._apply_cursor_order_equality(this, equality_key, equality_value);
					}
					const qualified_key = table_name ? `${table_name}.${item.column}` : item.column;
					self._apply_cursor_order_relation(this, item, qualified_key, value, relation);
				});
			});
			if (branches === 0) {
				this.whereRaw("1 = 0");
			}
		});
		return builder;
	}
	_apply_cursor_where_between(builder, cursor_where_between = null, order = null, table_name = null) {
		const self = this;
		if (!cursor_where_between) {
			return builder;
		}
		if (cursor_where_between.type !== "lexicographic") {
			return self._apply_where_between(builder, cursor_where_between, table_name, order);
		}
		if (!Array.isArray(order) || order.length === 0) {
			throw new Error("Invalid cursor order");
		}
		self._apply_cursor_lexicographic_bound(builder, order, cursor_where_between.start, "after", table_name);
		self._apply_cursor_lexicographic_bound(builder, order, cursor_where_between.end, "before", table_name);
		return builder;
	}
	_where_between_composite_order(where_between, order) {
		const self = this;
		if (!Array.isArray(order) || order.length < 2) {
			return [];
		}
		const columns = new Set();
		for (const item of order) {
			const range = item && where_between[item.column];
			if (
				!item ||
				!Object.prototype.hasOwnProperty.call(where_between, item.column) ||
				!Array.isArray(range) ||
				(!self._has_range_bound(range[0]) && !self._has_range_bound(range[1])) ||
				columns.has(item.column)
			) {
				break;
			}
			columns.add(item.column);
		}
		return order.slice(0, columns.size);
	}
	_where_between_bound_order(composite_order, where_between, side) {
		const self = this;
		const index = side === "start" ? 0 : 1;
		const bound_order = [];
		for (const item of composite_order) {
			const range = where_between[item.column];
			if (!Array.isArray(range) || !self._has_range_bound(range[index])) {
				break;
			}
			bound_order.push(item);
		}
		return bound_order;
	}
	_apply_where_between_composite_bound(builder, composite_order, where_between, side, table_name = null) {
		const self = this;
		const relation = side === "start" ? "after" : "before";
		const index = side === "start" ? 0 : 1;
		const bound_order = self._where_between_bound_order(composite_order, where_between, side);
		if (bound_order.length === 0) {
			return builder;
		}
		const use_inclusive_final_relation = bound_order.length < composite_order.length;
		builder.where(function () {
			const outer = this;
			bound_order.forEach(function (item, depth) {
				outer.orWhere(function () {
					for (let equality_index = 0; equality_index < depth; equality_index++) {
						const equality_item = bound_order[equality_index];
						const equality_key = table_name ? `${table_name}.${equality_item.column}` : equality_item.column;
						const equality_value = where_between[equality_item.column][index];
						self._apply_cursor_order_equality(this, equality_key, equality_value);
					}
					const qualified_key = table_name ? `${table_name}.${item.column}` : item.column;
					const value = where_between[item.column][index];
					const inclusive = use_inclusive_final_relation && depth === bound_order.length - 1;
					self._apply_cursor_order_relation(this, item, qualified_key, value, relation, inclusive);
				});
			});
		});
		return builder;
	}
	// When where_between matches a prefix of the query order, treat that prefix as a lexicographic range.
	// This generalizes the older hardcoded field + primary-key tie-breaker behavior.
	_apply_where_between(builder, where_between = {}, table_name = null, order = null) {
		const self = this;
		const composite_order = self._where_between_composite_order(where_between, order);
		const composite_columns = new Set();

		if (composite_order.length > 1) {
			composite_order.forEach(function (item) {
				composite_columns.add(item.column);
			});
			self._apply_where_between_composite_bound(builder, composite_order, where_between, "start", table_name);
			self._apply_where_between_composite_bound(builder, composite_order, where_between, "end", table_name);
		}

		Object.keys(where_between).forEach(function (key) {
			if (composite_columns.has(key)) {
				return;
			}
			const qualified_key = table_name ? `${table_name}.${key}` : key;
			self._apply_plain_where_between(builder, qualified_key, where_between[key]);
		});

		return builder;
	}
	_parse_source(scope, parameters) {
		const self = this;
		const { source } = scope;
		if (source && source._metadata && source._direction) {
			return source;
		} else {
			if (parameters.source && parameters.source._metadata && parameters.source._direction) {
				return parameters.source;
			} else {
				return null;
			}
		}
	}
	// splits where_in and cache_where_in into chunks that don't cross the sql bind limit
	// maps the chunks to actions and returns all results
	_chunk_action(context, scope, parameters, database, transaction, action) {
		const self = this;
		const { where_in = {}, cache_where_in = {} } = parameters;
		const direct_primary_keys = where_in[self.primary_key] || null;
		const cached_primary_keys = cache_where_in[self.primary_key] ? TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_in[self.primary_key]).value : null;

		let primary_keys = direct_primary_keys || cached_primary_keys || [];
		if (direct_primary_keys && cached_primary_keys) {
			const cached_primary_key_set = new Set(cached_primary_keys);
			primary_keys = direct_primary_keys.filter(function (primary_key) {
				return cached_primary_key_set.has(primary_key);
			});
		}
		const unique_primary_keys = [...new Set(primary_keys)];
		// split where_in_primary_key into batches of (SQL_BIND_LIMIT - SQL_MAX_COLUMNS)
		const chunks = [];
		const GAUZE_SQL_BIND_LIMIT = parseInt(process.env.GAUZE_SQL_BIND_LIMIT, 10);
		const GAUZE_SQL_MAX_COLUMNS = parseInt(process.env.GAUZE_SQL_MAX_COLUMNS, 10);
		const chunk_size = GAUZE_SQL_BIND_LIMIT - GAUZE_SQL_MAX_COLUMNS;
		for (let i = 0; i < unique_primary_keys.length; i += chunk_size) {
			chunks.push(unique_primary_keys.slice(i, i + chunk_size));
		}
		return Promise.all(
			chunks.map(function (chunk) {
				const params = JSON.parse(JSON.stringify(parameters));
				if (params.cache_where_in && params.cache_where_in[self.primary_key]) {
					delete params.cache_where_in[self.primary_key];
				}
				params.where_in = params.where_in || {};
				params.where_in[self.primary_key] = chunk;
				return action(context, scope, params, database, transaction);
			}),
		).then(function (result) {
			return result.flat();
		});
	}
	_entity_relationships(context, scope, parameters) {
		const self = this;
		const source = self._parse_source(scope, parameters);
		const entity_table_name = $structure.gauze.resolvers.GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE[source._metadata.type];
		const entity_primary_key = $abstract.entities[$structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[entity_table_name]].default($abstract).primary_key;
		const entity_model = {
			table_name: entity_table_name,
			primary_key: entity_primary_key,
		};
		const entity_parameters = {
			where: {
				[entity_primary_key]: source._metadata.id,
			},
		};
		return context.database_manager.route_transactions(context, scope, entity_parameters, entity_model, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._entity_relationships_transaction(context, scope, parameters, shard.connection, shard.transaction);
				}),
			).then(function (result) {
				return result.flat();
			});
		});
	}
	_entity_relationships_transaction(context, scope, parameters, database, transaction) {
		context.transaction_count += 1;
		const self = this;
		const MAXIMUM_ROWS = 4294967296;
		const query = {};
		const source = self._parse_source(scope, parameters);
		if (source._direction === "to") {
			query.gauze__relationship__from_id = source._metadata.id;
			query.gauze__relationship__from_type = $structure.gauze.resolvers.GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE[source._metadata.type];
			query.gauze__relationship__to_type = self.table_name;
		} else if (source._direction === "from") {
			query.gauze__relationship__to_id = source._metadata.id;
			query.gauze__relationship__to_type = $structure.gauze.resolvers.GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE[source._metadata.type];
			query.gauze__relationship__from_type = self.table_name;
		} else {
			throw new Error("Invalid relationship direction");
		}
		const sql = database(self.relationship_table_name).where(query).limit(MAXIMUM_ROWS).offset(0).transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._entity_relationships_transaction:debug_sql`, sql.toString());
		}
		return sql.then(function (data) {
			return data;
		});
	}
	_root_create(context, scope, parameters) {
		const self = this;
		// create id on primary key if it does not exist
		if (!parameters.attributes[self.primary_key]) {
			const primary_key = uuidv4();
			parameters.attributes[self.primary_key] = primary_key;
		}
		return context.database_manager.route_transactions(context, scope, parameters, self, "write").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_create_transaction(context, scope, parameters, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				const flattened = results.flat();
				return [
					...new Map(
						flattened.map(function (row) {
							return [row[self.primary_key], row];
						}),
					).values(),
				];
			});
		});
	}
	_root_create_transaction(context, scope, parameters, database, transaction) {
		context.transaction_count += 1;
		const self = this;
		const { attributes } = parameters;
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.create.enter`, "parameters", parameters);
		const sql = database(self.table_name).insert(attributes, [self.primary_key]).transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString());
		}
		return sql
			.then(function (data) {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:success`, "data", data);
				context.breadth_count += data.length;
				return self.read(
					context,
					{ source: undefined },
					{
						where: {
							[self.primary_key]: data[0][self.primary_key],
						},
						limit: 1,
						offset: 0,
					},
				);
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.create:failure`, "err", err);
				if (process.env.KNEX_CLIENT === "better-sqlite3") {
					process_knex_error_sqlite3(self, err);
				} else {
					// different dialects here to parse database errors (to turn them into field errors)
					throw err;
				}
			});
	}
	_relationship_create(context, scope, parameters) {
		// todo: move logic from system model here to create the relationship as well
		const self = this;
		// flow: fetch relationships based on scope from database, pass relationships to route_transactions
		return self._entity_relationships(context, scope, parameters).then(function (relationships) {
			return context.database_manager.route_transactions(context, scope, parameters, self, "write", relationships).then(function (shards) {
				return Promise.all(
					shards.map(function (shard) {
						return self._relationship_create_transaction(context, scope, parameters, shard.connection, shard.transaction);
					}),
				).then(function (results) {
					return results.flat();
				});
			});
		});
	}
	_relationship_create_transaction(context, scope, parameters, database, transaction) {
		//context.transaction_count += 1;
		const self = this;
		return self._root_create_transaction(context, scope, parameters, database, transaction);
	}
	// create a row
	_create(context, scope, parameters) {
		const self = this;
		const relationship_source = self._parse_source(scope, parameters);
		const key = self._batch_key(relationship_source, parameters, "create");
		self._check_constraints(context);
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		// we need to fetch the parameters for the key in the batch function
		TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, scope, key);
	}
	_root_read(context, scope, parameters) {
		const self = this;
		const { database, transaction } = context;
		return context.database_manager.route_transactions(context, scope, parameters, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_read_transaction(context, scope, parameters, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return self._sort_rows(results.flat(), parameters.order);
			});
		});
	}
	_root_read_transaction(context, scope, parameters, database, transaction) {
		const self = this;

		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			const {
				where = {},
				where_in = {},
				cache_where_in = {},
				where_not_in = {},
				cache_where_not_in = {},
				where_like = {},
				where_between = {},
				cursor_where_between = null,
				cursor_order = null,
				limit = 16,
				offset = 0,
				order,
			} = parameters;
			const resolved_order = self._normalize_order(order);
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.read:enter`, "parameters", parameters);
			const sql = self
				._apply_order(
					database(self.table_name)
						.where(function (builder) {
							builder.where(where);
							Object.keys(where_in).forEach(function (key) {
								builder.whereIn(key, where_in[key]);
							});
							Object.keys(cache_where_in).forEach(function (key) {
								builder.whereIn(key, TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_in[key]).value);
							});
							Object.keys(where_not_in).forEach(function (key) {
								builder.whereNotIn(key, where_not_in[key]);
							});
							Object.keys(cache_where_not_in).forEach(function (key) {
								builder.whereNotIn(key, TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_not_in[key]).value);
							});
							Object.keys(where_like).forEach(function (key) {
								builder.whereLike(key, where_like[key]);
							});
							self._apply_where_between(builder, where_between, null, resolved_order);
							self._apply_cursor_where_between(builder, cursor_where_between, cursor_order);
							/*
							Object.keys(where_greater).forEach(function (key) {
								builder.where(key, '>', where_greater[key])
							})
							Object.keys(where_lesser).forEach(function (key) {
								builder.where(key, '<', where_lesser[key])
							})
							*/
							return builder;
						})
						.limit(Math.min(limit, self.limit_max))
						.offset(offset),
					resolved_order,
					database,
				)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
					context.breadth_count += data.length;
					return Promise.resolve(data);
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
					throw err;
				});
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action);
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	_relationship_read(context, scope, parameters) {
		const self = this;
		return self._entity_relationships(context, scope, parameters).then(function (relationships) {
			return context.database_manager.route_transactions(context, scope, parameters, self, "read", relationships).then(function (shards) {
				return Promise.all(
					shards.map(function (shard) {
						return self._relationship_read_transaction(context, scope, parameters, shard.connection, shard.transaction);
					}),
				).then(function (results) {
					return self._sort_rows(results.flat(), parameters.order);
				});
			});
		});
	}
	_relationship_read_transaction(context, scope, parameters, database, transaction) {
		const self = this;

		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			const {
				where = {},
				where_in = {},
				cache_where_in = {},
				where_not_in = {},
				cache_where_not_in = {},
				where_like = {},
				where_between = {},
				cursor_where_between = null,
				cursor_order = null,
				limit = 16,
				offset = 0,
				order,
			} = parameters;
			const normalized_order = self._normalize_order(order);
			const resolved_order = normalized_order.map(function (item) {
				return {
					...item,
					column: `${self.table_name}.${item.column}`,
				};
			});
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.read:enter`, "parameters", parameters);
			const relationship_source = self._parse_source(scope, parameters);
			// do join here based on source metadata
			// use structure resolvers to convert graphql type to table_name name
			// relationships are one directional, so use from as the parent
			const SOURCE_SQL_ID = relationship_source._metadata.id;
			const SOURCE_GRAPHQL_TYPE = relationship_source._metadata.type;
			const SOURCE_SQL_TABLE = $structure.gauze.resolvers.GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE[SOURCE_GRAPHQL_TYPE];
			//const SOURCE_PRIMARY_KEY = $abstract.entities[$structure.gauze.resolvers.SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE[SOURCE_SQL_TABLE]].default($abstract).primary_key

			// mutate where by prefixing with table_name name
			var joined_where = {};
			Object.keys(where).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where[joined_key] = where[k];
			});
			var joined_where_in = {};
			Object.keys(where_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_in[joined_key] = where_in[k];
			});
			Object.keys(cache_where_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_in[joined_key] = TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_in[k]).value;
			});
			var joined_where_not_in = {};
			Object.keys(where_not_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_not_in[joined_key] = where_not_in[k];
			});
			Object.keys(cache_where_not_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_not_in[joined_key] = TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_not_in[k]).value;
			});
			var joined_where_like = {};
			Object.keys(where_like).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_like[joined_key] = where_like[k];
			});
			if (relationship_source._direction === "to") {
				const sql = self
					._apply_order(
						database(self.table_name)
							.join(self.relationship_table_name, `${self.relationship_table_name}.gauze__relationship__to_id`, "=", `${self.table_name}.${self.primary_key}`)
							.where(`${self.relationship_table_name}.gauze__relationship__from_id`, SOURCE_SQL_ID)
							.where(`${self.relationship_table_name}.gauze__relationship__from_type`, SOURCE_SQL_TABLE)
							.where(function (builder) {
								builder.where(joined_where);
								Object.keys(joined_where_in).forEach(function (key) {
									builder.whereIn(key, joined_where_in[key]);
								});
								Object.keys(joined_where_not_in).forEach(function (key) {
									builder.whereNotIn(key, joined_where_not_in[key]);
								});
								Object.keys(joined_where_like).forEach(function (key) {
									builder.whereLike(key, joined_where_like[key]);
								});
								self._apply_where_between(builder, where_between, self.table_name, normalized_order);
								self._apply_cursor_where_between(builder, cursor_where_between, cursor_order, self.table_name);
								return builder;
							})
							.limit(Math.min(limit, self.limit_max))
							.offset(offset),
						resolved_order,
						database,
					)
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
				}
				return sql
					.then(function (data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
						context.breadth_count += data.length;
						return Promise.resolve(data);
					})
					.catch(function (err) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
						throw err;
					});
			} else if (relationship_source._direction === "from") {
				const sql = self
					._apply_order(
						database(self.table_name)
							.join(self.relationship_table_name, `${self.relationship_table_name}.gauze__relationship__from_id`, "=", `${self.table_name}.${self.primary_key}`)
							.where(`${self.relationship_table_name}.gauze__relationship__to_id`, SOURCE_SQL_ID)
							.where(`${self.relationship_table_name}.gauze__relationship__to_type`, SOURCE_SQL_TABLE)
							.where(function (builder) {
								builder.where(joined_where);
								Object.keys(joined_where_in).forEach(function (key) {
									builder.whereIn(key, joined_where_in[key]);
								});
								Object.keys(joined_where_not_in).forEach(function (key) {
									builder.whereNotIn(key, joined_where_not_in[key]);
								});
								Object.keys(joined_where_like).forEach(function (key) {
									builder.whereLike(key, joined_where_like[key]);
								});
								self._apply_where_between(builder, where_between, self.table_name, normalized_order);
								self._apply_cursor_where_between(builder, cursor_where_between, cursor_order, self.table_name);
								return builder;
							})
							.limit(Math.min(limit, self.limit_max))
							.offset(offset),
						resolved_order,
						database,
					)
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
				}
				return sql
					.then(function (data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
						context.breadth_count += data.length;
						return Promise.resolve(data);
					})
					.catch(function (err) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
						throw err;
					});
			} else {
				throw new Error("Internal error: invalid direction for relationship");
			}
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action);
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	// read a row
	_read(context, scope, parameters) {
		const self = this;
		const relationship_source = self._parse_source(scope, parameters);
		const key = self._batch_key(relationship_source, parameters, "read");
		self._check_constraints(context);
		self._validate_parameters(parameters);
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		// we need to fetch the parameters for the key in the batch function
		TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, scope, key);
	}
	_cursor_select_page(context, scope, parameters, method) {
		const self = this;
		self._check_constraints(context);
		const request = self._cursor_request_from_parameters(parameters, method);
		const cursor_parameters = {
			...request.parameters,
			limit: Math.min(request.parameters.limit || 16, self.limit_max),
			order: self._cursor_total_order(request.parameters.order),
		};
		self._validate_parameters(cursor_parameters);
		const select_parameters = self._cursor_select_parameters(cursor_parameters, request.page);
		const relationship_source = self._parse_source(scope, select_parameters);
		const read = relationship_source ? self._relationship_read(context, scope, select_parameters) : self._root_read(context, scope, select_parameters);
		return read.then(function (rows) {
			const limit = cursor_parameters.limit;
			const page_rows = rows.slice(0, limit + 1);
			const has_extra_row = page_rows.length > limit;
			const ordered_rows = request.page.direction === "previous" ? page_rows.slice(0, limit).reverse() : page_rows;
			return self._cursor_page_info(method, cursor_parameters, request, ordered_rows, has_extra_row);
		});
	}
	_cursor_read(context, scope, parameters) {
		const self = this;
		return self._cursor_select_page(context, scope, parameters, "read");
	}
	_cursor_update(context, scope, parameters) {
		const self = this;
		return self._cursor_select_page(context, scope, parameters, "update").then(function (page) {
			const valid_ids = page.nodes.map(function (row) {
				return row[self.primary_key];
			});
			if (valid_ids.length === 0) {
				return page;
			}
			return self
				._root_update(context, scope, {
					attributes: page.page_info && parameters.cursor ? self._cursor_request_from_parameters(parameters, "update").parameters.attributes : parameters.attributes,
					where_in: {
						[self.primary_key]: valid_ids,
					},
					limit: valid_ids.length,
					offset: 0,
					order: page.page_info
						? self._cursor_total_order((parameters.cursor ? self._cursor_request_from_parameters(parameters, "update").parameters : parameters).order)
						: parameters.order,
				})
				.then(function (rows) {
					return {
						nodes: rows,
						page_info: page.page_info,
					};
				});
		});
	}
	_cursor_delete(context, scope, parameters) {
		const self = this;
		return self._cursor_select_page(context, scope, parameters, "delete").then(function (page) {
			const valid_ids = page.nodes.map(function (row) {
				return row[self.primary_key];
			});
			if (valid_ids.length === 0) {
				return page;
			}
			return self
				._root_delete(context, scope, {
					where_in: {
						[self.primary_key]: valid_ids,
					},
					limit: valid_ids.length,
					offset: 0,
					order: self._cursor_total_order((parameters.cursor ? self._cursor_request_from_parameters(parameters, "delete").parameters : parameters).order),
				})
				.then(function (rows) {
					return {
						nodes: rows,
						page_info: page.page_info,
					};
				});
		});
	}
	_root_update(context, scope, parameters) {
		const self = this;
		return context.database_manager.route_transactions(context, scope, parameters, self, "write").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_update_transaction(context, scope, parameters, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return self._sort_rows(results.flat(), parameters.order);
			});
		});
	}
	_root_update_transaction(context, scope, parameters, database, transaction) {
		const self = this;
		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			const { attributes } = parameters;
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:enter`, "parameters", parameters);
			const MAXIMUM_ROWS = 4294967296;

			return self
				._root_read_transaction(
					context,
					scope,
					{
						...parameters,
						limit: parameters.limit ?? MAXIMUM_ROWS,
						offset: parameters.offset ?? 0,
					},
					database,
					transaction,
				)
				.then(function (read_data) {
					const valid_ids = read_data.map(function (item) {
						return item[self.primary_key];
					});
					if (valid_ids.length === 0) {
						return [];
					}
					const sql = database(self.table_name).whereIn(self.primary_key, valid_ids).update(attributes).transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString());
					}
					return sql.then(function (data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:success`, "data", data);
						return self._root_read_transaction(
							context,
							scope,
							{
								where_in: {
									[self.primary_key]: valid_ids,
								},
								limit: valid_ids.length,
								offset: 0,
								order: parameters.order,
							},
							database,
							transaction,
						);
					});
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.update:failure`, "err", err);
					if (process.env.KNEX_CLIENT === "better-sqlite3") {
						process_knex_error_sqlite3(self, err);
					} else {
						// different dialects here to parse database errors (to turn them into field errors)
						throw err;
					}
				});
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action);
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	_relationship_update(context, scope, parameters) {
		const self = this;
		return self._entity_relationships(context, scope, parameters).then(function (relationships) {
			return context.database_manager.route_transactions(context, scope, parameters, self, "write", relationships).then(function (shards) {
				return Promise.all(
					shards.map(function (shard) {
						return self._relationship_update_transaction(context, scope, parameters, shard.connection, shard.transaction);
					}),
				).then(function (results) {
					return self._sort_rows(results.flat(), parameters.order);
				});
			});
		});
	}
	_relationship_update_transaction(context, scope, parameters, database, transaction) {
		const self = this;

		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:enter`, "parameters", parameters);
			const MAXIMUM_ROWS = 4294967296;
			const { attributes } = parameters;

			return self
				._relationship_read_transaction(
					context,
					scope,
					{
						...parameters,
						limit: parameters.limit ?? MAXIMUM_ROWS,
						offset: parameters.offset ?? 0,
					},
					database,
					transaction,
				)
				.then(function (read_data) {
					const valid_ids = read_data.map(function (item) {
						return item[self.primary_key];
					});
					if (valid_ids.length === 0) {
						return [];
					}
					const sql = database(self.table_name).whereIn(self.primary_key, valid_ids).update(attributes).transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString());
					}
					return sql.then(function (data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:success`, "data", data);
						return self._relationship_read_transaction(
							context,
							scope,
							{
								source: parameters.source,
								where_in: {
									[self.primary_key]: valid_ids,
								},
								limit: valid_ids.length,
								offset: 0,
								order: parameters.order,
							},
							database,
							transaction,
						);
					});
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.update:failure`, "err", err);
					throw err;
				});
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action);
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	// update a row
	_update(context, scope, parameters) {
		const self = this;
		const relationship_source = self._parse_source(scope, parameters);
		const key = self._batch_key(relationship_source, parameters, "update");
		self._check_constraints(context);
		self._validate_parameters(parameters);
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		// we need to fetch the parameters for the key in the batch function
		TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, scope, key);
	}
	_cleanup_delete_relationship(context, relationship) {
		const self = this;
		const parameters = {
			where: relationship,
		};
		const model = {
			table_name: self.relationship_table_name,
			primary_key: self.relationship_primary_key,
		};
		function _delete_relationship(database, transaction, relationship) {
			const sql = database(self.relationship_table_name).where(self.relationship_primary_key, relationship[self.relationship_primary_key]).del().transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._cleanup_delete_relationship:debug_sql`, sql.toString());
			}
			return sql;
		}
		return context.database_manager.route_transactions(context, {}, parameters, model, "write").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return _delete_relationship(shard.connection, shard.transaction, relationship);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
	}
	_cleanup_delete_whitelist(context, whitelist) {
		const self = this;
		const parameters = {
			where: whitelist,
		};
		const model = {
			table_name: self.whitelist_table_name,
			primary_key: self.whitelist_primary_key,
		};
		function _delete_whitelist(database, transaction, relationship) {
			const sql = database(self.whitelist_table_name).where(self.whitelist_primary_key, whitelist[self.whitelist_primary_key]).del().transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._cleanup_delete_whitelist:debug_sql`, sql.toString());
			}
			return sql;
		}
		return context.database_manager.route_transactions(context, {}, parameters, model, "write").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return _delete_whitelist(shard.connection, shard.transaction, whitelist);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
	}
	_cleanup_delete_blacklist(context, blacklist) {
		const self = this;
		const parameters = {
			where: blacklist,
		};
		const model = {
			table_name: self.blacklist_table_name,
			primary_key: self.blacklist_primary_key,
		};
		function _delete_blacklist(database, transaction, relationship) {
			const sql = database(self.blacklist_table_name).where(self.blacklist_primary_key, blacklist[self.blacklist_primary_key]).del().transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}._cleanup_delete_blacklist:debug_sql`, sql.toString());
			}
			return sql;
		}
		return context.database_manager.route_transactions(context, {}, parameters, model, "write").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return _delete_blacklist(shard.connection, shard.transaction, blacklist);
				}),
			).then(function (results) {
				return results.flat();
			});
		});
	}
	// note: is this concurrency safe? seems like it should be okay as long as every entity only belongs to one shard node?
	_cleanup_delete(context, valid_ids, database, transaction) {
		const self = this;
		// we cant import the actual models here, so we will have to do it by hand
		const transactions = [
			// to relationship
			function () {
				const sql = database(self.relationship_table_name)
					.where("gauze__relationship__to_type", self.entity.table_name)
					.whereIn("gauze__relationship__to_id", valid_ids)
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
			// from relationship
			function () {
				const sql = database(self.relationship_table_name)
					.where("gauze__relationship__from_type", self.entity.table_name)
					.whereIn("gauze__relationship__from_id", valid_ids)
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
			// whitelist
			function () {
				const sql = database(self.whitelist_table_name)
					.where("gauze__whitelist__entity_type", self.entity.table_name)
					.whereIn("gauze__whitelist__entity_id", valid_ids)
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
			// blacklist
			function () {
				const sql = database(self.blacklist_table_name)
					.where("gauze__blacklist__entity_type", self.entity.table_name)
					.whereIn("gauze__blacklist__entity_id", valid_ids)
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
		];
		return Promise.all(
			transactions.map(function (f) {
				return f();
			}),
		).then(function (results) {
			const to_relationships = results[0] || [];
			const from_relationships = results[1] || [];
			const whitelists = results[2] || [];
			const blacklists = results[3] || [];
			const transactions = [
				function () {
					return Promise.all(
						to_relationships.map(function (relationship) {
							return self._cleanup_delete_relationship(context, relationship);
						}),
					);
				},
				function () {
					return Promise.all(
						from_relationships.map(function (relationship) {
							return self._cleanup_delete_relationship(context, relationship);
						}),
					);
				},
				function () {
					return Promise.all(
						whitelists.map(function (whitelist) {
							return self._cleanup_delete_whitelist(context, whitelist);
						}),
					);
				},
				function () {
					return Promise.all(
						blacklists.map(function (blacklist) {
							return self._cleanup_delete_blacklist(context, blacklist);
						}),
					);
				},
			];
			return Promise.all(
				transactions.map(function (f) {
					return f();
				}),
			);
			//return results
		});
	}
	_root_delete(context, scope, parameters) {
		const self = this;
		return context.database_manager.route_transactions(context, scope, parameters, self, "write").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_delete_transaction(context, scope, parameters, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				const flattened = results.flat();
				const deduped = [
					...new Map(
						flattened.map(function (row) {
							return [row[self.primary_key], row];
						}),
					).values(),
				];
				return self._sort_rows(deduped, parameters.order);
			});
		});
	}
	_root_delete_transaction(context, scope, parameters, database, transaction) {
		const self = this;

		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, "parameters", parameters);
			// note: maybe we should limit the maximum number of objects that can be acted on to GAUZE_SQL_MAX_LIMIT
			const MAXIMUM_ROWS = 4294967296;
			// todo: use attributes and update deleted_at instead of deleting the row
			// do a read first
			return self
				._root_read_transaction(
					context,
					scope,
					{
						...parameters,
						limit: parameters.limit ?? MAXIMUM_ROWS,
						offset: parameters.offset ?? 0,
					},
					database,
					transaction,
				)
				.then(function (read_data) {
					const valid_ids = read_data.map(function (item) {
						return item[self.primary_key];
					});
					if (valid_ids.length === 0) {
						return [];
					}
					const sql = database(self.table_name).whereIn(self.primary_key, valid_ids).del().transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
					}
					return sql.then(function (delete_data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.delete:success`, "delete_data", delete_data);
						context.breadth_count += read_data.length;
						return self._cleanup_delete(context, valid_ids, database, transaction).then(function () {
							return read_data;
						});
					});
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.delete:failure`, "err", err);
					throw err;
				});
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action);
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	_relationship_delete(context, scope, parameters) {
		const self = this;
		return self._entity_relationships(context, scope, parameters).then(function (relationships) {
			return context.database_manager.route_transactions(context, scope, parameters, self, "write", relationships).then(function (shards) {
				return Promise.all(
					shards.map(function (shard) {
						return self._relationship_delete_transaction(context, scope, parameters, shard.connection, shard.transaction);
					}),
				).then(function (results) {
					const flattened = results.flat();
					const deduped = [
						...new Map(
							flattened.map(function (row) {
								return [row[self.primary_key], row];
							}),
						).values(),
					];
					return self._sort_rows(deduped, parameters.order);
				});
			});
		});
	}
	_relationship_delete_transaction(context, scope, parameters, database, transaction) {
		const self = this;

		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			const { limit = 16 } = parameters;
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, "parameters", parameters);
			const MAXIMUM_ROWS = 4294967296;
			return self
				._relationship_read_transaction(
					context,
					scope,
					{
						...parameters,
						limit: MAXIMUM_ROWS,
					},
					database,
					transaction,
				)
				.then(function (read_data) {
					const valid_ids = read_data.map(function (item) {
						return item[self.primary_key];
					});
					// use valid_ids to do a where in query
					const sql = database(self.table_name).whereIn(self.primary_key, valid_ids).del().transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
					}
					return sql.then(function (delete_data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.delete:success`, "delete_data", delete_data);
						return self._cleanup_delete(context, valid_ids, database, transaction).then(function () {
							context.breadth_count += read_data.length;
							return read_data.slice(0, limit);
						});
					});
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.delete:failure`, "err", err);
					throw err;
				});
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action);
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	// delete a row
	_delete(context, scope, parameters) {
		const self = this;
		const relationship_source = self._parse_source(scope, parameters);
		const key = self._batch_key(relationship_source, parameters, "delete");
		self._check_constraints(context);
		self._validate_parameters(parameters);
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		// we need to fetch the parameters for the key in the batch function
		TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, scope, key);
	}
	_root_count(context, scope, parameters) {
		const self = this;
		return context.database_manager.route_transactions(context, scope, parameters, self, "read").then(function (shards) {
			return Promise.all(
				shards.map(function (shard) {
					return self._root_count_transaction(context, scope, parameters, shard.connection, shard.transaction);
				}),
			).then(function (results) {
				return self._merge_count_maps(results, parameters.count);
			});
		});
	}
	_root_count_transaction(context, scope, parameters, database, transaction) {
		const self = this;

		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			const { count = {}, where = {}, where_in = {}, cache_where_in = {}, where_not_in = {}, cache_where_not_in = {}, where_like = {}, where_between = {}, order } = parameters;
			const resolved_order = self._normalize_order(order);
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.count:enter`, "parameters", parameters);
			const count_has_key = count ? (Object.keys(count).length ? true : false) : false;
			const reversed = {};
			if (count_has_key) {
				Object.keys(count).forEach(function (key) {
					reversed[count[key]] = key;
				});
			}
			const sql = database(self.table_name)
				.count(count_has_key ? reversed : null)
				.where(function (builder) {
					builder.where(where);
					Object.keys(where_in).forEach(function (key) {
						builder.whereIn(key, where_in[key]);
					});
					Object.keys(cache_where_in).forEach(function (key) {
						builder.whereIn(key, TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_in[key]).value);
					});
					Object.keys(where_not_in).forEach(function (key) {
						builder.whereNotIn(key, where_not_in[key]);
					});
					Object.keys(cache_where_not_in).forEach(function (key) {
						builder.whereNotIn(key, TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_not_in[key]).value);
					});
					Object.keys(where_like).forEach(function (key) {
						builder.whereLike(key, where_like[key]);
					});
					self._apply_where_between(builder, where_between, null, resolved_order);
					return builder;
				})
				.first()
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:success`, "data", data);
					context.breadth_count += data.length;
					return Promise.resolve(data);
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.count:failure`, "err", err);
					throw err;
				});
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action).then(function (results) {
				return self._merge_count_maps(results, parameters.count);
			});
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	_relationship_count(context, scope, parameters) {
		const self = this;
		return self._entity_relationships(context, scope, parameters).then(function (relationships) {
			return context.database_manager.route_transactions(context, scope, parameters, self, "read", relationships).then(function (shards) {
				return Promise.all(
					shards.map(function (shard) {
						return self._relationship_count_transaction(context, scope, parameters, shard.connection, shard.transaction);
					}),
				).then(function (results) {
					return self._merge_count_maps(results, parameters.count);
				});
			});
		});
	}
	_relationship_count_transaction(context, scope, parameters, database, transaction) {
		const self = this;

		function action(context, scope, parameters, database, transaction) {
			context.transaction_count += 1;
			const { count = {}, where = {}, where_in = {}, cache_where_in = {}, where_not_in = {}, cache_where_not_in = {}, where_like = {}, where_between = {}, order } = parameters;
			const normalized_order = self._normalize_order(order);
			LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.count:enter`, "parameters", parameters);
			const relationship_source = self._parse_source(scope, parameters);

			const count_has_key = count ? (Object.keys(count).length ? true : false) : false;
			const reversed = {};
			if (count_has_key) {
				Object.keys(count).forEach(function (key) {
					reversed[count[key]] = key;
				});
			}

			// do join here based on source metadata
			// use structure resolvers to convert graphql type to table_name name
			// relationships are one directional, so use from as the parent
			const SOURCE_SQL_ID = relationship_source._metadata.id;
			const SOURCE_GRAPHQL_TYPE = relationship_source._metadata.type;
			const SOURCE_SQL_TABLE = $structure.gauze.resolvers.GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE[SOURCE_GRAPHQL_TYPE];

			// mutate where by prefixing with table_name name
			var joined_where = {};
			Object.keys(where).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where[joined_key] = where[k];
			});
			var joined_where_in = {};
			Object.keys(where_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_in[joined_key] = where_in[k];
			});
			Object.keys(cache_where_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_in[joined_key] = TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_in[k]).value;
			});
			var joined_where_not_in = {};
			Object.keys(where_not_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_not_in[joined_key] = where_not_in[k];
			});
			Object.keys(cache_where_not_in).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_not_in[joined_key] = TIERED_CACHE__LRU__CACHE__SRC__KERNEL.get(cache_where_not_in[k]).value;
			});
			var joined_where_like = {};
			Object.keys(where_like).forEach(function (k) {
				var joined_key = self.table_name + "." + k;
				joined_where_like[joined_key] = where_like[k];
			});
			if (relationship_source._direction === "to") {
				const sql = database(self.table_name)
					.count(count_has_key ? reversed : null)
					.join(self.relationship_table_name, `${self.relationship_table_name}.gauze__relationship__to_id`, "=", `${self.table_name}.${self.primary_key}`)
					.where(`${self.relationship_table_name}.gauze__relationship__from_id`, SOURCE_SQL_ID)
					.where(`${self.relationship_table_name}.gauze__relationship__from_type`, SOURCE_SQL_TABLE)
					.where(function (builder) {
						builder.where(joined_where);
						Object.keys(joined_where_in).forEach(function (key) {
							builder.whereIn(key, joined_where_in[key]);
						});
						Object.keys(joined_where_not_in).forEach(function (key) {
							builder.whereNotIn(key, joined_where_not_in[key]);
						});
						Object.keys(joined_where_like).forEach(function (key) {
							builder.whereLike(key, joined_where_like[key]);
						});
						self._apply_where_between(builder, where_between, self.table_name, normalized_order);
						return builder;
					})
					.first()
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:debug_sql`, sql.toString());
				}
				return sql
					.then(function (data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:success`, "data", data);
						return Promise.resolve(data);
					})
					.catch(function (err) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.count:failure`, "err", err);
						throw err;
					});
			} else if (relationship_source._direction === "from") {
				const sql = database(self.table_name)
					.count(count_has_key ? reversed : null)
					.join(self.relationship_table_name, `${self.relationship_table_name}.gauze__relationship__from_id`, "=", `${self.table_name}.${self.primary_key}`)
					.where(`${self.relationship_table_name}.gauze__relationship__to_id`, SOURCE_SQL_ID)
					.where(`${self.relationship_table_name}.gauze__relationship__to_type`, SOURCE_SQL_TABLE)
					.where(function (builder) {
						builder.where(joined_where);
						Object.keys(joined_where_in).forEach(function (key) {
							builder.whereIn(key, joined_where_in[key]);
						});
						Object.keys(joined_where_not_in).forEach(function (key) {
							builder.whereNotIn(key, joined_where_not_in[key]);
						});
						Object.keys(joined_where_like).forEach(function (key) {
							builder.whereLike(key, joined_where_like[key]);
						});
						self._apply_where_between(builder, where_between, self.table_name, normalized_order);
						return builder;
					})
					.first()
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:debug_sql`, sql.toString());
				}
				return sql
					.then(function (data) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:success`, "data", data);
						context.breadth_count += data.length;
						return Promise.resolve(data);
					})
					.catch(function (err) {
						LOGGER__IO__LOGGER__SRC__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.count:failure`, "err", err);
						throw err;
					});
			} else {
				throw new Error("Internal error: invalid direction for relationship");
			}
		}

		const { where_in = {}, cache_where_in = {} } = parameters;
		if (where_in[self.primary_key] || cache_where_in[self.primary_key]) {
			return self._chunk_action(context, scope, parameters, database, transaction, action).then(function (results) {
				return self._merge_count_maps(results, parameters.count);
			});
		} else {
			return action(context, scope, parameters, database, transaction);
		}
	}
	_count(context, scope, parameters) {
		const self = this;
		const relationship_source = self._parse_source(scope, parameters);
		const key = self._batch_key(relationship_source, parameters, "count");
		self._check_constraints(context);
		self._validate_parameters(parameters);
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		// we need to fetch the parameters for the key in the batch function
		TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, scope, key);
	}
}

export { DatabaseModel };
