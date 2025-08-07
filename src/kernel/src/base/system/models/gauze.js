import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class bb95d174a16f4ddd935ff3a802f7c7bcSystemModel extends $kernel.src.models.system.SystemModel {
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
				entity_type: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name:
					$database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.CREATE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, scope, parameters, realm).then(function (data) {
			return data.data.create_a543731262804f64adcc0eae1a225acc.map(function (row) {
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
				entity_type: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.READ__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.READ_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, scope, parameters, realm).then(function (data) {
			return data.data.read_a543731262804f64adcc0eae1a225acc.map(function (row) {
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
				entity_type: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name:
					$database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.UPDATE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, scope, parameters, realm).then(function (data) {
			return data.data.update_a543731262804f64adcc0eae1a225acc.map(function (row) {
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
				entity_type: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name:
					$database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.DELETE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, scope, parameters, realm).then(function (data) {
			return data.data.delete_a543731262804f64adcc0eae1a225acc.map(function (row) {
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
				entity_type: $structure.entities.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.COUNT__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name:
					$database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.COUNT_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._count(context, scope, parameters, realm).then(function (data) {
			return data.data.count_a543731262804f64adcc0eae1a225acc;
		});
	}
}

const ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM = {
	entity: $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract),
	entity_name: "$abstract.entities.a543731262804f64adcc0eae1a225acc.default",
};
const CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM = new bb95d174a16f4ddd935ff3a802f7c7bcSystemModel(
	ROOT_CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM,
	CONFIG__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM,
);

export { MODEL__caf5342ac38d41a6a02bb81d2d2b21a4__MODEL__SYSTEM };
