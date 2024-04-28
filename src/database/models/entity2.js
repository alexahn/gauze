import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

const ENTITY2_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.entity2.default($abstract);
const ENTITY2_MODEL_DATABASE_CONFIG = {
	table: $structure.entity2.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
	primary_key: $structure.entity2.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY2__STRUCTURE,
};
const ENTITY2_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(ENTITY2_MODEL_DATABASE_ROOT_CONFIG, ENTITY2_MODEL_DATABASE_CONFIG);

export { ENTITY2_MODEL_DATABASE };
