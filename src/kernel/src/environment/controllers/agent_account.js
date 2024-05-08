import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";

/*
query {
	read_proxy(where: {
		agent_id: "1",
		agent_type: "gauze__agent_root"
	}) {
		relationships {
			accounts: read_proxy(where: {
				agent_type: "gauze__agent_account"
			}) {
				relationships {
					users: read_proxy(where: {
						agent_type: "gauze__agent_user"
					}) {

					}
				}	
			}
			persons: read_proxy(where: {
				agent_type: "gauze__agent_person"
			}) {
				relationships {
					characters: read_proxy(where: {
						agent_type: "gauze__agent_character"
					}) {

					}
				}
			}
		}
	}
}
*/

class AgentAccountController {
	constructor() {}

	verify_password(jwt, password) {
		// get the asserted proxy from session data
		// get the associated agent account for the proxy
		// get the secrets (salt and hash) for the agent account
		// pbkdf2
		// update the session date with the result
		// return success: true / false
	}
}

const CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT = new AgentAccountController();

export { CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT };
