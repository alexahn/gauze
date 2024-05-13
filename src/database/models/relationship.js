import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class RelationshipDatabaseModel extends $kernel.models.database.DatabaseModel {
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
