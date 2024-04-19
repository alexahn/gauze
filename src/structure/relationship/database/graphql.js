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
	name: 'Relationship_Metadata',
	description: 'Relationship Metadata',
	fields: () => (GRAPHQL_DATABASE_RELATIONSHIP_METADATA_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE = {
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
	from: {
		type: GraphQLString,
		description: 'from'
	},
	from_id: {
		type: GraphQLString,
		description: 'from_id'
	},
	to: {
		type: GraphQLString,
		description: 'to'
	},
	to_id: {
		type: GraphQLString,
		description: 'to_id'
	}
}

const GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship_Attributes',
	description: 'Relationship Attributes',
	fields: () => (GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_RELATIONSHIP_STRUCTURE = new GraphQLObjectType({
	name: 'Relationship',
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
	})
})

export {
	GRAPHQL_DATABASE_RELATIONSHIP_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_TYPE_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_METADATA_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_METADATA_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_STRUCTURE,
	GRAPHQL_DATABASE_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE,
}