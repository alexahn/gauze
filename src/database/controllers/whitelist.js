import * as $kernel from "./../../kernel/index.js";

import { MODEL__WHITELIST__MODEL__DATABASE } from "./../models/whitelist.js";

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

const ROOT_CONFIG__WHITELIST__CONTROLLER__DATABASE = {};
const CONFIG__WHITELIST__CONTROLLER__DATABASE = {
	model: MODEL__WHITELIST__MODEL__DATABASE,
	model_name: "WHITELIST_MODEL_DATABASE",
};
const CONTROLLER__WHITELIST__CONTROLLER__DATABASE = new WhitelistDatabaseController(ROOT_CONFIG__WHITELIST__CONTROLLER__DATABASE, CONFIG__WHITELIST__CONTROLLER__DATABASE);

export { CONTROLLER__WHITELIST__CONTROLLER__DATABASE };
