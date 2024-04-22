import * as $structure from './../../structure/index.js'

import {
	KnexDatabaseModel
} from './class.js'

const ENTITY1_MODEL_DATABASE_CONFIG = {
	table: $structure.entity1.database.sql.SQL_DATABASE_ENTITY1_TABLE_NAME,
	primary_key: $structure.entity1.database.sql.SQL_DATABASE_ENTITY1_PRIMARY_KEY,
	fields: $structure.entity1.database.sql.SQL_DATABASE_ENTITY1_FIELDS,
	protected_fields: $structure.entity1.database.sql.SQL_DATABASE_ENTITY1_PROTECTED_FIELDS,
	field_serializers: $structure.entity1.database.sql.SQL_DATABASE_ENTITY1_FIELD_SERIALIZERS
}
const ENTITY1_MODEL_DATABASE = new KnexDatabaseModel(ENTITY1_MODEL_DATABASE_CONFIG)

export {
	ENTITY1_MODEL_DATABASE
}