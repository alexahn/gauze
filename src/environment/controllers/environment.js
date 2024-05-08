class EnvironmentController {
	constructor() {}
	signin(context, parameters) {
		/*
			verify context.authorization with the environment jwt secret
			get the session id that is inside the public payload and retrieve it
			check the data field and compare it to the a required set
			if all required verifications have passed, then generate a session for the proxy and generate a jwt using the system secret
			return the session (which has the jwt as the value field)
		*/
		return {
			gauze__session__id: "0",
			gauze__session__value: "1",
		};
	}
	signout(context, parameters) {
		/*
			delete all sessions for all agents in the proxy
		*/
		return {};
	}
	signup(context, parameters) {
		/*
			verify context.authorization with the environment jwt secret
			get the session id that is inside the public payload and retrieve it
			check the data field and compare it to the required set (e.g. verifying an email address before we create the person agent)
			if all required verifications have passed, then create a proxy
			call an operation that will create root, account, user, person, character
		*/
		return {};
	}
	enter_session(context, parameters) {
		/*
			the current session must be the proxy or null session for this to complete
			use the agent argument to generate an isolated session for the agent
		*/
		if (parameters.agent) {
			// fetch the session according to session id in jwt
			// check that it is proxy type
			// use the proxy id to do a look up against proxy (where: {agent_type: agent.agent_type, agent_id: agent.agent_id, root_id: proxy.id})
			// if a record is found, then create a system realm session
		} else {
			// create an environment session (agent_type and agent_id are null)
		}
		return {};
	}
	exit_session(context, parameters) {
		/*
			the current session must be the proxy session for this to complete
			use the agent argument to delete sessions for the agent
		*/
		return {};
	}
}

const CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT = new EnvironmentController();

export { CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT };
