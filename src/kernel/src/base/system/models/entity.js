import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class ba381b0cc764c4c9a187b716ae94ed96SystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.CREATE__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.CREATE_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.READ__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.READ_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.UPDATE__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.UPDATE_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.DELETE__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.DELETE_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract)
const cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_CONFIG = {};
const cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM = new ba381b0cc764c4c9a187b716ae94ed96SystemModel(cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_ROOT_CONFIG, cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_PARENT_CONFIG, cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM_CONFIG);

export { cd637bc32c364580be5cc28396d3dee8_MODEL_SYSTEM };
