import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class SecretEnvironmentModel extends $kernel.models.environment.EnvironmentModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.secret.database.sql.TABLE_NAME__SQL__DATABASE__SECRET__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.secret.CREATE__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.secret.CREATE_NAME__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_secret.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.secret.database.sql.TABLE_NAME__SQL__DATABASE__SECRET__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.secret.READ__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.secret.READ_NAME__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_secret.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.secret.database.sql.TABLE_NAME__SQL__DATABASE__SECRET__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.secret.UPDATE__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.secret.UPDATE_NAME__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_secret.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.secret.database.sql.TABLE_NAME__SQL__DATABASE__SECRET__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.secret.DELETE__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.secret.DELETE_NAME__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_secret.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__SECRET__MODEL__ENVIRONMENT = {
	entity: $abstract.entities.secret.default($abstract),
	entity_name: "$abstract.entities.secret.default",
};
const CONFIG__SECRET__MODEL__ENVIRONMENT = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__SECRET__MODEL__ENVIRONMENT = new SecretEnvironmentModel(ROOT_CONFIG__SECRET__MODEL__ENVIRONMENT, CONFIG__SECRET__MODEL__ENVIRONMENT);

export { MODEL__SECRET__MODEL__ENVIRONMENT };
