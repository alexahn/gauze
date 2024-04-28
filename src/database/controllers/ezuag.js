import * as $kernel from "./../../kernel/index.js";

import { EZUAG_MODEL_DATABASE } from "./../models/ezuag.js";

class EzuagDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const EZUAG_CONTROLLER_ROOT_CONFIG = {};
const EZUAG_CONTROLLER_DATABASE_CONFIG = {
	model: EZUAG_MODEL_DATABASE,
	model_name: "EZUAG_MODEL_DATABASE",
};
const EZUAG_CONTROLLER_DATABASE = new EzuagDatabaseController(EZUAG_CONTROLLER_ROOT_CONFIG, EZUAG_CONTROLLER_DATABASE_CONFIG);

export { EZUAG_CONTROLLER_DATABASE };
