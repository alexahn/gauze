import * as $kernel from "./../../kernel/index.js";

import { MODEL__GAUZE__MODEL__SYSTEM } from "./../models/gauze.js";

class GauzeSystemController extends $kernel.controllers.system.SystemController {
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

const ROOT_CONFIG__GAUZE__CONTROLLER__SYSTEM = {};
const CONFIG__GAUZE__CONTROLLER__SYSTEM = {
	model: MODEL__GAUZE__MODEL__SYSTEM,
	model_name: "MODEL__GAUZE__MODEL__SYSTEM",
};
const CONTROLLER__GAUZE__CONTROLLER__SYSTEM = new GauzeSystemController(ROOT_CONFIG__GAUZE__CONTROLLER__SYSTEM, CONFIG__GAUZE__CONTROLLER__SYSTEM);

export { CONTROLLER__GAUZE__CONTROLLER__SYSTEM };
