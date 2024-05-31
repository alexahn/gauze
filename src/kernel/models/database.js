import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

import { TIERED_CACHE__LRU__CACHE__KERNEL } from "./../cache/lru.js";

import DataLoader from "./../dataloader.js";
import TTLLRUCache from "./../lru.js";

import { Model } from "./class.js";

class DatabaseModel extends Model {
	constructor(root_config, database_config) {
		super(root_config);
		const self = this;
		const { table_name, primary_key } = database_config;
		self.table_name = table_name;
		self.primary_key = primary_key;
		if ($structure.entities.relationship) {
			this.relationship_table_name = $structure.entities.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE;
		} else {
			LOGGER__IO__LOGGER__KERNEL.write("5", __RELATIVE_FILEPATH, `${this.name}.constructor:WARNING`, new Error("Relationship structure not found"));
		}
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
		self.loader = new DataLoader(self._batch, {
			cacheMap: new TTLLRUCache(1024, 8192),
		});
		self.loader.model = self;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
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
	_batch(contexts, keys) {
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
					return item.source !== null && item.source._direction;
				});
		});
		function handle_groups_without_source(groups) {
			// map each to a basic method
			return Promise.all(
				groups.map(function (group) {
					return Promise.all(
						group.map(function (key) {
							// rich typed parameters (post graphql parsing) pulled from cache
							const parameters = TIERED_CACHE__LRU__CACHE__KERNEL.get(key.raw_key).value;
							if (key.method === "create") {
								return self.model._root_create(contexts[key.index], parameters).then(function (data) {
									self.clearAll();
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "read") {
								return self.model._root_read(contexts[key.index], parameters).then(function (data) {
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "update") {
								return self.model._root_update(contexts[key.index], parameters).then(function (data) {
									self.clearAll();
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "delete") {
								return self.model._root_delete(contexts[key.index], parameters).then(function (data) {
									self.clearAll();
									return {
										index: key.index,
										data: data,
									};
								});
							} else if (key.method === "count") {
								return self.model._root_count(contexts[key.index], parameters).then(function (data) {
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
								const parameters = TIERED_CACHE__LRU__CACHE__KERNEL.get(key.raw_key).value;
								if (key.method === "create") {
									return self.model._relationship_create(contexts[key.index], parameters).then(function (data) {
										self.clearAll();
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "read") {
									return self.model._relationship_read(contexts[key.index], parameters).then(function (data) {
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "update") {
									return self.model._relationship_update(contexts[key.index], parameters).then(function (data) {
										self.clearAll();
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "delete") {
									return self.model._relationship_delete(contexts[key.index], parameters).then(function (data) {
										self.clearAll();
										return {
											index: key.index,
											data: data,
										};
									});
								} else if (key.method === "count") {
									return self.model._relationship_count(contexts[key.index], parameters).then(function (data) {
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
				if (process.env.GAUZE_ENV === "TEST") {
					self.clearAll();
				}
				return result;
			});
	}
	_parse_source(context, parameters) {
		const self = this;
		const { source } = context;
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
	_root_create(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const { attributes } = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.create.enter`, "parameters", parameters);
		const sql = database(self.table_name).insert(attributes, [self.primary_key]).transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString());
		}
		return sql
			.then(function (data) {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:success`, "data", data);
				return self.read(
					{
						source: undefined,
						database,
						transaction,
					},
					{
						where: {
							[self.primary_key]: data[0][self.primary_key],
						},
						limit: 1,
						offset: 0,
						order: self.primary_key,
						order_direction: "asc",
						order_nulls: "first",
					},
				);
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.create:failure`, "err", err);
				throw err;
			});
	}
	_relationship_create(context, parameters) {
		const self = this;
		return self._root_create(context, parameters);
	}
	// create a row
	_create(context, parameters) {
		const self = this;
		const relationship_source = self._parse_source(context, parameters);
		const key = self._batch_key(relationship_source, parameters, "create");
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		TIERED_CACHE__LRU__CACHE__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, key);
	}
	_root_read(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const {
			where = {},
			where_in = {},
			cache_where_in = {},
			where_not_in = {},
			cache_where_not_in = {},
			limit = 16,
			offset = 0,
			order = self.entity.default_order || self.primary_key,
			order_direction = self.entity.default_order_direction || "asc",
			order_nulls = "first",
		} = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.read:enter`, "parameters", parameters);
		const sql = database(self.table_name)
			.where(function (builder) {
				builder.where(where);
				Object.keys(where_in).forEach(function (key) {
					builder.whereIn(key, where_in[key]);
				});
				Object.keys(cache_where_in).forEach(function (key) {
					builder.whereIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_in[key]).value);
				});
				Object.keys(where_not_in).forEach(function (key) {
					builder.whereNotIn(key, where_not_in[key]);
				});
				Object.keys(cache_where_not_in).forEach(function (key) {
					builder.whereNotIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_not_in[key]).value);
				});
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
			.limit(limit)
			.offset(offset)
			// todo: figure out how to get order_nulls working without breaking the query
			// note: sqlite cannot handle order nulls, it seems to break the query: order by ({table_name}.{order_column} is not null) vs order by {table_name}.{order_column}
			//.orderBy(order, order_direction, order_nulls)
			.orderBy(order, order_direction)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
		}
		return sql
			.then(function (data) {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
				return Promise.resolve(data);
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
				throw err;
			});
	}
	_relationship_read(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const {
			where = {},
			where_in = {},
			cache_where_in = {},
			where_not_in = {},
			cache_where_not_in = {},
			limit = 16,
			offset = 0,
			order = self.entity.default_order || self.primary_key,
			order_direction = self.entity.default_order_direction || "asc",
			order_nulls = "first",
		} = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.read:enter`, "parameters", parameters);
		const relationship_source = self._parse_source(context, parameters);
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
			joined_where_in[joined_key] = TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_in[k]).value;
		});
		var joined_where_not_in = {};
		Object.keys(where_not_in).forEach(function (k) {
			var joined_key = self.table_name + "." + k;
			joined_where_not_in[joined_key] = where_not_in[k];
		});
		Object.keys(cache_where_not_in).forEach(function (k) {
			var joined_key = self.table_name + "." + k;
			joined_where_not_in[joined_key] = TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_not_in[k]).value;
		});
		const joined_order = self.table_name + "." + order;
		if (relationship_source._direction === "to") {
			const sql = database(self.table_name)
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
					return builder;
				})
				.limit(limit)
				.offset(offset)
				// note: sqlite cannot handle order nulls, it seems to break the query: order by ({table_name}.{order_column} is not null) vs order by {table_name}.{order_column}
				//.orderBy(joined_order, order_direction, order_nulls)
				.orderBy(joined_order, order_direction)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
					return Promise.resolve(data);
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
					throw err;
				});
		} else if (relationship_source._direction === "from") {
			const sql = database(self.table_name)
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
					return builder;
				})
				.limit(limit)
				.offset(offset)
				// note: sqlite cannot handle order nulls, it seems to break the query: order by ({table_name}.{order_column} is not null) vs order by {table_name}.{order_column}
				//.orderBy(joined_order, order_direction, order_nulls)
				.orderBy(joined_order, order_direction)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
					return Promise.resolve(data);
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
					throw err;
				});
		} else {
			throw new Error("Internal error: invalid direction for relationship");
		}
	}
	// read a row
	_read(context, parameters) {
		const self = this;
		const relationship_source = self._parse_source(context, parameters);
		const key = self._batch_key(relationship_source, parameters, "read");
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		TIERED_CACHE__LRU__CACHE__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, key);
	}
	_root_update(context, parameters) {
		var self = this;
		const { source, database, transaction } = context;
		var { attributes, where, where_in = {}, cache_where_in = {}, where_not_in = {}, cache_where_not_in = {} } = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:enter`, "parameters", parameters);
		const sql = database(self.table_name)
			.where(function (builder) {
				builder.where(where);
				Object.keys(where_in).forEach(function (key) {
					builder.whereIn(key, where_in[key]);
				});
				Object.keys(cache_where_in).forEach(function (key) {
					builder.whereIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_in[key]).value);
				});
				Object.keys(where_not_in).forEach(function (key) {
					builder.whereNotIn(key, where_not_in[key]);
				});
				Object.keys(cache_where_not_in).forEach(function (key) {
					builder.whereNotIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_not_in[key]).value);
				});
				return builder;
			})
			.update(attributes)
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString());
		}
		return sql
			.then(function (data) {
				LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:success`, "data", data);
				return self.read(
					{
						source,
						database,
						transaction,
					},
					parameters,
				);
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.update:failure`, "err", err);
				throw err;
			});
	}
	_relationship_update(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const { attributes, where, where_in = {}, where_not_in = {} } = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:enter`, "parameters", parameters);
		const MAXIMUM_ROWS = 4294967296;
		return self
			.read(
				{
					source,
					database,
					transaction,
				},
				{
					...parameters,
					limit: MAXIMUM_ROWS,
				},
			)
			.then(function (data) {
				const valid_ids = data.map(function (item) {
					return item[self.primary_key];
				});
				// use valid_ids to do a where in query
				const sql = database(self.table_name).whereIn(self.primary_key, valid_ids).update(attributes).transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString());
				}
				return sql.then(function (data) {
					LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:success`, "data", data);
					return self.read(
						{
							source,
							database,
							transaction,
						},
						parameters,
					);
				});
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.update:failure`, "err", err);
				throw err;
			});
	}
	// update a row
	_update(context, parameters) {
		const self = this;
		const relationship_source = self._parse_source(context, parameters);
		const key = self._batch_key(relationship_source, parameters, "update");
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		TIERED_CACHE__LRU__CACHE__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, key);
	}
	_cleanup_delete(context, valid_ids) {
		const self = this;
		const { database, transaction } = context;
		const transactions = [
			// to relationship
			function () {
				const sql = database(self.relationship_table_name)
					.where("gauze__relationship__to_type", self.entity.table_name)
					.whereIn("gauze__relationship__to_id", valid_ids)
					.del()
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
			// from relationship
			function () {
				const sql = database(self.relationship_table_name)
					.where("gauze__relationship__from_type", self.entity.table_name)
					.whereIn("gauze__relationship__from_id", valid_ids)
					.del()
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
			// whitelist
			function () {
				const sql = database(self.whitelist_table)
					.where("gauze__whitelist__entity_type", self.entity.table_name)
					.whereIn("gauze__whitelist__entity_id", valid_ids)
					.del()
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
			// blacklist
			function () {
				const sql = database(self.blacklist_table)
					.where("gauze__blacklist__entity_type", self.entity.table_name)
					.whereIn("gauze__blacklist__entity_id", valid_ids)
					.del()
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql;
			},
		];
		return Promise.all(
			transactions.map(function (f) {
				return f();
			}),
		);
	}
	_root_delete(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const { where, where_in = {}, cache_where_in = {}, where_not_in = {}, cache_where_not_in = {}, limit = 16 } = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, "parameters", parameters);
		const MAXIMUM_ROWS = 4294967296;
		// todo: use attributes and update deleted_at instead of deleting the row
		// do a read first
		return self
			.read(
				{
					source,
					database,
					transaction,
				},
				{
					...parameters,
					limit: MAXIMUM_ROWS,
				},
			)
			.then(function (read_data) {
				const valid_ids = read_data.map(function (item) {
					return item[self.primary_key];
				});
				const sql = database(self.table_name)
					.where(function (builder) {
						builder.where(where);
						Object.keys(where_in).forEach(function (key) {
							builder.whereIn(key, where_in[key]);
						});
						Object.keys(cache_where_in).forEach(function (key) {
							builder.whereIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_in[key]).value);
						});
						Object.keys(where_not_in).forEach(function (key) {
							builder.whereNotIn(key, where_not_in[key]);
						});
						Object.keys(cache_where_not_in).forEach(function (key) {
							builder.whereNotIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_not_in[key]).value);
						});
						return builder;
					})
					.del()
					.transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql.then(function (delete_data) {
					LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.delete:success`, "delete_data", delete_data);
					return self._cleanup_delete(context, valid_ids).then(function () {
						return read_data.slice(0, limit);
					});
				});
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.delete:failure`, "err", err);
				throw err;
			});
	}
	_relationship_delete(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const { where, where_in = {}, where_not_in = {}, limit = 16 } = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, "parameters", parameters);
		const MAXIMUM_ROWS = 4294967296;
		return self
			.read(
				{
					source,
					database,
					transaction,
				},
				{
					...parameters,
					limit: MAXIMUM_ROWS,
				},
			)
			.then(function (read_data) {
				const valid_ids = read_data.map(function (item) {
					return item[self.primary_key];
				});
				// use valid_ids to do a where in query
				const sql = database(self.table_name).whereIn(self.primary_key, valid_ids).del().transacting(transaction);
				if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
				}
				return sql.then(function (delete_data) {
					LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.delete:success`, "delete_data", delete_data);
					return self._cleanup_delete(context, valid_ids).then(function () {
						return read_data.slice(0, limit);
					});
				});
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.delete:failure`, "err", err);
				throw err;
			});
	}
	// delete a row
	_delete(context, parameters) {
		const self = this;
		const relationship_source = self._parse_source(context, parameters);
		const key = self._batch_key(relationship_source, parameters, "delete");
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		TIERED_CACHE__LRU__CACHE__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, key);
	}
	_root_count(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const { count = {}, where = {}, where_in = {}, cache_where_in = {}, where_not_in = {}, cache_where_not_in = {} } = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.count:enter`, "parameters", parameters);
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
					builder.whereIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_in[key]).value);
				});
				Object.keys(where_not_in).forEach(function (key) {
					builder.whereNotIn(key, where_not_in[key]);
				});
				Object.keys(cache_where_not_in).forEach(function (key) {
					builder.whereNotIn(key, TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_not_in[key]).value);
				});
				return builder;
			})
			.first()
			.transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:debug_sql`, sql.toString());
		}
		return sql
			.then(function (data) {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:success`, "data", data);
				return Promise.resolve(data);
			})
			.catch(function (err) {
				LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.count:failure`, "err", err);
				throw err;
			});
	}
	_relationship_count(context, parameters) {
		const self = this;
		const { source, database, transaction } = context;
		const { count = {}, where = {}, where_in = {}, cache_where_in = {}, where_not_in = {}, cache_where_not_in = {} } = parameters;
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.count:enter`, "parameters", parameters);
		const relationship_source = self._parse_source(context, parameters);

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
			joined_where_in[joined_key] = TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_in[k]).value;
		});
		var joined_where_not_in = {};
		Object.keys(where_not_in).forEach(function (k) {
			var joined_key = self.table_name + "." + k;
			joined_where_not_in[joined_key] = where_not_in[k];
		});
		Object.keys(cache_where_not_in).forEach(function (k) {
			var joined_key = self.table_name + "." + k;
			joined_where_not_in[joined_key] = TIERED_CACHE__LRU__CACHE__KERNEL.get(cache_where_not_in[k]).value;
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
					return builder;
				})
				.first()
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:success`, "data", data);
					return Promise.resolve(data);
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.count:failure`, "err", err);
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
					return builder;
				})
				.first()
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.count:success`, "data", data);
					return Promise.resolve(data);
				})
				.catch(function (err) {
					LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.count:failure`, "err", err);
					throw err;
				});
		} else {
			throw new Error("Internal error: invalid direction for relationship");
		}
	}
	_count(context, parameters) {
		const self = this;
		const relationship_source = self._parse_source(context, parameters);
		const key = self._batch_key(relationship_source, parameters, "count");
		// use the batch key as the cache key
		// set size of 1 until we implement a proper sizing procedure
		TIERED_CACHE__LRU__CACHE__KERNEL.set(key, parameters, 1);
		return self.loader.load(context, key);
	}
}

export { DatabaseModel };
