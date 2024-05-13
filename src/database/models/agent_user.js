import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class AgentUserDatabaseModel extends $kernel.models.database.DatabaseModel {
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

const ROOT_CONFIG__AGENT_USER__MODEL__DATABASE = {
	entity: $abstract.entities.agent_user.default($abstract),
	entity_name: "$abstract.entities.agent_user.default",
};
const CONFIG__AGENT_USER__MODEL__DATABASE = {
	table_name: $structure.entities.agent_user.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_USER__STRUCTURE,
	primary_key: $structure.entities.agent_user.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_USER__STRUCTURE,
};
const MODEL__AGENT_USER__MODEL__DATABASE = new AgentUserDatabaseModel(ROOT_CONFIG__AGENT_USER__MODEL__DATABASE, CONFIG__AGENT_USER__MODEL__DATABASE);

export { MODEL__AGENT_USER__MODEL__DATABASE };
