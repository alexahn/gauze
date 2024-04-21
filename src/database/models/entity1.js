import * as $structure from './../../structure/index.js'

import {
	KnexDatabaseModel
} from './class.js'

const ENTITY1_MODEL_DATABASE_CONFIG = {}
const ENTITY1_MODEL_DATABASE = new KnexDatabaseModel(
	ENTITY1_MODEL_DATABASE_CONFIG,
	$structure.entity1.database.sql.SQL_DATABASE_ENTITY1_TABLE_NAME,
	$structure.entity1.database.sql.SQL_DATABASE_ENTITY1_PRIMARY_KEY
)

export {
	ENTITY1_MODEL_DATABASE
}