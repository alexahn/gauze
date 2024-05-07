import { GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

const ASSERT__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
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

const REQUEST__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
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

const VERIFY__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Root__Verify",
	fields: {
		verify: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "verify";
			},
		},
	},
});

const ROOT__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Root",
	fields: {
		assert: {
			type: ASSERT__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		request: {
			type: REQUEST__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		verify: {
			type: VERIFY__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

export { ROOT__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
