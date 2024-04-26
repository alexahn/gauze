import * as $structure from "./../../structure/index.js";
import * as $database from "./../../database/index.js";
import * as $kernel from "./../../kernel/index.js";

//import { GraphQLOperationSystemModel } from "./class.js";

class RelationshipSystemModel extends $kernel.models.system.GraphQLOperationSystemModel {
	constructor(root_config, parent_config, config) {
		super(root_config, parent_config);
	}
	create(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.CREATE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.CREATE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
	read(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.READ__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.READ_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
	update(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.UPDATE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.UPDATE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
	delete(context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.DELETE__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.DELETE_NAME__RELATIONSHIP__OPERATION__GRAPHQL__INTERFACE__DATABASE,
		};
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_relationship.map(function (row) {
				return row.attributes;
			});
		});
	}
}

const RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG = {
	fields: $structure.relationship.database.sql.FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	protected_fields: $structure.relationship.database.sql.PROTECTED_FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	field_serializers: $structure.relationship.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
};
const RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
};
const RELATIONSHIP_MODEL_SYSTEM_CONFIG = {};
const RELATIONSHIP_MODEL_SYSTEM = new RelationshipSystemModel(RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_CONFIG);

export { RELATIONSHIP_MODEL_SYSTEM };
