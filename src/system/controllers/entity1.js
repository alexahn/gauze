import * as $kernel from "./../../kernel/index.js";

import { ENTITY1_MODEL_SYSTEM } from "./../models/entity1.js";

class Entity1SystemController extends $kernel.controllers.system.SystemController {
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

const ENTITY1_CONTROLLER_ROOT_CONFIG = {};
const ENTITY1_CONTROLLER_SYSTEM_CONFIG = {
	model: ENTITY1_MODEL_SYSTEM,
	model_name: "ENTITY1_MODEL_SYSTEM",
};
const ENTITY1_CONTROLLER_SYSTEM = new Entity1SystemController(ENTITY1_CONTROLLER_ROOT_CONFIG, ENTITY1_CONTROLLER_SYSTEM_CONFIG);

export { ENTITY1_CONTROLLER_SYSTEM };
