const { randomBytes } = await import("node:crypto");

import { v4 as uuidv4 } from "uuid";

import * as $kernel from "./../kernel/index.js";

// todo: rename realm to target_realm?
const ENTER_SESSION__REALM__ENVIRONMENT = function ({ proxy_type, session_type, proxy_model, session_model, realm, sign_jwt }, context, scope, parameters) {
	const { agent, project } = context;
	const target_agent = parameters.proxy;

	function enter() {
		return new Promise(function (resolve, reject) {
			const collection = {};
			return resolve(collection);
		})
			.then(function (collection) {
				// ensure the session exists
				const session_attributes = {
					gauze__session__id: agent.session_id,
				};
				const session_parameters = { where: session_attributes };
				return session_model.read(context, scope, session_parameters).then(function (sessions) {
					if (sessions && sessions.length) {
						const session = sessions[0];
						return {
							...collection,
							session,
						};
					} else {
						throw new Error("Session could not be found");
					}
				});
			})
			.then(function (collection) {
				const { session } = collection
				if (!session) throw new Error("Dependency session missing from validating step requirements")
				const parsed_data = session_model.parse_data(session.gauze__session__data);

				if (project.default.authentication.realms[realm]) {
					const realm_requirements = $kernel.src.authentication.VALIDATE_REQUIREMENTS({
						session_model: session_model
					}, parsed_data, project.default.authentication.realms[realm])
					if (realm_requirements) {
						// ok
					} else {
						throw new Error("Realm step requirements are not met")
					}
				} else {
					throw new Error("Realm is not defined in project authentication configuration")
				}

				if (project.default.realms[realm].mode === "open") {
					// loose interpretation (agent does not need to be defined in authentication settings)
					if (project.default.authentication.agents[target_agent.gauze__proxy__agent_type]) {
						const agent_requirements = $kernel.src.authentication.VALIDATE_REQUIREMENTS({
							session_model: session_model
						}, parsed_data, project.default.authentication.agents[target_agent.gauze__proxy__agent_type])
						if (agent_requirements) {
							// ok
						} else {
							throw new Error("Agent step requirements are not met")
						}
					} else {
						// ok
					}
				} else if (project.default.realms[realm].mode === "closed") {
					// strict interpretation (agent must be defined in authentication settings)
					if (project.default.authentication.agents[target_agent.gauze__proxy__agent_type]) {
						const agent_requirements = $kernel.src.authentication.VALIDATE_REQUIREMENTS({
							session_model: session_model
						}, parsed_data, project.default.authentication.agents[target_agent.gauze__proxy__agent_type])
						if (agent_requirements) {
							// ok
						} else {
							throw new Error("Agent step requirements are not met")
						}
					} else {
						throw new Error("Agent is not defined in project authentication configuration")
					}
				} else {
					throw new Error("Invalid realm mode")
				}
				return collection
			})
			.then(function (collection) {
				// ensure the proxy exists for target agent with proxy session's root as its root
				const { session } = collection;
				if (!session) throw new Error("Missing session dependency for proxy verification");
				if (session.gauze__session__agent_type !== proxy_type) throw new Error("Proxy session is required to enter realm session");
				const proxy_attributes = {
					gauze__proxy__agent_type: target_agent.gauze__proxy__agent_type,
					gauze__proxy__agent_id: target_agent.gauze__proxy__agent_id,
					gauze__proxy__root_id: agent.proxy_id,
				};
				const proxy_parameters = { where: proxy_attributes };
				return proxy_model.read(context, scope, proxy_parameters).then(function (proxies) {
					if (proxies && proxies.length) {
						const proxy = proxies[0];
						return {
							...collection,
							proxy,
						};
					} else {
						throw new Error("Proxy could not be found");
					}
				});
			})
			.then(function (collection) {
				// create the session
				const { proxy } = collection;
				if (!proxy) throw new Error("Missing proxy dependency for session creation");
				let realms;
				try {
					realms = JSON.parse(proxy.gauze__proxy__realms);
				} catch (e) {
					// note: this should be treated as a fatal error since it should never happen
					throw new Error("Invalid realms data for proxy");
				}
				if (!realms[realm]) throw new Error("Agent does not have access to target realm");
				const session_id = uuidv4();
				const proxy_id = agent.proxy_id;
				const agent_id = proxy.gauze__proxy__agent_id;
				const agent_type = proxy.gauze__proxy__agent_type;
				return CREATE_SESSION__REALM__ENVIRONMENT({ proxy_type, session_type, proxy_model, session_model, realm, sign_jwt }, context, scope, {
					session_id,
					proxy_id,
					agent_id,
					agent_type,
				}).then(function (realm_session) {
					return {
						...collection,
						realm_session,
					};
				});
			})
			.then(function (collection) {
				// return result from collection
				const { realm_session } = collection;
				if (!realm_session) throw new Error("Missing realm session dependency for return");
				return realm_session;
			});
	}

	// keep the branching logic legible by moving large blocks to their own functions
	if (agent) {
		if (agent.agent_type === proxy_type) {
			if (target_agent) {
				return enter();
			} else {
				throw new Error("Proxy agent is required to enter realm session");
			}
		} else {
			throw new Error("Proxy session is required to enter realm session");
		}
	} else {
		throw new Error("Session is required to enter realm session");
	}
};

