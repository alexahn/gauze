import * as $abstract from "./../../abstract/index.js";
import * as $kernel from "./../../kernel/index.js";
import * as $database from "./../../database/index.js";

const { randomBytes, pbkdf2 } = await import("node:crypto");

import { v4 as uuidv4 } from "uuid";

import { SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT, SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT } from "./../authentication.js";

import { MODEL__RELATIONSHIP__MODEL__ENVIRONMENT } from "./../models/relationship.js";

import { MODEL__SECRET__MODEL__ENVIRONMENT } from "./../models/secret.js";
import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";
import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../models/proxy.js";

import { MODEL__AGENT_ROOT__MODEL__ENVIRONMENT } from "./../models/agent_root.js";
import { MODEL__AGENT_ACCOUNT__MODEL__ENVIRONMENT } from "./../models/agent_account.js";
import { MODEL__AGENT_USER__MODEL__ENVIRONMENT } from "./../models/agent_user.js";
import { MODEL__AGENT_PERSON__MODEL__ENVIRONMENT } from "./../models/agent_person.js";
import { MODEL__AGENT_CHARACTER__MODEL__ENVIRONMENT } from "./../models/agent_character.js";

class EnvironmentController {
	constructor() {
		const self = this;
		self.proxy_type = $abstract.entities.proxy.default($abstract).table_name;
		self.session_type = $abstract.entities.session.default($abstract).table_name;
	}
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
		parameters.whitelist_delete = {
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: agent_type,
			gauze__whitelist__agent_id: agent_id,
			gauze__whitelist__entity_type: entity_type,
			gauze__whitelist__entity_id: entity_id,
			gauze__whitelist__method: "delete",
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
		return parameters;
	}
	signup(context, parameters) {
		const self = this;
		/*
			verify context.authorization with the environment jwt secret
			get the session id that is inside the public payload and retrieve it
			check the data field and compare it to the required set (e.g. verifying an email address before we create the person agent)
			if all required verifications have passed, then create a proxy
			call an operation that will create root, account, user, person, character
		*/
		// the only part that is special logic is creating the salt and hash and create a secret that is associated with agent_account
		// also delete parameters.agent_account.password after we are done with it
		// create relationships at the end for everything
		if (!parameters.agent_account || !parameters.agent_account.gauze__agent_account__password) throw new Error("Field 'agent_account.password' is required");
		// generate a salt here using crypto.randomBytes
		const salt = randomBytes(128).toString("hex");
		return new Promise(function (resolve, reject) {
			// 64 byte length hash generated
			pbkdf2(parameters.agent_account.gauze__agent_account__password, salt, 524288, 128, "sha512", function (err, hash) {
				if (err) return reject(err);
				console.log("hash", hash);
				delete parameters.agent_account.gauze__agent_account__password;
				return resolve(hash);
			});
		}).then(function (hash) {
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
					return MODEL__SECRET__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__secret__id: secret_hash_id,
						gauze__secret__realm: "system",
						gauze__secret__agent_id: proxy_root_id,
						gauze__secret__agent_type: proxy_type,
						gauze__secret__value: hash.toString("hex"),
						gauze__secret__kind: "hash",
						gauze__secret__name: "password",
					};
					const access_parameters = self.create_access_control(proxy_root_id, proxy_type, secret_hash_id, secret_type);
					const parameters = { attributes, ...access_parameters };
					return MODEL__SECRET__MODEL__ENVIRONMENT.create(context, parameters);
				},
			];
			const agent_transactions = [
				function () {
					const access_parameters = self.create_access_control(agent_root_id, agent_root_type, agent_root_id, agent_root_type);
					const agent_parameters = { attributes: parameters.agent_root, ...access_parameters };
					return MODEL__AGENT_ROOT__MODEL__ENVIRONMENT.create(context, agent_parameters);
				},
				function () {
					const access_parameters = self.create_access_control(agent_account_id, agent_account_type, agent_account_id, agent_account_type);
					const agent_parameters = { attributes: parameters.agent_account, ...access_parameters };
					return MODEL__AGENT_ACCOUNT__MODEL__ENVIRONMENT.create(context, agent_parameters);
				},
				function () {
					const access_parameters = self.create_access_control(agent_user_id, agent_user_type, agent_user_id, agent_user_type);
					const agent_parameters = { attributes: parameters.agent_user, ...access_parameters };
					return MODEL__AGENT_USER__MODEL__ENVIRONMENT.create(context, agent_parameters);
				},
				function () {
					const access_parameters = self.create_access_control(agent_person_id, agent_person_type, agent_person_id, agent_person_type);
					const agent_parameters = { attributes: parameters.agent_person, ...access_parameters };
					return MODEL__AGENT_PERSON__MODEL__ENVIRONMENT.create(context, agent_parameters);
				},
				function () {
					const access_parameters = self.create_access_control(agent_character_id, agent_character_type, agent_character_id, agent_character_type);
					const agent_parameters = { attributes: parameters.agent_character, ...access_parameters };
					return MODEL__AGENT_CHARACTER__MODEL__ENVIRONMENT.create(context, agent_parameters);
				},
			];
			const proxy_transactions = [
				function () {
					const attributes = {
						gauze__proxy__id: proxy_root_id,
						gauze__proxy__agent_type: agent_root_type,
						gauze__proxy__agent_id: agent_root_id,
						gauze__proxy__root_id: proxy_root_id,
					};
					const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_root_id, proxy_type);
					const parameters = { attributes, ...access_parameters };
					return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__proxy__id: proxy_account_id,
						gauze__proxy__agent_type: agent_account_type,
						gauze__proxy__agent_id: agent_account_id,
						gauze__proxy__root_id: proxy_root_id,
					};
					const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_account_id, proxy_type);
					const parameters = { attributes, ...access_parameters };
					return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__proxy__id: proxy_user_id,
						gauze__proxy__agent_type: agent_user_type,
						gauze__proxy__agent_id: agent_user_id,
						gauze__proxy__root_id: proxy_root_id,
					};
					const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_user_id, proxy_type);
					const parameters = { attributes, ...access_parameters };
					return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__proxy__id: proxy_person_id,
						gauze__proxy__agent_type: agent_person_type,
						gauze__proxy__agent_id: agent_person_id,
						gauze__proxy__root_id: proxy_root_id,
					};
					const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_person_id, proxy_type);
					const parameters = { attributes, ...access_parameters };
					return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__proxy__id: proxy_character_id,
						gauze__proxy__agent_type: agent_character_type,
						gauze__proxy__agent_id: agent_character_id,
						gauze__proxy__root_id: proxy_root_id,
					};
					const access_parameters = self.create_access_control(proxy_root_id, proxy_type, proxy_character_id, proxy_type);
					const parameters = { attributes, ...access_parameters };
					return MODEL__PROXY__MODEL__ENVIRONMENT.create(context, parameters);
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
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_account_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_root_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_root_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_person_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_person_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_root_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_account_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_user_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_user_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_account_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_person_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_character_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_character_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_person_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
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
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: secret_type,
						gauze__relationship__from_id: secret_salt_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_root_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_root_id,
						gauze__relationship__to_type: secret_type,
						gauze__relationship__to_id: secret_hash_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: secret_type,
						gauze__relationship__from_id: secret_hash_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_root_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				// session
				function () {
					const attributes = {
						gauze__relationship__from_type: proxy_type,
						gauze__relationship__from_id: proxy_root_id,
						gauze__relationship__to_type: session_type,
						gauze__relationship__to_id: session_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
				function () {
					const attributes = {
						gauze__relationship__from_type: session_type,
						gauze__relationship__from_id: session_id,
						gauze__relationship__to_type: proxy_type,
						gauze__relationship__to_id: proxy_root_id,
					};
					const parameters = { attributes };
					return MODEL__RELATIONSHIP__MODEL__ENVIRONMENT.create(context, parameters);
				},
			];
			const transactions = secret_transactions.concat(agent_transactions, proxy_transactions, link_transactions);
			return Promise.all(
				transactions.map(function (f) {
					return f();
				}),
			).then(function (results) {
				// create a session now for the proxy root
				return self._create_system_session(context, session_id, proxy_root_id, proxy_root_id, proxy_type);
			});
		});
	}
	_create_system_session(context, session_id, proxy_id, agent_id, agent_type) {
		const self = this;
		const session_realm = "system";
		const seed = randomBytes(64).toString("hex");
		const payload = {
			proxy_id: proxy_id,
			agent_id: agent_id,
			agent_type: agent_type,
			session_id: session_id,
			seed: seed,
		};
		return SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT(payload).then(function (jwt) {
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
			const access_parameters = self.create_access_control(proxy_id, self.proxy_type, session_id, self.session_type);
			const parameters = { attributes, ...access_parameters };
			return MODEL__SESSION__MODEL__ENVIRONMENT.create_environment(context, { attributes }).then(function (data) {
				return data[0];
			});
		});
	}
	_create_environment_session(context) {
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
			return MODEL__SESSION__MODEL__ENVIRONMENT.create_environment(context, { attributes }).then(function (data) {
				return data[0];
			});
		});
	}
	enter_session(context, parameters) {
		/*
			the current session must be the proxy or null session for this to complete
			use the agent argument to generate an isolated session for the agent
		*/
		const self = this;
		console.log("context.agent", context.agent);
		if (parameters.agent) {
			if (parameters.agent.session_id) {
				// fetch the session according to session id in jwt
				// check that it is proxy type
				// use the proxy id to do a look up against proxy (where: {agent_type: agent.agent_type, agent_id: agent.agent_id, root_id: proxy.id})
				// if a record is found, then create a system realm session
			} else {
				throw new Error("Agent is missing session id");
			}
		} else {
			return self._create_environment_session(context);
		}
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
