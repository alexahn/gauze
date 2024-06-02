import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

import { Controller } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

class DatabaseController extends Controller {
	constructor(root_config, database_config) {
		super(root_config);
		const self = this;
		const { model, model_name } = database_config;
		self.model = model;
		self.model_name = model_name;
		self.name = this.__name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	static _class_name(model_name) {
		return model_name ? `(${model_name})[${super._class_name()}]DatabaseController` : `[${super._class_name()}]DatabaseController`;
	}
	__name() {
		const self = this;
		return DatabaseController._class_name(self.model_name);
	}
	_create(context, scope, input) {
		const self = this;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.create:enter`, "input", input);
		input.attributes = self.model.pre_serialize_middleware(input.attributes || {}, "create");
		input.attributes = self.model.serialize(input.attributes || {}, "create");
		input.attributes = self.model.post_serialize_middleware(input.attributes || {}, "create");
		return self.model.create(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "create");
				row = self.model.deserialize(row, "create");
				row = self.model.post_deserialize_middleware(row, "create");
				return row;
			});
		});
	}
	_read(context, scope, input) {
		const self = this;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.read:enter`, "input", input);
		// todo: run serializers and middleware through where_in and where_not_in
		input.where = self.model.pre_serialize_middleware(input.where || {}, "read");
		input.where = self.model.serialize(input.where || {}, "read");
		input.where = self.model.post_serialize_middleware(input.where || {}, "read");
		if (input.where_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		if (input.where_not_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		return self.model.read(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "read");
				row = self.model.deserialize(row, "read");
				row = self.model.post_deserialize_middleware(row, "read");
				return row;
			});
		});
	}
	_update(context, scope, input) {
		const self = this;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.update:enter`, "input", input);
		input.attributes = self.model.pre_serialize_middleware(input.attributes || {}, "update");
		input.attributes = self.model.serialize(input.attributes || {}, "update");
		input.attributes = self.model.post_serialize_middleware(input.attributes || {}, "update");
		input.where = self.model.pre_serialize_middleware(input.where || {}, "read");
		input.where = self.model.serialize(input.where || {}, "read");
		input.where = self.model.post_serialize_middleware(input.where || {}, "read");
		if (input.where_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		if (input.where_not_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		return self.model.update(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "update");
				row = self.model.deserialize(row, "update");
				row = self.model.post_deserialize_middleware(row, "update");
				return row;
			});
		});
	}
	_delete(context, scope, input) {
		const self = this;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.delete:enter`, "input", input);
		input.where = self.model.pre_serialize_middleware(input.where || {}, "read");
		input.where = self.model.serialize(input.where || {}, "read");
		input.where = self.model.post_serialize_middleware(input.where || {}, "read");
		if (input.where_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		if (input.where_not_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		return self.model.delete(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "delete");
				row = self.model.deserialize(row, "delete");
				row = self.model.post_deserialize_middleware(row, "delete");
				return row;
			});
		});
	}
	_count(context, scope, input) {
		const self = this;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.count:enter`, "input", input);
		input.where = self.model.pre_serialize_middleware(input.where, "read");
		input.where = self.model.serialize(input.where, "read");
		input.where = self.model.post_serialize_middleware(input.where, "read");
		if (input.where_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_in[field] = input.where_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		if (input.where_not_in) {
			Object.keys(input.where_in).forEach(function (field) {
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.pre_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
				input.where_not_in[field] = input.where_not_in[field].map(function (value, index) {
					return self.model.post_serialize_middleware(
						{
							[field]: value,
						},
						"read",
					);
				});
			});
		}
		return self.model.count(context, scope, input).then(function (results) {
			const counts = Object.keys(results).map(function (key) {
				return {
					select: key,
					count: results[key],
				};
			});
			return counts;
		});
	}
}

export { DatabaseController };
