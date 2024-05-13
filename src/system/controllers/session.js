import * as $kernel from "./../../kernel/index.js";

import { MODEL__SESSION__MODEL__SYSTEM } from "./../models/session.js";

class SessionSystemController extends $kernel.controllers.system.SystemController {
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
	count(context, input) {
		const self = this;
		return self._count(context, input);
	}
}

const ROOT_CONFIG__SESSION__CONTROLLER__SYSTEM = {};
const CONFIG__SESSION__CONTROLLER__SYSTEM = {
	model: MODEL__SESSION__MODEL__SYSTEM,
	model_name: "MODEL__SESSION__MODEL__SYSTEM",
};
const CONTROLLER__SESSION__CONTROLLER__SYSTEM = new SessionSystemController(ROOT_CONFIG__SESSION__CONTROLLER__SYSTEM, CONFIG__SESSION__CONTROLLER__SYSTEM);

export { CONTROLLER__SESSION__CONTROLLER__SYSTEM };
