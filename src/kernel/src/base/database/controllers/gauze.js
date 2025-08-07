import * as $kernel from "./../../kernel/index.js";

import { MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE } from "./../models/a543731262804f64adcc0eae1a225acc.js";

class bb95d174a16f4ddd935ff3a802f7c7bcDatabaseController extends $kernel.src.controllers.database.DatabaseController {
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

const ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE = {};
const CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE = {
	model: MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE,
	model_name: "MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE",
};
const CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE = new bb95d174a16f4ddd935ff3a802f7c7bcDatabaseController(
	ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE,
	CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE,
);

export { CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE };
