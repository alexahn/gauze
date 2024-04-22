const SERIALIZER_CREATED_AT_STRUCTURE = {
	input: {
		create: function (attributes) {
			attributes.created_at = new Date()
			return attributes
		}
	},
	output: function (row) {
		row.created_at = new Date(row.created_at)
		return row
	}
}

const SERIALIZER_UPDATED_AT_STRUCTURE = {
	input: {
		create: function (attributes) {
			attributes.updated_at = new Date()
			return attributes
		},
		update: function (attributes) {
			attributes.updated_at = new Date()
			return attributes
		}
	},
	output: function (row) {
		row.updated_at = new Date(row.updated_at)
		return row
	}
}

const SERIALIZER_DELETED_AT_STRUCTURE = {
	input: {
		delete: function (attributes) {
			attributes.deleted_at = new Date()
			return attributes
		}
	},
	output: function (row) {
		if (row.deleted_at) {
			row.deleted_at = new Date(row.deleted_at)
		}
		return row
	}
}

class GraphQLSerializer {
	constructor ({
		graphql_type
	}) {
		this.graphql_type = graphql_type
		this.serialize = this.serialize.bind(this)
	}
	// sql record to graphql fragment
	serialize (sql_record) {
		const metadata = {
			id: sql_record.id,
			type: this.graphql_type
		}
		const model = {
			_metadata: metadata,
			attributes: sql_record,
			relationships: {
				_metadata: metadata
			},
			query: {},
			mutation: {}
		}
		return model
	}
	// graphql fragment to sql record
	deserialize (graphql_fragment) {
		return graphql_fragment.attributes
	}
}

export {
	SERIALIZER_CREATED_AT_STRUCTURE,
	SERIALIZER_UPDATED_AT_STRUCTURE,
	SERIALIZER_DELETED_AT_STRUCTURE,
	GraphQLSerializer
}