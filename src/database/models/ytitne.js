import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class YtitneDatabaseModel extends $kernel.models.database.DatabaseModel {
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

const YTITNE_MODEL_DATABASE_ROOT_CONFIG = {
	entity: $abstract.entities.ytitne.default($abstract),
	entity_name: "$abstract.entities.ytitne.default",
};
const YTITNE_MODEL_DATABASE_CONFIG = {
	table_name: $structure.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
	primary_key: $structure.ytitne.database.sql.PRIMARY_KEY__SQL__DATABASE__YTITNE__STRUCTURE,
};
const YTITNE_MODEL_DATABASE = new YtitneDatabaseModel(YTITNE_MODEL_DATABASE_ROOT_CONFIG, YTITNE_MODEL_DATABASE_CONFIG);

export { YTITNE_MODEL_DATABASE };
