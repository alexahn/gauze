import * as $abstract from "./../../abstract/index.js";
import * as $kernel from "./../../kernel/index.js";
import * as $database from "./../../database/index.js";

const { randomBytes } = await import("node:crypto");

import { v4 as uuidv4 } from "uuid";

import { HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT, SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT, SIGN_PROXY_JWT__AUTHENTICATION__ENVIRONMENT } from "./../authentication.js";

import { MODEL__RELATIONSHIP__MODEL__ENVIRONMENT } from "./../models/relationship.js";

import { MODEL__SECRET__MODEL__ENVIRONMENT } from "./../models/secret.js";
import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";
import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../models/proxy.js";

import { MODEL__AGENT_ROOT__MODEL__ENVIRONMENT } from "./../models/agent_root.js";
import { MODEL__AGENT_ACCOUNT__MODEL__ENVIRONMENT } from "./../models/agent_account.js";
import { MODEL__AGENT_USER__MODEL__ENVIRONMENT } from "./../models/agent_user.js";
import { MODEL__AGENT_PERSON__MODEL__ENVIRONMENT } from "./../models/agent_person.js";
import { MODEL__AGENT_CHARACTER__MODEL__ENVIRONMENT } from "./../models/agent_character.js";

import { EXIT_SESSION__REALM__ENVIRONMENT } from "./../realms.js";

