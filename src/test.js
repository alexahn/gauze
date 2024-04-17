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

/*
import {
	ENTITY1_RELATIONSHIPS_FIELDS
} from './types/entity1.js'

import {
	ENTITY2_RELATIONSHIPS_FIELDS
} from './types/entity2.js'

import { Entity1Query } from './queries/entity1.js'
import { Entity2Query } from './queries/entity2.js'

ENTITY1_RELATIONSHIPS_FIELDS.entity2 = Entity2Query
ENTITY2_RELATIONSHIPS_FIELDS.entity1 = Entity1Query

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        entity1: Entity1Query
    })
})

const schema = new GraphQLSchema({
    query: queryType,
	mutation: queryType
})
*/

import {
	SCHEMA as schema
} from './schema.js'

const query = `
    query MyTestQuery {
        entity1(where: { id: "1"}) {
            attributes {
				id
            	text
			}
            relationships {
				entity2(where: { id: "1" }) {
					attributes {
                		id
                		text
					}
					relationships {
						entity1(where: { id: "2" }) {
							attributes {
								id
								text
							}
							relationships {
								entity2(where: { id: "2" }) {
									attributes {
										id
										text
									}
								}
							}
						}
					}
            	}
			}
        }
    }
`;

console.log('schema', printSchema(schema))

function execute () {
	return graphql({
		schema: schema,
		source: query
	}).then(function (data) {
		console.log(JSON.stringify(data, null, 4))
	}).catch(function (err) {
		console.log('err', err)
	})
}

var COUNT = 0
function loop (f) {
	return f().then(function (data) {
		if (COUNT < 100000) {
			//console.log('count', COUNT)
			COUNT += 1 
			return loop(f)
		} else {
			return Promise.resolve(true)
		}
	})
}

//loop(execute)
execute()

