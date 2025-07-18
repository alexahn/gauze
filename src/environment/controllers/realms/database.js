import { HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT, SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT, SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT } from "./../../authentication.js";

import { MODEL__RELATIONSHIP__MODEL__ENVIRONMENT } from "./../../models/relationship.js";

import { MODEL__SECRET__MODEL__ENVIRONMENT } from "./../../models/secret.js";
import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../../models/session.js";
import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../../models/proxy.js";

import { ENTER_SESSION__REALM__ENVIRONMENT, EXIT_SESSION__REALM__ENVIRONMENT } from "./../../realms.js";

class RealmDatabaseController {
	constructor() {}
	enter_session(context, scope, parameters) {
		// use realm helper function here
	}
	exit_session(context, scope, parameters) {
		// use realm helper function here
	}
}

const CONTROLLER__DATABASE__REALM__CONTROLLER__ENVIRONMENT = new RealmDatabaseController();

export { CONTROLLER__DATABASE__REALM__CONTROLLER__ENVIRONMENT };
