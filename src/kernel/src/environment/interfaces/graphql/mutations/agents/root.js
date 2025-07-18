import { GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { CONTROLLER__AGENT_ROOT__CONTROLLER__ENVIRONMENT } from "./../../../../controllers/agent_root.js";

const ASSERT__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Root__Assert",
	fields: {
		assert: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "assert";
			},
		},
	},
});

const REQUEST__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Root__Request",
	fields: {
		request: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "request";
			},
		},
	},
});

const VERIFY__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Root__Verify",
	fields: {
		password: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "verify";
			},
		},
	},
});

const MUTATION__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Root",
	fields: {
		assert: {
			type: ASSERT__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		request: {
			type: REQUEST__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		verify: {
			type: VERIFY__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

export { MUTATION__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
