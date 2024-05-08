import { GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import * as $structure from "./../../../../structure/index.js";

import { CONTROLLER__ENVIRONMENT__CONTROLLER__ENVIRONMENT } from "./../../../controllers/environment.js";

const SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Environment_Mutation__Session",
	fields: $structure.entities.session.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__SESSION__STRUCTURE,
});

const INPUT_PROXY__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Proxy",
	fields: $structure.entities.proxy.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__PROXY__STRUCTURE,
});

const INPUT_AGENT_ROOT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Root",
	fields: $structure.entities.agent_root.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_ROOT__STRUCTURE,
});

const INPUT_AGENT_ACCOUNT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Account",
	fields: $structure.entities.agent_account.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_ACCOUNT__STRUCTURE,
});

const INPUT_AGENT_USER__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_User",
	fields: $structure.entities.agent_user.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_USER__STRUCTURE,
});

const INPUT_AGENT_PERSON__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Person",
	fields: $structure.entities.agent_person.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const INPUT_AGENT_CHARACTER__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Character",
	fields: $structure.entities.agent_character.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
});

const ENVIRONMENT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Environment",
	fields: {
		signin: {
			type: SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
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
			type: SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
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
			type: SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			args: {
				agent_root: {
					type: INPUT_AGENT_ROOT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "agent_root",
				},
				agent_account: {
					type: INPUT_AGENT_ACCOUNT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "agent_account",
				},
				agent_user: {
					type: INPUT_AGENT_USER__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "agent_user",
				},
				agent_person: {
					type: INPUT_AGENT_PERSON__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "agent_person",
				},
				agent_character: {
					type: INPUT_AGENT_CHARACTER__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
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
			type: SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			args: {
				proxy: {
					type: INPUT_PROXY__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
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
			type: SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			args: {
				proxy: {
					type: INPUT_PROXY__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
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

export { ENVIRONMENT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
