import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";

import { GraphQLOperationSystemModel } from "./class.js";

class ca381b0cc764c4c9a187b716ae94ed9SystemModel extends GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.CREATE__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.CREATE_NAME__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_62b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.READ__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.READ_NAME__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_62b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.UPDATE__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.UPDATE_NAME__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_62b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.DELETE__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.62b8dbc3427b41a9899e11671c2422c7.DELETE_NAME__6d637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_62b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const 6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_ROOT_CONFIG = {
	fields: $structure.62b8dbc3427b41a9899e11671c2422c7.database.sql.FIELDS__SQL__DATABASE__6d637bc32c364580be5cc28396d3dee8__STRUCTURE,
	protected_fields: $structure.62b8dbc3427b41a9899e11671c2422c7.database.sql.PROTECTED_FIELDS__SQL__DATABASE__6d637bc32c364580be5cc28396d3dee8__STRUCTURE,
	field_serializers: $structure.62b8dbc3427b41a9899e11671c2422c7.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__6d637bc32c364580be5cc28396d3dee8__STRUCTURE,
};
const 6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const 6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_CONFIG = {};
const 6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM = new ca381b0cc764c4c9a187b716ae94ed9SystemModel(6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_ROOT_CONFIG, 6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_PARENT_CONFIG, 6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_CONFIG);

export { 6d637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM };
