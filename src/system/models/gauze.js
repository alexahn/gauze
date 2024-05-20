import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class GauzeSystemModel extends $kernel.models.system.SystemModel {
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
				entity_type: $structure.entities.gauze.database.sql.TABLE_NAME__SQL__DATABASE__GAUZE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.gauze.CREATE__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.gauze.CREATE_NAME__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_gauze.map(function (row) {
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
				entity_type: $structure.entities.gauze.database.sql.TABLE_NAME__SQL__DATABASE__GAUZE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.gauze.READ__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.gauze.READ_NAME__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_gauze.map(function (row) {
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
				entity_type: $structure.entities.gauze.database.sql.TABLE_NAME__SQL__DATABASE__GAUZE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.gauze.UPDATE__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.gauze.UPDATE_NAME__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_gauze.map(function (row) {
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
				entity_type: $structure.entities.gauze.database.sql.TABLE_NAME__SQL__DATABASE__GAUZE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.gauze.DELETE__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.gauze.DELETE_NAME__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_gauze.map(function (row) {
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
				entity_type: $structure.entities.gauze.database.sql.TABLE_NAME__SQL__DATABASE__GAUZE__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.gauze.COUNT__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.gauze.COUNT_NAME__GAUZE__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._count(context, parameters, realm).then(function (data) {
			return data.data.count_gauze;
		});
	}
}

const ROOT_CONFIG__GAUZE__MODEL__SYSTEM = {
	entity: $abstract.entities.gauze.default($abstract),
	entity_name: "$abstract.entities.gauze.default",
};
const CONFIG__GAUZE__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__GAUZE__MODEL__SYSTEM = new GauzeSystemModel(ROOT_CONFIG__GAUZE__MODEL__SYSTEM, CONFIG__GAUZE__MODEL__SYSTEM);

export { MODEL__GAUZE__MODEL__SYSTEM };