class EnvironmentController {
	constructor() {
		const self = this;
		self.proxy_type = $abstract.entities.proxy.default($abstract).table_name;
		self.session_type = $abstract.entities.session.default($abstract).table_name;
		self.sign_in_requirements = ["steps.person.assert.email.success", "steps.account.verify.password.success"];
	}
	sign_in(context, scope, parameters) {
		const self = this;
		const { agent, project } = context;

		function sign_in() {
			return new Promise(function (resolve, reject) {
				const collection = {};
				return resolve(collection);
			})
				.then(function (collection) {
					// proceed
					const session_attributes = {
						gauze__session__id: agent.session_id,
					};
					const session_parameters = { where: session_attributes };
					return MODEL__SESSION__MODEL__ENVIRONMENT.read(context, scope, session_parameters).then(function (sessions) {
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
					const { session } = collection;
					if (!session) throw new Error("Missing session dependency for checking session requirements");
					// check the session data
					const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
					const requirements_passed = $kernel.src.authentication.VALIDATE_REQUIREMENTS(
						{
							session_model: MODEL__SESSION__MODEL__ENVIRONMENT,
						},
						parsed_data,
						project.default.authentication.proxy,
					);
					if (requirements_passed) {
						return {
							...collection,
							requirements_passed,
						};
					} else {
						// todo: log expectation and actual
						throw new Error("Session did not pass authentication requirements");
					}
				})
				.then(function (collection) {
					const { session } = collection;
					if (!session) throw new Error("Missing session dependency for creating proxy session");
					const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
					if (parsed_data.assert) {
						// create a proxy session here
						const session_id = uuidv4();
						const proxy_root_id = parsed_data.assert;
						const proxy_type = self.proxy_type;
						return self
							._create_proxy_session(context, scope, { session_id, proxy_id: proxy_root_id, agent_id: proxy_root_id, agent_type: proxy_type })
							.then(function (proxy_session) {
								return {
									...collection,
									proxy_session,
								};
							});
					} else {
						throw new Error("Session did not assert an agent");
					}
				})
				.then(function (collection) {
					const { proxy_session } = collection;
					if (!proxy_session) throw new Error("Missing proxy session dependency for return");
					return proxy_session;
				});
		}

		if (agent) {
			if (agent.agent_type === null) {
				// environment session
				if (agent.session_id) {
					return sign_in();
				} else {
					throw new Error("Session is missing session id");
				}
			} else {
				throw new Error("Environment session required to sign in");
			}
		} else {
			throw new Error("Session is required to sign in");
		}
	}
	sign_out(context, scope, parameters) {
		const self = this;
		const { agent } = context;

		function sign_out() {
			return new Promise(function (resolve, reject) {
				const collection = {};
				return resolve(collection);
			})
				.then(function (collection) {
					const proxy_attributes = {
						gauze__proxy__root_id: agent.proxy_id,
					};
					const proxy_parameters = { where: proxy_attributes };
					return MODEL__PROXY__MODEL__ENVIRONMENT.read(context, scope, proxy_parameters).then(function (proxies) {
						if (proxies && proxies.length) {
							return {
								...collection,
								proxies,
							};
						} else {
							throw new Error("Proxies could not be found");
						}
					});
				})
				.then(function (collection) {
					const { proxies } = collection;
					if (!proxies || !proxies.length) throw new Error("Missing proxies dependency for exiting realm sessions");
					const transactions = proxies.map(function (proxy) {
						//return self.exit_session(context, scope, { proxy: proxy });
						return self.exit_agent(context, scope, { proxy: proxy });
					});
					return Promise.all(transactions).then(function (results) {
						// flatten sessions from every realm into one array
						const agent_sessions = results.reduce(function (prev, next) {
							return prev.concat(next);
						}, []);
						return {
							...collection,
							agent_sessions,
						};
					});
				})
				.then(function (collection) {
					const { agent_sessions } = collection;
					if (!agent_sessions) throw new Error("Missing agent sessions dependency for deleting proxy session");
					return self._delete_proxy_session(context, scope, { session_id: agent.session_id, agent_id: agent.agent_id, agent_type: self.proxy_type }).then(function (proxy_session) {
						return {
							...collection,
							proxy_session,
						};
					});
				})
				.then(function (collection) {
					const { agent_sessions, proxy_session } = collection;
					if (!agent_sessions) throw new Error("Missing agent sessions dependency for return");
					if (!proxy_session) throw new Error("Missing proxy session dependency for return");
					return agent_sessions.concat(proxy_session);
				});
		}

		if (agent) {
			if (agent.agent_type === self.proxy_type) {
				// proxy session
				if (agent.proxy_id) {
					return sign_out();
				} else {
					throw new Error("Session is missing proxy id");
				}
			} else {
				throw new Error("Proxy session is required to sign out");
			}
		} else {
			throw new Error("Session is required to sign out");
		}
	}
	create_access_control(agent_id, agent_type, entity_id, entity_type) {
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
		/*
		parameters.whitelist_delete = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: agent_type,
			gauze__whitelist__agent_id: agent_id,
			gauze__whitelist__entity_type: entity_type,
			gauze__whitelist__entity_id: entity_id,
			gauze__whitelist__method: "delete",
		};
		*/
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
	}
	create_session_access_control(agent_id, agent_type, entity_id, entity_type) {
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
	}
	sign_up(context, scope, parameters) {
		const self = this;
		if (!parameters.agent_account || !parameters.agent_account.gauze__agent_account__password) throw new Error("Field 'agent_account.password' is required");

		// todo: get the session by the session id in agent and check the data field
		// todo: check that all data requirements have passed, e.g. verifying email since we have a unique constraint on email
		// todo: we can require that the data json to require something like { verify: [{ source: "person.email" }] }

		const salt = randomBytes(128).toString("hex");
		const password = parameters.agent_account.gauze__agent_account__password;
		return HASH_PASSWORD__AUTHENTICATION__ENVIRONMENT(password, salt)
			.then(function (hash) {
				delete parameters.agent_account.gauze__agent_account__password;
				return hash;
			})
			.then(function (hash) {
				const secret_hash_id = uuidv4();
				const secret_salt_id = uuidv4();
				const secret_type = $abstract.entities.secret.default($abstract).table_name;
				const agent_root_id = uuidv4();
				const agent_root_type = $abstract.entities.agent_root.default($abstract).table_name;
				const agent_account_id = uuidv4();
				const agent_account_type = $abstract.entities.agent_account.default($abstract).table_name;
				const agent_user_id = uuidv4();
				const agent_user_type = $abstract.entities.agent_user.default($abstract).table_name;
				const agent_person_id = uuidv4();
				const agent_person_type = $abstract.entities.agent_person.default($abstract).table_name;
				const agent_character_id = uuidv4();
				const agent_character_type = $abstract.entities.agent_character.default($abstract).table_name;
				const proxy_root_id = uuidv4();
				const proxy_account_id = uuidv4();
				const proxy_user_id = uuidv4();
				const proxy_person_id = uuidv4();
				const proxy_character_id = uuidv4();
				const proxy_type = $abstract.entities.proxy.default($abstract).table_name;
				const session_id = uuidv4();
				const session_type = $abstract.entities.session.default($abstract).table_name;

				parameters.agent_root.gauze__agent_root__id = agent_root_id;
				parameters.agent_account.gauze__agent_account__id = agent_account_id;
				parameters.agent_user.gauze__agent_user__id = agent_user_id;
				parameters.agent_person.gauze__agent_person__id = agent_person_id;
				parameters.agent_character.gauze__agent_character__id = agent_character_id;

				// create secret hash
				// create secret salt
				// create agent root
				// create agent account
				// create agent user
				// create agent person
				// create agent character
				// create proxy root
				// create proxy account
				// create proxy user
				// create proxy person
				// create proxy character
				// link all proxies
				// link secrets to proxy root
				// link session to proxy root

				const secret_transactions = [
					function () {
						const attributes = {
							gauze__secret__id: secret_salt_id,
							gauze__secret__realm: "system",
							gauze__secret__agent_id: proxy_root_id,
							gauze__secret__agent_type: proxy_type,
							gauze__secret__value: salt,
							gauze__secret__kind: "salt",
							gauze__secret__name: "password",
						};
						const access_parameters = self.create_access_control(proxy_root_id, proxy_type, secret_salt_id, secret_type);
						const parameters = { attributes, ...access_parameters };
						return MODEL__SECRET__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__secret__id: secret_hash_id,
							gauze__secret__realm: "system",
							gauze__secret__agent_id: proxy_root_id,
							gauze__secret__agent_type: proxy_type,
							gauze__secret__value: hash,
							gauze__secret__kind: "hash",
							gauze__secret__name: "password",
						};
						const access_parameters = self.create_access_control(proxy_root_id, proxy_type, secret_hash_id, secret_type);
						const parameters = { attributes, ...access_parameters };
						return MODEL__SECRET__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
				];
				const agent_transactions = [
					function () {
						const access_parameters = self.create_access_control(agent_root_id, agent_root_type, agent_root_id, agent_root_type);
						const agent_parameters = { attributes: parameters.agent_root, ...access_parameters };
						return MODEL__AGENT_ROOT__MODEL__ENVIRONMENT.create(context, scope, agent_parameters);
					},
					function () {
						const access_parameters = self.create_access_control(agent_account_id, agent_account_type, agent_account_id, agent_account_type);
						const agent_parameters = { attributes: parameters.agent_account, ...access_parameters };
						return MODEL__AGENT_ACCOUNT__MODEL__ENVIRONMENT.create(context, scope, agent_parameters);
					},
					function () {
						const access_parameters = self.create_access_control(agent_user_id, agent_user_type, agent_user_id, agent_user_type);
						const agent_parameters = { attributes: parameters.agent_user, ...access_parameters };
						return MODEL__AGENT_USER__MODEL__ENVIRONMENT.create(context, scope, agent_parameters);
					},
					function () {
						const access_parameters = self.create_access_control(agent_person_id, agent_person_type, agent_person_id, agent_person_type);
						const agent_parameters = { attributes: parameters.agent_person, ...access_parameters };
						return MODEL__AGENT_PERSON__MODEL__ENVIRONMENT.create(context, scope, agent_parameters);
					},
					function () {
						const access_parameters = self.create_access_control(agent_character_id, agent_character_type, agent_character_id, agent_character_type);
						const agent_parameters = { attributes: parameters.agent_character, ...access_parameters };
						return MODEL__AGENT_CHARACTER__MODEL__ENVIRONMENT.create(context, scope, agent_parameters);
					},
				];
				const proxy_transactions = [
					function () {
						const attributes = {
							gauze__proxy__id: proxy_root_id,
							gauze__proxy__agent_type: agent_root_type,
							gauze__proxy__agent_id: agent_root_id,
							gauze__proxy__root_id: proxy_root_id,
							gauze__proxy__realms: JSON.stringify({ system: true }),
						};
						const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_root_id, proxy_type);
						const parameters = { attributes, ...access_parameters };
						return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__proxy__id: proxy_account_id,
							gauze__proxy__agent_type: agent_account_type,
							gauze__proxy__agent_id: agent_account_id,
							gauze__proxy__root_id: proxy_root_id,
							gauze__proxy__realms: JSON.stringify({ system: true }),
						};
						const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_account_id, proxy_type);
						const parameters = { attributes, ...access_parameters };
						return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__proxy__id: proxy_user_id,
							gauze__proxy__agent_type: agent_user_type,
							gauze__proxy__agent_id: agent_user_id,
							gauze__proxy__root_id: proxy_root_id,
							gauze__proxy__realms: JSON.stringify({ system: true }),
						};
						const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_user_id, proxy_type);
						const parameters = { attributes, ...access_parameters };
						return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__proxy__id: proxy_person_id,
							gauze__proxy__agent_type: agent_person_type,
							gauze__proxy__agent_id: agent_person_id,
							gauze__proxy__root_id: proxy_root_id,
							gauze__proxy__realms: JSON.stringify({ system: true }),
						};
						const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_person_id, proxy_type);
						const parameters = { attributes, ...access_parameters };
						return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__proxy__id: proxy_character_id,
							gauze__proxy__agent_type: agent_character_type,
							gauze__proxy__agent_id: agent_character_id,
							gauze__proxy__root_id: proxy_root_id,
							gauze__proxy__realms: JSON.stringify({ system: true }),
						};
						const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_character_id, proxy_type);
						const parameters = { attributes, ...access_parameters };
						return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
				];
				const link_transactions = [
					// proxy
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_root_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_account_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_account_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_root_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_root_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_person_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_person_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_root_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_account_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_user_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_user_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_account_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_person_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_character_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_character_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_person_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					// secret
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_root_id,
							gauze__relationship__to_type: secret_type,
							gauze__relationship__to_id: secret_salt_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: secret_type,
							gauze__relationship__from_id: secret_salt_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_root_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: proxy_type,
							gauze__relationship__from_id: proxy_root_id,
							gauze__relationship__to_type: secret_type,
							gauze__relationship__to_id: secret_hash_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
					function () {
						const attributes = {
							gauze__relationship__from_type: secret_type,
							gauze__relationship__from_id: secret_hash_id,
							gauze__relationship__to_type: proxy_type,
							gauze__relationship__to_id: proxy_root_id,
						};
						const parameters = { attributes };
						return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, scope, parameters);
					},
				];
				const transactions = secret_transactions.concat(agent_transactions, proxy_transactions, link_transactions);
				return Promise.all(
					transactions.map(function (f) {
						return f();
					}),
				).then(function (results) {
					// create a session now for the proxy root
					return self._create_proxy_session(context, scope, { session_id, proxy_id: proxy_root_id, agent_id: proxy_root_id, agent_type: proxy_type });
				});
			});
	}
	_create_proxy_session(context, scope, { session_id, proxy_id, agent_id, agent_type }) {
		const self = this;
		const session_realm = "proxy";
		const seed = randomBytes(64).toString("hex");
		const payload = {
			proxy_id: proxy_id,
			agent_id: agent_id,
			agent_type: agent_type,
			session_id: session_id,
			seed: seed,
		};
		return SIGN_PROXY_JWT__AUTHENTICATION__ENVIRONMENT(payload).then(function (jwt) {
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
			const access_parameters = self.create_session_access_control(proxy_id, self.proxy_type, session_id, self.session_type);
			const parameters = { attributes, ...access_parameters };
			return MODEL__SESSION__MODEL__ENVIRONMENT.create(context, scope, parameters).then(function (data) {
				return data[0];
			});
		});
	}
	_delete_proxy_session(context, scope, { session_id, agent_id, agent_type }) {
		// sign out of the root proxy
		const session_attributes = {
			gauze__session__id: session_id,
			gauze__session__agent_id: agent_id,
			gauze__session__agent_type: agent_type,
		};
		const session_parameters = { where: session_attributes };
		return MODEL__SESSION__MODEL__ENVIRONMENT.delete(context, scope, session_parameters).then(function (sessions) {
			if (sessions && sessions.length) {
				const session = sessions[0];
				return session;
			} else {
				throw new Error("Could not find proxy session to delete");
			}
		});
	}
	_create_environment_session(context, scope) {
		const session_id = uuidv4();
		const session_realm = "environment";
		const seed = randomBytes(64).toString("hex");
		const payload = {
			proxy_id: null,
			agent_id: null,
			agent_type: null,
			session_id: session_id,
			seed: seed,
		};
		return SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT(payload).then(function (jwt) {
			const attributes = {
				gauze__session__id: session_id,
				gauze__session__agent_type: null,
				gauze__session__agent_id: null,
				gauze__session__realm: session_realm,
				gauze__session__value: jwt,
				gauze__session__kind: "agent",
				gauze__session__data: "",
				gauze__session__seed: seed,
			};
			return MODEL__SESSION__MODEL__ENVIRONMENT.create_environment(context, scope, { attributes }).then(function (data) {
				return data[0];
			});
		});
	}
	_delete_environment_session(context, scope, session_id) {
		const session_attributes = {
			gauze__session__id: session_id,
		};
		const session_parameters = {
			where: session_attributes,
		};
		return MODEL__SESSION__MODEL__ENVIRONMENT.delete(context, scope, session_parameters);
	}
	enter_session(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const target_agent = parameters.proxy;
		// todo: put this value in a const file somewhere and reference it. it is also being used in server/http.js
		if (agent && agent.agent_id !== "null" && agent.agent_type !== "null") {
			throw new Error("Session cannot enter environment session");
		} else {
			if (target_agent) {
				throw new Error("Proxy agent cannot enter environment session");
			} else {
				return self._create_environment_session(context, scope);
			}
		}
	}
	exit_session(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const target_agent = parameters.proxy;

		if (agent) {
			if (target_agent) {
				throw new Error("Proxy agent cannot exit environment session");
			} else {
				if (agent.agent_type === null) {
					// exit the current session (agent.session_id), which is an environment session since the agent type is null
					return self._delete_environment_session(context, scope, agent.session_id);
				} else {
					throw new Error("Proxy session cannot exit environment session");
				}
			}
		} else {
			throw new Error("Session is required to exit environment session");
		}
	}
	exit_agent(context, scope, parameters) {
		const { agent } = context;
		const target_agent = parameters.proxy;

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
				return MODEL__PROXY__MODEL__ENVIRONMENT.read(context, scope, proxy_parameters).then(function (proxies) {
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
				const session_attributes = {
					gauze__session__agent_id: target_agent.gauze__proxy__agent_id,
					gauze__session__agent_type: target_agent.gauze__proxy__agent_type,
				};
				const session_parameters = {
					where: session_attributes,
				};
				return MODEL__SESSION__MODEL__ENVIRONMENT.delete(context, scope, session_parameters).then(function (agent_sessions) {
					return {
						...collection,
						agent_sessions,
					};
				});
			})
			.then(function (collection) {
				// return result from collection
				const { agent_sessions } = collection;
				if (!agent_sessions) throw new Error("Missing realm sessions dependency for return");
				return agent_sessions;
			});
	}
}

const CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT = new EnvironmentController();

export { CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT };
