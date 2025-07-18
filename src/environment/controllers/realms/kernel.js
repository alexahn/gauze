import * as $abstract from "./../../../abstract/index.js";

import { SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT, SIGN_KERNEL_JWT__AUTHENTICATION__ENVIRONMENT } from "./../../authentication.js";

import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../../models/session.js";
import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../../models/proxy.js";

import { ENTER_SESSION__REALM__ENVIRONMENT, EXIT_SESSION__REALM__ENVIRONMENT } from "./../../realms.js";

class RealmKernelController {
	constructor() {
		const self = this;
		self.proxy_type = $abstract.entities.proxy.default($abstract).table_name;
		self.session_type = $abstract.entities.session.default($abstract).table_name;
	}
	enter_session(context, scope, parameters) {
		// use realm helper function here
		const self = this;
		const dependencies = {
			proxy_type: self.proxy_type,
			session_type: self.session_type,
			proxy_model: MODEL__PROXY__MODEL__ENVIRONMENT,
			session_model: MODEL__SESSION__MODEL__ENVIRONMENT,
			realm: "kernel",
			sign_jwt: SIGN_KERNEL_JWT__AUTHENTICATION__ENVIRONMENT,
		};
		return ENTER_SESSION__REALM__ENVIRONMENT(dependencies, context, scope, parameters);
	}
	exit_session(context, scope, parameters) {
		// use realm helper function here
		const self = this;
		const dependencies = {
			proxy_type: self.proxy_type,
			session_type: self.session_type,
			proxy_model: MODEL__PROXY__MODEL__ENVIRONMENT,
			session_model: MODEL__SESSION__MODEL__ENVIRONMENT,
			realm: "kernel",
		};
		return EXIT_SESSION__REALM__ENVIRONMENT(dependencies, context, scope, parameters);
	}
}

const CONTROLLER__KERNEL__REALM__CONTROLLER__ENVIRONMENT = new RealmKernelController();

export { CONTROLLER__KERNEL__REALM__CONTROLLER__ENVIRONMENT };
