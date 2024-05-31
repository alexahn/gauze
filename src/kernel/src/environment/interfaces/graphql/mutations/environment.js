import * as $structure from "./../../../../structure/index.js";

import { GraphQLList, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

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
		sign_in: {
			type: SESSION__TYPE__ENVIRONMENT,
			args: {},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.sign_in(
					context,
					{
						source
					},
					args,
				);
			},
		},
		sign_out: {
			type: new GraphQLList(SESSION__TYPE__ENVIRONMENT),
			args: {},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.sign_out(
					context,
					{
						source
					},
					args,
				);
			},
		},
		sign_up: {
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
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.sign_up(
					context,
					{
						source
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
					context,
					{
						source
					},
					args,
				);
			},
		},
		exit_session: {
			type: new GraphQLList(SESSION__TYPE__ENVIRONMENT),
			args: {
				proxy: {
					type: INPUT_PROXY__TYPE__ENVIRONMENT,
					description: "proxy",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT.exit_session(
					context,
					{
						source
					},
					args,
				);
			},
		},
	},
});

export { MUTATION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
