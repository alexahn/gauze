import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class Entity2SystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.CREATE__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.CREATE_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.READ__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.READ_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.UPDATE__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.UPDATE_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.DELETE__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.DELETE_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ENTITY2_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.entity2.default($abstract)
const ENTITY2_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const ENTITY2_MODEL_SYSTEM_CONFIG = {};
const ENTITY2_MODEL_SYSTEM = new Entity2SystemModel(ENTITY2_MODEL_SYSTEM_ROOT_CONFIG, ENTITY2_MODEL_SYSTEM_PARENT_CONFIG, ENTITY2_MODEL_SYSTEM_CONFIG);

export { ENTITY2_MODEL_SYSTEM };
