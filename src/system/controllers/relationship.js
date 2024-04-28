import * as $kernel from "./../../kernel/index.js";

import { MODEL__RELATIONSHIP__MODEL__SYSTEM } from "./../models/relationship.js";

class RelationshipSystemController extends $kernel.controllers.system.SystemController {
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

const ROOT_CONFIG__RELATIONSHIP__CONTROLLER__SYSTEM = {};
const CONFIG__RELATIONSHIP__CONTROLLER__SYSTEM = {
	model: MODEL__RELATIONSHIP__MODEL__SYSTEM,
	model_name: "MODEL__RELATIONSHIP__MODEL__SYSTEM",
};
const CONTROLLER__RELATIONSHIP__CONTROLLER__SYSTEM = new RelationshipSystemController(ROOT_CONFIG__RELATIONSHIP__CONTROLLER__SYSTEM, CONFIG__RELATIONSHIP__CONTROLLER__SYSTEM);

export { CONTROLLER__RELATIONSHIP__CONTROLLER__SYSTEM };
