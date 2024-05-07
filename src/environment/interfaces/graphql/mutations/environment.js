import { GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import * as $structure from "./../../../../structure/index.js";

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
				return {};
			},
		},
		signout: {
			type: SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			args: {},
			resolve: function (source, args, context) {
				return {};
			},
		},
		signup: {
			type: SESSION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			args: {
				root: {
					type: INPUT_AGENT_ROOT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "root",
				},
				account: {
					type: INPUT_AGENT_ACCOUNT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "account",
				},
				user: {
					type: INPUT_AGENT_USER__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "user",
				},
				person: {
					type: INPUT_AGENT_PERSON__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "person",
				},
				character: {
					type: INPUT_AGENT_CHARACTER__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "character",
				},
			},
			resolve: function (source, args, context) {
				return {};
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
				return {};
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
				return {};
			},
		},
	},
});

export { ENVIRONMENT__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
