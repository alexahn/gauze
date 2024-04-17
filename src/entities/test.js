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

import { Entity1Query } from './entity1.js'
import { Entity2Query } from './entity2.js'

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        entity1: Entity1Query
    })
})

const schema = new GraphQLSchema({
    query: queryType
})

const query = `
    query MyTestQuery {
        entity1(id: "1") {
            attributes {
				id
            	text
			}
            relationships {
				entity2(id: "2") {
					attributes {
                		id
                		text
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
