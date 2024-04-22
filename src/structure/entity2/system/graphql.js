import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType
} from 'graphql';

import GraphQLDate from 'graphql-date'

const GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE = 'ENTITY2'

const GRAPHQL_SYSTEM_ENTITY2_METADATA_FIELDS_STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'id'
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'type'
	}
}

const GRAPHQL_SYSTEM_ENTITY2_METADATA_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2__Metadata',
	description: 'Entity2 Metadata',
	fields: () => (GRAPHQL_SYSTEM_ENTITY2_METADATA_FIELDS_STRUCTURE)
})

const GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE = {
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
	deleted_at: {
		type: GraphQLDate,
		description: 'updated_at'
	},
	text: {
		type: GraphQLString,
		description: 'text'
	}
}

const GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2__Attributes',
	description: 'Entity2 Attributes',
	fields: () => (GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE)
})


const GRAPHQL_SYSTEM_ENTITY2_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_SYSTEM_ENTITY2_METADATA_STRUCTURE,
		description: 'Entity2 Query Metadata'
	},
	//read_entity2: ENTITY2_READ_QUERY
}

const GRAPHQL_SYSTEM_ENTITY2_QUERY_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Query__Relationships',
	description: 'Entity2 Query Relationships',
	fields: () => (GRAPHQL_SYSTEM_ENTITY2_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_SYSTEM_ENTITY2_QUERY_QUERY_FIELDS_STRUCTURE = {}

const GRAPHQL_SYSTEM_ENTITY2_QUERY_QUERY_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Query__Query',
	description: 'Entity2 Query Query',
	fields: () => (GRAPHQL_SYSTEM_ENTITY2_QUERY_QUERY_FIELDS_STRUCTURE)
})

const GRAPHQL_SYSTEM_ENTITY2_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_SYSTEM_ENTITY2_METADATA_STRUCTURE,
		description: 'Entity2 Mutation Metadata'
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
}

const GRAPHQL_SYSTEM_ENTITY2_MUTATION_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Mutation__Relationships',
	description: 'Entity2 Mutation Relationships',
	fields: () => (GRAPHQL_SYSTEM_ENTITY2_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_SYSTEM_ENTITY2_MUTATION_MUTATION_FIELDS_STRUCTURE = {}

const GRAPHQL_SYSTEM_ENTITY2_MUTATION_MUTATION_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Mutation__Mutation',
	description: 'Entity2 Mutation Mutation',
	fields: () => (GRAPHQL_SYSTEM_ENTITY2_MUTATION_MUTATION_FIELDS_STRUCTURE)
})

const GRAPHQL_SYSTEM_ENTITY2_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_SYSTEM_ENTITY2_METADATA_STRUCTURE,
		description: '_metadata'
	},
	attributes: {
		type: GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_STRUCTURE,
		description: 'attributes'
	}
}

const GRAPHQL_SYSTEM_ENTITY2_QUERY_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Query',
	description: 'Entity 2',
	fields: () => ({
		_metadata: GRAPHQL_SYSTEM_ENTITY2_FIELDS_STRUCTURE._metadata,
		attributes: GRAPHQL_SYSTEM_ENTITY2_FIELDS_STRUCTURE.attributes,
		relationships: {
			type: GRAPHQL_SYSTEM_ENTITY2_QUERY_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		},
		query: {
			type: GRAPHQL_SYSTEM_ENTITY2_QUERY_QUERY_STRUCTURE,
			description: 'query'
		}
	})
})

const GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Mutation',
	description: 'Entity 2',
	fields: () => ({
		_metadata: GRAPHQL_SYSTEM_ENTITY2_FIELDS_STRUCTURE._metadata,
		attributes: GRAPHQL_SYSTEM_ENTITY2_FIELDS_STRUCTURE.attributes,
		relationships: {
			type: GRAPHQL_SYSTEM_ENTITY2_MUTATION_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		},
		mutation: {
			type: GRAPHQL_SYSTEM_ENTITY2_MUTATION_MUTATION_STRUCTURE,
			description: 'mutation'
		}
	})
})

export {
	GRAPHQL_SYSTEM_ENTITY2_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_MUTATION_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_METADATA_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_METADATA_FIELDS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_QUERY_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_MUTATION_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_QUERY_QUERY_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_QUERY_QUERY_FIELDS_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_MUTATION_MUTATION_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY2_MUTATION_MUTATION_FIELDS_STRUCTURE
}