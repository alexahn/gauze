import * as $kernel from "./../../kernel/index.js";

import { MODEL__AGENT_ACCOUNT__MODEL__DATABASE } from "./../models/agent_account.js";

class AgentAccountDatabaseController extends $kernel.controllers.database.DatabaseController {
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

const ROOT_CONFIG__AGENT_ACCOUNT__CONTROLLER__DATABASE = {};
const CONFIG__AGENT_ACCOUNT__CONTROLLER__DATABASE = {
	model: MODEL__AGENT_ACCOUNT__MODEL__DATABASE,
	model_name: "MODEL__AGENT_ACCOUNT__MODEL__DATABASE",
};
const CONTROLLER__AGENT_ACCOUNT__CONTROLLER__DATABASE = new AgentAccountDatabaseController(ROOT_CONFIG__AGENT_ACCOUNT__CONTROLLER__DATABASE, CONFIG__AGENT_ACCOUNT__CONTROLLER__DATABASE);

export { CONTROLLER__AGENT_ACCOUNT__CONTROLLER__DATABASE };
