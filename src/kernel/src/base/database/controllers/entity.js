import * as $kernel from "./../../kernel/index.js";

import { MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE } from "./../models/a2b8dbc3427b41a9899e11671c2422c7.js";

class ba381b0cc764c4c9a187b716ae94ed96DatabaseController extends $kernel.src.controllers.database.DatabaseController {
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

const ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE = {};
const CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE = {
	model: MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE,
	model_name: "MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__DATABASE",
};
const CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE = new ba381b0cc764c4c9a187b716ae94ed96DatabaseController(
	ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE,
	CONFIG__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE,
);

export { CONTROLLER__cd637bc32c364580be5cc28396d3dee8__CONTROLLER__DATABASE };
