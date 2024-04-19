import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType
} from 'graphql';

import GraphQLDate from 'graphql-date'

const GRAPHQL_DATABASE_ENTITY1_TYPE_STRUCTURE = 'ENTITY1'

const GRAPHQL_DATABASE_ENTITY1_METADATA_FIELDS_STRUCTURE = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'id'
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'type'
	}
}

const GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE = new GraphQLObjectType({
	name: 'Entity1_Metadata',
	description: 'Entity1 Metadata',
	fields: () => (GRAPHQL_DATABASE_ENTITY1_METADATA_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE = {
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

const GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_STRUCTURE = new GraphQLObjectType({
	name: 'Entity1_Attributes',
	description: 'Entity1 Attributes',
	fields: () => (GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY1_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE,
		description: 'Entity1 Query Metadata'
	},
	//read_entity2: ENTITY2_READ_QUERY
}

const GRAPHQL_DATABASE_ENTITY1_QUERY_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity1_Query_Relationships',
	description: 'Entity1 Query Relationships',
	fields: () => (GRAPHQL_DATABASE_ENTITY1_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY1_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE,
		description: 'Entity1 Mutation Metadata'
	},
	//create_entity2: ENTITY2_CREATE_MUTATION
}

const GRAPHQL_DATABASE_ENTITY1_MUTATION_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity1_Mutation_Relationships',
	description: 'Entity1 Mutation Relationships',
	fields: () => (GRAPHQL_DATABASE_ENTITY1_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY1_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE,
		description: '_metadata'
	},
	attributes: {
		type: GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_STRUCTURE,
		description: 'attributes'
	}
}

const GRAPHQL_DATABASE_ENTITY1_QUERY_STRUCTURE = new GraphQLObjectType({
	name: 'Query_Entity1',
	description: 'Entity 1',
	fields: () => ({
		_metadata: GRAPHQL_DATABASE_ENTITY1_FIELDS_STRUCTURE._metadata,
		attributes: GRAPHQL_DATABASE_ENTITY1_FIELDS_STRUCTURE.attributes,
		relationships: {
			type: GRAPHQL_DATABASE_ENTITY1_QUERY_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		}
	})
})

const GRAPHQL_DATABASE_ENTITY1_MUTATION_STRUCTURE = new GraphQLObjectType({
	name: 'Mutation_Entity1',
	description: 'Entity 1',
	fields: () => ({
		_metadata: GRAPHQL_DATABASE_ENTITY1_FIELDS_STRUCTURE._metadata,
		attributes: GRAPHQL_DATABASE_ENTITY1_FIELDS_STRUCTURE.attributes,
		relationships: {
			type: GRAPHQL_DATABASE_ENTITY1_MUTATION_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		}
	})
})

export {
	GRAPHQL_DATABASE_ENTITY1_QUERY_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_MUTATION_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_TYPE_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_METADATA_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_QUERY_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_QUERY_RELATIONSHIPS_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_MUTATION_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_MUTATION_RELATIONSHIPS_FIELDS_STRUCTURE
}