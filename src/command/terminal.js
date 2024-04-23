import {
	config
} from 'dotenv'
import findConfig from 'find-config'

config({
	path: findConfig('.env')
})

import * as $gauze from './../index.js'

import {
	graphql
} from 'graphql';

const SHELL = $gauze.kernel.shell.node.NODE_SHELL_KERNEL.start()

function create_graphql_shell (schema) {
	return function (source, operationName, variableValues) {
		return SHELL.context.database.transaction(function (transaction) {
			const context = {
				database: SHELL.context.database,
				transaction: transaction
			}
			return graphql({
				schema: schema,
				source: source,
				contextValue: context,
				variableValues
			}).then(function (data) {
				if (data.errors && data.errors.length) {
					throw data.errors
				}
				return transaction.commit(data).then(function () {
					return Promise.resolve(data.data)
				})
			}).catch(function (err) {
				return transaction.rollback(err).then(function () {
					throw err
				})
			})
		})
	}
}

SHELL.context.gauze = $gauze
SHELL.context.database = $gauze.database.knex.create_connection()
SHELL.context.execute_database_graphql = create_graphql_shell($gauze.database.interfaces.graphql.schema.SCHEMA_GRAPHQL_INTERFACE_DATABASE)
SHELL.context.execute_system_graphql = create_graphql_shell($gauze.system.interfaces.graphql.schema.SCHEMA_GRAPHQL_INTERFACE_SYSTEM)