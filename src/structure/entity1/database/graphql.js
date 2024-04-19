import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInterfaceType
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

const GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_STRUCTURE = new GraphQLObjectType({
	name: 'Entity1_Attributes',
	description: 'Entity1 Attributes',
	fields: () => (GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY1_RELATIONSHIPS_FIELDS_STRUCTURE = {
	_metadata: {
		type: GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE,
		description: 'Entity1 Metadata'
	},
	//entity2: ENTITY2_QUERY
}

const GRAPHQL_DATABASE_ENTITY1_RELATIONSHIPS_STRUCTURE = new GraphQLObjectType({
	name: 'Entity1_Relationships',
	description: 'Entity1 Relationships',
	fields: () => (GRAPHQL_DATABASE_ENTITY1_RELATIONSHIPS_FIELDS_STRUCTURE)
})

const GRAPHQL_DATABASE_ENTITY1_STRUCTURE = new GraphQLObjectType({
	name: 'Entity1',
	description: 'Entity 1',
	fields: () => ({
		metadata: {
			type: GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE,
			description: 'metadata'
		},
		attributes: {
			type: GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_STRUCTURE,
			description: 'attributes'
		},
		relationships: {
			type: GRAPHQL_DATABASE_ENTITY1_RELATIONSHIPS_STRUCTURE,
			description: 'relationships'
		}
	})
})

export {
	GRAPHQL_DATABASE_ENTITY1_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_TYPE_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_METADATA_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_METADATA_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_RELATIONSHIPS_STRUCTURE,
	GRAPHQL_DATABASE_ENTITY1_RELATIONSHIPS_FIELDS_STRUCTURE
}