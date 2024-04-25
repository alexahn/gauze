import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInterfaceType } from "graphql";

import { create_fields_array } from "./../../utility.js";

import GraphQLDate from "graphql-date";

const TYPE__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = "aaf5342ac38d41a6a02bb81d2d2b21a4";

const METADATA_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: "id",
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new GraphQLObjectType({
	name: "6b95d174a16f4ddd935ff3a802f7c7bc__Metadata",
	description: "6b95d174a16f4ddd935ff3a802f7c7bc Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {
	gauze__1543731262804f64adcc0eae1a225acc__id: {
		type: GraphQLString,
		description: "id",
	},
	gauze__1543731262804f64adcc0eae1a225acc__created_at: {
		type: GraphQLDate,
		description: "created_at",
	},
	gauze__1543731262804f64adcc0eae1a225acc__updated_at: {
		type: GraphQLDate,
		description: "updated_at",
	},
	gauze__1543731262804f64adcc0eae1a225acc__deleted_at: {
		type: GraphQLDate,
		description: "deleted_at",
	},
	// FIELDS HERE
};

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = create_fields_array(
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
);

const ATTRIBUTES__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new GraphQLObjectType({
	name: "6b95d174a16f4ddd935ff3a802f7c7bc__Attributes",
	description: "6b95d174a16f4ddd935ff3a802f7c7bc Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new GraphQLObjectType({
	name: "6b95d174a16f4ddd935ff3a802f7c7bc_Query__Query",
	description: "6b95d174a16f4ddd935ff3a802f7c7bc Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new GraphQLObjectType({
	name: "6b95d174a16f4ddd935ff3a802f7c7bc_Mutation__Mutation",
	description: "6b95d174a16f4ddd935ff3a802f7c7bc Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new GraphQLObjectType({
	name: "6b95d174a16f4ddd935ff3a802f7c7bc_Query",
	description: "6b95d174a16f4ddd935ff3a802f7c7bc",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE = new GraphQLObjectType({
	name: "6b95d174a16f4ddd935ff3a802f7c7bc_Mutation",
	description: "6b95d174a16f4ddd935ff3a802f7c7bc",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__aaf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
};
