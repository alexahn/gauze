import * as $kernel from "./../../kernel/index.js";
import * as $database from "./../../database/index.js";

import fs from "fs";
import path from "path";
const { randomBytes } = await import("node:crypto");

import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";

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
		if (parameters.agent) {
			// fetch the session according to session id in jwt
			// check that it is proxy type
			// use the proxy id to do a look up against proxy (where: {agent_type: agent.agent_type, agent_id: agent.agent_id, root_id: proxy.id})
			// if a record is found, then create a system realm session
		} else {
			const session_id = uuidv4();
			// create an environment session (agent_type and agent_id are null)
			const seed = randomBytes(64).toString("hex");
			// convert seed to hexadecimal or base64
			const secret = new TextEncoder().encode(seed);
			const alg = "HS256";
			const payload = {
				proxy_id: null,
				agent_id: null,
				agent_type: null,
				session_id: session_id,
				seed: seed,
			};
			new jose.SignJWT(payload)
				.setProtectedHeader({ alg })
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
									gauze__session__seed: "123",
								},
							},
						})
						.then(function (data) {
							console.log("reached");
							if (data.errors && data.errors.length) {
								console.log("errors", data.errors);
								throw data.errors;
							} else {
								console.log("data.data", data.data);
								return data.data.create_session[0];
							}
						});
				})
				.catch(function (err) {
					console.log(err);
				});
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
