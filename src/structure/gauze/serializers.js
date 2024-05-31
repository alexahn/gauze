class GraphQLSerializer {
	constructor({ graphql_type, sql_primary_key }) {
		this.graphql_type = graphql_type;
		this.sql_primary_key = sql_primary_key;
		this.serialize = this.serialize.bind(this);
	}
	// sql record to graphql fragment
	// todo: extend to accept source argument so we can calculate depth
	serialize(source, sql_record) {
		const metadata = {
			id: sql_record[this.sql_primary_key],
			type: this.graphql_type,
			depth: source ? (source._metadata ? source._metadata.depth + 1 : 1) : 1,
		};
		const model = {
			_metadata: metadata,
			attributes: sql_record,
			relationships_to: {
				// _metadata and _direction is interpreted as relationship
				_metadata: metadata,
				_direction: "to",
			},
			relationships_from: {
				// _metadata and _direction is interpreted as relationship
				_metadata: metadata,
				_direction: "from",
			},
			query: {
				_metadata: metadata,
			},
			mutation: {
				_metadata: metadata,
			},
		};
		return model;
	}
	// graphql fragment to sql record
	deserialize(graphql_fragment) {
		return graphql_fragment.attributes;
	}
}

export { GraphQLSerializer };
