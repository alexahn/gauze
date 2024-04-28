import * as $kernel from "./../../kernel/index.js";

import { MODEL__ENTITY1__MODEL__DATABASE } from "./../models/entity1.js";

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

const ROOT_CONFIG__ENTITY1__CONTROLLER__DATABASE = {};
const CONFIG__ENTITY1__CONTROLLER__DATABASE = {
	model: MODEL__ENTITY1__MODEL__DATABASE,
	model_name: "ENTITY1_MODEL_DATABASE",
};
const CONTROLLER__ENTITY1__CONTROLLER__DATABASE = new Entity1DatabaseController(ROOT_CONFIG__ENTITY1__CONTROLLER__DATABASE, CONFIG__ENTITY1__CONTROLLER__DATABASE);

export { CONTROLLER__ENTITY1__CONTROLLER__DATABASE };
