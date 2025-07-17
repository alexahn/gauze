import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class RelationshipDatabaseModel extends $kernel.src.models.database.DatabaseModel {
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

const ROOT_CONFIG__RELATIONSHIP__MODEL__DATABASE = {
	entity: $abstract.entities.relationship.default($abstract),
	entity_name: "$abstract.entities.relationship.default",
};
const CONFIG__RELATIONSHIP__MODEL__DATABASE = {
	table_name: $structure.entities.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	primary_key: $structure.entities.relationship.database.sql.PRIMARY_KEY__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
};
const MODEL__RELATIONSHIP__MODEL__DATABASE = new RelationshipDatabaseModel(ROOT_CONFIG__RELATIONSHIP__MODEL__DATABASE, CONFIG__RELATIONSHIP__MODEL__DATABASE);

export { MODEL__RELATIONSHIP__MODEL__DATABASE };
