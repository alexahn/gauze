import path from 'path'
import {
	fileURLToPath
} from 'url'

import {
	config
} from 'dotenv'
import findConfig from 'find-config'

config({
	path: findConfig('.env')
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const KNEX_CONFIG = {
	development: {
		client: process.env.KNEX_CLIENT,
		connection: {
			filename: path.join(__dirname, process.env.KNEX_CONNECTION_FILENAME)
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		useNullAsDefault: true
	},

	staging: {
		client: process.env.KNEX_CLIENT,
		connection: {
			filename: path.join(__dirname, process.env.KNEX_CONNECTION_FILENAME)
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		useNullAsDefault: true
	},

	production: {
		client: 'better-sqlite3',
		connection: {
			filename: path.join(__dirname, process.env.KNEX_CONNECTION_FILENAME)
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		useNullAsDefault: true
	}

};

export default KNEX_CONFIG