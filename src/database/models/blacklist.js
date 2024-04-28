import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

//import { DatabaseModel } from "./class.js";

const BLACKLIST_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.blacklist.default($abstract);
/*
const BLACKLIST_MODEL_DATABASE_ROOT_CONFIG = {
	fields: $structure.blacklist.database.sql.FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE,
	protected_fields: $structure.blacklist.database.sql.PROTECTED_FIELDS__SQL__DATABASE__BLACKLIST__STRUCTURE,
	field_serializers: $structure.blacklist.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__BLACKLIST__STRUCTURE,
};
*/
const BLACKLIST_MODEL_DATABASE_CONFIG = {
	table: $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
	primary_key: $structure.blacklist.database.sql.PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE,
};
const BLACKLIST_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(BLACKLIST_MODEL_DATABASE_ROOT_CONFIG, BLACKLIST_MODEL_DATABASE_CONFIG);

export { BLACKLIST_MODEL_DATABASE };
