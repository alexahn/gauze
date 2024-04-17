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
    Records as Entity1Records,
    Index as Entity1Index
} from './../data/entity1.js'

import {
	ENTITY1,
	ENTITY1_TYPE,
	ENTITY1_ATTRIBUTES_FIELDS
} from './../types/entity1.js'

function ReadEntity1(where, limit, skip, sort) {
	if (!where.id) return []
    const record = Entity1Index[where.id]
    //console.log('ReadEntity1', record)
	const metadata = {
		id: record.id,
		type: ENTITY1_TYPE
	}
    const model = {
		metadata: metadata,
        attributes: record,
        relationships: {
            _metadata: metadata
        }
    }
    return [model]
}

const ENTITY1_QUERY_WHERE = new GraphQLInputObjectType({
    name: 'Entity1_Query_where',
    description: 'Entity1 Query where',
    fields: ENTITY1_ATTRIBUTES_FIELDS
})

const Entity1Query = {
    type: new GraphQLList(ENTITY1),
    args: {
        where: {
            description: 'where',
            type: ENTITY1_QUERY_WHERE,
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
    resolve: (_source, { where, limit, skip, sort }) => {
        console.log('entity1 query _source', _source)
        console.log('entity1 args', where, limit, skip, sort)
        return ReadEntity1(where, limit, skip, sort)
    }
}

export {
	Entity1Query
}
