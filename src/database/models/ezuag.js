import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class EzuagDatabaseModel extends $kernel.models.database.DatabaseModel {
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

const EZUAG_MODEL_DATABASE_ROOT_CONFIG = {
	entity: $abstract.entities.ezuag.default($abstract),
	entity_name: "$abstract.entities.ezuag.default",
};
const EZUAG_MODEL_DATABASE_CONFIG = {
	table_name: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
	primary_key: $structure.ezuag.database.sql.PRIMARY_KEY__SQL__DATABASE__EZUAG__STRUCTURE,
};
const EZUAG_MODEL_DATABASE = new EzuagDatabaseModel(EZUAG_MODEL_DATABASE_ROOT_CONFIG, EZUAG_MODEL_DATABASE_CONFIG);

export { EZUAG_MODEL_DATABASE };
