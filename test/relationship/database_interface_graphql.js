import * as $gauze from './../../src/index.js'

import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import assert from 'node:assert/strict'

import {
	graphql
} from 'graphql';

function execute ({
	source,
	contextValue,
	variableValues,
	operationName
}) {
	return graphql({
		schema: $gauze.database.interfaces.graphql.schema.SCHEMA_GRAPHQL_INTERFACE_DATABASE,
		source,
		contextValue,
		variableValues,
		operationName
	})
}

test.describe('relationship graphql interface database', function (suite_ctx) {
	test.before(function (ctx) {
		suite_ctx.database = $gauze.database.knex.create_connection('test')
		return suite_ctx.database.migrate.latest().then(function () {
			return suite_ctx.database.seed.run()
		})
	})
	test.after(function () {
		suite_ctx.database.destroy()
	})
	/*
	test.beforeEach(function (test_ctx) {
		return database.transaction(function (transaction) {
			test_ctx.transaction = transaction
			return Promise.resolve(transaction)
		})
	})
	*/
	test.it('create', function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const create_query_file = path.resolve(import.meta.dirname, './graphql/create.graphql')
			const create_query = fs.readFileSync(create_query_file).toString('utf8')
			const source = create_query
			const operationName = 'CreateRelationship'
			const variableValues = {
				attributes: {
					_created_at: new Date(),
					_updated_at: new Date(),
					_from_type: 'gauze__entity1',
					_from_id: '1',
					_to_type: 'gauze__entity2',
					_to_id: '4'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined)
					assert.strictEqual(data.data.create_relationship.length, 1)
					assert.strictEqual(data.data.create_relationship[0].attributes._from_type, variableValues.attributes._from_type)
					assert.strictEqual(data.data.create_relationship[0].attributes._from_id, variableValues.attributes._from_id)
					assert.strictEqual(data.data.create_relationship[0].attributes._to_type, variableValues.attributes._to_type)
					assert.strictEqual(data.data.create_relationship[0].attributes._to_id, variableValues.attributes._to_id)
					return Promise.resolve(data)
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
	test.it('read', function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, './graphql/read.graphql')
			const read_query = fs.readFileSync(read_query_file).toString('utf8')
			const source = read_query
			const operationName = 'ReadRelationship'
			const variableValues = {
				where: {
					_id: '1'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined)
					assert.strictEqual(data.data.read_relationship.length, 1)
					assert.strictEqual(data.data.read_relationship[0].attributes._id, variableValues.where._id)
					return Promise.resolve(data)
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
	test.it('update', function (test_ctx) {
		const target_from_id = '5'
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, './graphql/read.graphql')
			const read_query = fs.readFileSync(read_query_file).toString('utf8')
			const source = read_query
			const operationName = 'ReadRelationship'
			const variableValues = {
				where: {
					_id: '1'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined)
					assert.notStrictEqual(data.data.read_relationship[0].attributes._from_id, target_from_id)
					return Promise.resolve(data)
				})
				.then(function () {
					const update_query_file = path.resolve(import.meta.dirname, './graphql/update.graphql')
					const update_query = fs.readFileSync(update_query_file).toString('utf8')
					const source = update_query
					const operationName = 'UpdateRelationship'
					const variableValues = {
						where: {
							_id: '1'
						},
						attributes: {
							_from_id: target_from_id
						}
					}
					const contextValue = {
						database: suite_ctx.database,
						transaction: transaction
					}
					return execute({
							source,
							contextValue,
							variableValues,
							operationName
						})
						.then(function (data) {
							assert.strictEqual(data.errors, undefined)
							assert.strictEqual(data.data.update_relationship.length, 1)
							assert.strictEqual(data.data.update_relationship[0].attributes._from_id, variableValues.attributes._from_id)
							return Promise.resolve(data)
						})
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
	test.it('delete', function (test_ctx) {
		const query_file = path.resolve(import.meta.dirname, './graphql/delete.graphql')
		const query = fs.readFileSync(query_file).toString('utf8')
		return suite_ctx.database.transaction(function (transaction) {
			const delete_query_file = path.resolve(import.meta.dirname, './graphql/delete.graphql')
			const delete_query = fs.readFileSync(delete_query_file).toString('utf8')
			const source = delete_query
			const operationName = 'DeleteRelationship'
			const variableValues = {
				where: {
					_id: '1'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					if (data.errors && data.errors.length) {
						console.log(data.errors)
					}
					assert.strictEqual(data.errors, undefined)
					assert.strictEqual(data.data.delete_relationship.length, 0)
					return Promise.resolve(data)
				})
				.then(function () {
					const read_query_file = path.resolve(import.meta.dirname, './graphql/read.graphql')
					const read_query = fs.readFileSync(read_query_file).toString('utf8')
					const source = read_query
					const operationName = 'ReadRelationship'
					const variableValues = {
						where: {
							_id: '1'
						}
					}
					const contextValue = {
						database: suite_ctx.database,
						transaction: transaction
					}
					return execute({
							source,
							contextValue,
							variableValues,
							operationName
						})
						.then(function (data) {
							assert.strictEqual(data.errors, undefined)
							assert.notStrictEqual(data.data.read_relationship.length, 1)
							return Promise.resolve(data)
						})
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
	test.it('create nested mutation', function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const create_query_file = path.resolve(import.meta.dirname, './graphql/create_nested_mutation.graphql')
			const create_query = fs.readFileSync(create_query_file).toString('utf8')
			const source = create_query
			const operationName = 'CreateRelationshipNestedMutation'
			const variableValues = {
				attributes1: {
					_created_at: new Date(),
					_updated_at: new Date(),
					_from_type: 'gauze__entity1',
					_from_id: '3',
					_to_type: 'gauze__entity2',
					_to_id: '3'
				},
				attributes2: {
					_created_at: new Date(),
					_updated_at: new Date(),
					_from_type: 'gauze__entity2',
					_from_id: '3',
					_to_type: 'gauze__entity1',
					_to_id: '3'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined)
					assert.strictEqual(data.data.create_relationship.length, 1)
					assert.strictEqual(data.data.create_relationship[0].attributes._from_id, variableValues.attributes1._from_id)
					assert.strictEqual(data.data.create_relationship[0].attributes._from_type, variableValues.attributes1._from_type)
					assert.strictEqual(data.data.create_relationship[0].attributes._to_id, variableValues.attributes1._to_id)
					assert.strictEqual(data.data.create_relationship[0].attributes._to_type, variableValues.attributes1._to_type)
					assert.strictEqual(data.data.create_relationship[0].mutation.create_relationship.length, 1)
					assert.strictEqual(data.data.create_relationship[0].mutation.create_relationship[0].attributes._from_id, variableValues.attributes2._from_id)
					assert.strictEqual(data.data.create_relationship[0].mutation.create_relationship[0].attributes._from_type, variableValues.attributes2._from_type)
					assert.strictEqual(data.data.create_relationship[0].mutation.create_relationship[0].attributes._to_id, variableValues.attributes2._to_id)
					assert.strictEqual(data.data.create_relationship[0].mutation.create_relationship[0].attributes._to_type, variableValues.attributes2._to_type)
					return Promise.resolve(data)
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
	test.it('read nested query', function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, './graphql/read_nested_query.graphql')
			const read_query = fs.readFileSync(read_query_file).toString('utf8')
			const source = read_query
			const operationName = 'ReadRelationshipNestedQuery'
			const variableValues = {
				where1: {
					_id: '1'
				},
				where2: {
					_id: '2'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined)
					assert.strictEqual(data.data.read_relationship.length, 1)
					assert.strictEqual(data.data.read_relationship[0].attributes._id, variableValues.where1._id)
					assert.strictEqual(data.data.read_relationship[0].query.read_relationship.length, 1)
					assert.strictEqual(data.data.read_relationship[0].query.read_relationship[0].attributes._id, variableValues.where2._id)
					return Promise.resolve(data)
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
	test.it('update nested mutation', function (test_ctx) {
		// todo: do a nested read before to ensure the target text is not different
		return suite_ctx.database.transaction(function (transaction) {
			const update_query_file = path.resolve(import.meta.dirname, './graphql/update_nested_mutation.graphql')
			const update_query = fs.readFileSync(update_query_file).toString('utf8')
			const source = update_query
			const operationName = 'UpdateRelationshipNestedMutation'
			const variableValues = {
				where1: {
					_id: '1'
				},
				where2: {
					_id: '2'
				},
				attributes1: {
					_from_type: 'gauze__entity1',
					_from_id: '3',
					_to_type: 'gauze__entity2',
					_to_id: '3'
				},
				attributes2: {
					_from_type: 'gauze__entity2',
					_from_id: '3',
					_to_type: 'gauze__entity1',
					_to_id: '3'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined)
					assert.strictEqual(data.data.update_relationship.length, 1)
					assert.strictEqual(data.data.update_relationship[0].attributes._id, variableValues.where1._id)
					assert.strictEqual(data.data.update_relationship[0].attributes._from_id, variableValues.attributes1._from_id)
					assert.strictEqual(data.data.update_relationship[0].attributes._from_type, variableValues.attributes1._from_type)
					assert.strictEqual(data.data.update_relationship[0].attributes._to_id, variableValues.attributes1._to_id)
					assert.strictEqual(data.data.update_relationship[0].attributes._to_type, variableValues.attributes1._to_type)
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship.length, 1)
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship[0].attributes._id, variableValues.where2._id)
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship[0].attributes._from_id, variableValues.attributes2._from_id)
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship[0].attributes._from_type, variableValues.attributes2._from_type)
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship[0].attributes._to_id, variableValues.attributes2._to_id)
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship[0].attributes._to_type, variableValues.attributes2._to_type)
					return Promise.resolve(data)
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
	test.it('delete nested mutation', function (test_ctx) {
		// todo: do two root query reads after to make sure the entities no longer exist
		return suite_ctx.database.transaction(function (transaction) {
			const delete_query_file = path.resolve(import.meta.dirname, './graphql/delete_nested_mutation.graphql')
			const delete_query = fs.readFileSync(delete_query_file).toString('utf8')
			const source = delete_query
			const operationName = 'DeleteRelationshipNestedMutation'
			const variableValues = {
				where1: {
					_id: '1'
				},
				where2: {
					_id: '2'
				}
			}
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction
			}
			return execute({
					source,
					contextValue,
					variableValues,
					operationName
				})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined)
					assert.strictEqual(data.data.delete_relationship.length, 0)
					return Promise.resolve(data)
				})
				.then(function () {
					return transaction.rollback()
				})
				.catch(function (err) {
					return transaction.rollback(err).then(function () {
						throw err
					}).catch(function (err) {
						throw err
					})
				})
		})
	})
})