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
		const { user, source, database, transaction } = context;
		const model_context = {
			source,
			database,
			transaction,
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
		const { user, source, database, transaction } = context;
		const model_context = {
			source,
			database,
			transaction,
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
		const { user, source, database, transaction } = context;
		const model_context = {
			source,
			database,
			transaction,
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
		const { user, source, database, transaction } = context;
		const model_context = {
			source,
			database,
			transaction,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.delete:enter`, "input", input);
		return self.model.delete(model_context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row, "delete");
			});
		});
	}
}

// todo: authorization, rate limiting, etc
// input model is a system model
class SystemModelSystemController extends Controller {
	constructor(config, model) {
		super(config);
		this.model = model;
		this.name = this.___name();
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.constructor:exit`);
	}
	___name() {
		return `[${this.model.name}]${this.constructor.name}`;
	}
	create({ user, source, database, transaction }, input) {
		const self = this;
		const context = {
			source,
			database,
			transaction,
		};
		LOGGER__IO__LOGGER__KERNEL.write("0", __RELATIVE_FILEPATH, `${this.name}.create:enter`, "input", input);
		return this.model.create(context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row, "create");
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
				return self.model.deserialize(row, "read");
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
		return this.model.update(context, input).then(function (rows) {
			return rows.map(function (row) {
				return self.model.deserialize(row, "update");
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
				return self.model.deserialize(row, "delete");
			});
		});
	}
}

export { SystemController, SystemModelSystemController };
