import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class Entity1DatabaseModel extends $kernel.models.database.DatabaseModel {
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

const ENTITY1_MODEL_DATABASE_ROOT_CONFIG = {
	entity: $abstract.entities.entity1.default($abstract),
	entity_name: "$abstract.entities.entity1.default",
};
const ENTITY1_MODEL_DATABASE_CONFIG = {
	table_name: $structure.entity1.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
	primary_key: $structure.entity1.database.sql.PRIMARY_KEY__SQL__DATABASE__ENTITY1__STRUCTURE,
};
const ENTITY1_MODEL_DATABASE = new Entity1DatabaseModel(ENTITY1_MODEL_DATABASE_ROOT_CONFIG, ENTITY1_MODEL_DATABASE_CONFIG);

export { ENTITY1_MODEL_DATABASE };
