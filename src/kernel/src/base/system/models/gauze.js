import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";

import { GraphQLOperationSystemModel } from "./class.js";

class bb95d174a16f4ddd935ff3a802f7c7bcSystemModel extends GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.CREATE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.CREATE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.READ__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.READ_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.UPDATE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.UPDATE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.DELETE__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a543731262804f64adcc0eae1a225acc.DELETE_NAME__caf5342ac38d41a6a02bb81d2d2b21a4__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_a543731262804f64adcc0eae1a225acc.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_ROOT_CONFIG = {
	fields: $structure.a543731262804f64adcc0eae1a225acc.database.sql.FIELDS__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	protected_fields: $structure.a543731262804f64adcc0eae1a225acc.database.sql.PROTECTED_FIELDS__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
	field_serializers: $structure.a543731262804f64adcc0eae1a225acc.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__caf5342ac38d41a6a02bb81d2d2b21a4__STRUCTURE,
};
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_CONFIG = {};
const caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM = new bb95d174a16f4ddd935ff3a802f7c7bcSystemModel(
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_ROOT_CONFIG,
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_PARENT_CONFIG,
	caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM_CONFIG,
);

export { caf5342ac38d41a6a02bb81d2d2b21a4_MODEL_SYSTEM };
