import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

import * as $operations from "./operations/index.js";

class AgentRootEnvironmentModel extends $kernel.src.models.environment.EnvironmentModel {
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
				entity_type: $structure.entities.agent_root.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ROOT__STRUCTURE,
			},
			operation: {
				operation: $operations.agent_root.CREATE__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT,
				operation_name: $operations.agent_root.CREATE_NAME__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__ENVIRONMENT,
			},
		};
		return self._create(context, scope, parameters, realm).then(function (data) {
			return data.data.create_agent_root.map(function (row) {
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
				entity_type: $structure.entities.agent_root.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ROOT__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_root.READ__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_root.READ_NAME__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, scope, parameters, realm).then(function (data) {
			return data.data.read_agent_root.map(function (row) {
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
				entity_type: $structure.entities.agent_root.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ROOT__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_root.UPDATE__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_root.UPDATE_NAME__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, scope, parameters, realm).then(function (data) {
			return data.data.update_agent_root.map(function (row) {
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
				entity_type: $structure.entities.agent_root.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ROOT__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_root.DELETE__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_root.DELETE_NAME__AGENT_ROOT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, scope, parameters, realm).then(function (data) {
			return data.data.delete_agent_root.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__AGENT_ROOT__MODEL__ENVIRONMENT = {
	entity: $abstract.entities.agent_root.default($abstract),
	entity_name: "$abstract.entities.agent_root.default",
};
const CONFIG__AGENT_ROOT__MODEL__ENVIRONMENT = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__AGENT_ROOT__MODEL__ENVIRONMENT = new AgentRootEnvironmentModel(ROOT_CONFIG__AGENT_ROOT__MODEL__ENVIRONMENT, CONFIG__AGENT_ROOT__MODEL__ENVIRONMENT);

export { MODEL__AGENT_ROOT__MODEL__ENVIRONMENT };