const EXIT_SESSION__REALM__ENVIRONMENT = function ({ proxy_type, session_type, proxy_model, session_model, realm }, context, scope, parameters) {
	const { agent } = context;
	const target_agent = parameters.proxy;

	function exit() {
		return new Promise(function (resolve, reject) {
			const collection = {};
			return resolve(collection);
		})
			.then(function (collection) {
				// ensure the proxy exists for target agent with proxy session's root as its root
				const proxy_attributes = {
					gauze__proxy__root_id: agent.proxy_id,
					gauze__proxy__agent_id: target_agent.gauze__proxy__agent_id,
					gauze__proxy__agent_type: target_agent.gauze__proxy__agent_type,
				};
				const proxy_parameters = { where: proxy_attributes };
				return proxy_model.read(context, scope, proxy_parameters).then(function (proxies) {
					if (proxies && proxies.length) {
						const proxy = proxies[0];
						return {
							...collection,
							proxy,
						};
					} else {
						throw new Error("Proxy could not be found");
					}
				});
			})
			.then(function (collection) {
				// delete the sessions
				const { proxy } = collection;
				if (!proxy) throw new Error("Missing proxy dependency for session deletion");
				try {
					const realms = JSON.parse(proxy.gauze__proxy__realms);
					if (!realms[realm]) throw new Error("Agent does not have access to target realm");
				} catch (e) {
					// note: this should be treated as a fatal error since it should never happen
					throw new Error("Invalid realms data for proxy");
				}
				const agent_id = target_agent.gauze__proxy__agent_id;
				const agent_type = target_agent.gauze__proxy__agent_type;
				return DELETE_SESSION__REALM__ENVIRONMENT({ proxy_type, session_type, proxy_model, session_model, realm }, context, scope, {
					agent_id,
					agent_type,
				}).then(function (realm_sessions) {
					return {
						...collection,
						realm_sessions,
					};
				});
			})
			.then(function (collection) {
				// return result from collection
				const { realm_sessions } = collection;
				if (!realm_sessions) throw new Error("Missing realm sessions dependency for return");
				return realm_sessions;
			});
	}

	// keep the branching logic legible by moving large blocks to their own functions
	if (agent) {
		if (agent.agent_type === proxy_type) {
			if (target_agent) {
				return exit();
			} else {
				throw new Error("Proxy agent is required to exit realm session");
			}
		} else {
			throw new Error("Proxy session is required to exit realm session");
		}
	} else {
		throw new Error("Session is required to exit realm session");
	}
};

const CREATE_SESSION__REALM__ENVIRONMENT = function ({ proxy_type, session_type, session_model, realm, sign_jwt }, context, scope, { session_id, proxy_id, agent_id, agent_type }) {
	const seed = randomBytes(64).toString("hex");
	const payload = {
		proxy_id: proxy_id,
		agent_id: agent_id,
		agent_type: agent_type,
		session_id: session_id,
		seed: seed,
	};
	return sign_jwt(payload).then(function (jwt) {
		const attributes = {
			gauze__session__id: session_id,
			gauze__session__agent_type: agent_type,
			gauze__session__agent_id: agent_id,
			gauze__session__realm: realm,
			gauze__session__value: jwt,
			gauze__session__kind: "agent",
			gauze__session__data: "",
			gauze__session__seed: seed,
		};
		const access_parameters = CREATE_SESSION_ACCESS_CONTROL__REALM__ENVIRONMENT(proxy_id, proxy_type, session_id, session_type);
		const parameters = { attributes, ...access_parameters };
		return session_model.create(context, scope, parameters).then(function (data) {
			return data[0];
		});
	});
};

