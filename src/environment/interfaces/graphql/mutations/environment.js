import * as $structure from "./../../../../structure/index.js";

import { GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import {
	SESSION__TYPE__ENVIRONMENT,
	INPUT_PROXY__TYPE__ENVIRONMENT,
	INPUT_AGENT_ROOT__TYPE__ENVIRONMENT,
	INPUT_AGENT_ACCOUNT__TYPE__ENVIRONMENT,
	INPUT_AGENT_USER__TYPE__ENVIRONMENT,
	INPUT_AGENT_PERSON__TYPE__ENVIRONMENT,
	INPUT_AGENT_CHARACTER__TYPE__ENVIRONMENT,
} from "./../../../types.js";

import { CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT } from "./../../../controllers/environment.js";

const MUTATION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Environment",
	fields: {
		signin: {
			type: SESSION__TYPE__ENVIRONMENT,
			args: {},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.signin(
					{
						source: source,
						database: context.database,
						transaction: context.transaction,
						agent: context.agent,
					},
					args,
				);
			},
		},
		signout: {
			type: SESSION__TYPE__ENVIRONMENT,
			args: {},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.signout(
					{
						source: source,
						database: context.database,
						transaction: context.transaction,
						agent: context.agent,
					},
					args,
				);
			},
		},
		signup: {
			type: SESSION__TYPE__ENVIRONMENT,
			args: {
				agent_root: {
					type: INPUT_AGENT_ROOT__TYPE__ENVIRONMENT,
					description: "agent_root",
				},
				agent_account: {
					type: INPUT_AGENT_ACCOUNT__TYPE__ENVIRONMENT,
					description: "agent_account",
				},
				agent_user: {
					type: INPUT_AGENT_USER__TYPE__ENVIRONMENT,
					description: "agent_user",
				},
				agent_person: {
					type: INPUT_AGENT_PERSON__TYPE__ENVIRONMENT,
					description: "agent_person",
				},
				agent_character: {
					type: INPUT_AGENT_CHARACTER__TYPE__ENVIRONMENT,
					description: "agent_character",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.signup(
					{
						source: source,
						database: context.database,
						transaction: context.transaction,
						agent: context.agent,
					},
					args,
				);
			},
		},
		enter_session: {
			type: SESSION__TYPE__ENVIRONMENT,
			args: {
				proxy: {
					type: INPUT_PROXY__TYPE__ENVIRONMENT,
					description: "proxy",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.enter_session(
					{
						source: source,
						database: context.database,
						transaction: context.transaction,
						agent: context.agent,
					},
					args,
				);
			},
		},
		exit_session: {
			type: SESSION__TYPE__ENVIRONMENT,
			args: {
				proxy: {
					type: INPUT_PROXY__TYPE__ENVIRONMENT,
					description: "proxy",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.exit_session(
					{
						source: source,
						database: context.database,
						transaction: context.transaction,
						agent: context.agent,
					},
					args,
				);
			},
		},
	},
});

export { MUTATION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
