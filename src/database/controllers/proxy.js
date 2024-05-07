import * as $kernel from "./../../kernel/index.js";

import { MODEL__PROXY__MODEL__DATABASE } from "./../models/proxy.js";

class ProxyDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ROOT_CONFIG__PROXY__CONTROLLER__DATABASE = {};
const CONFIG__PROXY__CONTROLLER__DATABASE = {
	model: MODEL__PROXY__MODEL__DATABASE,
	model_name: "MODEL__PROXY__MODEL__DATABASE",
};
const CONTROLLER__PROXY__CONTROLLER__DATABASE = new ProxyDatabaseController(ROOT_CONFIG__PROXY__CONTROLLER__DATABASE, CONFIG__PROXY__CONTROLLER__DATABASE);

export { CONTROLLER__PROXY__CONTROLLER__DATABASE };
