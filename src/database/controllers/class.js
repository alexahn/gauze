import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'

// input model is a database model
class DatabaseController {
	constructor (config, model) {
		//super(config)
		this.model = model
		this.name = this._name()
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	_name () {
		return `[${this.model.name}]${this.constructor.name}`
	}
	create ({
		user,
		source,
		database,
		transaction
	}, input) {
		const self = this
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.create:enter`, 'input', input)
		input.attributes = self.model.serialize(input.attributes, 'create')
		return self.model.create(context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row)
			})
		})
	}
	read ({
		user,
		source,
		database,
		transaction
	}, input) {
		const self = this
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.read:enter`, 'input', input)
		return this.model.read(context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row)
			})
		})
	}
	update ({
		user,
		source,
		database,
		transaction
	}, input) {
		const self = this
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.update:enter`, 'input', input)
		input.attributes = self.model.serialize(input.attributes, 'update')
		return self.model.update(context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row)
			})
		})
	}
	delete ({
		user,
		source,
		database,
		transaction
	}, input) {
		const self = this
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.delete:enter`, 'input', input)
		return this.model.delete(context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row)
			})
		})
	}
}

export {
	DatabaseController
}