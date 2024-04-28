import * as $kernel from "./../../kernel/index.js";

import { ENTITY2_MODEL_SYSTEM } from "./../models/entity2.js";

class Entity2SystemController extends $kernel.controllers.system.SystemController {
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

const ENTITY2_CONTROLLER_ROOT_CONFIG = {};
const ENTITY2_CONTROLLER_SYSTEM_CONFIG = {
	model: ENTITY2_MODEL_SYSTEM,
	model_name: "ENTITY2_MODEL_SYSTEM",
};
const ENTITY2_CONTROLLER_SYSTEM = new Entity2SystemController(ENTITY2_CONTROLLER_ROOT_CONFIG, ENTITY2_CONTROLLER_SYSTEM_CONFIG);

export { ENTITY2_CONTROLLER_SYSTEM };
