import * as $structure from './../../structure/index.js'

import {
	KnexDatabaseModel
} from './class.js'

const ENTITY2_MODEL_DATABASE_CONFIG = {}
const ENTITY2_MODEL_DATABASE = new KnexDatabaseModel(
	ENTITY2_MODEL_DATABASE_CONFIG,
	$structure.entity2.database.sql.SQL_DATABASE_ENTITY2_TABLE_NAME,
	$structure.entity2.database.sql.SQL_DATABASE_ENTITY2_PRIMARY_KEY
)

export {
	ENTITY2_MODEL_DATABASE
}