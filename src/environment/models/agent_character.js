import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class AgentCharacterEnvironmentModel extends $kernel.models.environment.EnvironmentModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_character.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_character.CREATE__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_character.CREATE_NAME__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_agent_character.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_character.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_character.READ__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_character.READ_NAME__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_agent_character.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_character.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_character.UPDATE__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_character.UPDATE_NAME__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_agent_character.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_character.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_CHARACTER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_character.DELETE__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_character.DELETE_NAME__AGENT_CHARACTER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_agent_character.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__AGENT_CHARACTER__MODEL__ENVIRONMENT = {
	entity: $abstract.entities.agent_character.default($abstract),
	entity_name: "$abstract.entities.agent_character.default",
};
const CONFIG__AGENT_CHARACTER__MODEL__ENVIRONMENT = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__AGENT_CHARACTER__MODEL__ENVIRONMENT = new AgentCharacterEnvironmentModel(ROOT_CONFIG__AGENT_CHARACTER__MODEL__ENVIRONMENT, CONFIG__AGENT_CHARACTER__MODEL__ENVIRONMENT);

export { MODEL__AGENT_CHARACTER__MODEL__ENVIRONMENT };
