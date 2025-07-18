import { GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";

import { MUTATION__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/root.js";
import { MUTATION__ACCOUNT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/account.js";
import { MUTATION__USER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/user.js";
import { MUTATION__PERSON__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/person.js";
import { MUTATION__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./agents/character.js";

const MUTATION__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLObjectType({
	name: "Agent",
	fields: {
		root: {
			type: MUTATION__ROOT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		account: {
			type: MUTATION__ACCOUNT__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		user: {
			type: MUTATION__USER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		person: {
			type: MUTATION__PERSON__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		character: {
			type: MUTATION__CHARACTER__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

export { MUTATION__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT };
