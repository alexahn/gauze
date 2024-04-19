class Serializer {
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
	Serializer
}