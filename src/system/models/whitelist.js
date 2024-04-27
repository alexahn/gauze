import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class WhitelistSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.whitelist.CREATE__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.whitelist.CREATE_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.whitelist.READ__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.whitelist.READ_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.whitelist.UPDATE__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.whitelist.UPDATE_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.whitelist.DELETE__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.whitelist.DELETE_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const WHITELIST_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.whitelist.default($abstract);
const WHITELIST_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const WHITELIST_MODEL_SYSTEM_CONFIG = {};
const WHITELIST_MODEL_SYSTEM = new WhitelistSystemModel(WHITELIST_MODEL_SYSTEM_ROOT_CONFIG, WHITELIST_MODEL_SYSTEM_PARENT_CONFIG, WHITELIST_MODEL_SYSTEM_CONFIG);

export { WHITELIST_MODEL_SYSTEM };
