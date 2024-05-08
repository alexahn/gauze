import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class AgentAccountEnvironmentModel extends $kernel.models.environment.EnvironmentModel {
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
				entity_type: $structure.entities.agent_account.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ACCOUNT__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_account.CREATE__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_account.CREATE_NAME__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_agent_account.map(function (row) {
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
				entity_type: $structure.entities.agent_account.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ACCOUNT__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_account.READ__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_account.READ_NAME__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_agent_account.map(function (row) {
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
				entity_type: $structure.entities.agent_account.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ACCOUNT__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_account.UPDATE__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_account.UPDATE_NAME__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_agent_account.map(function (row) {
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
				entity_type: $structure.entities.agent_account.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_ACCOUNT__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_account.DELETE__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_account.DELETE_NAME__AGENT_ACCOUNT__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_agent_account.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__AGENT_ACCOUNT__MODEL__ENVIRONMENT = {
	entity: $abstract.entities.agent_account.default($abstract),
	entity_name: "$abstract.entities.agent_account.default",
};
const CONFIG__AGENT_ACCOUNT__MODEL__ENVIRONMENT = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__AGENT_ACCOUNT__MODEL__ENVIRONMENT = new AgentAccountEnvironmentModel(ROOT_CONFIG__AGENT_ACCOUNT__MODEL__ENVIRONMENT, CONFIG__AGENT_ACCOUNT__MODEL__ENVIRONMENT);

export { MODEL__AGENT_ACCOUNT__MODEL__ENVIRONMENT };
