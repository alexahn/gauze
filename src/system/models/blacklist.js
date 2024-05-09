import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class BlacklistSystemModel extends $kernel.models.access.AccessSystemModel {
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
				entity_type: $structure.entities.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.blacklist.CREATE__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.blacklist.CREATE_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_blacklist.map(function (row) {
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
				entity_type: $structure.entities.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.blacklist.READ__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.blacklist.READ_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_blacklist.map(function (row) {
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
				entity_type: $structure.entities.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.blacklist.UPDATE__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.blacklist.UPDATE_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_blacklist.map(function (row) {
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
				entity_type: $structure.entities.blacklist.database.sql.TABLE_NAME__SQL__DATABASE__BLACKLIST__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.blacklist.DELETE__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.blacklist.DELETE_NAME__BLACKLIST__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_blacklist.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__BLACKLIST__MODEL__SYSTEM = {
	entity: $abstract.entities.blacklist.default($abstract),
	entity_name: "$abstract.entities.blacklist.default",
};
const CONFIG__BLACKLIST__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__BLACKLIST__MODEL__SYSTEM = new BlacklistSystemModel(ROOT_CONFIG__BLACKLIST__MODEL__SYSTEM, CONFIG__BLACKLIST__MODEL__SYSTEM);

export { MODEL__BLACKLIST__MODEL__SYSTEM };
