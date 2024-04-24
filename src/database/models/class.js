import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../kernel/index.js";
import * as $structure from "./../../structure/index.js";

// constructor (config, input)
// method (context, input)
class DatabaseModel extends $kernel.models._class.Model {
	constructor(config, { table, primary_key }) {
		super(config);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:enter`);
		this.table = table;
		this.primary_key = primary_key;
		//this.fields = fields
		this.name = this._name();
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	_name() {
		return `[${this.table}]${this.constructor.name}`;
	}
	// create a row
	create({ source, database, transaction }, input) {
		const self = this;
		const { attributes = {} } = input;
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.create.enter`, "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.create.enter`, "input", input);
		const sql = database(self.table).insert(attributes, [self.primary_key]).transacting(transaction);
		if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
			$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString());
		}
		return sql
			.then(function (data) {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.create:success`, "data", data);
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
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.create:failure`, "err", err);
				throw err;
			});
	}
	// read a row
	read({ source, database, transaction }, input) {
		const self = this;
		const { where = {}, where_in = {}, where_not_in = {}, limit = 128, offset = 0, order = this.primary_key, order_direction = "asc", order_nulls = "first" } = input;
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.read:enter`, "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.read:enter`, "input", input);
		if (source && source._metadata) {
			// do join here based on source metadata
			// use structure resolvers to convert graphql type to table name
			// relationships are one directional, so use from as the parent
			const PARENT_SQL_ID = source._metadata.id;
			const PARENT_GRAPHQL_TYPE = source._metadata.type;
			const PARENT_SQL_TABLE = $structure.resolvers.DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE[PARENT_GRAPHQL_TYPE];
			// mutate where by prefixing with table name
			var joined_where = {};
			Object.keys(where).forEach(function (k) {
				var joined_key = self.table + "." + k;
				joined_where[joined_key] = where[k];
			});
			var joined_where_in = {};
			Object.keys(where_in).forEach(function (k) {
				var joined_key = self.table + "." + k;
				joined_where_in[joined_key] = where_in[k];
			});
			var joined_where_not_in = {};
			Object.keys(where_not_in).forEach(function (k) {
				var joined_key = self.table + "." + k;
				joined_where_not_in[joined_key] = where_not_in[k];
			});
			var joined_order = self.table + "." + order;
			const sql = database(self.table)
				.join(self.relationship_table, `${self.relationship_table}.gauze__relationship__to_id`, "=", `${self.table}.id`)
				.where(`${self.relationship_table}.gauze__relationship__from_id`, PARENT_SQL_ID)
				.where(`${self.relationship_table}.gauze__relationship__from_type`, PARENT_SQL_TABLE)
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
				.orderBy(joined_order, order_direction, order_nulls)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
					return Promise.resolve(data);
				})
				.catch(function (err) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
					throw err;
				});
		} else {
			const sql = database(self.table)
				.where(function (builder) {
					builder.where(where);
					Object.keys(where_in).forEach(function (key) {
						builder.whereIn(key, where_in[key]);
					});
					Object.keys(where_not_in).forEach(function (key) {
						builder.whereNotIn(key, where_not_in[key]);
					});
					return builder;
				})
				.limit(limit)
				.offset(offset)
				// todo: figure out how to get order_nulls working without breaking the query
				//.orderBy(order, order_direction, order_nulls)
				.orderBy(order, order_direction)
				.transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.read:success`, "data", data);
					return Promise.resolve(data);
				})
				.catch(function (err) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.read:failure`, "err", err);
					throw err;
				});
		}
	}
	// update a row
	update({ source, database, transaction }, input) {
		var self = this;
		const { attributes = {}, where = {}, where_in = {}, where_not_in = {} } = input;
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:enter`, "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:enter`, "input", input);
		const MAXIMUM_ROWS = 4294967296;
		if (source && source._metadata) {
			// todo: hook up lru cache when dealing with id arrays
			return self
				.read(
					{
						source,
						database,
						transaction,
					},
					{
						...input,
						limit: MAXIMUM_ROWS,
					},
				)
				.then(function (data) {
					const valid_ids = data.map(function (item) {
						return item[self.primary_key];
					});
					// use valid_ids to do a where in query
					const sql = database(self.table).whereIn(self.primary_key, valid_ids).update(attributes).transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString());
					}
					return sql
						.then(function (data) {
							$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:success`, "data", data);
							return self.read(
								{
									source,
									database,
									transaction,
								},
								input,
							);
						})
						.catch(function (err) {
							$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.update:failure`, "err", err);
							throw err;
						});
				})
				.catch(function (err) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.update:failure`, "err", err);
					throw err;
				});
		} else {
			const sql = database(self.table).where(where).update(attributes).transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.update:success`, "data", data);
					return self.read(
						{
							source,
							database,
							transaction,
						},
						input,
					);
				})
				.catch(function (err) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.update:failure`, "err", err);
					throw err;
				});
		}
	}
	// delete a row
	delete({ source, database, transaction }, input) {
		var self = this;
		const { where = {}, where_in = {}, where_not_in = {} } = input;
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, "source", source);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, "input", input);
		const MAXIMUM_ROWS = 4294967296;
		// todo: use attributes and update deleted_at instead of deleting the row
		if (source && source._metadata) {
			// todo: hook up lru cache when dealing with id arrays
			return self
				.read(
					{
						source,
						database,
						transaction,
					},
					{
						...input,
						limit: MAXIMUM_ROWS,
					},
				)
				.then(function (data) {
					const valid_ids = data.map(function (item) {
						return item[self.primary_key];
					});
					// use valid_ids to do a where in query
					const sql = database(self.table).whereIn(self.primary_key, valid_ids).del().transacting(transaction);
					if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
						$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
					}
					return sql
						.then(function (data) {
							$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:success`, "data", data);
							return self.read(
								{
									source,
									database,
									transaction,
								},
								input,
							);
						})
						.catch(function (err) {
							$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, "err", err);
							throw err;
						});
				})
				.catch(function (err) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, "err", err);
					throw err;
				});
		} else {
			const sql = database(self.table).where(where).del().transacting(transaction);
			if (process.env.GAUZE_DEBUG_SQL === "TRUE") {
				$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("1", __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString());
			}
			return sql
				.then(function (data) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.Delete:success`, "data", data);
					return self.read(
						{
							source,
							database,
							transaction,
						},
						input,
					);
				})
				.catch(function (err) {
					$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("4", __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, "err", err);
					throw err;
				});
		}
	}
}

export { DatabaseModel };
