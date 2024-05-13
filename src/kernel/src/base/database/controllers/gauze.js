import * as $kernel from "./../../kernel/index.js";

import { MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE } from "./../models/a543731262804f64adcc0eae1a225acc.js";

class dd6fb00f485c4397add38780939d6923DatabaseController extends $kernel.controllers.database.DatabaseController {
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
	count(context, input) {
		const self = this;
		return self._count(context, input);
	}
}

const ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE = {};
const CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE = {
	model: MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE,
	model_name: "MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE",
};
const CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE = new dd6fb00f485c4397add38780939d6923DatabaseController(
	ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE,
	CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE,
);

export { CONTROLLER__caf5342ac38d41a6a02bb81d2d2b21a4__CONTROLLER__DATABASE };
