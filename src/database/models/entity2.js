import * as $structure from './../../structure/index.js'

import {
	DatabaseModel
} from './class.js'

const ENTITY2_MODEL_DATABASE_ROOT_CONFIG = {
	fields: $structure.entity2.database.sql.FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE,
	protected_fields: $structure.entity2.database.sql.PROTECTED_FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE,
	field_serializers: $structure.entity2.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__ENTITY2__STRUCTURE
}
const ENTITY2_MODEL_DATABASE_CONFIG = {
	table: $structure.entity2.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
	primary_key: $structure.entity2.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY2__STRUCTURE,
}
const ENTITY2_MODEL_DATABASE = new DatabaseModel(ENTITY2_MODEL_DATABASE_ROOT_CONFIG, ENTITY2_MODEL_DATABASE_CONFIG)

export {
	ENTITY2_MODEL_DATABASE
}
