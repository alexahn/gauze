import * as $kernel from "./../../kernel/index.js";

import { MODEL__GAUZE__MODEL__DATABASE } from "./../models/gauze.js";

class GauzeDatabaseController extends $kernel.src.controllers.database.DatabaseController {
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

const ROOT_CONFIG__GAUZE__CONTROLLER__DATABASE = {};
const CONFIG__GAUZE__CONTROLLER__DATABASE = {
	model: MODEL__GAUZE__MODEL__DATABASE,
	model_name: "MODEL__GAUZE__MODEL__DATABASE",
};
const CONTROLLER__GAUZE__CONTROLLER__DATABASE = new GauzeDatabaseController(ROOT_CONFIG__GAUZE__CONTROLLER__DATABASE, CONFIG__GAUZE__CONTROLLER__DATABASE);

export { CONTROLLER__GAUZE__CONTROLLER__DATABASE };
