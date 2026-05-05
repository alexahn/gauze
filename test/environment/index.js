import assert from "node:assert/strict";
import test from "node:test";

import * as $gauze from "./../../src/index.js";
import { CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT } from "./../../src/environment/controllers/environment.js";

const EXECUTE_GRAPHQL = $gauze.kernel.src.shell.graphql.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL;
const ENVIRONMENT_SCHEMA = $gauze.environment.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT;

test.describe("environment sign up validation", async function () {
	await test.it("rejects signup GraphQL operations missing required agent inputs", async function () {
		const data = await EXECUTE_GRAPHQL({
			schema: ENVIRONMENT_SCHEMA,
			context: {},
			operation: `
				mutation SignUpMissingAgentUser {
					environment {
						sign_up(
							agent_root: {},
							agent_account: {
								gauze__agent_account__password: "password"
							},
							agent_person: {},
							agent_character: {}
						) {
							gauze__session__id
						}
					}
				}
			`,
			operation_name: "SignUpMissingAgentUser",
			operation_variables: {},
		});

		assert.equal(data.errors.length, 1);
		assert.equal(data.errors[0].message, 'Field "sign_up" argument "agent_user" of type "Environment_Mutation__Agent_User!" is required, but it was not provided.');
		assert.equal(data.data, undefined);
	});

	await test.it("rejects direct controller calls missing required agent inputs", function () {
		assert.throws(function () {
			CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.sign_up(
				{},
				{},
				{
					agent_root: {},
					agent_account: {
						gauze__agent_account__password: "password",
					},
					agent_person: {},
					agent_character: {},
				},
			);
		}, /Field 'agent_user' is required/);
	});
});
