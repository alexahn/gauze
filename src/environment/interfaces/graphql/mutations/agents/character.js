import { GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { CONTROLLER__AGENT_CHARACTER__CONTROLLER__ENVIRONMENT } from "./../../../../controllers/agent_character.js";

const ASSERT__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Character__Assert",
	fields: {
		assert: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "assert";
			},
		},
	},
});

const REQUEST__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Character__Request",
	fields: {
		request: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "request";
			},
		},
	},
});

const VERIFY__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Character__Verify",
	fields: {
		password: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "verify";
			},
		},
	},
});

const MUTATION__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Character",
	fields: {
		assert: {
			type: ASSERT__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		request: {
			type: REQUEST__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		verify: {
			type: VERIFY__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

export { MUTATION__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
