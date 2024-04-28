import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class Entity1SystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity1.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.CREATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.CREATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_entity1.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity1.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.READ__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.READ_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_entity1.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity1.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.UPDATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.UPDATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_entity1.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity1.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY1__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.DELETE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.DELETE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_entity1.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__ENTITY1__MODEL__SYSTEM = {
	entity: $abstract.entities.entity1.default($abstract),
	entity_name: "$abstract.entities.entity1.default",
};
const CONFIG__ENTITY1__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__ENTITY1__MODEL__SYSTEM = new Entity1SystemModel(ROOT_CONFIG__ENTITY1__MODEL__SYSTEM, CONFIG__ENTITY1__MODEL__SYSTEM);

export { MODEL__ENTITY1__MODEL__SYSTEM };
