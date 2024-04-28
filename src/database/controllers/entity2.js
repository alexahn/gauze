import * as $kernel from "./../../kernel/index.js";

import { ENTITY2_MODEL_DATABASE } from "./../models/entity2.js";

class Entity2DatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ENTITY2_CONTROLLER_ROOT_CONFIG = {};
const ENTITY2_CONTROLLER_DATABASE_CONFIG = {
	model: ENTITY2_MODEL_DATABASE,
	model_name: "ENTITY2_MODEL_DATABASE",
};
const ENTITY2_CONTROLLER_DATABASE = new Entity2DatabaseController(ENTITY2_CONTROLLER_ROOT_CONFIG, ENTITY2_CONTROLLER_DATABASE_CONFIG);

export { ENTITY2_CONTROLLER_DATABASE };
