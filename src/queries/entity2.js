import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLInterfaceType
} from 'graphql';

import {
	Records as Entity2Records,
	Index as Entity2Index
} from './../data/entity2.js'

import {
	ENTITY2,
	ENTITY2_TYPE,
	ENTITY2_ATTRIBUTES_FIELDS
} from './../types/entity2.js'

function ReadEntity2 (where, limit, skip, sort) {
	if (!where.id) return []
	const record = Entity2Index[where.id]
	//console.log('ReadEntity2', record)
	const metadata = {
		id: record.id,
		type: ENTITY2_TYPE
	}
	const model = {
		metadata: metadata,
		attributes: record,
		relationships: {
			_metadata: metadata
		}
	}
	//throw new Error('something broke')
	return [model]
}

const ENTITY2_QUERY_WHERE = new GraphQLInputObjectType({
	name: 'Entity2_Query_where',
	description: 'Entity2 Query where',
	fields: ENTITY2_ATTRIBUTES_FIELDS
})

const Entity2Query = {
	type: new GraphQLList(ENTITY2),
	args: {
		where: {
			description: 'where',
			type: ENTITY2_QUERY_WHERE,
		},
		limit: {
			description: 'limit',
			type: GraphQLInt
		},
		skip: {
			description: 'skip',
			type: GraphQLInt
		},
		sort: {
			description: 'sort',
			type: GraphQLString
		}
	},
	resolve: (_source, {
		where,
		limit,
		skip,
		sort
	}) => {
		console.log('entity2 query _source', _source)
		console.log('entity2 args', where, limit, skip, sort)
		return ReadEntity2(where, limit, skip, sort)
	}
}

export {
	Entity2Query
}