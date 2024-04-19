import {
	KnexDatabaseModel
} from './class.js'

import {
	SQL_DATABASE_ENTITY2_TABLE_NAME
} from './../../structure/entity2/database/sql.js'

const ENTITY2_MODEL_DATABASE_CONFIG = {}
const ENTITY2_MODEL_DATABASE = new KnexDatabaseModel(ENTITY2_MODEL_DATABASE_CONFIG, SQL_DATABASE_ENTITY2_TABLE_NAME)

export {
	ENTITY2_MODEL_DATABASE
}