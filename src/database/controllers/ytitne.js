import * as $kernel from "./../../kernel/index.js";

import { YTITNE_MODEL_DATABASE } from "./../models/ytitne.js";

class YtitneDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const YTITNE_CONTROLLER_ROOT_CONFIG = {};
const YTITNE_CONTROLLER_DATABASE_CONFIG = {
	model: YTITNE_MODEL_DATABASE,
	model_name: "YTITNE_MODEL_DATABASE",
};
const YTITNE_CONTROLLER_DATABASE = new YtitneDatabaseController(YTITNE_CONTROLLER_ROOT_CONFIG, YTITNE_CONTROLLER_DATABASE_CONFIG);

export { YTITNE_CONTROLLER_DATABASE };
