import path from "path";
const __RELATIVE_FILEPATH = path.relative(process.cwd(), import.meta.filename);

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
	_create(context, scope, input) {
		const self = this;
		const { agent } = context;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.create:enter`, "input", input);
		return self.model.create(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "create");
				row = self.model.agent_filter(agent, row);
				return row;
			});
		});
	}
	_read(context, scope, input) {
		const self = this;
		const { agent } = context;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.read:enter`, "input", input);
		return self.model.read(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "read");
				row = self.model.agent_filter(agent, row);
				return row;
			});
		});
	}
	_update(context, scope, input) {
		const self = this;
		const { agent } = context;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.update:enter`, "input", input);
		return self.model.update(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "update");
				row = self.model.agent_filter(agent, row);
				return row;
			});
		});
	}
	_delete(context, scope, input) {
		const self = this;
		const { agent } = context;
		const model_scope = {
			source: scope.source,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.delete:enter`, "input", input);
		return self.model.delete(context, model_scope, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "delete");
				row = self.model.agent_filter(agent, row);
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
		return self.model.count(context, model_scope, input);
	}
}

export { SystemController };
