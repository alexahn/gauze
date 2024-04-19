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
		database,
		transaction,
		source
	}, {
		attributes
	}) {
		const self = this
		return database(this.table).insert(attributes, ['id']).transacting(transaction).then(function (data) {
			console.log('database row created', data)
			return self.Read({
				database,
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
		}).catch(function (err) {
			console.log('database row not created', err)
			throw err
		})
	}
	// read a row
	Read ({
		database,
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
		console.log('read', where)
		return database(this.table).where(where).limit(limit).offset(offset).orderBy(order_column, order_direction, order_nulls).transacting(transaction)
	}
	// update a row
	Update ({
		database,
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
		return database(this.table).where(where).update(attributes).transacting(transaction).then(function () {
			return self.Read({
				database,
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
		database,
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
		console.log('delete', where)
		return database(this.table).where(where).del().transacting(transaction).then(function () {
			return self.Read({
				database,
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