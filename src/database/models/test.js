import {
	ENTITY1_MODEL_DATABASE
} from './entity1.js'

import db from './../knex.js'

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
			return Promise.resolve(data)
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
			return Promise.resolve(data)
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
			return Promise.resolve(data)
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
			return Promise.resolve(data)
		})
	})
}

const transactions = [
	create_model,
	read_model,
	update_model,
	delete_model
]

transactions.reduce(function (prev, next) {
	return prev.then(next)
}, Promise.resolve(true)).then(function () {
	db.destroy()
})