import {
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

import {
	ENTITY1,
	ENTITY1_TYPE
} from './../types/entity1.js'

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
    type: new GraphQLList(ENTITY1),
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
	Entity1Query
}
