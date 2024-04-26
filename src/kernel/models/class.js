import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import * as $kernel from "./../../kernel/index.js";
import * as $structure from "./../../structure/index.js";

// base model handles middlewares, serializers, and deserializers based on the abstract entity definition
class Model {
	constructor(abstract_entity) {
		const { name, fields } = abstract_entity;
		this.entity_name = name;
		this.fields = fields;
		this.name = this.__name();
		this.relationship_table = $structure.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE;
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	__name() {
		return this.constructor.name;
	}
	// todo: add some error visibility here
	// todo: it's kind of rough when a middleware or serializer is misconfigured and there is just some generic error
	reduce_fields(input, method, reducers) {
		var self = this;
		return Object.keys(self.fields).reduce(function (previous_field_result, key) {
			const field = self.fields[key];
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.serialize:enter`, "attributes", attributes);
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.serialize:enter`, "method", method);
		attributes = self.reduce_fields(attributes, method, "serializers");
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.deserialize:exit`, "attributes", attributes);
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
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.deserialize:enter`, "row", row);
		row = self.reduce_fields(row, method, "deserializers");
		$kernel.logger.io.LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.serialize_output:exit`, "row", row);
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
