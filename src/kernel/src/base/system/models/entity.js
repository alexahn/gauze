import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

class ba381b0cc764c4c9a187b716ae94ed96SystemModel extends $kernel.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.TABLE_NAME__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.CREATE__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.CREATE_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._create(context, input, access, operation).then(function (data) {
			return data.data.create_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.TABLE_NAME__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.READ__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.READ_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._read(context, input, access, operation).then(function (data) {
			return data.data.read_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.TABLE_NAME__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.UPDATE__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.UPDATE_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._update(context, input, access, operation).then(function (data) {
			return data.data.update_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const self = this;
		const access = {
			entity_type: $structure.a2b8dbc3427b41a9899e11671c2422c7.database.sql.TABLE_NAME__SQL__DATABASE__cd637bc32c364580be5cc28396d3dee8__STRUCTURE,
			agent_id: "00000000-0000-0000-0000-000000000001",
		};
		const operation = {
			operation: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.DELETE__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.a2b8dbc3427b41a9899e11671c2422c7.DELETE_NAME__cd637bc32c364580be5cc28396d3dee8__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return self._delete(context, input, access, operation).then(function (data) {
			return data.data.delete_a2b8dbc3427b41a9899e11671c2422c7.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM = {
	entity: $abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default($abstract),
	entity_name: "$abstract.entities.a2b8dbc3427b41a9899e11671c2422c7.default",
};
const CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
};
const MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM = new ba381b0cc764c4c9a187b716ae94ed96SystemModel(
	ROOT_CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM,
	CONFIG__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM,
);

export { MODEL__cd637bc32c364580be5cc28396d3dee8__MODEL__SYSTEM };
