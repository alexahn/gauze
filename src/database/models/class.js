import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'
import * as $structure from './../../structure/index.js'

class DatabaseModel {
	constructor (config) {
		this.config = config
		this.name = this.__name()
		this.relationship_table = $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_TABLE_NAME
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	__name () {
		return this.constructor.name
	}
}

// constructor (config, input)
// method (context, input)
class KnexDatabaseModel extends DatabaseModel {
	constructor (config, table) {
		super(config)
		this.table = table
		this.name = this._name()
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	_name () {
		return `[${this.table}]${this.constructor.name}`
	}
	// create a row
	Create ({
		source,
		database,
		transaction
	}, {
		attributes
	}) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Create.enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Create.enter`, 'attributes', attributes)
		return database(self.table)
			.insert(attributes, ['id'])
			.transacting(transaction)
			.then(function (data) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.Create:success`, 'data', data)
				return self.Read({
					source,
					database,
					transaction
				}, {
					where: {
						id: data[0].id
					},
					limit: 1,
					offset: 0,
					order_column: 'id',
					order_direction: 'asc',
					order_nulls: 'first'
				})
			}).catch(function (err) {
				$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Create:failure`, 'err', err)
				throw err
			})
	}
	// read a row
	Read ({
		source,
		database,
		transaction
	}, {
		where,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Read:enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Read:enter`, 'where', where)
		if (source) {
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
			var joined_order_column = self.table + '.' + order_column
			return database(self.table)
				.join(self.relationship_table, `${self.relationship_table}._to_id`, '=', `${self.table}.id`)
				.where(`${self.relationship_table}._from_id`, PARENT_SQL_ID)
				.where(`${self.relationship_table}._from_type`, PARENT_SQL_TABLE)
				.where(joined_where)
				.limit(limit)
				.offset(offset)
				.orderBy(joined_order_column, order_direction, order_nulls)
				.transacting(transaction)
				.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.Read:success`, 'data', data)
					return Promise.resolve(data)
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Read:failure`, 'err', err)
					throw err
				})
		} else {
			return database(self.table)
				.where(where)
				.limit(limit)
				.offset(offset)
				.orderBy(order_column, order_direction, order_nulls)
				.transacting(transaction)
				.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.Read:success`, 'data', data)
					return Promise.resolve(data)
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Read:failure`, 'err', err)
					throw err
				})
		}
	}
	// update a row
	Update ({
		source,
		database,
		transaction
	}, {
		where,
		attributes,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		var self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:enter`, 'where', where)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:enter`, 'attributes', attributes)
		if (source) {
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
			return database(self.table)
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
				.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:success`, 'data', data)
					return self.Read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order_column,
						order_direction,
						order_nulls
					})
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Update:failure`, 'err', err)
					console.log(err)
					throw err
				})
		} else {
			return database(self.table)
				.where(where)
				.update(attributes)
				.transacting(transaction)
				.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:success`, 'data', data)
					return self.Read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order_column,
						order_direction,
						order_nulls
					})
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Update:failure`, 'err', err)
					throw err
				})
		}
	}
	// delete a row
	Delete ({
		source,
		database,
		transaction
	}, {
		where,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		var self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, 'source', source)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, 'where', where)

		if (source) {
			const PARENT_SQL_ID = source._metadata.id
			const PARENT_GRAPHQL_TYPE = source._metadata.type
			const PARENT_SQL_TABLE = $structure.resolvers.DATABASE_GRAPHQL_TYPE_TO_SQL_TABLE[PARENT_GRAPHQL_TYPE]
			// mutate where by prefixing with table name
			var joined_where = {}
			Object.keys(where).forEach(function (k) {
				var joined_key = self.table + '.' + k
				joined_where[joined_key] = where[k]
			})
			return database(self.table)
				.where(joined_where)
				.join(self.relationship_table, `${self.relationship_table}._to_id`, '=', `${self.table}.id`)
				.where(`${self.relationship_table}._from_id`, PARENT_SQL_ID)
				.where(`${self.relationship_table}._from_type`, PARENT_SQL_TABLE)
				.del()
				.transacting(transaction)
				.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:success`, 'data', data)
					return self.Read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order_column,
						order_direction,
						order_nulls
					})
				})
				.catch(function (err) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, 'err', err)
					console.log(err)
					throw err
				})
		} else {
			return database(self.table)
				.where(where)
				.del()
				.transacting(transaction)
				.then(function (data) {
					$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:success`, 'data', data)
					return self.Read({
						source,
						database,
						transaction
					}, {
						where,
						limit,
						offset,
						order_column,
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