import { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";

import { MUTATION__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/root.js";
import { MUTATION__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/account.js";
import { MUTATION__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/user.js";
import { MUTATION__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/person.js";
import { MUTATION__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/character.js";

const MUTATION__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent",
	fields: {
		root: {
			type: MUTATION__AGENT_ROOT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		account: {
			type: MUTATION__AGENT_ACCOUNT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		user: {
			type: MUTATION__AGENT_USER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
		},
		person: {
			type: MUTATION__AGENT_PERSON__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		character: {
			type: MUTATION__AGENT_CHARACTER__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
		},
	},
});

export { MUTATION__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
