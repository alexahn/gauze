import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

//import { DatabaseModel } from "./class.js";

const cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract);
/*
const cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_ROOT_CONFIG = {
	fields: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.FIELDS__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	protected_fields: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.PROTECTED_FIELDS__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	field_serializers: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
};
*/
const cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_CONFIG = {
	table: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.TABLE_NAME__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
	primary_key: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.PRIMARY_KEY__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
};
const cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(
	cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_ROOT_CONFIG,
	cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE_CONFIG,
);

export { cd637bc32c364580be5cc28396d3dee8_MODEL_DATABASE };
