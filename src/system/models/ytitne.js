import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class YtitneSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.CREATE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.CREATE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.READ__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.READ_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.UPDATE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.UPDATE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.ytitne.DELETE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ytitne.DELETE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const YTITNE_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.ytitne.default($abstract);
const YTITNE_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const YTITNE_MODEL_SYSTEM_CONFIG = {};
const YTITNE_MODEL_SYSTEM = new YtitneSystemModel(YTITNE_MODEL_SYSTEM_ROOT_CONFIG, YTITNE_MODEL_SYSTEM_PARENT_CONFIG, YTITNE_MODEL_SYSTEM_CONFIG);

export { YTITNE_MODEL_SYSTEM };
