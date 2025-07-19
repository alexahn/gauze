import { GraphQLSchema, GraphQLString, GraphQLObjectType } from "graphql";

import { MUTATION__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./mutations/agent.js";

import { MUTATION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./mutations/environment.js";

import { MUTATION__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT } from "./mutations/realm.js";

import { READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT } from "./queries/proxy.js";

const QUERY_TYPE = new GraphQLObjectType({
	name: "Query",
	fields: {
		proxy: READ__PROXY__QUERY__GRAPHQL__INTERFACE__ENVIRONMENT,
	},
});

const MUTATION_TYPE = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		agent: {
			type: MUTATION__AGENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		environment: {
			type: MUTATION__ENVIRONMENT__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
		realm: {
			type: MUTATION__REALM__MUTATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			resolve: function (source, args, context) {
				return {};
			},
		},
	},
});

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT };
