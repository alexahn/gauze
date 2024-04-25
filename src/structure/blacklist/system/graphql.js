import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInterfaceType } from "graphql";

import { create_fields_array } from "./../../utility.js";

import GraphQLDate from "graphql-date";

const TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = "BLACKLIST";

const METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: "id",
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: "type",
	},
};

const METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new GraphQLObjectType({
	name: "Blacklist__Metadata",
	description: "Blacklist Metadata",
	fields: () => METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {
	gauze__blacklist__id: {
		type: GraphQLString,
		description: "id",
	},
	gauze__blacklist__created_at: {
		type: GraphQLDate,
		description: "created_at",
	},
	gauze__blacklist__updated_at: {
		type: GraphQLDate,
		description: "updated_at",
	},
	gauze__blacklist__deleted_at: {
		type: GraphQLDate,
		description: "deleted_at",
	},
	gauze__blacklist__realm: {
		type: GraphQLString,
		description: "realm",
	},
	gauze__blacklist__agent_role: {
		type: GraphQLString,
		description: "agent_role",
	},
	gauze__blacklist__agent_type: {
		type: GraphQLString,
		description: "agent_type",
	},
	gauze__blacklist__agent_id: {
		type: GraphQLString,
		description: "agent_id",
	},
	gauze__blacklist__entity_type: {
		type: GraphQLString,
		description: "entity_type",
	},
	gauze__blacklist__entity_id: {
		type: GraphQLString,
		description: "entity_id",
	},
};

const ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = create_fields_array(ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE);

const ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new GraphQLObjectType({
	name: "Blacklist__Attributes",
	description: "Blacklist Attributes",
	fields: () => ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {};

const QUERY_QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new GraphQLObjectType({
	name: "Blacklist_Query__Query",
	description: "Blacklist Query Query",
	fields: () => QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = {};

const MUTATION_MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new GraphQLObjectType({
	name: "Blacklist_Mutation__Mutation",
	description: "Blacklist Mutation Mutation",
	fields: () => MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
});

const QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new GraphQLObjectType({
	name: "Blacklist_Query",
	description: "Blacklist",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "attributes",
		},
		query: {
			type: QUERY_QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "query",
		},
	}),
});

const MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE = new GraphQLObjectType({
	name: "Blacklist_Mutation",
	description: "Blacklist",
	fields: () => ({
		metadata: {
			type: METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "metadata",
		},
		attributes: {
			type: ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "attributes",
		},
		mutation: {
			type: MUTATION_MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
			description: "mutation",
		},
	}),
});

export {
	TYPE__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	METADATA__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	METADATA_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	ATTRIBUTES__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	ATTRIBUTES_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	ATTRIBUTES_FIELDS_ARRAY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY_QUERY__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	MUTATION_MUTATION__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__BLACKLIST__STRUCTURE,
};
