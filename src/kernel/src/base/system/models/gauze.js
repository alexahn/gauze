import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

//class bb95d174a16f4ddd935ff3a802f7c7bcSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
class bb95d174a16f4ddd935ff3a802f7c7bcSystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
		self.entity = $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract);
	}
	create(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.CREATE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.READ__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.READ_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.UPDATE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a543731262804f64adcc0eae1a225acc.database.sql.TABLE_NAME__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.DELETE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.a543731262804f64adcc0eae1a225acc.default($abstract);
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM = new bb95d174a16f4ddd935ff3a802f7c7bcSystemModel(
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_ROOT_CONFIG,
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_CONFIG,
);

export { caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM };
