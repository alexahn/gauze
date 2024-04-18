class DatabaseModel {
	constructor (config) {
		this.config = config
	}
}

// constructor (config, input)
// method (context, input)
class KnexDatabaseModel {
	constructor (config, table) {
		this.table = table
		super(config)
	}
	// create a row
	Create ({
		connection,
		transaction,
		source
	}, {
		attributes
	}) {
		return connection(this.table).insert(attributes).transacting(transaction)
	}
	// read a row
	Read ({
		connection,
		transaction,
		source
	}, {
		where,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		return connection(this.table).where(where).limit(limit).offset(offset).orderBy(order_column, order_direction, order_nulls).transacting(transaction)
	}
	// update a row
	Update ({
		connection,
		transaction,
		source
	}, {
		where,
		attributes,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		var self = this
		return connection(this.table).where(where).update(attributes).transacting(transaction).then(function () {
			return self.Read({
				connection,
				transaction
			}, {
				where,
				limit,
				offset,
				order_column,
				order_direction,
				order_nulls
			})
		})
	}
	// delete a row
	Delete ({
		connection,
		transaction,
		source
	}, {
		where,
		limit = 128,
		offset = 0,
		order_column = 'id',
		order_direction = 'asc',
		order_nulls = 'first'
	}) {
		var self = this
		return connection(this.table).where(where).del().transacting(transaction).then(function () {
			return self.Read({
				connection,
				transaction
			}, {
				where,
				limit,
				offset,
				order_column,
				order_direction,
				order_nulls
			})
		})
	}
}

export {
	DatabaseModel,
	KnexDatabaseModel
}