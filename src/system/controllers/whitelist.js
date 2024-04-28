import * as $kernel from "./../../kernel/index.js";

import { WHITELIST_MODEL_SYSTEM } from "./../models/whitelist.js";

class WhitelistSystemController extends $kernel.controllers.system.SystemController {
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

const WHITELIST_CONTROLLER_ROOT_CONFIG = {};
const WHITELIST_CONTROLLER_SYSTEM_CONFIG = {
	model: WHITELIST_MODEL_SYSTEM,
	model_name: "WHITELIST_MODEL_SYSTEM",
};
const WHITELIST_CONTROLLER_SYSTEM = new WhitelistSystemController(WHITELIST_CONTROLLER_ROOT_CONFIG, WHITELIST_CONTROLLER_SYSTEM_CONFIG);

export { WHITELIST_CONTROLLER_SYSTEM };
