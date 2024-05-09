import * as $kernel from "./../../kernel/index.js";

import { MODEL__YTITNE__MODEL__DATABASE } from "./../models/ytitne.js";

class YtitneYtitneDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ROOT_CONFIG__YTITNE__CONTROLLER__DATABASE = {};
const CONFIG__YTITNE__CONTROLLER__DATABASE = {
	model: MODEL__YTITNE__MODEL__DATABASE,
	model_name: "MODEL__YTITNE__MODEL__DATABASE",
};
const CONTROLLER__YTITNE__CONTROLLER__DATABASE = new YtitneYtitneDatabaseController(ROOT_CONFIG__YTITNE__CONTROLLER__DATABASE, CONFIG__YTITNE__CONTROLLER__DATABASE);

export { CONTROLLER__YTITNE__CONTROLLER__DATABASE };
