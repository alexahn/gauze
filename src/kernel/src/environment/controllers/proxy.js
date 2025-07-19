import * as $kernel from "./../../kernel/index.js";

import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../models/proxy.js";

class ProxyEnvironmentController extends $kernel.src.controllers.environment.EnvironmentController {
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
		const { agent } = context
		if (agent) {
			if (agent.proxy_id) {
				// override query here
				// use agent.proxy_id to search for proxy.root_id
				// lock down the query here to only return proxies with root set to the current sessions proxy id
				input.where = input.where || {}
				input.where.gauze__proxy__root_id = agent.proxy_id
				return self._read(context, scope, input);
			} else {
				throw new Error("Proxy session is required to view proxies")
			}
		} else {
			throw new Error("Session is required to view proxies")
		}
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

const ROOT_CONFIG__PROXY__CONTROLLER__ENVIRONMENT = {};
const CONFIG__PROXY__CONTROLLER__ENVIRONMENT = {
	model: MODEL__PROXY__MODEL__ENVIRONMENT,
	model_name: "MODEL__PROXY__MODEL__ENVIRONMENT",
};
const CONTROLLER__PROXY__CONTROLLER__ENVIRONMENT = new ProxyEnvironmentController(ROOT_CONFIG__PROXY__CONTROLLER__ENVIRONMENT, CONFIG__PROXY__CONTROLLER__ENVIRONMENT);

// WARNING: the export here is called system so we can align with the system queries more easily

export { CONTROLLER__PROXY__CONTROLLER__ENVIRONMENT };
