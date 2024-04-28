import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class EzuagSystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, input) {
		const self = this;
		var { agent_id = "" } = context;
		// todo: remove this input proxy once we set up user authentication
		agent_id = input.agent_id || agent_id;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: agent_id,
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.CREATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.CREATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		var { agent_id = "" } = context;
		// todo: remove this input proxy once we set up user authentication
		agent_id = input.agent_id || agent_id;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: agent_id,
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.READ__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.READ_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		var { agent_id = "" } = context;
		// todo: remove this input proxy once we set up user authentication
		agent_id = input.agent_id || agent_id;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: agent_id,
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.UPDATE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.UPDATE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		var { agent_id = "" } = context;
		// todo: remove this input proxy once we set up user authentication
		agent_id = input.agent_id || agent_id;
		const access = {
			entity_type: $structure.ezuag.database.sql.TABLE_NAME__SQL__DATABASE__EZUAG__STRUCTURE,
			agent_id: agent_id,
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.ezuag.DELETE__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.ezuag.DELETE_NAME__EZUAG__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_ezuag.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__EZUAG__MODEL__SYSTEM = {
	entity: $abstract.entities.ezuag.default($abstract),
	entity_name: "$abstract.entities.ezuag.default",
};
const CONFIG__EZUAG__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__EZUAG__MODEL__SYSTEM = new EzuagSystemModel(ROOT_CONFIG__EZUAG__MODEL__SYSTEM, CONFIG__EZUAG__MODEL__SYSTEM);

export { MODEL__EZUAG__MODEL__SYSTEM };
