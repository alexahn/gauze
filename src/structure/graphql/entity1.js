import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInterfaceType
} from 'graphql';

import GraphQLDate from 'graphql-date'

//import { Entity2Query } from './../queries/entity2.js'

const ENTITY1_TYPE = 'ENTITY1'

const ENTITY1_METADATA_FIELDS = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'id'
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'type'
	}
}

const ENTITY1_METADATA = new GraphQLObjectType({
	name: 'Entity1_Metadata',
	description: 'Entity1 Metadata',
	fields: () => (ENTITY1_METADATA_FIELDS)
})

const ENTITY1_ATTRIBUTES_FIELDS = {
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

const ENTITY1_ATTRIBUTES = new GraphQLObjectType({
	name: 'Entity1_Attributes',
	description: 'Entity1 Attributes',
	fields: () => (ENTITY1_ATTRIBUTES_FIELDS)
})

const ENTITY1_RELATIONSHIPS_FIELDS = {
	_metadata: {
		type: ENTITY1_METADATA,
		description: 'Entity1 Metadata'
	},
	//entity2: Entity2Query
}

const ENTITY1_RELATIONSHIPS = new GraphQLObjectType({
	name: 'Entity1_Relationships',
	description: 'Entity1 Relationships',
	fields: () => (ENTITY1_RELATIONSHIPS_FIELDS)
})

const ENTITY1 = new GraphQLObjectType({
	name: 'Entity1',
	description: 'Entity 1',
	fields: () => ({
		metadata: {
			type: ENTITY1_METADATA,
			description: 'metadata'
		},
		attributes: {
			type: ENTITY1_ATTRIBUTES,
			description: 'attributes'
		},
		relationships: {
			type: ENTITY1_RELATIONSHIPS,
			description: 'relationships'
		}
	})
})

export {
	ENTITY1,
	ENTITY1_TYPE,
	ENTITY1_METADATA,
	ENTITY1_METADATA_FIELDS,
	ENTITY1_ATTRIBUTES,
	ENTITY1_ATTRIBUTES_FIELDS,
	ENTITY1_RELATIONSHIPS,
	ENTITY1_RELATIONSHIPS_FIELDS
}