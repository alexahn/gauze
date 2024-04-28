import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class Entity2DatabaseModel extends $kernel.models.database.DatabaseModel {
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

const ENTITY2_MODEL_DATABASE_ROOT_CONFIG = {
	entity: $abstract.entities.entity2.default($abstract),
	entity_name: "$abstract.entities.entity2.default",
};
const ENTITY2_MODEL_DATABASE_CONFIG = {
	table_name: $structure.entity2.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
	primary_key: $structure.entity2.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY2__STRUCTURE,
};
const ENTITY2_MODEL_DATABASE = new Entity2DatabaseModel(ENTITY2_MODEL_DATABASE_ROOT_CONFIG, ENTITY2_MODEL_DATABASE_CONFIG);

export { ENTITY2_MODEL_DATABASE };
