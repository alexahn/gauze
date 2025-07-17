import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $structure from "./../../../structure/index.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

// base model handles middlewares, serializers, and deserializers based on the abstract entity definition
class Model {
	constructor(config) {
		const self = this;
		const { entity, entity_name } = config;
		self.entity = entity;
		self.entity_name = entity_name;
		self.name = self._name();
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	static _class_name(entity_name) {
		return entity_name ? `(${entity_name})Model` : `Model`;
	}
	_name() {
		const self = this;
		return Model._class_name(self.entity_name);
	}
	// todo: add some error visibility here
	// todo: it's kind of rough when a middleware or serializer is misconfigured and there is just some generic error
	reduce_fields(input, method, reducers) {
		var self = this;
		return Object.keys(self.entity.fields).reduce(function (previous_field_result, key) {
			const field = self.entity.fields[key];
			return field[reducers].reduce(function (previous_reducer_result, next_reducer) {
				return next_reducer[method](previous_reducer_result, method);
			}, previous_field_result);
		}, input);
	}
	pre_serialize_middleware(attributes, method) {
		const self = this;
		return self.reduce_fields(attributes, method, "pre_serialize_middlewares");
	}
	serialize(attributes, method) {
		const self = this;
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.serialize:enter`, "attributes", attributes);
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.serialize:enter`, "method", method);
		attributes = self.reduce_fields(attributes, method, "serializers");
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.serialize:exit`, "attributes", attributes);
		return attributes;
	}
	post_serialize_middleware(attributes, method) {
		const self = this;
		return self.reduce_fields(attributes, method, "post_serialize_middlewares");
	}
	pre_deserialize_middleware(row, method) {
		const self = this;
		row = self.reduce_fields(row, method, "pre_deserialize_middlewares");
		return row;
	}
	deserialize(row, method) {
		const self = this;
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.deserialize:enter`, "row", row);
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.deserialize:enter`, "method", method);
		row = self.reduce_fields(row, method, "deserializers");
		LOGGER__IO__LOGGER__SRC__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.deserialize:exit`, "row", row);
		return row;
	}
	post_deserialize_middleware(row, method) {
		const self = this;
		row = self.reduce_fields(row, method, "post_deserialize_middlewares");
		return row;
	}
}

class KernelModel extends Model {}

export { Model, KernelModel };