const CREATE_SESSION_ACCESS_CONTROL__REALM__ENVIRONMENT = function (agent_id, agent_type, entity_id, entity_type) {
	const parameters = {};
	parameters.whitelist_create = {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_type: agent_type,
		gauze__whitelist__agent_id: agent_id,
		gauze__whitelist__entity_type: entity_type,
		gauze__whitelist__entity_id: entity_id,
		gauze__whitelist__method: "create",
	};
	parameters.whitelist_read = {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_type: agent_type,
		gauze__whitelist__agent_id: agent_id,
		gauze__whitelist__entity_type: entity_type,
		gauze__whitelist__entity_id: entity_id,
		gauze__whitelist__method: "read",
	};
	parameters.whitelist_update = {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_type: agent_type,
		gauze__whitelist__agent_id: agent_id,
		gauze__whitelist__entity_type: entity_type,
		gauze__whitelist__entity_id: entity_id,
		gauze__whitelist__method: "update",
	};
	parameters.whitelist_delete = {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_type: agent_type,
		gauze__whitelist__agent_id: agent_id,
		gauze__whitelist__entity_type: entity_type,
		gauze__whitelist__entity_id: entity_id,
		gauze__whitelist__method: "delete",
	};
	parameters.whitelist_count = {
		gauze__whitelist__realm: "system",
		gauze__whitelist__agent_role: "root",
		gauze__whitelist__agent_type: agent_type,
		gauze__whitelist__agent_id: agent_id,
		gauze__whitelist__entity_type: entity_type,
		gauze__whitelist__entity_id: entity_id,
		gauze__whitelist__method: "count",
	};
	parameters.blacklist_create = {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "root",
		gauze__blacklist__agent_type: agent_type,
		gauze__blacklist__agent_id: agent_id,
		gauze__blacklist__entity_type: entity_type,
		gauze__blacklist__entity_id: entity_id,
		gauze__blacklist__method: "create",
	};
	parameters.blacklist_read = {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "root",
		gauze__blacklist__agent_type: agent_type,
		gauze__blacklist__agent_id: agent_id,
		gauze__blacklist__entity_type: entity_type,
		gauze__blacklist__entity_id: entity_id,
		gauze__blacklist__method: "read",
	};
	parameters.blacklist_update = {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "root",
		gauze__blacklist__agent_type: agent_type,
		gauze__blacklist__agent_id: agent_id,
		gauze__blacklist__entity_type: entity_type,
		gauze__blacklist__entity_id: entity_id,
		gauze__blacklist__method: "update",
	};
	parameters.blacklist_delete = {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "root",
		gauze__blacklist__agent_type: agent_type,
		gauze__blacklist__agent_id: agent_id,
		gauze__blacklist__entity_type: entity_type,
		gauze__blacklist__entity_id: entity_id,
		gauze__blacklist__method: "delete",
	};
	parameters.blacklist_count = {
		gauze__blacklist__realm: "system",
		gauze__blacklist__agent_role: "root",
		gauze__blacklist__agent_type: agent_type,
		gauze__blacklist__agent_id: agent_id,
		gauze__blacklist__entity_type: entity_type,
		gauze__blacklist__entity_id: entity_id,
		gauze__blacklist__method: "count",
	};
	return parameters;
};

const DELETE_SESSION__REALM__ENVIRONMENT = function ({ proxy_type, session_type, session_model, realm }, context, scope, { agent_id, agent_type }) {
	const session_attributes = {
		gauze__session__agent_id: agent_id,
		gauze__session__agent_type: agent_type,
		gauze__session__realm: realm,
	};
	const session_parameters = {
		where: session_attributes,
	};
	return session_model.delete(context, scope, session_parameters);
};

export { ENTER_SESSION__REALM__ENVIRONMENT, EXIT_SESSION__REALM__ENVIRONMENT };
