// todo: refactor to throw errors instead of returning null
const VERIFY_PASSWORD__AGENT_ACCOUNT__AGENT__SRC__KERNEL = function (context, scope, { proxy_type, session_model, secret_model, hash_function }, password) {
	const { agent } = context;
	if (agent) {
		if (agent.proxy_id) {
			throw new Error("Session is already authenticated");
		} else {
			if (!agent.session_id) {
				throw new Error("Invalid session");
			}
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
					const { session } = collection;
					const parsed_data = session_model.parse_data(session.gauze__session__data);
					const asserted_proxy = session_model.get_data_field(parsed_data, "assert");
					if (asserted_proxy) {
						// fetch secrets
						const secret_attributes = {
							gauze__secret__agent_type: proxy_type,
							gauze__secret__agent_id: asserted_proxy,
							gauze__secret__name: "password",
						};
						const secret_parameters = { where: secret_attributes };
						return secret_model.read(context, scope, secret_parameters).then(function (secrets) {
							if (secrets && secrets.length) {
								// filter by hash and filter by salt
								const salt = secrets.find(function (secret) {
									return secret.gauze__secret__kind === "salt";
								});
								const hash = secrets.find(function (secret) {
									return secret.gauze__secret__kind === "hash";
								});
								return {
									...collection,
									salt: salt,
									hash: hash,
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
						const { session, salt, hash } = collection;
						if (!salt) {
							throw new Error("Secret could not be found for account: salt");
						}
						if (!hash) {
							throw new Error("Secret could not be found for account: hash");
						}
						// pbkdf2
						//const password = parameters.agent_account.gauze__agent_account__password;
						const password_salt = salt.gauze__secret__value;
						const password_hash = hash.gauze__secret__value;
						return hash_function(password, password_salt).then(function (proposed_hash) {
							// check that the hashes align
							if (password_hash === proposed_hash) {
								return {
									...collection,
									proposed_hash: proposed_hash,
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
						const { session } = collection;
						const parsed_data = session_model.parse_data(session.gauze__session__data);
						var updated_data = session_model.set_data_field(parsed_data, "steps.account.verify.password.success", true);
						const serialized_data = JSON.stringify(updated_data);
						// update session data
						const session_where = {
							gauze__session__id: agent.session_id,
						};
						const session_attributes = {
							...session,
							gauze__session__data: serialized_data,
						};
						const session_parameters = { where: session_where, attributes: session_attributes };
						return session_model.update(context, scope, session_parameters).then(function (sessions) {
							if (sessions && sessions.length) {
								const updated_session = sessions[0];
								return {
									...collection,
									updated_session: updated_session,
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
						// all passed
						return {
							success: true,
						};
					} else {
						return {
							success: false,
						};
					}
				});
		}
	} else {
		throw new Error("Session is required to authenticate");
	}
};

export { VERIFY_PASSWORD__AGENT_ACCOUNT__AGENT__SRC__KERNEL };
