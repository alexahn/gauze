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
	_create(context, input) {
		const self = this;
		const { source, project, database, transaction, agent } = context;
		const model_context = {
			source,
			project,
			database,
			transaction,
			agent,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.create:enter`, "input", input);
		return self.model.create(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "create");
				row = self.model.agent_filter(agent, row);
				return row;
			});
		});
	}
	_read(context, input) {
		const self = this;
		const { source, project, database, transaction, agent } = context;
		const model_context = {
			source,
			project,
			database,
			transaction,
			agent,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.read:enter`, "input", input);
		return self.model.read(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "read");
				row = self.model.agent_filter(agent, row);
				return row;
			});
		});
	}
	_update(context, input) {
		const self = this;
		const { source, project, database, transaction, agent } = context;
		const model_context = {
			source,
			project,
			database,
			transaction,
			agent,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.update:enter`, "input", input);
		return self.model.update(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "update");
				row = self.model.agent_filter(agent, row);
				return row;
			});
		});
	}
	_delete(context, input) {
		const self = this;
		const { source, project, database, transaction, agent } = context;
		const model_context = {
			source,
			project,
			database,
			transaction,
			agent,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.delete:enter`, "input", input);
		return self.model.delete(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				row = self.model.deserialize(row, "delete");
				row = self.model.agent_filter(agent, row);
				return row;
			});
		});
	}
	_count(context, input) {
		const self = this;
		const { source, project, database, transaction, agent } = context;
		const model_context = {
			source,
			project,
			database,
			transaction,
			agent,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.count:enter`, "input", input);
		return self.model.count(model_context, input);
	}
}

export { SystemController };
