import * as $kernel from "./../../kernel/index.js";

import { MODEL__YTITNE__MODEL__DATABASE } from "./../models/ytitne.js";

class YtitneYtitneDatabaseController extends $kernel.src.controllers.database.DatabaseController {
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

const ROOT_CONFIG__YTITNE__CONTROLLER__DATABASE = {};
const CONFIG__YTITNE__CONTROLLER__DATABASE = {
	model: MODEL__YTITNE__MODEL__DATABASE,
	model_name: "MODEL__YTITNE__MODEL__DATABASE",
};
const CONTROLLER__YTITNE__CONTROLLER__DATABASE = new YtitneYtitneDatabaseController(ROOT_CONFIG__YTITNE__CONTROLLER__DATABASE, CONFIG__YTITNE__CONTROLLER__DATABASE);

export { CONTROLLER__YTITNE__CONTROLLER__DATABASE };
