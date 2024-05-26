import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

import { MODEL__RELATIONSHIP__MODEL__SYSTEM } from "./relationship.js";

class YtitneYtitneSystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.ytitne.CREATE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.ytitne.CREATE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.ytitne.READ__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.ytitne.READ_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.ytitne.UPDATE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.ytitne.UPDATE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.ytitne.DELETE__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.ytitne.DELETE_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_ytitne.map(function (row) {
				return row.attributes;
			});
		});
	}
	count(context, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.ytitne.database.sql.TABLE_NAME__SQL__DATABASE__YTITNE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.ytitne.COUNT__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.ytitne.COUNT_NAME__YTITNE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._count(context, parameters, realm).then(function (data) {
			return data.data.count_ytitne;
		});
	}
}

const ROOT_CONFIG__YTITNE__MODEL__SYSTEM = {
	entity: $abstract.entities.ytitne.default($abstract),
	entity_name: "$abstract.entities.ytitne.default",
};
const CONFIG__YTITNE__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
	relationship: MODEL__RELATIONSHIP__MODEL__SYSTEM,
};
const MODEL__YTITNE__MODEL__SYSTEM = new YtitneYtitneSystemModel(ROOT_CONFIG__YTITNE__MODEL__SYSTEM, CONFIG__YTITNE__MODEL__SYSTEM);

export { MODEL__YTITNE__MODEL__SYSTEM };
