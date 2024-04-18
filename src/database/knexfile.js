import 'dotenv/config'
import path from 'path'
import {
	fileURLToPath
} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const KNEX_CONFIG = {
	development: {
		client: process.env.KNEX_CLIENT,
		connection: {
			filename: process.env.KNEX_CONNECTION_FILENAME
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
			filename: process.env.KNEX_CONNECTION_FILENAME
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
			filename: process.env.KNEX_CONNECTION_FILENAME
		},
		migrations: {
			tableName: process.env.KNEX_MIGRATIONS_TABLENAME,
			directory: path.join(__dirname, 'migrations')
		},
		useNullAsDefault: true
	}

};

export default KNEX_CONFIG