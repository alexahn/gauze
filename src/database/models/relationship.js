import * as $structure from './../../structure/index.js'

import {
	KnexDatabaseModel
} from './class.js'

const RELATIONSHIP_MODEL_DATABASE_CONFIG = {}
const RELATIONSHIP_MODEL_DATABASE = new KnexDatabaseModel(
	RELATIONSHIP_MODEL_DATABASE_CONFIG,
	$structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_TABLE_NAME,
	$structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_PRIMARY_KEY
)

export {
	RELATIONSHIP_MODEL_DATABASE
}