import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'

class DatabaseModel {
	constructor (config) {
		this.config = config
		this.name = this.__name()
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
		database,
		transaction,
		source
	}, {
		attributes
	}) {
		const self = this
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Create.enter`, 'attributes', attributes)
		return database(self.table).insert(attributes, ['id']).transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.Create:success`, 'data', data)
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
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Create:failure`, 'err', err)
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Read:enter`, 'where', where)
		return database(self.table).where(where).limit(limit).offset(offset).orderBy(order_column, order_direction, order_nulls).transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('1', __RELATIVE_FILEPATH, `${self.name}.Read:success`, 'data', data)
			return Promise.resolve(data)
		}).catch(function (err) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Read:failure`, 'err', err)
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:enter`, 'where', where)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:enter`, 'attributes', attributes)
		return database(self.table).where(where).update(attributes).transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Update:success`, 'data', data)
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
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Update:failure`, 'err', err)
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
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:enter`, 'where', where)
		return database(self.table).where(where).del().transacting(transaction).then(function (data) {
			$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${self.name}.Delete:success`, 'data', data)
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
			$kernel.logger.io.IO_LOGGER_KERNEL.write('4', __RELATIVE_FILEPATH, `${self.name}.Delete:failure`, 'err', err)
			throw err
		})
	}
}

export {
	DatabaseModel,
	KnexDatabaseModel
}