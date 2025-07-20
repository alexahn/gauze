import * as $abstract from "./../../abstract/index.js";
import * as $kernel from "./../../kernel/index.js";

import { HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT } from "./../authentication.js";

import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";
import { MODEL__SECRET__MODEL__ENVIRONMENT } from "./../models/secret.js";

class AgentAccountController {
	constructor() {
		const self = this;
		self.proxy_type = $abstract.entities.proxy.default($abstract).table_name;
	}
	verify_password(context, scope, parameters) {
		const self = this;
		const { agent, project } = context;

		function verify() {
			if (!parameters.agent_account) {
				throw new Error("Field 'agent_account' is required");
			}
			if (!parameters.agent_account.gauze__agent_account__password) {
				throw new Error("Field 'agent_account.account_password' is required");
			}
			return new Promise(function (resolve, reject) {
				const collection = {};
				return resolve(collection);
			})
				.then(function (collection) {
					const session_attributes = {
						gauze__session__id: agent.session_id,
					};
					const session_parameters = { where: session_attributes };
					return MODEL__SESSION__MODEL__ENVIRONMENT.read(context, scope, session_parameters).then(function (sessions) {
						if (sessions && sessions.length) {
							const session = sessions[0];
							// read data and check step requirements here
							const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
							const step_requirements = $kernel.src.authentication.VALIDATE_REQUIREMENTS(
								{
									session_model: MODEL__SESSION__MODEL__ENVIRONMENT,
								},
								parsed_data,
								project.default.steps["steps.account.verify.password"],
							);
							if (step_requirements) {
								return {
									...collection,
									session,
								};
							} else {
								throw new Error("Requirements for step not met");
							}
						} else {
							throw new Error("Session is required for verify password step");
						}
					});
				})
				.then(function (collection) {
					const { session } = collection;
					if (!session) throw new Error("Missing session dependency for verifying password");
					const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
					const asserted_proxy = MODEL__SESSION__MODEL__ENVIRONMENT.get_data_field(parsed_data, "assert");
					if (asserted_proxy) {
						// fetch secrets
						const secret_attributes = {
							gauze__secret__agent_type: self.proxy_type,
							gauze__secret__agent_id: asserted_proxy,
							gauze__secret__name: "password",
						};
						const secret_parameters = { where: secret_attributes };
						return MODEL__SECRET__MODEL__ENVIRONMENT.read(context, scope, secret_parameters).then(function (secrets) {
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
								throw new Error("Could not find secrets for asserted proxy");
							}
						});
					} else {
						throw new Error("Must assert a proxy before verifying password");
					}
				})
				.then(function (collection) {
					const { session, salt, hash } = collection;
					if (!salt) {
						throw new Error("Secret could not be found for account: salt");
					}
					if (!hash) {
						throw new Error("Secret could not be found for account: hash");
					}
					// pbkdf2
					const password = parameters.agent_account.gauze__agent_account__password;
					const password_salt = salt.gauze__secret__value;
					const password_hash = hash.gauze__secret__value;
					return HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT(password, password_salt).then(function (proposed_hash) {
						// check that the hashes align
						if (password_hash === proposed_hash) {
							return {
								...collection,
								proposed_hash: proposed_hash,
							};
						} else {
							throw new Error("Invalid password");
						}
					});
				})
				.then(function (collection) {
					const { session } = collection;
					if (!session) throw new Error("Missing session dependency for updating data fields");
					const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
					const asserted_proxy = MODEL__SESSION__MODEL__ENVIRONMENT.get_data_field(parsed_data, "assert");
					var updated_data = MODEL__SESSION__MODEL__ENVIRONMENT.set_data_field(parsed_data, "steps.account.verify.password.success", asserted_proxy);
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
					return MODEL__SESSION__MODEL__ENVIRONMENT.update(context, scope, session_parameters).then(function (sessions) {
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
				})
				.then(function (collection) {
					return {
						success: true,
					};
				})
				.catch(function (err) {
					// allow debugging errors in development only
					if (process.env.GAUZE_ENV === "development") {
						throw err;
					} else {
						return {
							success: false,
						};
					}
				});
		}

		if (agent) {
			if (agent.agent_type == self.proxy_type) {
				return verify();
			} else {
				if (agent.proxy_id) {
					// ignore because realm session
					throw new Error("Non-realm session is required for verify password step");
				} else {
					return verify();
				}
			}
		} else {
			throw new Error("Session is required for verify password step");
		}
	}
}

const CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT = new AgentAccountController();

export { CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT };
