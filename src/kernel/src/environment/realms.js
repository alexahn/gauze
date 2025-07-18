// helper function for realms
// enter session
// exit session
const ENTER_SESSION__REALM__ENVIRONMENT = function ({ proxy_type, session_type, proxy_model, session_model, relationship_model, realm, sign_jwt }, context, scope, parameters) {
	const { agent } = context;
	const target_agent = parameters.proxy;

	const agent_is_proxy = agent.proxy_id && agent.session_id

	function enter() {
		// ensure session exists
		// ensure proxy exists for target agent with proxy session's root as its root
		// create session
		return new Promise(function (resolve, reject) {
			const collection = {}
			return resolve(collection)
		}).then(function (collection) {
			return session_model.read().then(function (session) {
				return {
					...collection,
					session
				}
			})
		}).then(function (collection) {
			const { dependencies } = collection
			if (!dependencies) throw new Error("Missing dependencies for proxy validation")
			return proxy_model.read().then(function (proxy) {
				return {
					...collection,
					proxy
				}
			})
		}).then(function (collection) {

		})
	}
	
	// the convention below is better to make sure we don't miss any edgecases
	// what we need to do is somehow flatten the nesting a little bit
	/*
	if (agent) {
		if (agent.agent_type === proxy_type) {
			if (target_agent) {
				enter()
			} else {
				throw new Error("Proxy agent is required to enter realm session")
			}
		} else {
			throw new Error("Proxy session is required to enter realm session")
		}
	} else {
		throw new Error("Session is required to enter realm session")
	}
	*/

	if (agent) {
		if (target_agent) {
			if (!target_agent.gauze__proxy__agent_type) {
				throw new Error("Proxy argument requires field 'gauze__proxy__agent_type'");
			}
			if (!target_agent.gauze__proxy__agent_id) {
				throw new Error("Proxy argument requires field 'gauze__proxy__agent_id'");
			}
			if (agent.proxy_id) {
				if (agent.session_id) {
					const session_attributes = {
						gauze__session__id: agent.session_id,
					};
					const session_parameters = { where: session_attributes };
					return session_model
						.read(context, scope, session_parameters)
						.then(function (sessions) {
							if (sessions && sessions.length) {
								const session = sessions[0];
								return {
									session: session,
								};
							} else {
								return null;
							}
						})
						.then(function (collection) {
							if (collection) {
								const { session } = collection;
								if (session.gauze__session__agent_type === proxy_type) {
									// do a look up to find the target proxy record
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
												proxy: proxy,
											};
										} else {
											return null;
										}
									});
								} else {
									return null;
								}
							} else {
								return null;
							}
						})
						.then(function (collection) {
							if (collection) {
								const { proxy } = collection;
								const session_id = uuidv4();
								const proxy_root_id = agent.proxy_id;
								const agent_id = proxy.gauze__proxy__agent_id;
								const agent_type = proxy.gauze__proxy__agent_type;
								return CREATE_SESSION__REALM__ENVIRONMENT(
									{ proxy_type, session_type, proxy_model, session_model, relationship_model, realm, sign_jwt },
									context,
									scope,
									session_id,
									proxy_root_id,
									agent_id,
									agent_type,
								).then(function (system_session) {
									return {
										...collection,
										system_session: system_session,
									};
								});
							} else {
								return null;
							}
						})
						.then(function (collection) {
							if (collection) {
								const { system_session } = collection;
								return system_session;
							} else {
								throw new Error("Proxy session failed to enter session");
							}
						});
				} else {
					throw new Error("Proxy session is missing session id");
				}
			} else {
				throw new Error("Non-proxy session cannot enter a proxy session");
			}
		} else {
			if (agent.proxy_id) {
				throw new Error("Proxy session cannot enter a non-proxy session");
			} else {
				throw new Error("Non-proxy session cannot enter a non-proxy session");
			}
		}
	} else {
		if (target_agent) {
			if (!target_agent.gauze__proxy__agent_type) {
				throw new Error("Proxy argument requires field 'gauze__proxy__agent_type'");
			}
			if (!target_agent.gauze__proxy__agent_id) {
				throw new Error("Proxy argument requires field 'gauze__proxy__agent_id'");
			}
			throw new Error("Session is required to enter a proxy session");
		} else {
			// enter
			//return self._create_environment_session(context, scope);
		}
	}
};
const EXIT_SESSION__REALM__ENVIRONMENT = function ({ proxy_type, session_type, proxy_model, session_model, relationship_model, realm }, context, scope, parameters) {
	const { agent } = context;
	const target_agent = parameters.proxy;
	if (agent) {
		if (target_agent) {
			if (agent.proxy_id) {
				if (!agent.session_id) {
					throw new Error("Proxy session is missing session id");
				}
				// first check to make sure that the target agent is a valid proxy for the current proxy session
				// look up the proxy by using: agent_type: target_agent.agent_type, agent_id: target_agent.agent_id, root_id: agent.proxy_id
				const proxy_attributes = {
					gauze__proxy__root_id: agent.proxy_id,
					gauze__proxy__agent_id: target_agent.gauze__proxy__agent_id,
					gauze__proxy__agent_type: target_agent.gauze__proxy__agent_type,
				};
				const proxy_parameters = { where: proxy_attributes };
				return (
					proxy_model
						.read(context, scope, proxy_parameters)
						.then(function (proxies) {
							if (proxies && proxies.length) {
								const proxy = proxies[0];
								return {
									proxy: proxy,
								};
							} else {
								return null;
							}
						})
						.then(function (collection) {
							if (collection) {
								const { proxy } = collection;
								// exit all sessions associated with the target proxy (for the realm)
								const session_attributes = {
									gauze__session__agent_id: target_agent.gauze__proxy__agent_id,
									gauze__session__agent_type: target_agent.gauze__proxy__agent_type,
									// todo: add realm filter here
									gauze__session__realm: realm,
								};
								const session_parameters = {
									where: session_attributes,
								};
								return session_model.delete(context, scope, session_parameters).then(function (sessions) {
									return {
										...collection,
										sessions: sessions,
									};
								});
							} else {
								return null;
							}
						})
						// todo: delete relationships
						.then(function (collection) {
							if (collection) {
								const { sessions } = collection;
								return sessions;
							} else {
								throw new Error("Proxy session failed to exit proxy session");
							}
						})
				);
			} else {
				throw new Error("Non-proxy session cannot exit a proxy session");
			}
		} else {
			if (agent.proxy_id) {
				throw new Error("Proxy session cannot exit a non-proxy session");
			} else {
				if (!agent.session_id) {
					throw new Error("Non-proxy session is missing session id");
				}
				// exit the current non-proxy session
				const session_attributes = {
					gauze__session__id: agent.session_id,
				};
				const session_parameters = {
					where: session_attributes,
				};
				return session_model.delete(context, scope, session_parameters);
			}
		}
	} else {
		if (target_agent) {
			if (!target_agent.gauze__proxy__agent_type) {
				throw new Error("Proxy argument requires field 'gauze__proxy__agent_type'");
			}
			if (!target_agent.gauze__proxy__agent_id) {
				throw new Error("Proxy argument requires field 'gauze__proxy__agent_id'");
			}
			throw new Error("Session is required to exit a proxy session");
		} else {
			throw new Error("Session is required to exit a non-proxy session");
		}
	}
};

