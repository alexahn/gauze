import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";

class AgentPersonController {
	constructor() {}
	assert_email(context, parameters) {
		const { agent } = context;
		const session = agent.session_id;
		// get the associated person by doing a query
		// find the proxy by doing a query
		// store the proxy id in the session data
		// always return true so people can't find out which users are in the system
	}
	request_email(context, parameters) {}
	request_signup_email(context, parameters) {
		// we don't have proxy id
		// just act on the email and store the code on the session data
	}
	verify_email(context, parameters) {}
	verify_signup_email(context, parameters) {
		// we don't have proxy id
		// just act on the session data and check if the code aligns
	}
}

const CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT = new AgentPersonController();

export { CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT };
