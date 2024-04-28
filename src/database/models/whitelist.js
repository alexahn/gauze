import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

const WHITELIST_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.whitelist.default($abstract);
const WHITELIST_MODEL_DATABASE_CONFIG = {
	table: $structure.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
	primary_key: $structure.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
};
const WHITELIST_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(WHITELIST_MODEL_DATABASE_ROOT_CONFIG, WHITELIST_MODEL_DATABASE_CONFIG);

export { WHITELIST_MODEL_DATABASE };
