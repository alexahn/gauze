import * as $kernel from "./../../kernel/index.js";

import { MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM } from "./../models/a543731262804f64adcc0eae1a225acc.js";

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

const ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM = {};
const CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM = {
	model: MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM,
	model_name: "MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM",
};
const CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM = new bb95d174a16f4ddd935ff3a802f7c7bcSystemController(
	ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM,
	CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM,
);

export { CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__SYSTEM };
