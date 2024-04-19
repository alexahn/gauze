import {
	graphql,
	printSchema,
} from 'graphql';

import {
	SCHEMA_INTERFACE_SYSTEM as schema
} from './schema.js'

import database from './../../database/knex.js'

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
	// todo: see if we can construct a context here and use it at the end
	const context = {}
	context.database = database
	return database.transaction(function (transaction) {
		context.transaction = transaction
		return graphql({
			schema: schema,
			source: query,
			contextValue: context
		}).then(function (data) {
			console.log(JSON.stringify(data, null, 4))
			return transaction.commit(data)
		}).catch(function (err) {
			console.log('err', err)
			return transaction.rollback(err)
		})
	}).then(function () {
		database.destroy()
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