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
	Records as Entity2Records,
	Index as Entity2Index
} from './../data/entity2.js'

const Entity2Attributes = new GraphQLObjectType({
	name: 'Entity2_Attributes',
	description: 'Entity2 Attributes',
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

const Entity2Relationships = new GraphQLObjectType({
	name: 'Entity2_Relationships',
	description: 'Entity2 Relationships',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'id'
		},
		entity2: Entity2Query
	})
})

const Entity2 = new GraphQLObjectType({
    name: 'Entity2',
    description: 'Entity 1',
    fields: () => ({
		attributes: {
			type: Entity2Attributes,
			description: 'attributes'
		},
		relationships: {
			type: Entity2Relationships,
			description: 'relationships'
		}
    })
})

function ReadEntity2(id) {
	const record = Entity2Index[id]
	console.log('ReadEntity2', record)
	const model = {
		attributes: record,
		relationships: {}
	}
	return [model]
}

const Entity2Query = {
	type: new GraphQLList(Entity2),
	args: {
		id: {
			description: 'id',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: (_source, { id }) => {
		console.log('entity2.js query _source', _source)
		console.log('entity2.js id', id)
		return ReadEntity2(id)
	}
}

export {
	Entity2,
	Entity2Query
}
