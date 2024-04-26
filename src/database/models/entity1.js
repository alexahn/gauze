import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";

import { DatabaseModel } from "./class.js";

const ENTITY1_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.entity1.default($abstract);
/*
const ENTITY1_MODEL_DATABASE_ROOT_CONFIG = {
	fields: $structure.entity1.database.sql.FIELDS__SQL__DATABASE__ENTITY1__STRUCTURE,
	protected_fields: $structure.entity1.database.sql.PROTECTED_FIELDS__SQL__DATABASE__ENTITY1__STRUCTURE,
	field_serializers: $structure.entity1.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__ENTITY1__STRUCTURE,
};
*/
const ENTITY1_MODEL_DATABASE_CONFIG = {
	table: $structure.entity1.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
	primary_key: $structure.entity1.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY1__STRUCTURE,
};
const ENTITY1_MODEL_DATABASE = new DatabaseModel(ENTITY1_MODEL_DATABASE_ROOT_CONFIG, ENTITY1_MODEL_DATABASE_CONFIG);

export { ENTITY1_MODEL_DATABASE };
