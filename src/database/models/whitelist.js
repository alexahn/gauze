import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class WhitelistDatabaseModel extends $kernel.models.database.DatabaseModel {
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

const ROOT_CONFIG__WHITELIST__MODEL__DATABASE = {
	entity: $abstract.entities.whitelist.default($abstract),
	entity_name: "$abstract.entities.whitelist.default",
};
const CONFIG__WHITELIST__MODEL__DATABASE = {
	table_name: $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
	primary_key: $structure.entities.whitelist.database.sql.PRIMARY_KEY__SQL__DATABASE__WHITELIST__STRUCTURE,
};
const MODEL__WHITELIST__MODEL__DATABASE = new WhitelistDatabaseModel(ROOT_CONFIG__WHITELIST__MODEL__DATABASE, CONFIG__WHITELIST__MODEL__DATABASE);

export { MODEL__WHITELIST__MODEL__DATABASE };
