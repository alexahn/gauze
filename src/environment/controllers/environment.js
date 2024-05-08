import * as $kernel from "./../../kernel/index.js";
import * as $database from "./../../database/index.js";

import fs from "fs";
import path from "path";
const { randomBytes } = await import("node:crypto");

import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";

import { SIGN_ENVIRONMENT_JWT__AUTHENTICATION__ENVIRONMENT, SIGN_SYSTEM_JWT__AUTHENTICATION__ENVIRONMENT } from "./../authentication.js";

import { MODEL__SECRET__MODEL__ENVIRONMENT } from "./../models/secret.js";
import { MODEL__SESSION__MODEL__ENVIRONMENT } from "./../models/session.js";
import { MODEL__PROXY__MODEL__ENVIRONMENT } from "./../models/proxy.js";

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
		console.log("context.agent", context.agent);
		if (parameters.agent) {
			// fetch the session according to session id in jwt
			// check that it is proxy type
			// use the proxy id to do a look up against proxy (where: {agent_type: agent.agent_type, agent_id: agent.agent_id, root_id: proxy.id})
			// if a record is found, then create a system realm session
		} else {
			const session_id = uuidv4();
			const seed = randomBytes(64).toString("hex");
			// convert seed to hexadecimal or base64
			/*
			const secret = new TextEncoder().encode(process.env.GAUZE_ENVIRONMENT_JWT_SECRET);
			const header = {
				alg: "HS256",
			};
			*/
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
					gauze__session__realm: "environment",
					gauze__session__value: jwt,
					gauze__session__kind: "agent",
					gauze__session__data: "",
					gauze__session__seed: seed,
				};
				return MODEL__SESSION__MODEL__ENVIRONMENT.create(context, { attributes }).then(function (data) {
					return data[0];
				});
			});
			/*
			return (
				new jose.SignJWT(payload)
					.setProtectedHeader(header)
					.setIssuedAt()
					.setIssuer("gauze")
					//.setAudience('urn:example:audience')
					.setExpirationTime("2h")
					.sign(secret)
					.then(function (jwt) {
						console.log("jwt", jwt);
						const operation = fs.readFileSync(path.resolve(import.meta.dirname, "./operations/session_create.graphql"), {
							encoding: "utf8",
						});
						return $kernel.shell.graphql
							.EXECUTE__GRAPHQL__SHELL__KERNEL({
								schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
								context: context,
								operation: operation,
								operation_name: "CreateSession",
								operation_variables: {
									attributes: {
										gauze__session__id: session_id,
										gauze__session__agent_type: null,
										gauze__session__agent_id: null,
										gauze__session__realm: "environment",
										gauze__session__value: jwt,
										gauze__session__kind: "agent",
										gauze__session__data: "",
										gauze__session__seed: seed,
									},
								},
							})
							.then(function (data) {
								if (data.errors && data.errors.length) {
									throw data.errors;
								} else {
									console.log("data.data", JSON.stringify(data.data, null, 4));
									return data.data.create_session[0].attributes;
								}
							});
					})
			);
			*/
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
