import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class bb95d174a16f4ddd935ff3a802f7c7bcDatabaseModel extends $kernel.models.database.DatabaseModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, input) {
		const self = this;
		return self._create(context, input);
	}
	read(context, input) {
		const self = this;
		return self._read(context, input);
	}
	update(context, input) {
		const self = this;
		return self._update(context, input);
	}
	delete(context, input) {
		const self = this;
		return self._delete(context, input);
	}
}

const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_ROOT_CONFIG = {
	entity: $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract),
	entity_name: "$abstract.entities.a543731262804f64adcc0eae1a225acc.default",
};
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_CONFIG = {
	table_name: $structure.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	primary_key: $structure.a543731262804f64adcc0eae1a225acc.database.sql.PRIMARY_KEY__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
};
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE = new bb95d174a16f4ddd935ff3a802f7c7bcDatabaseModel(
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_ROOT_CONFIG,
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE_CONFIG,
);

export { caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_DATABASE };
