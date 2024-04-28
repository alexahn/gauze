import * as $kernel from "./../../kernel/index.js";

import { cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM } from "./../models/a2b8dbc3427b41a9899e11671c2422c7.js";

class ba381b0cc764c4c9a187b716ae94ed96SystemController extends $kernel.controllers.system.SystemController {
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

const cd637bc32c364580be5cc28396d3dee8_CONTROLLER_ROOT_CONFIG = {};
const cd637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM_CONFIG = {
	model: cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM,
	model_name: "cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM",
};
const cd637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM = new ba381b0cc764c4c9a187b716ae94ed96SystemController(
	cd637bc32c364580be5cc28396d3dee8_CONTROLLER_ROOT_CONFIG,
	cd637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM_CONFIG,
);

export { cd637bc32c364580be5cc28396d3dee8_CONTROLLER_SYSTEM };
