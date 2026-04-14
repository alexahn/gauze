import * as $kernel from "./../../kernel/index.js";

import { MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM } from "./../models/a543731262804f64adcc0eae1a225acc.js";

class dd6fb00f485c4397add38780939d6923SystemController extends $kernel.src.controllers.system.SystemController {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, scope, input) {
		const self = this;
		return self._create(context, scope, input);
	}
	read(context, scope, input) {
		const self = this;
		return self._read(context, scope, input);
	}
	update(context, scope, input) {
		const self = this;
		return self._update(context, scope, input);
	}
	delete(context, scope, input) {
		const self = this;
		return self._delete(context, scope, input);
	}
	count(context, scope, input) {
		const self = this;
		return self._count(context, scope, input);
	}
}

const ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM = {};
const CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM = {
	model: MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM,
	model_name: "MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM",
};
const CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM = new dd6fb00f485c4397add38780939d6923SystemController(
	ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM,
	CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM,
);

export { CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM };
