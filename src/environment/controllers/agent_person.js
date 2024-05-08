import * as $abstract from "./../../abstract/index.js";

import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";
import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../models/proxy.js";
import { MODEL__AGENT_PERSON__MODEL__ENVIRONMENT } from "./../models/agent_person.js";

class AgentPersonController {
	constructor() {
		const self = this;
		self.person_type = $abstract.entities.agent_person.default($abstract).table_name;
	}
	assert_email(context, parameters) {
		const self = this;
		const { agent } = context;
		if (agent) {
			if (agent.proxy_id) {
				throw new Error("Session is already authenticated");
			} else {
				if (!agent.session_id) {
					throw new Error("Invalid session");
				}
				if (!parameters.agent_person) {
					throw new Error("Field 'agent_person' is required");
				}
				if (!parameters.agent_person.gauze__agent_person__email) {
					throw new Error("Field 'agent_person.gauze__agent_person__email' is required");
				}
				const attributes = parameters.agent_person;
				const agent_parameters = { where: attributes };
				return MODEL__AGENT_PERSON__MODEL__ENVIRONMENT.read(context, agent_parameters)
					.then(function (persons) {
						console.log("persons", persons);
						if (persons && persons.length) {
							const person = persons[0];
							return {
								person: person,
							};
						} else {
							return null;
						}
					})
					.then(function (collection) {
						if (collection) {
							const { person } = collection;
							const proxy_attributes = {
								gauze__proxy__agent_type: self.person_type,
								gauze__proxy__agent_id: person.gauze__agent_person__id,
							};
							const proxy_parameters = { where: proxy_attributes };
							return MODEL__PROXY__MODEL__ENVIRONMENT.read(context, proxy_parameters).then(function (proxies) {
								if (proxies && proxies.length) {
									const proxy = proxies[0];
									return {
										...collection,
										proxy: proxy,
									};
								} else {
									return null;
								}
							});
						} else {
							return null;
						}
					})
					.then(function (collection) {
						if (collection) {
							const { proxy, person } = collection;
							const session_attributes = {
								gauze__session__id: agent.session_id,
							};
							const session_parameters = { where: session_attributes };
							return MODEL__SESSION__MODEL__ENVIRONMENT.read(context, session_parameters).then(function (sessions) {
								if (sessions && sessions.length) {
									const session = sessions[0];
									return {
										...collection,
										session: session,
									};
								} else {
									return null;
								}
							});
						} else {
							return null;
						}
					})
					.then(function (collection) {
						if (collection) {
							const { person, proxy, session } = collection;
							// parse the JSON in session
							var parsed_data;
							try {
								parsed_data = JSON.parse(session.gauze__session__data);
							} catch (error) {
								// note: log?
								parsed_data = {};
							}
							const proxy_root_id = proxy.gauze__proxy__root_id;
							// update the session data with the assertion
							parsed_data.assert = proxy_root_id;
							const serialized_data = JSON.stringify(parsed_data);
							// save
							const session_where = {
								gauze__session__id: agent.session_id,
							};
							const session_attributes = {
								gauze__session__data: serialized_data,
							};
							const session_parameters = { where: session_where, attributes: session_attributes };
							return MODEL__SESSION__MODEL__ENVIRONMENT.update(context, session_parameters).then(function (sessions) {
								if (sessions && sessions.length) {
									const session = sessions[0];
									return {
										...collection,
										session: session,
									};
								} else {
									return null;
								}
							});
						} else {
							return null;
						}
					})
					.then(function (collection) {
						if (collection) {
							console.log("ASSERTION COMPLETE", collection.session);
							// everything finished
							return {
								success: true,
							};
						} else {
							// return true here so people can't figure out which emails are valid
							return {
								success: true,
							};
						}
					});
			}
		} else {
			throw new Error("Session is required to authenticate");
		}
	}
	request_email(context, parameters) {
		console.log("person request_email called");
		return {};
	}
	request_signup_email(context, parameters) {
		// we don't have proxy id
		// just act on the email and store the code on the session data
		console.log("person request_signup_email called");
		return {};
	}
	verify_email(context, parameters) {
		console.log("person verify_email called");
		return {};
	}
	verify_signup_email(context, parameters) {
		// we don't have proxy id
		// just act on the session data and check if the code aligns
		console.log("person verify_signup_email called");
		return {};
	}
}

const CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT = new AgentPersonController();

export { CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT };
