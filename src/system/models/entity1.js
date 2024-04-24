import * as $structure from './../../structure/index.js'
import * as $database from './../../database/index.js'

import {
	GraphQLOperationSystemModel
} from './class.js'

class Entity1SystemModel extends GraphQLOperationSystemModel {
	constructor (root_config, parent_config, config) {
		super(root_config, parent_config)
	}
	create (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.CREATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.CREATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.create_entity1.map(function (row) {
				return row.attributes
			})
		})
	}
	read (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.READ__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.READ_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.read_entity1.map(function (row) {
				return row.attributes
			})
		})
	}
	update (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.UPDATE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.UPDATE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.update_entity1.map(function (row) {
				return row.attributes
			})
		})
	}
	delete (context, input) {
		const operation = {
			operation: $database.interfaces.graphql.operations.entity1.DELETE__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE,
			operation_name: $database.interfaces.graphql.operations.entity1.DELETE_NAME__ENTITY1__OPERATION__GRAPHQL__INTERFACE__DATABASE
		}
		return this.execute(context, operation, input).then(function (data) {
			return data.data.delete_entity1.map(function (row) {
				return row.attributes
			})
		})
	}
}

const ENTITY1_MODEL_SYSTEM_ROOT_CONFIG = {
	fields: $structure.entity1.database.sql.FIELDS__SQL__DATABASE__ENTITY1__STRUCTURE,
	protected_fields: $structure.entity1.database.sql.PROTECTED_FIELDS__SQL__DATABASE__ENTITY1__STRUCTURE,
	field_serializers: $structure.entity1.database.sql.FIELD_SERIALIZERS__SQL__DATABASE__ENTITY1__STRUCTURE
}
const ENTITY1_MODEL_SYSTEM_PARENT_CONFIG = {
	schema: $database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE
}
const ENTITY1_MODEL_SYSTEM_CONFIG = {}
const ENTITY1_MODEL_SYSTEM = new Entity1SystemModel(ENTITY1_MODEL_SYSTEM_ROOT_CONFIG, ENTITY1_MODEL_SYSTEM_PARENT_CONFIG, ENTITY1_MODEL_SYSTEM_CONFIG)


export {
	ENTITY1_MODEL_SYSTEM
}