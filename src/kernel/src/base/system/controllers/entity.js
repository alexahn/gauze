import * as $kernel from "./../../kernel/index.js";

import { MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM } from "./../models/a2b8dbc3427b41a9899e11671c2422c7.js";

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

const ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM = {};
const CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM = {
	model: MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM,
	model_name: "MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM",
};
const CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM = new ba381b0cc764c4c9a187b716ae94ed96SystemController(
	ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM,
	CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM,
);

export { CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__SYSTEM };
