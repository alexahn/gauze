import * as $kernel from "./../../kernel/index.js";

import { MODEL__ENTITY__MODEL__DATABASE } from "./../models/entity.js";

class EntityDatabaseController extends $kernel.src.controllers.database.DatabaseController {
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

const ROOT_CONFIG__ENTITY__CONTROLLER__DATABASE = {};
const CONFIG__ENTITY__CONTROLLER__DATABASE = {
	model: MODEL__ENTITY__MODEL__DATABASE,
	model_name: "MODEL__ENTITY__MODEL__DATABASE",
};
const CONTROLLER__ENTITY__CONTROLLER__DATABASE = new EntityDatabaseController(ROOT_CONFIG__ENTITY__CONTROLLER__DATABASE, CONFIG__ENTITY__CONTROLLER__DATABASE);

export { CONTROLLER__ENTITY__CONTROLLER__DATABASE };
