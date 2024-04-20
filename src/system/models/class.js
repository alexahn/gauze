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
	Create (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.Create:enter`, 'input', input)
		return this.model.Create(context, input)
	}
	Read (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.Read:enter`, 'input', input)
		return this.model.Read(context, input)
	}
	Update (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.Update:enter`, 'input', input)
		return this.model.Update(context, input)
	}
	Delete (context, input) {
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.Delete:enter`, 'input', input)
		return this.model.Delete(context, input)
	}
}

export {
	SystemModel,
	DatabaseModelSystemModel
}