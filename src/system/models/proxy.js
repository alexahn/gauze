import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

import { MODEL__RELATIONSHIP__MODEL__SYSTEM } from "./relationship.js";

class ProxySystemModel extends $kernel.models.system.SystemModel {
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
				entity_type: $structure.entities.proxy.database.sql.TABLE_NAME__SQL__DATABASE__PROXY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.proxy.CREATE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.proxy.CREATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, scope, parameters, realm).then(function (data) {
			return data.data.create_proxy.map(function (row) {
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
				entity_type: $structure.entities.proxy.database.sql.TABLE_NAME__SQL__DATABASE__PROXY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.proxy.READ__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.proxy.READ_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, scope, parameters, realm).then(function (data) {
			return data.data.read_proxy.map(function (row) {
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
				entity_type: $structure.entities.proxy.database.sql.TABLE_NAME__SQL__DATABASE__PROXY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.proxy.UPDATE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.proxy.UPDATE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, scope, parameters, realm).then(function (data) {
			return data.data.update_proxy.map(function (row) {
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
				entity_type: $structure.entities.proxy.database.sql.TABLE_NAME__SQL__DATABASE__PROXY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.proxy.DELETE__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.proxy.DELETE_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, scope, parameters, realm).then(function (data) {
			return data.data.delete_proxy.map(function (row) {
				return row.attributes;
			});
		});
	}
	count(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.proxy.database.sql.TABLE_NAME__SQL__DATABASE__PROXY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.proxy.COUNT__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.proxy.COUNT_NAME__PROXY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._count(context, scope, parameters, realm).then(function (data) {
			return data.data.count_proxy;
		});
	}
}

const ROOT_CONFIG__PROXY__MODEL__SYSTEM = {
	entity: $abstract.entities.proxy.default($abstract),
	entity_name: "$abstract.entities.proxy.default",
};
const CONFIG__PROXY__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
	relationship_model: MODEL__RELATIONSHIP__MODEL__SYSTEM,
};
const MODEL__PROXY__MODEL__SYSTEM = new ProxySystemModel(ROOT_CONFIG__PROXY__MODEL__SYSTEM, CONFIG__PROXY__MODEL__SYSTEM);

export { MODEL__PROXY__MODEL__SYSTEM };
