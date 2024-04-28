import * as $kernel from "./../../kernel/index.js";

import { MODEL__YTITNE__MODEL__SYSTEM } from "./../models/ytitne.js";

class YtitneSystemController extends $kernel.controllers.system.SystemController {
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

const ROOT_CONFIG__YTITNE__CONTROLLER__SYSTEM = {};
const CONFIG__YTITNE__CONTROLLER__SYSTEM = {
	model: MODEL__YTITNE__MODEL__SYSTEM,
	model_name: "MODEL__YTITNE__MODEL__SYSTEM",
};
const CONTROLLER__YTITNE__CONTROLLER__SYSTEM = new YtitneSystemController(ROOT_CONFIG__YTITNE__CONTROLLER__SYSTEM, CONFIG__YTITNE__CONTROLLER__SYSTEM);

export { CONTROLLER__YTITNE__CONTROLLER__SYSTEM };
