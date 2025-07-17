import { GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { CONTROLLER__AGENT_USER__CONTROLLER__ENVIRONMENT } from "./../../../../controllers/agent_user.js";

const ASSERT__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_User__Assert",
	fields: {
		assert: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "assert";
			},
		},
	},
});

const REQUEST__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_User__Request",
	fields: {
		request: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "request";
			},
		},
	},
});

const VERIFY__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_User__Verify",
	fields: {
		password: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "verify";
			},
		},
	},
});

const MUTATION__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_User",
	fields: {
		assert: {
			type: ASSERT__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		request: {
			type: REQUEST__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		verify: {
			type: VERIFY__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

export { MUTATION__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
