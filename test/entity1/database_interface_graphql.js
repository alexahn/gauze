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

test.describe('entity1 graphql interface database', function (suite_ctx) {
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
			const operationName = "CreateEntity1"
			const variableValues = {
				attributes: {
					created_at: new Date(),
					updated_at: new Date(),
					text: "asdf"
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
					assert.strictEqual(data.data.create_entity1.length, 1)
					assert.strictEqual(data.data.create_entity1[0].attributes.text, variableValues.attributes.text)
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
			const operationName = "ReadEntity1"
			const variableValues = {
				where: {
					id: "1"
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
					assert.strictEqual(data.data.read_entity1.length, 1)
					assert.strictEqual(data.data.read_entity1[0].attributes.id, variableValues.where.id)
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
		const target_text = "qwer"
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, './graphql/read.graphql')
			const read_query = fs.readFileSync(read_query_file).toString('utf8')
			const source = read_query
			const operationName = "ReadEntity1"
			const variableValues = {
				where: {
					id: "1"
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
					assert.notStrictEqual(data.data.read_entity1[0].attributes.text, target_text)
					return Promise.resolve(data)
				})
				.then(function () {
					const update_query_file = path.resolve(import.meta.dirname, './graphql/update.graphql')
					const update_query = fs.readFileSync(update_query_file).toString('utf8')
					const source = update_query
					const operationName = "UpdateEntity1"
					const variableValues = {
						where: {
							id: "1"
						},
						attributes: {
							text: target_text
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
							assert.strictEqual(data.data.update_entity1.length, 1)
							assert.strictEqual(data.data.update_entity1[0].attributes.text, variableValues.attributes.text)
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
			const operationName = "DeleteEntity1"
			const variableValues = {
				where: {
					id: "1"
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
					assert.strictEqual(data.data.delete_entity1.length, 0)
					return Promise.resolve(data)
				})
				.then(function () {
					const read_query_file = path.resolve(import.meta.dirname, './graphql/read.graphql')
					const read_query = fs.readFileSync(read_query_file).toString('utf8')
					const source = read_query
					const operationName = "ReadEntity1"
					const variableValues = {
						where: {
							id: "1"
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
							assert.notStrictEqual(data.data.read_entity1.length, 1)
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
	test.it('create nested relationships', function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const create_query_file = path.resolve(import.meta.dirname, './graphql/create_nested_relationships.graphql')
			const create_query = fs.readFileSync(create_query_file).toString('utf8')
			const source = create_query
			const operationName = "CreateEntity1NestedRelationships"
			const variableValues = {
				attributes1: {
					created_at: new Date(),
					updated_at: new Date(),
					text: "asdf"
				},
				attributes2: {
					created_at: new Date(),
					updated_at: new Date(),
					text: "qwer"
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
					assert.strictEqual(data.data.create_entity1.length, 1)
					assert.strictEqual(data.data.create_entity1[0].attributes.text, variableValues.attributes1.text)
					assert.strictEqual(data.data.create_entity1[0].relationships.create_entity2.length, 1)
					assert.strictEqual(data.data.create_entity1[0].relationships.create_entity2[0].attributes.text, variableValues.attributes2.text)
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
	test.it('read nested relationships', function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, './graphql/read_nested_relationships.graphql')
			const read_query = fs.readFileSync(read_query_file).toString('utf8')
			const source = read_query
			const operationName = "ReadEntity1NestedRelationships"
			const variableValues = {
				where1: {
					id: "1"
				},
				where2: {
					id: "1"
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
					assert.strictEqual(data.data.read_entity1.length, 1)
					assert.strictEqual(data.data.read_entity1[0].attributes.id, variableValues.where1.id)
					assert.strictEqual(data.data.read_entity1[0].relationships.read_entity2.length, 1)
					assert.strictEqual(data.data.read_entity1[0].relationships.read_entity2[0].attributes.id, variableValues.where2.id)
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
	test.it('update nested relationships', function (test_ctx) {
		// todo: do a nested read before to ensure the target text is not different
		return suite_ctx.database.transaction(function (transaction) {
			const update_query_file = path.resolve(import.meta.dirname, './graphql/update_nested_relationships.graphql')
			const update_query = fs.readFileSync(update_query_file).toString('utf8')
			const source = update_query
			const operationName = "UpdateEntity1NestedRelationships"
			const variableValues = {
				where1: {
					id: "1"
				},
				attributes1: {
					text: "1234"
				},
				where2: {
					id: "1"
				},
				attributes2: {
					text: "zxcv"
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
					assert.strictEqual(data.data.update_entity1.length, 1)
					assert.strictEqual(data.data.update_entity1[0].attributes.id, variableValues.where1.id)
					assert.strictEqual(data.data.update_entity1[0].attributes.text, variableValues.attributes1.text)
					assert.strictEqual(data.data.update_entity1[0].relationships.update_entity2.length, 1)
					assert.strictEqual(data.data.update_entity1[0].relationships.update_entity2[0].attributes.id, variableValues.where2.id)
					assert.strictEqual(data.data.update_entity1[0].relationships.update_entity2[0].attributes.text, variableValues.attributes2.text)
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
	test.it('delete nested relationships', function (test_ctx) {
		// todo: do two root query reads after to make sure the entities no longer exist
		return suite_ctx.database.transaction(function (transaction) {
			const delete_query_file = path.resolve(import.meta.dirname, './graphql/delete_nested_relationships.graphql')
			const delete_query = fs.readFileSync(delete_query_file).toString('utf8')
			const source = delete_query
			const operationName = "DeleteEntity1NestedRelationships"
			const variableValues = {
				where1: {
					id: "1"
				},
				where2: {
					id: "1"
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
					assert.strictEqual(data.data.delete_entity1.length, 0)
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
	test.it('create nested mutation', function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const create_query_file = path.resolve(import.meta.dirname, './graphql/create_nested_mutation.graphql')
			const create_query = fs.readFileSync(create_query_file).toString('utf8')
			const source = create_query
			const operationName = "CreateEntity1NestedMutation"
			const variableValues = {
				attributes1: {
					created_at: new Date(),
					updated_at: new Date(),
					text: "asdf",
				},
				attributes2: {
					created_at: new Date(),
					updated_at: new Date(),
					text: "qwer"
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
					assert.strictEqual(data.data.create_entity1.length, 1)
					assert.strictEqual(data.data.create_entity1[0].attributes.text, variableValues.attributes1.text)
					assert.strictEqual(data.data.create_entity1[0].mutation.create_entity1.length, 1)
					assert.strictEqual(data.data.create_entity1[0].mutation.create_entity1[0].attributes.text, variableValues.attributes2.text)
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
			const operationName = "ReadEntity1NestedQuery"
			const variableValues = {
				where1: {
					id: "1"
				},
				where2: {
					id: "2"
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
					assert.strictEqual(data.data.read_entity1.length, 1)
					assert.strictEqual(data.data.read_entity1[0].attributes.id, variableValues.where1.id)
					assert.strictEqual(data.data.read_entity1[0].query.read_entity1.length, 1)
					assert.strictEqual(data.data.read_entity1[0].query.read_entity1[0].attributes.id, variableValues.where2.id)
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
			const operationName = "UpdateEntity1NestedMutation"
			const variableValues = {
				where1: {
					id: "1"
				},
				attributes1: {
					text: "1234"
				},
				where2: {
					id: "1"
				},
				attributes2: {
					text: "zxcv"
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
					assert.strictEqual(data.data.update_entity1.length, 1)
					assert.strictEqual(data.data.update_entity1[0].attributes.id, variableValues.where1.id)
					assert.strictEqual(data.data.update_entity1[0].attributes.text, variableValues.attributes1.text)
					assert.strictEqual(data.data.update_entity1[0].mutation.update_entity1.length, 1)
					assert.strictEqual(data.data.update_entity1[0].mutation.update_entity1[0].attributes.id, variableValues.where2.id)
					assert.strictEqual(data.data.update_entity1[0].mutation.update_entity1[0].attributes.text, variableValues.attributes2.text)
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
			const operationName = "DeleteEntity1NestedMutation"
			const variableValues = {
				where1: {
					id: "1"
				},
				where2: {
					id: "2"
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
					assert.strictEqual(data.data.delete_entity1.length, 0)
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
