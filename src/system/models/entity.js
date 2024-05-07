import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class EntitySystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		var { agent_id = null } = context;
		const realm = {
			agent: {
				// todo: remove this parameters proxy once we set up user authentication
				agent_id: parameters.agent_id || agent_id,
			},
			entity: {
				entity_type: $structure.entities.entity.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.entity.CREATE__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.entity.CREATE_NAME__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_entity.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, parameters) {
		const self = this;
		var { agent_id = null } = context;
		const realm = {
			agent: {
				// todo: remove this parameters proxy once we set up user authentication
				agent_id: parameters.agent_id || agent_id,
			},
			entity: {
				entity_type: $structure.entities.entity.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.entity.READ__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.entity.READ_NAME__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_entity.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, parameters) {
		const self = this;
		var { agent_id = null } = context;
		const realm = {
			agent: {
				// todo: remove this parameters proxy once we set up user authentication
				agent_id: (agent_id = parameters.agent_id || agent_id),
			},
			entity: {
				entity_type: $structure.entities.entity.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.entity.UPDATE__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.entity.UPDATE_NAME__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_entity.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, parameters) {
		const self = this;
		var { agent_id = null } = context;
		const realm = {
			agent: {
				// todo: remove this parameters proxy once we set up user authentication
				agent_id: parameters.agent_id || agent_id,
			},
			entity: {
				entity_type: $structure.entities.entity.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.entity.DELETE__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.entity.DELETE_NAME__ENTITY__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_entity.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__ENTITY__MODEL__SYSTEM = {
	entity: $abstract.entities.entity.default($abstract),
	entity_name: "$abstract.entities.entity.default",
};
const CONFIG__ENTITY__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__ENTITY__MODEL__SYSTEM = new EntitySystemModel(ROOT_CONFIG__ENTITY__MODEL__SYSTEM, CONFIG__ENTITY__MODEL__SYSTEM);

export { MODEL__ENTITY__MODEL__SYSTEM };
