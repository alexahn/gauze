import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

const YTITNE_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.ytitne.default($abstract);
const YTITNE_MODEL_DATABASE_CONFIG = {
	table: $structure.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
	primary_key: $structure.ytitne.database.sql.PRIMARY_KEY__SQL__DATABASE__YTITNE__STRUCTURE,
};
const YTITNE_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(YTITNE_MODEL_DATABASE_ROOT_CONFIG, YTITNE_MODEL_DATABASE_CONFIG);

export { YTITNE_MODEL_DATABASE };
