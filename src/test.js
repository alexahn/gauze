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

graphql({
    schema: schema,
    source: query
}).then(function (data) {
    console.log('data', data)
    console.log(JSON.stringify(data, null, 4))
}).catch(function (err) {
    console.log('err', err)
})
