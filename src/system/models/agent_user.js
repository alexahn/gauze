import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class AgentUserSystemModel extends $kernel.models.system.SystemModel {
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
				entity_type: $structure.entities.agent_user.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_USER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_user.CREATE__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_user.CREATE_NAME__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_agent_user.map(function (row) {
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
				entity_type: $structure.entities.agent_user.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_USER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_user.READ__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_user.READ_NAME__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_agent_user.map(function (row) {
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
				entity_type: $structure.entities.agent_user.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_USER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_user.UPDATE__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_user.UPDATE_NAME__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_agent_user.map(function (row) {
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
				entity_type: $structure.entities.agent_user.database.sql.TABLE_NAME__SQL__DATABASE__AGENT_USER__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.agent_user.DELETE__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.agent_user.DELETE_NAME__AGENT_USER__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_agent_user.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__AGENT_USER__MODEL__SYSTEM = {
	entity: $abstract.entities.agent_user.default($abstract),
	entity_name: "$abstract.entities.agent_user.default",
};
const CONFIG__AGENT_USER__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__AGENT_USER__MODEL__SYSTEM = new AgentUserSystemModel(ROOT_CONFIG__AGENT_USER__MODEL__SYSTEM, CONFIG__AGENT_USER__MODEL__SYSTEM);

export { MODEL__AGENT_USER__MODEL__SYSTEM };
