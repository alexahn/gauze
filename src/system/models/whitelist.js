import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class WhitelistSystemModel extends $kernel.models.access.AccessSystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.whitelist.CREATE__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.whitelist.CREATE_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.whitelist.READ__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.whitelist.READ_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.whitelist.UPDATE__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.whitelist.UPDATE_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, parameters) {
		const self = this;
		var { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.whitelist.database.sql.TABLE_NAME__SQL__DATABASE__WHITELIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.whitelist.DELETE__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.whitelist.DELETE_NAME__WHITELIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_whitelist.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__WHITELIST__MODEL__SYSTEM = {
	entity: $abstract.entities.whitelist.default($abstract),
	entity_name: "$abstract.entities.whitelist.default",
};
const CONFIG__WHITELIST__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__WHITELIST__MODEL__SYSTEM = new WhitelistSystemModel(ROOT_CONFIG__WHITELIST__MODEL__SYSTEM, CONFIG__WHITELIST__MODEL__SYSTEM);

export { MODEL__WHITELIST__MODEL__SYSTEM };
