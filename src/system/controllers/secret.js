import * as $kernel from "./../../kernel/index.js";

import { MODEL__SECRET__MODEL__SYSTEM } from "./../models/secret.js";

class SecretSystemController extends $kernel.controllers.system.SystemController {
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

const ROOT_CONFIG__SECRET__CONTROLLER__SYSTEM = {};
const CONFIG__SECRET__CONTROLLER__SYSTEM = {
	model: MODEL__SECRET__MODEL__SYSTEM,
	model_name: "MODEL__SECRET__MODEL__SYSTEM",
};
const CONTROLLER__SECRET__CONTROLLER__SYSTEM = new SecretSystemController(ROOT_CONFIG__SECRET__CONTROLLER__SYSTEM, CONFIG__SECRET__CONTROLLER__SYSTEM);

export { CONTROLLER__SECRET__CONTROLLER__SYSTEM };
