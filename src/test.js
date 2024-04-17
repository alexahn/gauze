import {
    graphql,
    printSchema,
} from 'graphql';

import {
	SCHEMA as schema
} from './schema.js'

const query = `
    query MyTestQuery {
        entity1(where: { id: "1"}) {
			metadata {
				type
			}
            attributes {
				id
            	text
			}
            relationships {
				entity2(where: { id: "1" }) {
					metadata {
						type
					}
					attributes {
                		id
                		text
					}
					relationships {
						entity1(where: { id: "2" }) {
							metadata {
								type
							}
							attributes {
								id
								text
							}
							relationships {
								entity2(where: { id: "2" }) {
									metadata {
										type
									}
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

