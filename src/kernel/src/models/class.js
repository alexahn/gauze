import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import * as $structure from "./../../../structure/index.js";

import { LOGGER__IO__LOGGER__SRC__KERNEL } from "./../logger/io.js";

const DEFAULT_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL = "count(*)";

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
	_count_selects(count) {
		if (count && Object.keys(count).length) {
			const selects = [];
			const seen = new Set();
			Object.keys(count).forEach(function (key) {
				const select = count[key];
				if (!seen.has(select)) {
					selects.push(select);
					seen.add(select);
				}
			});
			return selects;
		}
		return [DEFAULT_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL];
	}
	_merge_count_maps(results, count) {
		const self = this;
		const count_has_key = count ? (Object.keys(count).length ? true : false) : false;
		const selects = self._count_selects(count);
		const merged = new Map();
		const strings = new Map();
		function initialize_select(select) {
			if (!merged.has(select)) {
				merged.set(select, 0n);
				strings.set(select, false);
			}
		}
		function merge_value(select, value) {
			const parsed = self._normalize_count_value(value);
			initialize_select(select);
			merged.set(select, merged.get(select) + parsed.value);
			strings.set(select, strings.get(select) || parsed.string);
		}
		selects.forEach(initialize_select);
		results.forEach(function (result) {
			if (count_has_key) {
				selects.forEach(function (select) {
					if (Object.hasOwn(result, select)) {
						merge_value(select, result[select]);
					}
				});
			} else {
				const keys = Object.keys(result);
				if (keys.length) {
					merge_value(DEFAULT_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL, result[keys[0]]);
				}
			}
		});
		const formatted = Object.create(null);
		merged.forEach(function (value, select) {
			formatted[select] = self._format_count_value(value, strings.get(select));
		});
		return formatted;
	}
	_merge_count_rows(rows, count) {
		const self = this;
		const count_has_key = count ? (Object.keys(count).length ? true : false) : false;
		const selects = self._count_selects(count);
		const merged = new Map();
		const strings = new Map();
		function initialize_select(select) {
			if (!merged.has(select)) {
				merged.set(select, 0n);
				strings.set(select, false);
			}
		}
		function merge_value(select, value) {
			const parsed = self._normalize_count_value(value);
			initialize_select(select);
			merged.set(select, merged.get(select) + parsed.value);
			strings.set(select, strings.get(select) || parsed.string);
		}
		selects.forEach(initialize_select);
		rows.forEach(function (row) {
			if (count_has_key) {
				if (merged.has(row.select)) {
					merge_value(row.select, row.count);
				}
			} else {
				merge_value(DEFAULT_COUNT_SELECT__CLASS__MODEL__SRC__KERNEL, row.count);
			}
		});
		return Array.from(merged).map(function ([select, value]) {
			return {
				select: select,
				count: self._format_count_value(value, strings.get(select)),
			};
		});
	}
}

class KernelModel extends Model {}

export { Model, KernelModel };
