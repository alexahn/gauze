import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

//class EzuagSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
class EzuagSystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
		this.entity = $abstract.entities.ezuag.default($abstract);
	}
	create(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.CREATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.CREATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.READ__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.READ_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.UPDATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.UPDATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.DELETE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.DELETE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const EZUAG_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.ezuag.default($abstract);
const EZUAG_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const EZUAG_MODEL_SYSTEM_CONFIG = {};
const EZUAG_MODEL_SYSTEM = new EzuagSystemModel(EZUAG_MODEL_SYSTEM_ROOT_CONFIG, EZUAG_MODEL_SYSTEM_PARENT_CONFIG, EZUAG_MODEL_SYSTEM_CONFIG);

export { EZUAG_MODEL_SYSTEM };
