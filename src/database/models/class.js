import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'

class DatabaseModel {
	constructor (config) {
		this.config = config
		$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, 'DatabaseModel.constructor:end')
	}
}

// constructor (config, input)
// method (context, input)
class KnexDatabaseModel extends DatabaseModel {
	constructor (config, table) {
		super(config)
		this.table = table
	}
	// create a row
	Create ({
		database,
		transaction,
		source
	}, {
		attributes
	}) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Create.enter`, 'attributes', attributes)
		return database(self.table).insert(attributes, ['id']).transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Create:success`, 'data', data)
			return self.Read({
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
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Create:failure`, 'err', err)
			throw err
		})
	}
	// read a row
	Read ({
		database,
		transaction,
		source
	}, {
		where,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Read:enter`, 'where', where)
		return database(self.table).where(where).limit(limit).offset(offset).orderBy(order_column, order_direction, order_nulls).transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Read:success`, 'data', data)
			return Promise.resolve(data)
		}).catch(function (err) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Read:failure`, 'err', err)
			throw err
		})
	}
	// update a row
	Update ({
		database,
		transaction,
		source
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Update:enter`, 'where', where)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Update:enter`, 'attributes', where)
		return database(self.table).where(where).update(attributes).transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Update:success`, 'data', data)
			return self.Read({
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
		}).catch(function (err) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Update:failure`, 'err', err)
			throw err
		})
	}
	// delete a row
	Delete ({
		database,
		transaction,
		source
	}, {
		where,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		var self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Delete:enter`, 'where', where)
		return database(self.table).where(where).del().transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Delete:success`, 'data', data)
			return self.Read({
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
		}).catch(function (err) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.table}.KnexDatabaseModel.Delete:failure`, 'err', err)
			throw err
		})
	}
}

export {
	DatabaseModel,
	KnexDatabaseModel
}
