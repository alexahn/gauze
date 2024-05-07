import * as $kernel from "./../../kernel/index.js";

import { MODEL__SESSION__MODEL__DATABASE } from "./../models/session.js";

class SessionDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ROOT_CONFIG__SESSION__CONTROLLER__DATABASE = {};
const CONFIG__SESSION__CONTROLLER__DATABASE = {
	model: MODEL__SESSION__MODEL__DATABASE,
	model_name: "MODEL__SESSION__MODEL__DATABASE",
};
const CONTROLLER__SESSION__CONTROLLER__DATABASE = new SessionDatabaseController(ROOT_CONFIG__SESSION__CONTROLLER__DATABASE, CONFIG__SESSION__CONTROLLER__DATABASE);

export { CONTROLLER__SESSION__CONTROLLER__DATABASE };
