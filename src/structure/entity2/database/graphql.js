import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType
} from 'graphql';

import GraphQLDate from 'graphql-date'

const GRAPHQL_DATABASE_ENTITY2_TYPE_STRUCTURE = 'ENTITY2'

const GRAPHQL_DATABASE_ENTITY2_METADATA_FIELDS_STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'id'
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'type'
	}
}

const GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Metadata',
	description: 'Entity2 Metadata',
	fields: () => (GRAPHQL_DATABASE_ENTITY2_METADATA_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE = {
	id: {
		type: GraphQLString,
		description: 'id'
	},
	created_at: {
		type: GraphQLDate,
		description: 'created_at'
	},
	updated_at: {
		type: GraphQLDate,
		description: 'updated_at'
	},
	text: {
		type: GraphQLString,
		description: 'text'
	}
}

const GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Attributes',
	description: 'Entity2 Attributes',
	fields: () => (GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE)
})


const GRAPHQL_DATABASE_ENTITY2_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE,
		description: 'Entity2 Query Metadata'
	},
	//read_entity2: ENTITY2_READ_QUERY
}

const GRAPHQL_DATABASE_ENTITY2_QUERY_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Query_Relationships',
	description: 'Entity2 Query Relationships',
	fields: () => (GRAPHQL_DATABASE_ENTITY2_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY2_QUERY_QUERY_FIELDS_STRUCTURE = {}

const GRAPHQL_DATABASE_ENTITY2_QUERY_QUERY_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Query_Query',
	description: 'Entity2 Query Query',
	fields: () => (GRAPHQL_DATABASE_ENTITY2_QUERY_QUERY_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY2_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE,
		description: 'Entity2 Mutation Metadata'
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
}

const GRAPHQL_DATABASE_ENTITY2_MUTATION_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Mutation_Relationships',
	description: 'Entity2 Mutation Relationships',
	fields: () => (GRAPHQL_DATABASE_ENTITY2_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY2_MUTATION_MUTATION_FIELDS_STRUCTURE = {}

const GRAPHQL_DATABASE_ENTITY2_MUTATION_MUTATION_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Mutation_Mutation',
	description: 'Entity2 Mutation Mutation',
	fields: () => (GRAPHQL_DATABASE_ENTITY2_MUTATION_MUTATION_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY2_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE,
		description: '_metadata'
	},
	attributes: {
		type: GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_STRUCTURE,
		description: 'attributes'
	}
}

const GRAPHQL_DATABASE_ENTITY2_QUERY_STRUCTURE = new GraphQLObjectType({
	name: 'Query_Entity2',
	description: 'Entity 2',
	fields: () => ({
		_metadata: GRAPHQL_DATABASE_ENTITY2_FIELDS_STRUCTURE._metadata,
		attributes: GRAPHQL_DATABASE_ENTITY2_FIELDS_STRUCTURE.attributes,
		relationships: {
			type: GRAPHQL_DATABASE_ENTITY2_QUERY_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		},
		query: {
			type: GRAPHQL_DATABASE_ENTITY2_QUERY_QUERY_STRUCTURE,
			description: 'query'
		}
	})
})

const GRAPHQL_DATABASE_ENTITY2_MUTATION_STRUCTURE = new GraphQLObjectType({
	name: 'Mutation_Entity2',
	description: 'Entity 2',
	fields: () => ({
		_metadata: GRAPHQL_DATABASE_ENTITY2_FIELDS_STRUCTURE._metadata,
		attributes: GRAPHQL_DATABASE_ENTITY2_FIELDS_STRUCTURE.attributes,
		relationships: {
			type: GRAPHQL_DATABASE_ENTITY2_MUTATION_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		},
		mutation: {
			type: GRAPHQL_DATABASE_ENTITY2_MUTATION_MUTATION_STRUCTURE,
			description: 'mutation'
		}
	})
})

export {
	GRAPHQL_DATABASE_ENTITY2_QUERY_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_MUTATION_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_METADATA_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_QUERY_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_MUTATION_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_QUERY_QUERY_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_QUERY_QUERY_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_MUTATION_MUTATION_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_MUTATION_MUTATION_FIELDS_STRUCTURE
}