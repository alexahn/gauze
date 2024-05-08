import { GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLInputObjectType } from "graphql";

const STEP__TYPE__ENVIRONMENT = new GraphQLObjectType({
	name: "Step",
	fields: {
		success: {
			type: GraphQLBoolean,
		},
	},
});

const CODE__TYPE__ENVIRONMENT = new GraphQLInputObjectType({
	name: "Code",
	fields: {
		code: {
			type: GraphQLString,
		},
	},
});

export { STEP__TYPE__ENVIRONMENT };
