import {
	KnexDatabaseModel
} from './class.js'

import {
	SQL_DATABASE_RELATIONSHIP_TABLE_NAME
} from './../../structure/relationship/database/sql.js'

const RELATIONSHIP_MODEL_DATABASE_CONFIG = {}
const RELATIONSHIP_MODEL_DATABASE = new KnexDatabaseModel(RELATIONSHIP_MODEL_DATABASE_CONFIG, SQL_DATABASE_RELATIONSHIP_TABLE_NAME)

export {
	RELATIONSHIP_MODEL_DATABASE
}