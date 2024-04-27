import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

//import { DatabaseModel } from "./class.js";

const WHITELIST_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.whitelist.default($abstract);
/*
const WHITELIST_MODEL_DATABASE_ROOT_CONFIG = {
	fields: $structure.whitelist.database.sql.FIELDS__SQL__DATABASE__WHITELIST__STRUCTURE,
	protected_fields: $structure.whitelist.database.sql.PROTECTED_FIELDS__SQL__DATABASE__WHITELIST__STRUCTURE,
	field_serializers: $structure.whitelist.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__WHITELIST__STRUCTURE,
};
*/
const WHITELIST_MODEL_DATABASE_CONFIG = {
	table: $structure.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
	primary_key: $structure.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
};
const WHITELIST_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(WHITELIST_MODEL_DATABASE_ROOT_CONFIG, WHITELIST_MODEL_DATABASE_CONFIG);

export { WHITELIST_MODEL_DATABASE };