const CREATE_SESSION__REALM__ENVIRONMENT = function (
	{ proxy_type, session_type, session_model, relationship_model, realm, sign_jwt },
	context,
	scope,
	{ session_id, proxy_id, agent_id, agent_type },
) {
	const session_realm = realm;
	const seed = randomBytes(64).toString("hex");
	const payload = {
		proxy_id: proxy_id,
		agent_id: agent_id,
		agent_type: agent_type,
		session_id: session_id,
		seed: seed,
	};
	// create a relationship
	return sign_jwt(payload).then(function (jwt) {
		const transactions = [
			// session
			function () {
				const attributes = {
					gauze__session__id: session_id,
					gauze__session__agent_type: agent_type,
					gauze__session__agent_id: agent_id,
					gauze__session__realm: session_realm,
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
			},
			// relationships
			function () {
				const attributes = {
					gauze__relationship__from_type: proxy_type,
					gauze__relationship__from_id: proxy_id,
					gauze__relationship__to_type: session_type,
					gauze__relationship__to_id: session_id,
				};
				const parameters = { attributes };
				return relationship_model.create(context, scope, parameters);
			},
			function () {
				const attributes = {
					gauze__relationship__from_type: session_type,
					gauze__relationship__from_id: session_id,
					gauze__relationship__to_type: proxy_type,
					gauze__relationship__to_id: proxy_id,
				};
				const parameters = { attributes };
				return relationship_model.create(context, scope, parameters);
			},
		];
		return Promise.all(
			transactions.map(function (f) {
				return f();
			}),
		).then(function (results) {
			return results[0];
		});
	});
};

const CREATE_SESSION_ACCESS_CONTROL__REALM__ENVIROMENT = function (agent_id, agent_type, entity_id, entity_type) {
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

export { ENTER_SESSION__REALM__ENVIRONMENT, EXIT_SESSION__REALM__ENVIRONMENT };
