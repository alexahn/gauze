import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $kernel from "./../../kernel/index.js";

class Agent_CharacterDatabaseModel extends $kernel.models.database.DatabaseModel {
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

const ROOT_CONFIG__AGENT_CHARACTER__MODEL__DATABASE = {
	entity: $abstract.entities.agent_character.default($abstract),
	entity_name: "$abstract.entities.agent_character.default",
};
const CONFIG__AGENT_CHARACTER__MODEL__DATABASE = {
	table_name: $structure.entities.agent_character.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
	primary_key: $structure.entities.agent_character.database.sql.PRIMARY_KEY__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
};
const MODEL__AGENT_CHARACTER__MODEL__DATABASE = new Agent_CharacterDatabaseModel(ROOT_CONFIG__AGENT_CHARACTER__MODEL__DATABASE, CONFIG__AGENT_CHARACTER__MODEL__DATABASE);

export { MODEL__AGENT_CHARACTER__MODEL__DATABASE };
