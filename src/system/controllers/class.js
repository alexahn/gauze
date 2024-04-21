import url from 'url'
import path from 'path'
const __FILEPATH = url.fileURLToPath(import.meta.url)
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH)

import * as $kernel from './../../kernel/index.js'

class SystemController {
	constructor (config) {
		this.config = config
		this.name = this.__name()
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor.exit`)
	}
	__name () {
		return this.constructor.name
	}
}

// todo: authorization, rate limiting, etc
// input model is a system model
class SystemModelSystemController extends SystemController {
	constructor (config, model) {
		super(config)
		this.model = model
		this.name = this._name()
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
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
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.create:enter`, 'input', input)
		return this.model.create(context, input)
	}
	read ({
		user,
		source,
		database,
		transaction
	}, input) {
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.read:enter`, 'input', input)
		console.log('model', this.model.read, this.model.Read)
		return this.model.read(context, input)
	}
	update ({
		user,
		source,
		database,
		transaction
	}, input) {
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.update:enter`, 'input', input)
		return this.model.update(context, input)
	}
	delete ({
		user,
		source,
		database,
		transaction
	}, input) {
		const context = {
			source,
			database,
			transaction
		}
		$kernel.logger.io.IO_LOGGER_KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.delete:enter`, 'input', input)
		return this.model.delete(context, input)
	}
}

export {
	SystemController,
	SystemModelSystemController
}