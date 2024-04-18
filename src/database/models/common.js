class DatabaseModel {
	constructor (config) {
		this.config = config
	}
}

// constructor (config, input)
// method (context, input)
class KnexDatabaseModel extends DatabaseModel {
	constructor (config, table) {
		super(config)
		this.table = table
	}
	// create a row
	Create ({
		connection,
		transaction,
		source
	}, {
		attributes
	}) {
		const self = this
		return connection(this.table).insert(attributes, ['id']).transacting(transaction).then(function (data) {
			return self.Read({
				connection,
				transaction
			}, {
				where: {
					id: data[0].id
				},
				limit: 1,
				offset: 0,
				order_column: 'id',
				order_direction: 'asc',
				order_nulls: 'first'
			})
		})
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