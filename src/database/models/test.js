import {
	ENTITY1_MODEL_DATABASE
} from './entity1.js'

import {
	create_connection
} from './../knex.js'

const db = create_connection()

function create_model () {
	return db.transaction(function (transaction) {
		return ENTITY1_MODEL_DATABASE.Create({
			database: db,
			transaction
		}, {
			attributes: {
				created_at: new Date(),
				updated_at: new Date(),
				text: 'everything'
			}
		}).then(function (data) {
			console.log('created', data)
			return transaction.commit(data).then(function () {
				return Promise.resolve(data)
			})
		})
	})
}

function read_model (created) {
	return db.transaction(function (transaction) {
		return ENTITY1_MODEL_DATABASE.Read({
			database: db,
			transaction
		}, {
			where: {
				id: created[0].id
			}
		}).then(function (data) {
			console.log('read', data)
			return transaction.commit(data).then(function () {
				return Promise.resolve(data)
			})
		})
	})
}

function update_model (read) {
	return db.transaction(function (transaction) {
		return ENTITY1_MODEL_DATABASE.Update({
			database: db,
			transaction
		}, {
			where: {
				id: read[0].id
			},
			attributes: {
				text: 'nothing'
			}
		}).then(function (data) {
			console.log('updated', data)
			return transaction.commit(data).then(function () {
				return Promise.resolve(data)
			})
		})
	})
}

function delete_model (updated) {
	return db.transaction(function (transaction) {
		return ENTITY1_MODEL_DATABASE.Delete({
			database: db,
			transaction
		}, {
			where: {
				id: updated[0].id
			}
		}).then(function (data) {
			console.log('deleted', data)
			return transaction.commit(data).then(function () {
				return Promise.resolve(data)
			})
		})
	})
}

const transactions = [
	create_model,
	read_model,
	update_model,
	delete_model
]

/*
transactions.reduce(function (prev, next) {
	return prev.then(next)
}, Promise.resolve(true)).then(function () {
	db.destroy()
})
*/

var COUNT = 0

function loop (f) {
	return f().then(function (data) {
		if (COUNT < 100000) {
			console.log('count', COUNT)
			COUNT += 1
			return loop(f)
		} else {
			return Promise.resolve(true)
		}
	})
}

//loop(create_model)


db('gauze__entity1').select('id').then(function (results) {
	console.log('results', results, results.length)
})