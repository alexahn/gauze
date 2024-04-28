import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

//class BlacklistSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
class BlacklistSystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
		this.entity = $abstract.entities.blacklist.default($abstract);
	}
	create(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.blacklist.CREATE__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.blacklist.CREATE_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_blacklist.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.blacklist.READ__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.blacklist.READ_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_blacklist.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.blacklist.UPDATE__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.blacklist.UPDATE_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_blacklist.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.blacklist.DELETE__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.blacklist.DELETE_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_blacklist.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const BLACKLIST_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.blacklist.default($abstract);
const BLACKLIST_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const BLACKLIST_MODEL_SYSTEM_CONFIG = {};
const BLACKLIST_MODEL_SYSTEM = new BlacklistSystemModel(BLACKLIST_MODEL_SYSTEM_ROOT_CONFIG, BLACKLIST_MODEL_SYSTEM_PARENT_CONFIG, BLACKLIST_MODEL_SYSTEM_CONFIG);

export { BLACKLIST_MODEL_SYSTEM };
