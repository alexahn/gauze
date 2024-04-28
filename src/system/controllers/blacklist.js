import * as $kernel from "./../../kernel/index.js";

import { BLACKLIST_MODEL_SYSTEM } from "./../models/blacklist.js";

class BlacklistSystemController extends $kernel.controllers.system.SystemController {
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

const BLACKLIST_CONTROLLER_ROOT_CONFIG = {};
const BLACKLIST_CONTROLLER_SYSTEM_CONFIG = {
	model: BLACKLIST_MODEL_SYSTEM,
	model_name: "BLACKLIST_MODEL_SYSTEM",
};
const BLACKLIST_CONTROLLER_SYSTEM = new BlacklistSystemController(BLACKLIST_CONTROLLER_ROOT_CONFIG, BLACKLIST_CONTROLLER_SYSTEM_CONFIG);

export { BLACKLIST_CONTROLLER_SYSTEM };
