import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

import * as $operations from "./operations/index.js";

class AgentPersonEnvironmentModel extends $kernel.models.environment.EnvironmentModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_person.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_PERSON__STRUCTURE,
			},
			operation: {
				operation: $operations.agent_person.CREATE__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT,
				operation_name: $operations.agent_person.CREATE_NAME__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			},
		};
		return self._create(context, scope, parameters, realm).then(function (data) {
			return data.data.create_agent_person.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_person.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_PERSON__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_person.READ__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_person.READ_NAME__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, scope, parameters, realm).then(function (data) {
			return data.data.read_agent_person.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_person.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_PERSON__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_person.UPDATE__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_person.UPDATE_NAME__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, scope, parameters, realm).then(function (data) {
			return data.data.update_agent_person.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.agent_person.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_PERSON__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_person.DELETE__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_person.DELETE_NAME__AGENT_PERSON__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, scope, parameters, realm).then(function (data) {
			return data.data.delete_agent_person.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__AGENT_PERSON__MODEL__ENVIRONMENT = {
	entity: $abstract.entities.agent_person.default($abstract),
	entity_name: "$abstract.entities.agent_person.default",
};
const CONFIG__AGENT_PERSON__MODEL__ENVIRONMENT = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__AGENT_PERSON__MODEL__ENVIRONMENT = new AgentPersonEnvironmentModel(ROOT_CONFIG__AGENT_PERSON__MODEL__ENVIRONMENT, CONFIG__AGENT_PERSON__MODEL__ENVIRONMENT);

export { MODEL__AGENT_PERSON__MODEL__ENVIRONMENT };
