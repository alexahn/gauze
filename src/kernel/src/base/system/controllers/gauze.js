import * as $kernel from "./../../kernel/index.js";

import { caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM } from "./../models/a543731262804f64adcc0eae1a225acc.js";

class bb95d174a16f4ddd935ff3a802f7c7bcSystemController extends $kernel.controllers.system.SystemController {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, input) {
		const self = this;
		return self._create(context, input);
	}
	read(context, input) {
		const self = this;
		return self._read(context, input);
	}
	update(context, input) {
		const self = this;
		return self._update(context, input);
	}
	delete(context, input) {
		const self = this;
		return self._delete(context, input);
	}
}

const caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_ROOT_CONFIG = {};
const caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM_CONFIG = {
	model: caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM,
	model_name: "caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM",
};
const caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM = new bb95d174a16f4ddd935ff3a802f7c7bcSystemController(
	caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_ROOT_CONFIG,
	caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM_CONFIG,
);

export { caf5342ac38d41a6a02bb81d2d2b21a4_CONTROLLER_SYSTEM };
