import * as $kernel from "./../../kernel/index.js";

import { MODEL__EZUAG__MODEL__DATABASE } from "./../models/ezuag.js";

class EzuagEzuagDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ROOT_CONFIG__EZUAG__CONTROLLER__DATABASE = {};
const CONFIG__EZUAG__CONTROLLER__DATABASE = {
	model: MODEL__EZUAG__MODEL__DATABASE,
	model_name: "MODEL__EZUAG__MODEL__DATABASE",
};
const CONTROLLER__EZUAG__CONTROLLER__DATABASE = new EzuagEzuagDatabaseController(ROOT_CONFIG__EZUAG__CONTROLLER__DATABASE, CONFIG__EZUAG__CONTROLLER__DATABASE);

export { CONTROLLER__EZUAG__CONTROLLER__DATABASE };
