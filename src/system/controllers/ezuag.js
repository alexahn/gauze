import * as $kernel from "./../../kernel/index.js";

import { EZUAG_MODEL_SYSTEM } from "./../models/ezuag.js";

class EzuagSystemController extends $kernel.controllers.system.SystemController {
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

const EZUAG_CONTROLLER_ROOT_CONFIG = {};
const EZUAG_CONTROLLER_SYSTEM_CONFIG = {
	model: EZUAG_MODEL_SYSTEM,
	model_name: "EZUAG_MODEL_SYSTEM",
};
const EZUAG_CONTROLLER_SYSTEM = new EzuagSystemController(EZUAG_CONTROLLER_ROOT_CONFIG, EZUAG_CONTROLLER_SYSTEM_CONFIG);

export { EZUAG_CONTROLLER_SYSTEM };
