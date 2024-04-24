import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../kernel/index.js";

class SystemModel extends $kernel.models._class.Model {
	constructor(config) {
		super(config);
		this.name = this.__name();
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	__name() {
		return this.constructor.name;
	}
}

class GraphQLOperationSystemModel extends SystemModel {
	constructor(config, { schema, schema_name }) {
		super(config);
		this.schema = schema;
		this.name = this._name();
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	_name() {
		return this.constructor.name;
	}
	execute(context, { operation, operation_name }, operation_variables) {
		return $kernel.shell.graphql
			.EXECUTE__GRAPHQL__SHELL__KERNEL({
				schema: this.schema,
				context,
				operation,
				operation_name,
				operation_variables,
			})
			.then(function (data) {
				if (data.errors && data.errors.length) {
					// should we make a new error here?
					// todo: figure out if we need to log here or not
					console.log(data.errors);
					throw data.errors;
				} else {
					return Promise.resolve(data);
				}
			});
	}
}

/*
class DatabaseModelSystemModel extends SystemModel {
	constructor (config, model) {
		super(config)
		this.model = model
		this.name = this._name()
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.constructor:exit`)
	}
	_name () {
		return `[${this.model.name}]${this.constructor.name}`
	}
	create (context, input) {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.create:enter`, 'input', input)
		return this.model.create(context, input)
	}
	read (context, input) {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.read:enter`, 'input', input)
		return this.model.read(context, input)
	}
	update (context, input) {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.update:enter`, 'input', input)
		return this.model.update(context, input)
	}
	delete (context, input) {
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write('0', __RELATIVE_FILEPATH, `${this.name}.delete:enter`, 'input', input)
		return this.model.delete(context, input)
	}
}
*/

export {
	SystemModel,
	//DatabaseModelSystemModel,
	GraphQLOperationSystemModel,
};
