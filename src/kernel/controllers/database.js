import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { Controller } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

class DatabaseController extends Controller {
	constructor(root_config, database_config) {
		super(root_config);
		const self = this;
		const { model, model_name } = database_config;
		this.model = model;
		this.model_name = model_name;
		this.name = this.__name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	static _class_name(model_name) {
		return model_name ? `(${model_name})[${super._class_name()}]DatabaseController` : `[${super._class_name()}]DatabaseController`;
	}
	__name() {
		const self = this;
		return DatabaseController._class_name(self.model_name);
	}
	create({ user, source, database, transaction }, input) {
		const self = this;
		const context = {
			source,
			database,
			transaction,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.create:enter`, "input", input);
		input.attributes = self.model.pre_serialize_middleware(input.attributes, "create");
		input.attributes = self.model.serialize(input.attributes, "create");
		input.attributes = self.model.post_serialize_middleware(input.attributes, "create");
		return self.model.create(context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "create");
				row = self.model.deserialize(row, "create");
				row = self.model.post_deserialize_middleware(row, "create");
				return row;
			});
		});
	}
	read({ user, source, database, transaction }, input) {
		const self = this;
		const context = {
			source,
			database,
			transaction,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.read:enter`, "input", input);
		return this.model.read(context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "read");
				row = self.model.deserialize(row, "read");
				row = self.model.post_deserialize_middleware(row, "read");
				return row;
			});
		});
	}
	update({ user, source, database, transaction }, input) {
		const self = this;
		const context = {
			source,
			database,
			transaction,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.update:enter`, "input", input);
		//input.attributes = self.model.serialize(input.attributes, "update");
		input.attributes = self.model.pre_serialize_middleware(input.attributes, "update");
		input.attributes = self.model.serialize(input.attributes, "update");
		input.attributes = self.model.post_serialize_middleware(input.attributes, "update");
		return self.model.update(context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "update");
				row = self.model.deserialize(row, "update");
				row = self.model.post_deserialize_middleware(row, "update");
				return row;
			});
		});
	}
	delete({ user, source, database, transaction }, input) {
		const self = this;
		const context = {
			source,
			database,
			transaction,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.delete:enter`, "input", input);
		return this.model.delete(context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.pre_deserialize_middleware(row, "delete");
				row = self.model.deserialize(row, "delete");
				row = self.model.post_deserialize_middleware(row, "delete");
				return row;
			});
		});
	}
}

export { DatabaseController };
