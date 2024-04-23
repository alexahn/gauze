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
			operation: $database.interfaces.graphql.operations.entity2.ENTITY2_CREATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.ENTITY2_CREATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_entity2.map(function (row) {
				return row.attributes
			})
		})
	}
	read (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.ENTITY2_READ_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.ENTITY2_READ_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_entity2.map(function (row) {
				return row.attributes
			})
		})
	}
	update (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.ENTITY2_UPDATE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.ENTITY2_UPDATE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_entity2.map(function (row) {
				return row.attributes
			})
		})
	}
	delete (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity2.ENTITY2_DELETE_OPERATION_GRAPHQL_INTERFACE_DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity2.ENTITY2_DELETE_OPERATION_NAME_GRAPHQL_INTERFACE_DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_entity2.map(function (row) {
				return row.attributes
			})
		})
	}
}

const ENTITY2_MODEL_SYSTEM_ROOT_CONFIG = {
	fields: $structure.entity2.database.sql.FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE,
	protected_fields: $structure.entity2.database.sql.PROTECTED_FIELDS__SQL__DATABASE__ENTITY2__STRUCTURE,
	field_serializers: $structure.entity2.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__ENTITY2__STRUCTURE
}
const ENTITY2_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA_GRAPHQL_INTERFACE_DATABASE
}
const ENTITY2_MODEL_SYSTEM_CONFIG = {}
const ENTITY2_MODEL_SYSTEM = new Entity2SystemModel(ENTITY2_MODEL_SYSTEM_ROOT_CONFIG, ENTITY2_MODEL_SYSTEM_PARENT_CONFIG, ENTITY2_MODEL_SYSTEM_CONFIG)


export {
	ENTITY2_MODEL_SYSTEM
}