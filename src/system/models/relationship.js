import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

//class RelationshipSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
class RelationshipSystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
		this.entity = $abstract.entities.relationship.default($abstract);
	}
	create(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.CREATE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.CREATE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.READ__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.READ_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.UPDATE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.UPDATE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.relationship.database.sql.TABLE_NAME__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.DELETE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.DELETE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG = $abstract.entities.relationship.default($abstract);
const RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const RELATIONSHIP_MODEL_SYSTEM_CONFIG = {};
const RELATIONSHIP_MODEL_SYSTEM = new RelationshipSystemModel(RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_CONFIG);

export { RELATIONSHIP_MODEL_SYSTEM };
