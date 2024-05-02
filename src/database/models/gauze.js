import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class GauzeDatabaseModel extends $kernel.models.database.DatabaseModel {
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

const ROOT_CONFIG__GAUZE__MODEL__DATABASE = {
	entity: $abstract.entities.gauze.default($abstract),
	entity_name: "$abstract.entities.gauze.default",
};
const CONFIG__GAUZE__MODEL__DATABASE = {
	table_name: $structure.entities.gauze.database.sql.TABLE_NAME__SQL__DATABASE__GAUZE__STRUCTURE,
	primary_key: $structure.entities.gauze.database.sql.PRIMARY_KEY__SQL__DATABASE__GAUZE__STRUCTURE,
};
const MODEL__GAUZE__MODEL__DATABASE = new GauzeDatabaseModel(ROOT_CONFIG__GAUZE__MODEL__DATABASE, CONFIG__GAUZE__MODEL__DATABASE);

export { MODEL__GAUZE__MODEL__DATABASE };
