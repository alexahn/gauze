import * as $structure from './../../structure/index.js'
import * as $database from './../../database/index.js'

import {
	GraphQLOperationSystemModel
} from './class.js'

class Entity2SystemModel extends GraphQLOperationSystemModel {
	constructor (root_config, parent_config, config) {
		super(root_config, parent_config)
	}
	create (context, input) {
		const operation = {
			source: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_CREATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operationName: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_CREATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
	read (context, input) {
		const operation = {
			source: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_READ_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operationName: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_READ_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
	update (context, input) {
		const operation = {
			source: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_UPDATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operationName: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_UPDATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
	delete (context, input) {
		const operation = {
			source: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_DELETE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operationName: $database.interfaces.graphql.operations.relationship.RELATIONSHIP_DELETE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_relationship.map(function (row) {
				return row.attributes
			})
		})
	}
}

const RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG = {
	fields: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_FIELDS,
	protected_fields: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_PROTECTED_FIELDS,
	field_serializers: $structure.relationship.database.sql.SQL_DATABASE_RELATIONSHIP_FIELD_SERIALIZERS
}
const RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA_GRAPHQL_INTERFACE_DATABASE
}
const RELATIONSHIP_MODEL_SYSTEM_CONFIG = {}
const RELATIONSHIP_MODEL_SYSTEM = new Entity2SystemModel(RELATIONSHIP_MODEL_SYSTEM_ROOT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_PARENT_CONFIG, RELATIONSHIP_MODEL_SYSTEM_CONFIG)


export {
	RELATIONSHIP_MODEL_SYSTEM
}