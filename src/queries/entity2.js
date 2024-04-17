import {
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

import {
	ENTITY2,
	ENTITY2_TYPE
} from './../types/entity2.js'

function ReadEntity2(id) {
    const record = Entity2Index[id]
    console.log('ReadEntity2', record)
    const model = {
        attributes: record,
        relationships: {
            _metadata: {
                id: record.id,
                type: ENTITY2_TYPE
            }
        }
    }
    return [model]
}

const Entity2Query = {
    type: new GraphQLList(ENTITY2),
    args: {
        id: {
            description: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (_source, { id }) => {
        console.log('entity2 query _source', _source)
        console.log('entity2 id', id)
        return ReadEntity2(id)
    }
}

export {
	Entity2Query
}
