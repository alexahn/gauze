import * as $structure from './../../structure/index.js'
import * as $database from './../../database/index.js'

import {
	GraphQLOperationSystemModel
} from './class.js'

class RelationshipSystemModel extends GraphQLOperationSystemModel {
	constructor (root_config, parent_config, config) {
		super(root_config, parent_config)
	}
	create (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_CREATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_CREATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
	read (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_READ_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_READ_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
	update (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_UPDATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_UPDATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
	delete (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_DELETE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_DELETE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
}

const RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG = {
	fields: $structure.relationship.database.sql.FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	protected_fields: $structure.relationship.database.sql.PROTECTED_FIELDS__SQL__DATABASE__RELATIONSHIP__STRUCTURE,
	field_serializers: $structure.relationship.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__RELATIONSHIP__STRUCTURE
}
const RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA_GRAPHQL_INTERFACE_DATABASE
}
const RELATIONSHIP_MODEL_SYSTEM_CONFIG = {}
const RELATIONSHIP_MODEL_SYSTEM = new RelationshipSystemModel(RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_CONFIG)


export {
	RELATIONSHIP_MODEL_SYSTEM
}