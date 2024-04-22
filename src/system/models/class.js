import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'

class SystemModel {
	constructor (config) {
		this.config = config
		this.name = this.__name()
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	__name () {
		return this.constructor.name
	}
}

class DatabaseModelSystemModel extends SystemModel {
	constructor (config, model) {
		super(config)
		this.model = model
		this.name = this._name()
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	_name () {
		return `[${this.model.name}]${this.constructor.name}`
	}
	serialize_input (attributes, method) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_input:enter`, 'attributes', attributes)
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_input:enter`, 'method', method)
		return this.model.serialize_input(attributes, method)
	}
	serialize_output (row) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.serialize_output:enter`, 'row', row)
		return this.model.serialize_output(row)
	}
	create (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.create:enter`, 'input', input)
		return this.model.create(context, input)
	}
	read (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.read:enter`, 'input', input)
		return this.model.read(context, input)
	}
	update (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.update:enter`, 'input', input)
		return this.model.update(context, input)
	}
	delete (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.delete:enter`, 'input', input)
		return this.model.delete(context, input)
	}
}

export {
	SystemModel,
	DatabaseModelSystemModel
}