import { GraphQLSchema, GraphQLString, GraphQLObjectType } from "graphql";

const QUERY_TYPE = new GraphQLObjectType({
	name: "Query",
	fields: {
		read: {
			type: GraphQLString,
		},
	},
});

const MUTATION_TYPE = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		write: {
			type: GraphQLString,
		},
	},
});

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__ENVIRONMENT };
