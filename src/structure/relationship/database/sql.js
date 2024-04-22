import {
	SERIALIZER_CREATED_AT_STRUCTURE,
	SERIALIZER_UPDATED_AT_STRUCTURE,
	SERIALIZER_DELETED_AT_STRUCTURE
} from './../../serializers.js'

const SQL_DATABASE_RELATIONSHIP_TABLE_NAME = 'gauze__relationship'
const SQL_DATABASE_RELATIONSHIP_PRIMARY_KEY = '_id'
const SQL_DATABASE_RELATIONSHIP_FIELDS = {
	_id: true,
	_created_at: true,
	_updated_at: true,
	_deleted_at: true,
	_from_type: true,
	_from_id: true,
	_to_type: true,
	_to_id: true
}
const SQL_DATABASE_RELATIONSHIP_PROTECTED_FIELDS = ['_id', '_created_at', '_updated_at', '_deleted_at']
const SQL_DATABASE_RELATIONSHIP_FIELD_SERIALIZERS = {
	_created_at: {
		input: {
			create: function (attributes) {
				attributes._created_at = new Date()
				return attributes
			}
		},
		output: function (row) {
			row._created_at = new Date(row._created_at)
			return row
		}
	},
	_updated_at: {
		input: {
			create: function (attributes) {
				attributes._updated_at = new Date()
				return attributes
			},
			update: function (attributes) {
				attributes._updated_at = new Date()
				return attributes
			}
		},
		output: function (row) {
			row._updated_at = new Date(row._updated_at)
			return row
		}
	},
	_deleted_at: {
		input: {
			delete: function (attributes) {
				attributes._deleted_at = new Date()
				return attributes
			}
		},
		output: function (row) {
			if (row._deleted_at) {
				row._deleted_at = new Date(row._deleted_at)
			}
			return row
		}
	}
}

export {
	SQL_DATABASE_RELATIONSHIP_TABLE_NAME,
	SQL_DATABASE_RELATIONSHIP_PRIMARY_KEY,
	SQL_DATABASE_RELATIONSHIP_FIELDS,
	SQL_DATABASE_RELATIONSHIP_PROTECTED_FIELDS,
	SQL_DATABASE_RELATIONSHIP_FIELD_SERIALIZERS
}