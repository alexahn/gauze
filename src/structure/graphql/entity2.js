import {
	GraphQLNonNull,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInterfaceType
} from 'graphql';

//import { Entity1Query } from './../queries/entity1.js'

const ENTITY2_TYPE = 'ENTITY2'

const ENTITY2_METADATA_FIELDS = {
	id: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'id'
	},
	type: {
		type: new GraphQLNonNull(GraphQLString),
		description: 'type'
	}
}

const ENTITY2_METADATA = new GraphQLObjectType({
	name: 'Entity2_Metadata',
	description: 'Entity2 Metadata',
	fields: () => (ENTITY2_METADATA_FIELDS)
})

const ENTITY2_ATTRIBUTES_FIELDS = {
	id: {
		// loosen the non null constraint (maybe reintroduce this later by splitting the field types?)
		//type: new GraphQLNonNull(GraphQLString),
		type: GraphQLString,
		description: 'id'
	},
	text: {
		type: GraphQLString,
		description: 'text'
	}
}

const ENTITY2_ATTRIBUTES = new GraphQLObjectType({
	name: 'Entity2_Attributes',
	description: 'Entity2 Attributes',
	fields: () => (ENTITY2_ATTRIBUTES_FIELDS)
})

const ENTITY2_RELATIONSHIPS_FIELDS = {
	_metadata: {
		type: ENTITY2_METADATA,
		description: 'Entity2 Metadata'
	},
	//entity1: Entity1Query
}

const ENTITY2_RELATIONSHIPS = new GraphQLObjectType({
	name: 'Entity2_Relationships',
	description: 'Entity2 Relationships',
	fields: () => (ENTITY2_RELATIONSHIPS_FIELDS)
})

const ENTITY2 = new GraphQLObjectType({
	name: 'Entity2',
	description: 'Entity 1',
	fields: () => ({
		metadata: {
			type: ENTITY2_METADATA,
			description: 'metadata'
		},
		attributes: {
			type: ENTITY2_ATTRIBUTES,
			description: 'attributes'
		},
		relationships: {
			type: ENTITY2_RELATIONSHIPS,
			description: 'relationships'
		}
	})
})

export {
	ENTITY2,
	ENTITY2_TYPE,
	ENTITY2_METADATA,
	ENTITY2_METADATA_FIELDS,
	ENTITY2_ATTRIBUTES,
	ENTITY2_ATTRIBUTES_FIELDS,
	ENTITY2_RELATIONSHIPS,
	ENTITY2_RELATIONSHIPS_FIELDS
}