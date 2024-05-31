import * as $kernel from "./../../kernel/index.js";

import { MODEL__BLACKLIST__MODEL__SYSTEM } from "./../models/blacklist.js";

class BlacklistSystemController extends $kernel.controllers.system.SystemController {
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

const ROOT_CONFIG__BLACKLIST__CONTROLLER__SYSTEM = {};
const CONFIG__BLACKLIST__CONTROLLER__SYSTEM = {
	model: MODEL__BLACKLIST__MODEL__SYSTEM,
	model_name: "MODEL__BLACKLIST__MODEL__SYSTEM",
};
const CONTROLLER__BLACKLIST__CONTROLLER__SYSTEM = new BlacklistSystemController(ROOT_CONFIG__BLACKLIST__CONTROLLER__SYSTEM, CONFIG__BLACKLIST__CONTROLLER__SYSTEM);

export { CONTROLLER__BLACKLIST__CONTROLLER__SYSTEM };
