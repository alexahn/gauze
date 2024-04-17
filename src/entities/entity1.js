import {
    graphql,
    printSchema,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInterfaceType
} from 'graphql';

import {
	Records as Entity1Records,
	Index as Entity1Index
} from './../data/entity1.js'

import { Entity2Query } from './entity2.js'

const ENTITY1_TYPE = 'ENTITY1'

const Entity1Metadata = new GraphQLObjectType({
	name: 'Entity1_Metadata',
	description: 'Entity1 Metadata',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'id'
		},
		type: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'type'
		}
	})
})

const Entity1Attributes = new GraphQLObjectType({
	name: 'Entity1_Attributes',
	description: 'Entity1 Attributes',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'id'
		},
		text: {
			type: GraphQLString,
			description: 'text'
		}
	})
})

const Entity1Relationships = new GraphQLObjectType({
	name: 'Entity1_Relationships',
	description: 'Entity1 Relationships',
	fields: () => ({
		_metadata: {
			type: Entity1Metadata,
			description: 'Entity1 Metadata'
		},
		entity2: Entity2Query
	})
})

const Entity1 = new GraphQLObjectType({
    name: 'Entity1',
    description: 'Entity 1',
    fields: () => ({
		attributes: {
			type: Entity1Attributes,
			description: 'attributes'
		},
		relationships: {
			type: Entity1Relationships,
			description: 'relationships'
		}
    })
})

function ReadEntity1(id) {
	const record = Entity1Index[id]
	console.log('ReadEntity1', record)
	const model = {
		attributes: record,
		relationships: {
			_metadata: {
				id: record.id,
				type: ENTITY1_TYPE
			}
		}
	}
	return [model]
}

const Entity1Query = {
	type: new GraphQLList(Entity1),
	args: {
		id: {
			description: 'id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: (_source, { id }) => {
		console.log('entity1 query _source', _source)
		console.log('entity1 id', id)
		return ReadEntity1(id)
	}
}

export {
	Entity1,
	Entity1Query
}
