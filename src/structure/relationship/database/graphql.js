import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInterfaceType
} from 'graphql';

import GraphQLDate from 'graphql-date'

const GRAPHQL_DATABASE_RELATIONSHIP_TYPE_STRUCTURE = 'RELATIONSHIP'

const GRAPHQL_DATABASE_RELATIONSHIP_METADATA_FIELDS_STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'id'
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'type'
	}
}

const GRAPHQL_DATABASE_RELATIONSHIP_METADATA_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship__Metadata',
	description: 'Relationship Metadata',
	fields: () => (GRAPHQL_DATABASE_RELATIONSHIP_METADATA_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE = {
	_id: {
		type: GraphQLString,
		description: '_id'
	},
	_created_at: {
		type: GraphQLDate,
		description: 'created_at'
	},
	_updated_at: {
		type: GraphQLDate,
		description: 'updated_at'
	},
	_deleted_at: {
		type: GraphQLDate,
		description: 'deleted_at'
	},
	_from_type: {
		type: GraphQLString,
		description: 'from'
	},
	_from_id: {
		type: GraphQLString,
		description: 'from_id'
	},
	_to_type: {
		type: GraphQLString,
		description: 'to'
	},
	_to_id: {
		type: GraphQLString,
		description: 'to_id'
	}
}

const GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship__Attributes',
	description: 'Relationship Attributes',
	fields: () => (GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_RELATIONSHIP_QUERY_QUERY_FIELDS_STRUCTURE = {}

const GRAPHQL_DATABASE_RELATIONSHIP_QUERY_QUERY_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship_Query__Query',
	description: 'Relationship Query Query',
	fields: () => (GRAPHQL_DATABASE_RELATIONSHIP_QUERY_QUERY_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_MUTATION_FIELDS_STRUCTURE = {}

const GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_MUTATION_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship_Mutation__Mutation',
	description: 'Relationship Mutation Mutation',
	fields: () => (GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_MUTATION_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_RELATIONSHIP_QUERY_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship_Query',
	description: 'Relationship',
	fields: () => ({
		metadata: {
			type: GRAPHQL_DATABASE_RELATIONSHIP_METADATA_STRUCTURE,
			description: 'metadata'
		},
		attributes: {
			type: GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_STRUCTURE,
			description: 'attributes'
		},
		query: {
			type: GRAPHQL_DATABASE_RELATIONSHIP_QUERY_QUERY_STRUCTURE,
			description: 'query'
		}
	})
})

const GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship_Mutation',
	description: 'Relationship',
	fields: () => ({
		metadata: {
			type: GRAPHQL_DATABASE_RELATIONSHIP_METADATA_STRUCTURE,
			description: 'metadata'
		},
		attributes: {
			type: GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_STRUCTURE,
			description: 'attributes'
		},
		mutation: {
			type: GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_MUTATION_STRUCTURE,
			description: 'mutation'
		}
	})
})

export {
	GRAPHQL_DATABASE_RELATIONSHIP_QUERY_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_TYPE_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_METADATA_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_METADATA_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_QUERY_QUERY_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_QUERY_QUERY_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_MUTATION_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_MUTATION_MUTATION_FIELDS_STRUCTURE
}