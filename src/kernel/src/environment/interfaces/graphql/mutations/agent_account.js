import { GraphQLString, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

import { STEP__TYPE__ENVIRONMENT, INPUT_CODE__TYPE__ENVIRONMENT, INPUT_AGENT_ACCOUNT__TYPE__ENVIRONMENT } from "./../../../types.js";

import { CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT } from "./../../../controllers/agent_account.js";

/*
const ASSERT__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Account__Assert",
	fields: {
		assert: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "assert";
			},
		},
	},
});

const REQUEST__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Account__Request",
	fields: {
		request: {
			type: GraphQLString,
			resolve: function (source, args, context) {
				return "request";
			},
		},
	},
});
*/

const VERIFY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Account__Verify",
	fields: {
		password: {
			type: STEP__TYPE__ENVIRONMENT,
			args: {
				agent_account: {
					type: INPUT_AGENT_ACCOUNT__TYPE__ENVIRONMENT,
					description: "agent_account",
				},
			},
			resolve: function (source, args, context) {
				return CONTROLLER__AGENT_ACCOUNT__CONTROLLER__ENVIRONMENT.verify_password(
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

const MUTATION__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent_Account",
	fields: {
		/*
		assert: {
			type: ASSERT__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		request: {
			type: REQUEST__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		*/
		verify: {
			type: VERIFY__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

export { MUTATION__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
