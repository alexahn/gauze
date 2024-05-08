import * as $abstract from "./../../abstract/index.js";

import { HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT } from "./../authentication.js";

import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";
import { MODEL__SECRET__MODEL__ENVIRONMENT } from "./../models/secret.js";

class AgentAccountController {
	constructor() {
		const self = this;
		self.proxy_type = $abstract.entities.proxy.default($abstract).table_name;
	}
	verify_password(context, parameters) {
		const self = this;
		const { agent } = context;
		if (agent) {
			if (agent.proxy_id) {
				throw new Error("Session is already authenticated");
			} else {
				if (!agent.session_id) {
					throw new Error("Invalid session");
				}
				if (!parameters.agent_account) {
					throw new Error("Field 'agent_account' is required");
				}
				if (!parameters.agent_account.gauze__agent_account__password) {
					throw new Error("Field 'agent_account.account_password' is required");
				}
				const session_attributes = {
					gauze__session__id: agent.session_id,
				};
				const session_parameters = { where: session_attributes };
				return MODEL__SESSION__MODEL__ENVIRONMENT.read(context, session_parameters)
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
						const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
						if (parsed_data.assert) {
							// fetch secrets
							const secret_attributes = {
								gauze__secret__agent_type: self.proxy_type,
								gauze__secret__agent_id: parsed_data.assert,
								gauze__secret__name: "password",
							};
							const secret_parameters = { where: secret_attributes };
							return MODEL__SECRET__MODEL__ENVIRONMENT.read(context, secret_parameters).then(function (secrets) {
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
							const password = parameters.agent_account.gauze__agent_account__password;
							const password_salt = salt.gauze__secret__value;
							const password_hash = hash.gauze__secret__value;
							return HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT(password, password_salt).then(function (proposed_hash) {
								// check that the hashes align
								if (password_hash === proposed_hash) {
									console.log("AUTHENTICATION PASSED");
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
							const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
							if (parsed_data.verify) {
								parsed_data.verify.push({
									source: "account.password",
								});
							} else {
								parsed_data.verify = [
									{
										source: "account.password",
									},
								];
							}
							const serialized_data = JSON.stringify(parsed_data);
							// update session data
							const session_where = {
								gauze__session__id: agent.session_id,
							};
							const session_attributes = {
								gauze__session__data: serialized_data,
							};
							const session_parameters = { where: session_where, attributes: session_attributes };
							return MODEL__SESSION__MODEL__ENVIRONMENT.update(context, session_parameters).then(function (sessions) {
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
							return {
								success: false,
							};
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
	}
}

const CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT = new AgentAccountController();

export { CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT };
