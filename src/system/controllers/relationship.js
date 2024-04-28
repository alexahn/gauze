import * as $kernel from "./../../kernel/index.js";

import { RELATIONSHIP_MODEL_SYSTEM } from "./../models/relationship.js";

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

const RELATIONSHIP_CONTROLLER_ROOT_CONFIG = {};
const RELATIONSHIP_CONTROLLER_SYSTEM_CONFIG = {
	model: RELATIONSHIP_MODEL_SYSTEM,
	model_name: "RELATIONSHIP_MODEL_SYSTEM",
};
const RELATIONSHIP_CONTROLLER_SYSTEM = new RelationshipSystemController(RELATIONSHIP_CONTROLLER_ROOT_CONFIG, RELATIONSHIP_CONTROLLER_SYSTEM_CONFIG);

export { RELATIONSHIP_CONTROLLER_SYSTEM };
