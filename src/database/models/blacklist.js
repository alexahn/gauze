import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class BlacklistDatabaseModel extends $kernel.models.database.DatabaseModel {
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

const BLACKLIST_MODEL_DATABASE_ROOT_CONFIG = {
	entity: $abstract.entities.blacklist.default($abstract),
	entity_name: "$abstract.entities.blacklist.default",
};
const BLACKLIST_MODEL_DATABASE_CONFIG = {
	table_name: $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
	primary_key: $structure.blacklist.database.sql.PRIMARY_KEY__SQL__DATABASE__BLACKLIST__STRUCTURE,
};
const BLACKLIST_MODEL_DATABASE = new BlacklistDatabaseModel(BLACKLIST_MODEL_DATABASE_ROOT_CONFIG, BLACKLIST_MODEL_DATABASE_CONFIG);

export { BLACKLIST_MODEL_DATABASE };
