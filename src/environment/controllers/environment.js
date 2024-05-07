class EnvironmentController {
	constructor() {

	}
	signin(context, parameters) {
		/*
			verify context.authorization with the environment jwt secret
			get the session id that is inside the public payload and retrieve it
			check the data field and compare it to the a required set
			if all required verifications have passed, then generate a session for the proxy and generate a jwt using the system secret
			return the session (which has the jwt as the value field)
		*/
		
	}
	signout(context, parameters) {
		/*
			delete all sessions for all agents in the proxy
		*/
	}
	signup(context, parameters) {
		/*
			get the session id that is inside the public payload and retrieve it
			check the data field and compare it to the required set (e.g. verifying an email address before we create the person agent)
			if all required verifications have passed, then create a proxy
			call an operation that will create root, account, user, person, character
		*/
	}
	enter_session(context, parameters) {
		/*
			the current session must be the proxy session for this to complete
			use the agent argument to generate an isolated session for the agent
		*/
	}
	exit_session(context, parameters) {
		/*
			the current session must be the proxy session for this to complete
			use the agent argument to delete sessions for the agent
		*/
	}
}

const CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT = new EnvironmentController()

export {
	CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT
}
