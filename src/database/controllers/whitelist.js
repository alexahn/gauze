import * as $kernel from "./../../kernel/index.js";

import { WHITELIST_MODEL_DATABASE } from "./../models/whitelist.js";

class WhitelistDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const WHITELIST_CONTROLLER_ROOT_CONFIG = {};
const WHITELIST_CONTROLLER_DATABASE_CONFIG = {
	model: WHITELIST_MODEL_DATABASE,
	model_name: "WHITELIST_MODEL_DATABASE",
};
const WHITELIST_CONTROLLER_DATABASE = new WhitelistDatabaseController(WHITELIST_CONTROLLER_ROOT_CONFIG, WHITELIST_CONTROLLER_DATABASE_CONFIG);

export { WHITELIST_CONTROLLER_DATABASE };
