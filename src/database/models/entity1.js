import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

const ENTITY1_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.entity1.default($abstract);
const ENTITY1_MODEL_DATABASE_CONFIG = {
	table: $structure.entity1.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
	primary_key: $structure.entity1.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY1__STRUCTURE,
};
const ENTITY1_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(ENTITY1_MODEL_DATABASE_ROOT_CONFIG, ENTITY1_MODEL_DATABASE_CONFIG);

export { ENTITY1_MODEL_DATABASE };
