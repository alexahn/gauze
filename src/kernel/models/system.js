import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import {
	Model
} from "./class.js"

import {                
    LOGGER__IO__LOGGER__KERNEL
} from "./../logger/io.js"

import {
	EXECUTE__GRAPHQL__SHELL__KERNEL
} from './../shell/graphql.js'

class SystemModel extends Model {
	constructor(config) {
		super(config);
		this.name = this.__name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
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
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	_name() {
		return this.constructor.name;
	}
	execute(context, { operation, operation_name }, operation_variables) {
		return EXECUTE__GRAPHQL__SHELL__KERNEL({
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

export {
	SystemModel,
	GraphQLOperationSystemModel,
};
