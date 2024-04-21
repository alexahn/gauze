import path from 'path'
import url from 'url'

// note: we need dotenv here so that these environment variables are populated while using the knex cli
// note: es6 imports also seem to resolve before the body of a module is interpreted
import {
	config
} from 'dotenv'
import findConfig from 'find-config'

config({
	path: findConfig('.env')
})

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const KNEX_CONFIG = {
	test: {
		client: process.env.KNEX_CLIENT,
		connection: {
			filename: path.join(__dirname, 'test.sqlite3')
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		seeds: {
			directory: path.join(__dirname, 'seeds')
		},
		useNullAsDefault: true
	},
	development: {
		client: process.env.KNEX_CLIENT,
		connection: {
			filename: path.join(__dirname, process.env.KNEX_CONNECTION_FILENAME || '')
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		seeds: {
			directory: path.join(__dirname, 'seeds')
		},
		useNullAsDefault: true
	},
	staging: {
		client: process.env.KNEX_CLIENT,
		connection: {
			filename: path.join(__dirname, process.env.KNEX_CONNECTION_FILENAME || '')
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		seeds: {
			directory: path.join(__dirname, 'seeds')
		},
		useNullAsDefault: true
	},
	production: {
		client: 'better-sqlite3',
		connection: {
			filename: path.join(__dirname, process.env.KNEX_CONNECTION_FILENAME || '')
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		seeds: {
			directory: path.join(__dirname, 'seeds')
		},
		useNullAsDefault: true
	}
};

export default KNEX_CONFIG