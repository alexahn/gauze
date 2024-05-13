import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class ProxyDatabaseModel extends $kernel.models.database.DatabaseModel {
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
	count(context, parameters) {
		const self = this;
		return self._count(context, parameters);
	}
}

const ROOT_CONFIG__PROXY__MODEL__DATABASE = {
	entity: $abstract.entities.proxy.default($abstract),
	entity_name: "$abstract.entities.proxy.default",
};
const CONFIG__PROXY__MODEL__DATABASE = {
	table_name: $structure.entities.proxy.database.sql.TABLE_NAME__SQL__DATABASE__PROXY__STRUCTURE,
	primary_key: $structure.entities.proxy.database.sql.PRIMARY_KEY__SQL__DATABASE__PROXY__STRUCTURE,
};
const MODEL__PROXY__MODEL__DATABASE = new ProxyDatabaseModel(ROOT_CONFIG__PROXY__MODEL__DATABASE, CONFIG__PROXY__MODEL__DATABASE);

export { MODEL__PROXY__MODEL__DATABASE };
