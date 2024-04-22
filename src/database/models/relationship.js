import * as $structure from './../../structure/index.js'

import {
	KnexDatabaseModel
} from './class.js'

const RELATIONSHIP_MODEL_DATABASE_CONFIG = {
	table: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_TABLE_NAME,
	primary_key: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_PRIMARY_KEY,
	fields: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_FIELDS,
	protected_fields: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_PROTECTED_FIELDS,
	field_serializers: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_FIELD_SERIALIZERS
}
const RELATIONSHIP_MODEL_DATABASE = new KnexDatabaseModel(RELATIONSHIP_MODEL_DATABASE_CONFIG)

export {
	RELATIONSHIP_MODEL_DATABASE
}