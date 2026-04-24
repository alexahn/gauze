import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $structure from "./../../../structure/index.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

const EMPTY_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL = "b55c1f0fb7b44454d6186e16409262a1dc53a27f52c996c64bc56bff53dd7f8e";

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
	_normalize_count_value(value) {
		if (typeof value === "bigint") {
			return {
				value: value,
				string: true,
			};
		}
		if (typeof value === "number") {
			if (!Number.isFinite(value) || !Number.isInteger(value)) {
				throw new TypeError(`Count must be an integer: ${value}`);
			}
			return {
				value: BigInt(value),
				string: !Number.isSafeInteger(value),
			};
		}
		if (typeof value === "string") {
			if (!/^[0-9]+$/.test(value)) {
				throw new TypeError(`Count must be an integer string: ${value}`);
			}
			return {
				value: BigInt(value),
				string: true,
			};
		}
		throw new TypeError(`Count must be a number, string, or bigint: ${value}`);
	}
	_format_count_value(value, force_string = false) {
		if (force_string || value > BigInt(Number.MAX_SAFE_INTEGER)) {
			return value.toString();
		}
		return Number(value);
	}
	_merge_count_maps(results) {
		const self = this;
		const merged = {};
		const strings = {};
		results.forEach(function (result) {
			Object.keys(result).forEach(function (key) {
				if (key !== EMPTY_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL) {
					const count = self._normalize_count_value(result[key]);
					if (!Object.prototype.hasOwnProperty.call(merged, key)) {
						merged[key] = 0n;
						strings[key] = false;
					}
					merged[key] += count.value;
					strings[key] = strings[key] || count.string;
				}
			});
		});
		const formatted = {};
		Object.keys(merged).forEach(function (key) {
			formatted[key] = self._format_count_value(merged[key], strings[key]);
		});
		// TODO: fix the frontend code so we don't need to do this
		// note: this will guarantee we always return at least one result (currently the frontend code depends on at least one result being returned)
		if (Object.keys(formatted).length === 0) {
			formatted[EMPTY_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL] = 0;
		}
		return formatted;
	}
	_merge_count_rows(rows) {
		const self = this;
		const merged = {};
		const strings = {};
		rows.forEach(function (row) {
			if (row.select !== EMPTY_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL) {
				const count = self._normalize_count_value(row.count);
				if (!Object.prototype.hasOwnProperty.call(merged, row.select)) {
					merged[row.select] = 0n;
					strings[row.select] = false;
				}
				merged[row.select] += count.value;
				strings[row.select] = strings[row.select] || count.string;
			}
		});
		const count_rows = Object.keys(merged).map(function (key) {
			return {
				select: key,
				count: self._format_count_value(merged[key], strings[key]),
			};
		});
		// TODO: fix the frontend code so we don't need to do this
		// note: this will guarantee we always return at least one result (currently the frontend code depends on at least one result being returned)
		if (!count_rows.length) {
			count_rows.push({
				select: EMPTY_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL,
				count: 0,
			});
		}
		return count_rows;
	}
}

class KernelModel extends Model {}

export { Model, KernelModel };
