import url from "url";
import path from "path";
const __FILEPATH = url.fileURLToPath(import.meta.url);
const __RELATIVE_FILEPATH = path.relative(process.cwd(), __FILEPATH);

import { Controller } from "./class.js";

import { LOGGER__IO__LOGGER__KERNEL } from "./../logger/io.js";

class SystemController extends Controller {
	constructor(root_config, system_config) {
		super(root_config);
		const self = this;
		const { model, model_name } = system_config;
		self.model = model;
		self.model_name = model_name;
		self.name = this.__name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${self.name}.constructor.exit`);
	}
	static _class_name(model_name) {
		return model_name ? `(${model_name})[${super._class_name()}]SystemController` : `[${super._class_name()}]SystemController`;
	}
	__name() {
		const self = this;
		return SystemController._class_name(self.model_name);
	}
	_create(context, input) {
		const self = this;
		const { user, source, database, transaction, agent_id } = context;
		const model_context = {
			source,
			database,
			transaction,
			agent_id,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.create:enter`, "input", input);
		return self.model.create(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row, "create");
			});
		});
	}
	_read(context, input) {
		const self = this;
		const { user, source, database, transaction, agent_id } = context;
		const model_context = {
			source,
			database,
			transaction,
			agent_id,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.read:enter`, "input", input);
		return self.model.read(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row, "read");
			});
		});
	}
	_update(context, input) {
		const self = this;
		const { user, source, database, transaction, agent_id } = context;
		const model_context = {
			source,
			database,
			transaction,
			agent_id,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.update:enter`, "input", input);
		return self.model.update(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row, "update");
			});
		});
	}
	_delete(context, input) {
		const self = this;
		const { user, source, database, transaction, agent_id } = context;
		const model_context = {
			source,
			database,
			transaction,
			agent_id,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.delete:enter`, "input", input);
		return self.model.delete(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row, "delete");
			});
		});
	}
}

export { SystemController };
