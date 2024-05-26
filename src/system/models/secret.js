import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

import { MODEL__RELATIONSHIP__MODEL__SYSTEM } from "./relationship.js";

class SecretSystemModel extends $kernel.models.system.SystemModel {
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
	count(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.secret.database.sql.TABLE_NAME__SQL__DATABASE__SECRET__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.secret.COUNT__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.secret.COUNT_NAME__SECRET__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._count(context, parameters, realm).then(function (data) {
			return data.data.count_secret;
		});
	}
}

const ROOT_CONFIG__SECRET__MODEL__SYSTEM = {
	entity: $abstract.entities.secret.default($abstract),
	entity_name: "$abstract.entities.secret.default",
};
const CONFIG__SECRET__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
	relationship: MODEL__RELATIONSHIP__MODEL__SYSTEM,
};
const MODEL__SECRET__MODEL__SYSTEM = new SecretSystemModel(ROOT_CONFIG__SECRET__MODEL__SYSTEM, CONFIG__SECRET__MODEL__SYSTEM);

export { MODEL__SECRET__MODEL__SYSTEM };
