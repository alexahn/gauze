import * as $kernel from "./../../kernel/index.js";

import { MODEL__ENTITY2__MODEL__DATABASE } from "./../models/entity2.js";

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

const ROOT_CONFIG__ENTITY2__CONTROLLER__DATABASE = {};
const CONFIG__ENTITY2__CONTROLLER__DATABASE = {
	model: MODEL__ENTITY2__MODEL__DATABASE,
	model_name: "MODEL__ENTITY2__MODEL__DATABASE",
};
const CONTROLLER__ENTITY2__CONTROLLER__DATABASE = new Entity2DatabaseController(ROOT_CONFIG__ENTITY2__CONTROLLER__DATABASE, CONFIG__ENTITY2__CONTROLLER__DATABASE);

export { CONTROLLER__ENTITY2__CONTROLLER__DATABASE };
