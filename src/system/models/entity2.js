import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class Entity2SystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity2.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.CREATE__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.CREATE_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity2.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.READ__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.READ_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity2.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.UPDATE__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.UPDATE_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.entity2.database.sql.TABLE_NAME__SQL__DATABASE__ENTITY2__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.DELETE__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.DELETE_NAME__ENTITY2__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_entity2.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__ENTITY2__MODEL__SYSTEM = {
	entity: $abstract.entities.entity2.default($abstract),
	entity_name: "$abstract.entities.entity2.default",
};
const CONFIG__ENTITY2__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__ENTITY2__MODEL__SYSTEM = new Entity2SystemModel(ROOT_CONFIG__ENTITY2__MODEL__SYSTEM, CONFIG__ENTITY2__MODEL__SYSTEM);

export { MODEL__ENTITY2__MODEL__SYSTEM };
