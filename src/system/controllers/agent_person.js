import * as $kernel from "./../../kernel/index.js";

import { MODEL__AGENT_PERSON__MODEL__SYSTEM } from "./../models/agent_person.js";

class AgentPersonSystemController extends $kernel.src.controllers.system.SystemController {
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

const ROOT_CONFIG__AGENT_PERSON__CONTROLLER__SYSTEM = {};
const CONFIG__AGENT_PERSON__CONTROLLER__SYSTEM = {
	model: MODEL__AGENT_PERSON__MODEL__SYSTEM,
	model_name: "MODEL__AGENT_PERSON__MODEL__SYSTEM",
};
const CONTROLLER__AGENT_PERSON__CONTROLLER__SYSTEM = new AgentPersonSystemController(ROOT_CONFIG__AGENT_PERSON__CONTROLLER__SYSTEM, CONFIG__AGENT_PERSON__CONTROLLER__SYSTEM);

export { CONTROLLER__AGENT_PERSON__CONTROLLER__SYSTEM };
