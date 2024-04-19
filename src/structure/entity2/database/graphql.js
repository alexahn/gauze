import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInterfaceType
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
		// loosen the non null constraint (maybe reintroduce this later by splitting the field types?)
		//type: new GraphQLNonNull(GraphQLString),
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

const GRAPHQL_DATABASE_ENTITY2_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE,
		description: 'Entity2 Metadata'
	},
	//entity2: ENTITY2_QUERY
}

const GRAPHQL_DATABASE_ENTITY2_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2_Relationships',
	description: 'Entity2 Relationships',
	fields: () => (GRAPHQL_DATABASE_ENTITY2_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY2_STRUCTURE = new GraphQLObjectType({
	name: 'Entity2',
	description: 'Entity 2',
	fields: () => ({
		metadata: {
			type: GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE,
			description: 'metadata'
		},
		attributes: {
			type: GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_STRUCTURE,
			description: 'attributes'
		},
		relationships: {
			type: GRAPHQL_DATABASE_ENTITY2_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		}
	})
})

export {
	GRAPHQL_DATABASE_ENTITY2_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_TYPE_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_METADATA_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_METADATA_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_ATTRIBUTES_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY2_RELATIONSHIPS_FIELDS_STRUCTURE
}