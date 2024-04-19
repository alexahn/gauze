import knex from 'knex'
import KNEX_FILE from './knexfile.js'
const KNEX_CONFIG = KNEX_FILE[process.env.NODE_ENV || 'development']
const DATABASE = knex(KNEX_CONFIG)
export default DATABASE