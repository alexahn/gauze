import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

//import { DatabaseModel } from "./class.js";

const EZUAG_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.ezuag.default($abstract);
/*
const EZUAG_MODEL_DATABASE_ROOT_CONFIG = {
	fields: $structure.ezuag.database.sql.FIELDS__SQL__DATABASE__EZUAG__STRUCTURE,
	protected_fields: $structure.ezuag.database.sql.PROTECTED_FIELDS__SQL__DATABASE__EZUAG__STRUCTURE,
	field_serializers: $structure.ezuag.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__EZUAG__STRUCTURE,
};
*/
const EZUAG_MODEL_DATABASE_CONFIG = {
	table: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
	primary_key: $structure.ezuag.database.sql.PRIMARY_KEY__SQL__DATABASE__EZUAG__STRUCTURE,
};
const EZUAG_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(EZUAG_MODEL_DATABASE_ROOT_CONFIG, EZUAG_MODEL_DATABASE_CONFIG);

export { EZUAG_MODEL_DATABASE };
