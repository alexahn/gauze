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

const SHELL = $gauze.kernel.shell.node.SHELL__NODE__SHELL__KERNEL.start()

function create_graphql_shell (schema, database) {
	return function (operation, operation_name, operation_variables) {
		return $gauze.kernel.shell.graphql.TRANSACTION_EXECUTE__GRAPHQL__SHELL__KERNEL(database, {
			schema,
			operation,
			operation_name,
			operation_variables
		}).then(function (data) {
			return data.data
		})
	}
}

// todo: maybe separate the modules from the added keys here
// todo: gauze vs $gauze?
SHELL.context.$gauze = $gauze
SHELL.context.gauze = {}
SHELL.context.gauze.database = $gauze.database.knex.create_connection()
SHELL.context.gauze.modules = $gauze
SHELL.context.gauze.execute_database_graphql = create_graphql_shell($gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE, SHELL.context.gauze.database)
SHELL.context.gauze.execute_system_graphql = create_graphql_shell($gauze.system.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE, SHELL.context.gauze.database)
SHELL.context.gauze._description = {
	database: "A Knex database connection",
	modules: "The gauze root module (src/index.js)",
	execute_database_graphql: "A function that accepts an query/operation, operation_name, and operation_variables that executes the combination against the database graphql interface",
	execute_system_graphq: "A function that accepts an query/operation, operation_name, and operation_variables that executes the combination against the system graphql interface"
}
// for convenience expose the execute methods to the root shell object
SHELL.context.execute_database_graphql = SHELL.context.gauze.execute_database_graphql
SHELL.context.execute_system_graphql = SHELL.context.gauze.execute_system_graphql
console.log('Type gauze to explore')
SHELL.displayPrompt()