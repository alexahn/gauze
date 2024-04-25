import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInterfaceType } from "graphql";

import { create_fields_array } from "./../../utility.js";

import GraphQLDate from "graphql-date";

const TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = "WHITELIST";

const METADATA_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: "id",
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: "type",
	},
};

const METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new GraphQLObjectType({
	name: "Whitelist__Metadata",
	description: "Whitelist Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = {
	gauze__whitelist__id: {
		type: GraphQLString,
		description: "id",
	},
	gauze__whitelist__created_at: {
		type: GraphQLDate,
		description: "created_at",
	},
	gauze__whitelist__updated_at: {
		type: GraphQLDate,
		description: "updated_at",
	},
	gauze__whitelist__deleted_at: {
		type: GraphQLDate,
		description: "deleted_at",
	},
	gauze__whitelist__realm: {
		type: GraphQLString,
		description: "realm",
	},
	gauze__whitelist__agent_role: {
		type: GraphQLString,
		description: "agent_role",
	},
	gauze__whitelist__agent_type: {
		type: GraphQLString,
		description: "agent_type",
	},
	gauze__whitelist__agent_id: {
		type: GraphQLString,
		description: "agent_id",
	},
	gauze__whitelist__entity_type: {
		type: GraphQLString,
		description: "entity_type",
	},
	gauze__whitelist__entity_id: {
		type: GraphQLString,
		description: "entity_id",
	},
};

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE);

const ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new GraphQLObjectType({
	name: "Whitelist__Attributes",
	description: "Whitelist Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new GraphQLObjectType({
	name: "Whitelist_Query__Query",
	description: "Whitelist Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new GraphQLObjectType({
	name: "Whitelist_Mutation__Mutation",
	description: "Whitelist Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
});

const QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new GraphQLObjectType({
	name: "Whitelist_Query",
	description: "Whitelist",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE = new GraphQLObjectType({
	name: "Whitelist_Mutation",
	description: "Whitelist",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	METADATA__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	ATTRIBUTES__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	QUERY_QUERY__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__WHITELIST__STRUCTURE,
};
