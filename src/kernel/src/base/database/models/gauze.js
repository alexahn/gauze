import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class dd6fb00f485c4397add38780939d6923DatabaseModel extends $kernel.models.database.DatabaseModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		return self._create(context, parameters);
	}
	read(context, parameters) {
		const self = this;
		return self._read(context, parameters);
	}
	update(context, parameters) {
		const self = this;
		return self._update(context, parameters);
	}
	delete(context, parameters) {
		const self = this;
		return self._delete(context, parameters);
	}
}

const ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE = {
	entity: $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract),
	entity_name: "$abstract.entities.a543731262804f64adcc0eae1a225acc.default",
};
const CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE = {
	table_name: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	primary_key: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.PRIMARY_KEY__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
};
const MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE = new dd6fb00f485c4397add38780939d6923DatabaseModel(
	ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE,
	CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE,
);

export { MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__DATABASE };
