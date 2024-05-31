import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class ProxyDatabaseModel extends $kernel.models.database.DatabaseModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, scope, parameters) {
		const self = this;
		return self._create(context, scope, parameters);
	}
	read(context, scope, parameters) {
		const self = this;
		return self._read(context, scope, parameters);
	}
	update(context, scope, parameters) {
		const self = this;
		return self._update(context, scope, parameters);
	}
	delete(context, scope, parameters) {
		const self = this;
		return self._delete(context, scope, parameters);
	}
	count(context, scope, parameters) {
		const self = this;
		return self._count(context, scope, parameters);
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
