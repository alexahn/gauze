import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

const EZUAG_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.ezuag.default($abstract);
const EZUAG_MODEL_DATABASE_CONFIG = {
	table: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
	primary_key: $structure.ezuag.database.sql.PRIMARY_KEY__SQL__DATABASE__EZUAG__STRUCTURE,
};
const EZUAG_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(EZUAG_MODEL_DATABASE_ROOT_CONFIG, EZUAG_MODEL_DATABASE_CONFIG);

export { EZUAG_MODEL_DATABASE };
