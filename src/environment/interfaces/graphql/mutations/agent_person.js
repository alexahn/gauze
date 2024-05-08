import { GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { STEP__TYPE__ENVIRONMENT, CODE__TYPE__ENVIRONMENT } from "./../../../types.js";

import { CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT } from "./../../../controllers/agent_person.js";

const INPUT_AGENT_PERSON__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Environment_Mutation__Agent_Person",
	fields: $structure.entities.agent_person.database.graphql.ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__AGENT_PERSON__STRUCTURE,
});

const ASSERT__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Person__Assert",
	fields: {
		email: {
			type: STEP__TYPE__ENVIRONMENT,
			args: {
				agent_person: {
					type: INPUT_AGENT_PERSON__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "agent_person",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT.assert_email(
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

const REQUEST__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Person__Request",
	fields: {
		email: {
			type: STEP__TYPE__ENVIRONMENT,
			args: {
				agent_person: {
					type: INPUT_AGENT_PERSON__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "agent_person",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT.request_email(
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
		signup_email: {
			type: STEP__TYPE__ENVIRONMENT,
			args: {
				agent_person: {
					type: INPUT_AGENT_PERSON__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
					description: "agent_person",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT.request_signup_email(
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

const VERIFY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Person__Verify",
	fields: {
		email: {
			type: STEP__TYPE__ENVIRONMENT,
			args: {
				code: {
					type: CODE__TYPE__ENVIRONMENT,
					description: "code",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT.verify_email(
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
		signup_email: {
			type: STEP__TYPE__ENVIRONMENT,
			args: {
				code: {
					type: CODE__TYPE__ENVIRONMENT,
					description: "code",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__AGENT_PERSON__CONTROLLER__ENVIRONMENT.verify_signup_email(
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

const MUTATION__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Person",
	fields: {
		assert: {
			type: ASSERT__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		request: {
			type: REQUEST__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		verify: {
			type: VERIFY__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

export { MUTATION__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
