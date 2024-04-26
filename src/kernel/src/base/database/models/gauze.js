import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

//import { DatabaseModel } from "./class.js";

const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_ROOT_CONFIG = $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract);
/*
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_ROOT_CONFIG = {
	fields: $structure.a543731262804f64adcc0eae1a225acc.database.sql.FIELDS__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	protected_fields: $structure.a543731262804f64adcc0eae1a225acc.database.sql.PROTECTED_FIELDS__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	field_serializers: $structure.a543731262804f64adcc0eae1a225acc.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
};
*/
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_CONFIG = {
	table: $structure.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	primary_key: $structure.a543731262804f64adcc0eae1a225acc.database.sql.PRIMARY_KEY__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
};
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE = new $kernel.models.database.DatabaseModel(
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_ROOT_CONFIG,
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_CONFIG,
);

export { caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE };
