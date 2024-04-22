import * as $structure from './../../structure/index.js'

import {
	KnexDatabaseModel
} from './class.js'

const ENTITY2_MODEL_DATABASE_CONFIG = {
	table: $structure.entity2.database.sql.SQL_DATABASE_ENTITY2_TABLE_NAME,
	primary_key: $structure.entity2.database.sql.SQL_DATABASE_ENTITY2_PRIMARY_KEY,
	fields: $structure.entity2.database.sql.SQL_DATABASE_ENTITY2_FIELDS,
	protected_fields: $structure.entity2.database.sql.SQL_DATABASE_ENTITY2_PROTECTED_FIELDS,
	field_serializers: $structure.entity2.database.sql.SQL_DATABASE_ENTITY2_FIELD_SERIALIZERS
}
const ENTITY2_MODEL_DATABASE = new KnexDatabaseModel(ENTITY2_MODEL_DATABASE_CONFIG)

export {
	ENTITY2_MODEL_DATABASE
}