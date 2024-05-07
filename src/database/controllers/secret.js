import * as $kernel from "./../../kernel/index.js";

import { MODEL__SECRET__MODEL__DATABASE } from "./../models/secret.js";

class SecretDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ROOT_CONFIG__SECRET__CONTROLLER__DATABASE = {};
const CONFIG__SECRET__CONTROLLER__DATABASE = {
	model: MODEL__SECRET__MODEL__DATABASE,
	model_name: "MODEL__SECRET__MODEL__DATABASE",
};
const CONTROLLER__SECRET__CONTROLLER__DATABASE = new SecretDatabaseController(ROOT_CONFIG__SECRET__CONTROLLER__DATABASE, CONFIG__SECRET__CONTROLLER__DATABASE);

export { CONTROLLER__SECRET__CONTROLLER__DATABASE };
