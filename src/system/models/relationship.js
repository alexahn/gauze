import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class RelationshipSystemModel extends $kernel.models.relationship.RelationshipSystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, parameters) {
		const self = this;
		var { agent_id = null } = context;
		// todo: remove this parameters proxy once we set up user authentication
		const realm = {
			agent: {
				// todo: remove this parameters proxy once we set up user authentication
				agent_id: parameters.agent_id || agent_id,
			},
			entity: {
				entity_type: $structure.entities.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.relationship.CREATE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.relationship.CREATE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, parameters, realm).then(function (data) {
			return data.data.create_relationship.map(function (row) {
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
				entity_type: $structure.entities.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.relationship.READ__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.relationship.READ_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, parameters, realm).then(function (data) {
			return data.data.read_relationship.map(function (row) {
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
				entity_type: $structure.entities.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.relationship.UPDATE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.relationship.UPDATE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, parameters, realm).then(function (data) {
			return data.data.update_relationship.map(function (row) {
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
				entity_type: $structure.entities.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.relationship.DELETE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.relationship.DELETE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, parameters, realm).then(function (data) {
			return data.data.delete_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__RELATIONSHIP__MODEL__SYSTEM = {
	entity: $abstract.entities.relationship.default($abstract),
	entity_name: "$abstract.entities.relationship.default",
};
const CONFIG__RELATIONSHIP__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__RELATIONSHIP__MODEL__SYSTEM = new RelationshipSystemModel(ROOT_CONFIG__RELATIONSHIP__MODEL__SYSTEM, CONFIG__RELATIONSHIP__MODEL__SYSTEM);

export { MODEL__RELATIONSHIP__MODEL__SYSTEM };
