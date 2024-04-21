import {
	KnexDatabaseModel
} from './class.js'

import {
	SQL_DATABASE_ENTITY1_TABLE_NAME,
	SQL_DATABASE_ENTITY1_PRIMARY_KEY
} from './../../structure/entity1/database/sql.js'

const ENTITY1_MODEL_DATABASE_CONFIG = {}
const ENTITY1_MODEL_DATABASE = new KnexDatabaseModel(ENTITY1_MODEL_DATABASE_CONFIG, SQL_DATABASE_ENTITY1_TABLE_NAME, SQL_DATABASE_ENTITY1_PRIMARY_KEY)

export {
	ENTITY1_MODEL_DATABASE
}