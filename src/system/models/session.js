import * as $abstract from "./../../abstract/index.js";
import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

import { MODEL__RELATIONSHIP__MODEL__SYSTEM } from "./relationship.js";

class SessionSystemModel extends $kernel.src.models.system.SystemModel {
	constructor(root_config, config) {
		super(root_config, config);
		const self = this;
	}
	create(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.CREATE__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.CREATE_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._create(context, scope, parameters, realm).then(function (data) {
			return data.data.create_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.READ__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.READ_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._read(context, scope, parameters, realm).then(function (data) {
			return data.data.read_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.UPDATE__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.UPDATE_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._update(context, scope, parameters, realm).then(function (data) {
			return data.data.update_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.DELETE__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.DELETE_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._delete(context, scope, parameters, realm).then(function (data) {
			return data.data.delete_session.map(function (row) {
				return row.attributes;
			});
		});
	}
	count(context, scope, parameters) {
		const self = this;
		const { agent } = context;
		const realm = {
			agent: agent,
			entity: {
				entity_type: $structure.entities.session.database.sql.TABLE_NAME__SQL__DATABASE__SESSION__STRUCTURE,
			},
			operation: {
				operation: $database.interfaces.graphql.operations.session.COUNT__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
				operation_name: $database.interfaces.graphql.operations.session.COUNT_NAME__SESSION__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			},
		};
		return self._count(context, scope, parameters, realm).then(function (data) {
			return data.data.count_session;
		});
	}
}

const ROOT_CONFIG__SESSION__MODEL__SYSTEM = {
	entity: $abstract.entities.session.default($abstract),
	entity_name: "$abstract.entities.session.default",
};
const CONFIG__SESSION__MODEL__SYSTEM = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
	schema_name: "SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE",
	relationship_model: MODEL__RELATIONSHIP__MODEL__SYSTEM,
};
const MODEL__SESSION__MODEL__SYSTEM = new SessionSystemModel(ROOT_CONFIG__SESSION__MODEL__SYSTEM, CONFIG__SESSION__MODEL__SYSTEM);

export { MODEL__SESSION__MODEL__SYSTEM };
