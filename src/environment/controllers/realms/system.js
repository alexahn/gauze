import * as $abstract from "./../../../abstract/index.js";

import { SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT, SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT } from "./../../authentication.js";

import { MODEL__RELATIONSHIP__MODEL__ENVIRONMENT } from "./../../models/relationship.js";

//import { MODEL__SECRET__MODEL__ENVIRONMENT } from "./../../models/secret.js";
import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../../models/session.js";
import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../../models/proxy.js";

import { ENTER_SESSION__REALM__ENVIRONMENT, EXIT_SESSION__REALM__ENVIRONMENT } from "./../../realms.js";

class RealmSystemController {
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
			relationship_model: MODEL__RELATIONSHIP__MODEL__ENVIRONMENT,
			realm: "system",
			sign_jwt: SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT,
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
			relationship_model: MODEL__RELATIONSHIP__MODEL__ENVIRONMENT,
			realm: "system",
		};
		return EXIT_SESSION__REALM__ENVIRONMENT(dependencies, context, scope, parameters);
	}
}

const CONTROLLER__SYSTEM__REALM__CONTROLLER__ENVIRONMENT = new RealmSystemController();

export { CONTROLLER__SYSTEM__REALM__CONTROLLER__ENVIRONMENT };
