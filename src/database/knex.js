import knex from 'knex'
import KNEX_FILE from './knexfile.js'
// const KNEX_CONFIG = KNEX_FILE[process.env.NODE_ENV || 'development']
// todo: wrap this inside a function create_connection
// todo: test that we can import the entire root gauze module with an invalid environment variable configuration (e.g. changing the driver to an invalid setting)
//const DATABASE = knex(KNEX_CONFIG)
//export default DATABASE

export function create_connection (environment) {
	// if environment is passed in, forcefully use it
	const KNEX_ENV = environment ? environment : (process.env.NODE_ENV || 'development')
	const KNEX_CONFIG = KNEX_FILE[KNEX_ENV]
	return knex(KNEX_CONFIG)
}