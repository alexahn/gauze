import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInterfaceType } from "graphql";

import { create_fields_array } from "./../../utility.js";

import GraphQLDate from "graphql-date";

const TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = "RELATIONSHIP";

const METADATA_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: "id",
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new GraphQLObjectType({
	name: "Relationship__Metadata",
	description: "Relationship Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = {
	gauze__relationship__id: {
		type: GraphQLString,
		description: "_id",
	},
	gauze__relationship__created_at: {
		type: GraphQLDate,
		description: "created_at",
	},
	gauze__relationship__updated_at: {
		type: GraphQLDate,
		description: "updated_at",
	},
	gauze__relationship__deleted_at: {
		type: GraphQLDate,
		description: "deleted_at",
	},
	gauze__relationship__from_type: {
		type: GraphQLString,
		description: "from",
	},
	gauze__relationship__from_id: {
		type: GraphQLString,
		description: "from_id",
	},
	gauze__relationship__to_type: {
		type: GraphQLString,
		description: "to",
	},
	gauze__relationship__to_id: {
		type: GraphQLString,
		description: "to_id",
	},
};

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new GraphQLObjectType({
	name: "Relationship__Attributes",
	description: "Relationship Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new GraphQLObjectType({
	name: "Relationship_Query__Query",
	description: "Relationship Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new GraphQLObjectType({
	name: "Relationship_Mutation__Mutation",
	description: "Relationship Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new GraphQLObjectType({
	name: "Relationship_Query",
	description: "Relationship",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE = new GraphQLObjectType({
	name: "Relationship_Mutation",
	description: "Relationship",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
};
