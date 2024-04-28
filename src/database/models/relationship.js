import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

const RELATIONSHIP_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.relationship.default($abstract);
const RELATIONSHIP_MODEL_DATABASE_CONFIG = {
	table: $structure.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	primary_key: $structure.relationship.database.sql.PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
};
const RELATIONSHIP_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(RELATIONSHIP_MODEL_DATABASE_ROOT_CONFIG, RELATIONSHIP_MODEL_DATABASE_CONFIG);

export { RELATIONSHIP_MODEL_DATABASE };
