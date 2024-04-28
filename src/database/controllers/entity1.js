import * as $kernel from "./../../kernel/index.js";

import { ENTITY1_MODEL_DATABASE } from "./../models/entity1.js";

class Entity1DatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ENTITY1_CONTROLLER_ROOT_CONFIG = {};
const ENTITY1_CONTROLLER_DATABASE_CONFIG = {
	model: ENTITY1_MODEL_DATABASE,
	model_name: "ENTITY1_MODEL_DATABASE",
};
const ENTITY1_CONTROLLER_DATABASE = new Entity1DatabaseController(ENTITY1_CONTROLLER_ROOT_CONFIG, ENTITY1_CONTROLLER_DATABASE_CONFIG);

export { ENTITY1_CONTROLLER_DATABASE };
