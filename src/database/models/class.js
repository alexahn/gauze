import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'
import * as $structure from './../../structure/index.js'

class DatabaseModel {
	constructor (config) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:enter`)
		this.config = config
		this.name = this.__name()
		this.relationship_table = $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_TABLE_NAME
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	__name () {
		return this.constructor.name
	}
	serialize_input (attributes, method) {
		const self = this
		// clear attributes for protected fields
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_input:enter`, 'attributes', attributes)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_input:enter`, 'method', method)
		if (this.protected_fields && this.protected_fields.length) {
			this.protected_fields.forEach(function (field) {
				delete attributes[field]
			})
		}
		// input serializers
		Object.keys(this.field_serializers).forEach(function (field) {
			if (self.field_serializers[field].input[method]) {
				attributes = self.field_serializers[field].input[method](attributes)
			}
		})
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_input:exit`, 'attributes', attributes)
		return attributes
	}
	serialize_output (row) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_output:enter`, 'row', row)
		Object.keys(this.field_serializers).forEach(function (field) {
			row = self.field_serializers[field].output(row)
		})
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_output:exit`, 'row', row)
		return row
	}
}

// constructor (config, input)
// method (context, input)
class KnexDatabaseModel extends DatabaseModel {
	constructor ({
		table,
		primary_key,
		fields,
		protected_fields,
		field_serializers
	}) {
		super({})
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:enter`)
		this.table = table
		this.primary_key = primary_key
		this.fields = fields
		this.protected_fields = protected_fields
		this.field_serializers = field_serializers
		this.name = this._name()
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	_name () {
		return `[${this.table}]${this.constructor.name}`
	}
	// create a row
	create ({
		source,
		database,
		transaction
	}, {
		attributes
	}) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.create.enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.create.enter`, 'attributes', attributes)
		attributes = self.serialize_input(attributes, 'create')
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.create.enter`, 'serialized attributes', attributes)
		const sql = database(self.table)
			.insert(attributes, [self.primary_key])
			.transacting(transaction)
		if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.create:debug_sql`, sql.toString())
		}
		return sql.then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.create:success`, 'data', data)
			return self.read({
				source: undefined,
				database,
				transaction
			}, {
				where: {
					[self.primary_key]: data[0][self.primary_key]
				},
				limit: 1,
				offset: 0,
				order: self.primary_key,
				order_direction: 'asc',
				order_nulls: 'first'
			})
		}).catch(function (err) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.create:failure`, 'err', err)
			throw err
		})
	}
	// read a row
	read ({
		source,
		database,
		transaction
	}, {
		where,
		limit = 128,
		offset = 0,
		order = this.primary_key,
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.read:enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.read:enter`, 'where', where)
		if (source && source._metadata) {
			// do join here based on source metadata
			// use structure resolvers to convert graphql type to table name
			// relationships are one directional, so use from as the parent
			const PARENT_SQL_ID = source._metadata.id
			const PARENT_GRAPHQL_TYPE = source._metadata.type
			const PARENT_SQL_TABLE = $structure.resolvers.DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE[PARENT_GRAPHQL_TYPE]
			// mutate where by prefixing with table name
			var joined_where = {}
			Object.keys(where).forEach(function (k) {
				var joined_key = self.table + '.' + k
				joined_where[joined_key] = where[k]
			})
			var joined_order = self.table + '.' + order
			const sql = database(self.table)
				.join(self.relationship_table, `${self.relationship_table}._to_id`, '=', `${self.table}.id`)
				.where(`${self.relationship_table}._from_id`, PARENT_SQL_ID)
				.where(`${self.relationship_table}._from_type`, PARENT_SQL_TABLE)
				.where(joined_where)
				.limit(limit)
				.offset(offset)
				.orderBy(joined_order, order_direction, order_nulls)
				.transacting(transaction)
			if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString())
			}
			return sql.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.read:success`, 'data', data)
					return Promise.resolve(data)
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.read:failure`, 'err', err)
					throw err
				})
		} else {
			const sql = database(self.table)
				.where(where)
				.limit(limit)
				.offset(offset)
				// todo: figure out how to get order_nulls working without breaking the query
				//.orderBy(order, order_direction, order_nulls)
				.orderBy(order, order_direction)
				.transacting(transaction)
			if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.read:debug_sql`, sql.toString())
			}
			return sql.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.read:success`, 'data', data)
					return Promise.resolve(data)
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.read:failure`, 'err', err)
					throw err
				})
		}
	}
	// update a row
	update ({
		source,
		database,
		transaction
	}, {
		where,
		attributes,
		limit = 128,
		offset = 0,
		order = this.primary_key,
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		var self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.update:enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.update:enter`, 'where', where)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.update:enter`, 'attributes', attributes)
		attributes = self.serialize_input(attributes, 'update')
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.update:enter`, 'serialized attributes', attributes)
		if (source && source._metadata) {
			// note: manual approach: do a query to get a set of ids and pass those into a where in clause
			// note: there might be a way to do this in one shot by doing a join query, but this approach is not terrible because we can handle 1 million ids in memory fine
			// todo: hook up lru cache when dealing with id arrays
			return self.read({
				source,
				database,
				transaction
			}, {
				where,
				limit,
				offset,
				order,
				order_direction,
				order_nulls
			}).then(function (data) {
				const valid_ids = data.map(function (item) {
					return item[self.primary_key]
				})
				// use valid_ids to do a where in query
				const sql = database(self.table)
					.where(where)
					.whereIn(self.primary_key, valid_ids)
					.update(attributes)
					.transacting(transaction)
				if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString())
				}
				return sql.then(function (data) {
						$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.update:success`, 'data', data)
						return self.read({
							source,
							database,
							transaction
						}, {
							where,
							limit,
							offset,
							order,
							order_direction,
							order_nulls
						})
					})
					.catch(function (err) {
						$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.update:failure`, 'err', err)
						throw err
					})
			}).catch(function (err) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.update:failure`, 'err', err)
				throw err
			})
			/*
			// todo: currently might only work in postgresql
			const PARENT_SQL_ID = source._metadata.id
			const PARENT_GRAPHQL_TYPE = source._metadata.type
			const PARENT_SQL_TABLE = $structure.resolvers.DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE[PARENT_GRAPHQL_TYPE]
			// mutate where by prefixing with table name
			var joined_where = {}
			Object.keys(where).forEach(function (k) {
				var joined_key = self.table + '.' + k
				joined_where[joined_key] = where[k]
			})
			var joined_attributes = {}
			Object.keys(attributes).forEach(function (k) {
				var joined_key = self.table + '.' + k
				joined_attributes[joined_key] = attributes[k]
			})
			const sql = database(self.table)
				.where(joined_where)
				//.update(joined_attributes)
				.join(self.relationship_table, `${self.relationship_table}._to_id`, '=', `${self.table}.id`)
				.where(`${self.relationship_table}._from_id`, PARENT_SQL_ID)
				.where(`${self.relationship_table}._from_type`, PARENT_SQL_TABLE)
				.update(joined_attributes)
				//.updateFrom(self.relationship_table)
				//.where(`${self.relationship_table}._to_id`, '=', `${self.table}.id`)
				//.where(joined_where)
				.transacting(transaction)
			if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString())
			}
			return sql.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.update:success`, 'data', data)
					return self.read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order,
						order_direction,
						order_nulls
					})
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.update:failure`, 'err', err)
					throw err
				})
			*/
		} else {
			const sql = database(self.table)
				.where(where)
				.update(attributes)
				.transacting(transaction)
			if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.update:debug_sql`, sql.toString())
			}
			return sql.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.update:success`, 'data', data)
					return self.read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order,
						order_direction,
						order_nulls
					})
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.update:failure`, 'err', err)
					throw err
				})
		}
	}
	// delete a row
	delete ({
		source,
		database,
		transaction
	}, {
		where,
		limit = 128,
		offset = 0,
		order = this.primary_key,
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		var self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, 'where', where)
		// todo: use attributes and update deleted_at instead of deleting the row
		//attributes = self.serialize_input(attributes, 'delete')
		if (source && source._metadata) {
			// note: manual approach: do a query to get a set of ids and pass those into a where in clause
			// note: there might be a way to do this in one shot by doing a join query, but this approach is not terrible because we can handle 1 million ids in memory fine
			// todo: hook up lru cache when dealing with id arrays
			return self.read({
				source,
				database,
				transaction
			}, {
				where,
				limit,
				offset,
				order,
				order_direction,
				order_nulls
			}).then(function (data) {
				const valid_ids = data.map(function (item) {
					return item[self.primary_key]
				})
				// use valid_ids to do a where in query
				const sql = database(self.table)
					.where(where)
					.whereIn(self.primary_key, valid_ids)
					.del()
					.transacting(transaction)
				if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString())
				}
				return sql.then(function (data) {
						$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:success`, 'data', data)
						return self.read({
							source,
							database,
							transaction
						}, {
							where,
							limit,
							offset,
							order,
							order_direction,
							order_nulls
						})
					})
					.catch(function (err) {
						$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, 'err', err)
						throw err
					})
			}).catch(function (err) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, 'err', err)
				throw err
			})
			/*
			const PARENT_SQL_ID = source._metadata.id
			const PARENT_GRAPHQL_TYPE = source._metadata.type
			const PARENT_SQL_TABLE = $structure.resolvers.DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE[PARENT_GRAPHQL_TYPE]
			// mutate where by prefixing with table name
			var joined_where = {}
			Object.keys(where).forEach(function (k) {
				var joined_key = self.table + '.' + k
				joined_where[joined_key] = where[k]
			})
			const sql = database(self.table)
				.where(joined_where)
				.join(self.relationship_table, `${self.relationship_table}._to_id`, '=', `${self.table}.id`)
				.where(`${self.relationship_table}._from_id`, PARENT_SQL_ID)
				.where(`${self.relationship_table}._from_type`, PARENT_SQL_TABLE)
				.del()
				.transacting(transaction)
			if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString())
			}
			return sql.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:success`, 'data', data)
					return self.read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order,
						order_direction,
						order_nulls
					})
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, 'err', err)
					throw err
				})
			*/
		} else {
			const sql = database(self.table)
				.where(where)
				.del()
				.transacting(transaction)
			if (process.env.GAUZE_DEBUG_SQL === 'TRUE') {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.delete:debug_sql`, sql.toString())
			}
			return sql.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:success`, 'data', data)
					return self.read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order,
						order_direction,
						order_nulls
					})
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, 'err', err)
					throw err
				})
		}
	}
}

export {
	DatabaseModel,
	KnexDatabaseModel
}