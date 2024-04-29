import * as $gauze from "./../../src/index.js";

import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

import { graphql } from "graphql";

function execute({ source, contextValue, variableValues, operationName }) {
	return graphql({
		schema: $gauze.database.interfaces.graphql.schema.SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE,
		source,
		contextValue,
		variableValues,
		operationName,
	});
}

test.describe("relationship graphql interface database", function (suite_ctx) {
	test.before(function (ctx) {
		suite_ctx.database = $gauze.database.knex.create_connection("test");
		return suite_ctx.database.migrate.latest().then(function () {
			return suite_ctx.database.seed.run();
		});
	});
	test.after(function () {
		suite_ctx.database.destroy();
	});
	/*
	test.beforeEach(function (test_ctx) {
		return database.transaction(function (transaction) {
			test_ctx.transaction = transaction
			return Promise.resolve(transaction)
		})
	})
	*/
	test.it("create", function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const create_query_file = path.resolve(import.meta.dirname, "./graphql/create.graphql");
			const create_query = fs.readFileSync(create_query_file).toString("utf8");
			const source = create_query;
			const operationName = "CreateRelationship";
			const variableValues = {
				attributes: {
					gauze__relationship__created_at: new Date(),
					gauze__relationship__updated_at: new Date(),
					gauze__relationship__from_type: "gauze__entity1",
					gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
					gauze__relationship__to_type: "gauze__entity2",
					gauze__relationship__to_id: "00000000-0000-0000-0000-000000000004",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined);
					assert.strictEqual(data.data.create_relationship.length, 1);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__from_type, variableValues.attributes.gauze__relationship__from_type);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__from_id, variableValues.attributes.gauze__relationship__from_id);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__to_type, variableValues.attributes.gauze__relationship__to_type);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__to_id, variableValues.attributes.gauze__relationship__to_id);
					return Promise.resolve(data);
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
	test.it("read", function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, "./graphql/read.graphql");
			const read_query = fs.readFileSync(read_query_file).toString("utf8");
			const source = read_query;
			const operationName = "ReadRelationship";
			const variableValues = {
				where: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined);
					assert.strictEqual(data.data.read_relationship.length, 1);
					assert.strictEqual(data.data.read_relationship[0].attributes.gauze__relationship__id, variableValues.where.gauze__relationship__id);
					return Promise.resolve(data);
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
	test.it("update", function (test_ctx) {
		const target_gauze__relationship__from_id = "5";
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, "./graphql/read.graphql");
			const read_query = fs.readFileSync(read_query_file).toString("utf8");
			const source = read_query;
			const operationName = "ReadRelationship";
			const variableValues = {
				where: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined);
					assert.notStrictEqual(data.data.read_relationship[0].attributes.gauze__relationship__from_id, target_gauze__relationship__from_id);
					return Promise.resolve(data);
				})
				.then(function () {
					const update_query_file = path.resolve(import.meta.dirname, "./graphql/update.graphql");
					const update_query = fs.readFileSync(update_query_file).toString("utf8");
					const source = update_query;
					const operationName = "UpdateRelationship";
					const variableValues = {
						where: {
							gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
						},
						attributes: {
							gauze__relationship__from_id: target_gauze__relationship__from_id,
						},
					};
					const contextValue = {
						database: suite_ctx.database,
						transaction: transaction,
					};
					return execute({
						source,
						contextValue,
						variableValues,
						operationName,
					}).then(function (data) {
						assert.strictEqual(data.errors, undefined);
						assert.strictEqual(data.data.update_relationship.length, 1);
						assert.strictEqual(data.data.update_relationship[0].attributes.gauze__relationship__from_id, variableValues.attributes.gauze__relationship__from_id);
						return Promise.resolve(data);
					});
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
	test.it("delete", function (test_ctx) {
		const query_file = path.resolve(import.meta.dirname, "./graphql/delete.graphql");
		const query = fs.readFileSync(query_file).toString("utf8");
		return suite_ctx.database.transaction(function (transaction) {
			const delete_query_file = path.resolve(import.meta.dirname, "./graphql/delete.graphql");
			const delete_query = fs.readFileSync(delete_query_file).toString("utf8");
			const source = delete_query;
			const operationName = "DeleteRelationship";
			const variableValues = {
				where: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					if (data.errors && data.errors.length) {
						console.log(data.errors);
					}
					assert.strictEqual(data.errors, undefined);
					assert.strictEqual(data.data.delete_relationship.length, 1);
					return Promise.resolve(data);
				})
				.then(function () {
					const read_query_file = path.resolve(import.meta.dirname, "./graphql/read.graphql");
					const read_query = fs.readFileSync(read_query_file).toString("utf8");
					const source = read_query;
					const operationName = "ReadRelationship";
					const variableValues = {
						where: {
							gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
						},
					};
					const contextValue = {
						database: suite_ctx.database,
						transaction: transaction,
					};
					return execute({
						source,
						contextValue,
						variableValues,
						operationName,
					}).then(function (data) {
						assert.strictEqual(data.errors, undefined);
						assert.notStrictEqual(data.data.read_relationship.length, 1);
						return Promise.resolve(data);
					});
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
	test.it("create nested mutation", function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const create_query_file = path.resolve(import.meta.dirname, "./graphql/create_nested_mutation.graphql");
			const create_query = fs.readFileSync(create_query_file).toString("utf8");
			const source = create_query;
			const operationName = "CreateRelationshipNestedMutation";
			const variableValues = {
				attributes1: {
					gauze__relationship__created_at: new Date(),
					gauze__relationship__updated_at: new Date(),
					gauze__relationship__from_type: "gauze__entity1",
					gauze__relationship__from_id: "00000000-0000-0000-0000-000000000003",
					gauze__relationship__to_type: "gauze__entity2",
					gauze__relationship__to_id: "00000000-0000-0000-0000-000000000003",
				},
				attributes2: {
					gauze__relationship__created_at: new Date(),
					gauze__relationship__updated_at: new Date(),
					gauze__relationship__from_type: "gauze__entity2",
					gauze__relationship__from_id: "00000000-0000-0000-0000-000000000003",
					gauze__relationship__to_type: "gauze__entity1",
					gauze__relationship__to_id: "00000000-0000-0000-0000-000000000003",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined);
					assert.strictEqual(data.data.create_relationship.length, 1);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__from_id, variableValues.attributes1.gauze__relationship__from_id);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__from_type, variableValues.attributes1.gauze__relationship__from_type);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__to_id, variableValues.attributes1.gauze__relationship__to_id);
					assert.strictEqual(data.data.create_relationship[0].attributes.gauze__relationship__to_type, variableValues.attributes1.gauze__relationship__to_type);
					assert.strictEqual(data.data.create_relationship[0].mutation.create_relationship.length, 1);
					assert.strictEqual(
						data.data.create_relationship[0].mutation.create_relationship[0].attributes.gauze__relationship__from_id,
						variableValues.attributes2.gauze__relationship__from_id,
					);
					assert.strictEqual(
						data.data.create_relationship[0].mutation.create_relationship[0].attributes.gauze__relationship__from_type,
						variableValues.attributes2.gauze__relationship__from_type,
					);
					assert.strictEqual(
						data.data.create_relationship[0].mutation.create_relationship[0].attributes.gauze__relationship__to_id,
						variableValues.attributes2.gauze__relationship__to_id,
					);
					assert.strictEqual(
						data.data.create_relationship[0].mutation.create_relationship[0].attributes.gauze__relationship__to_type,
						variableValues.attributes2.gauze__relationship__to_type,
					);
					return Promise.resolve(data);
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
	test.it("read nested query", function (test_ctx) {
		return suite_ctx.database.transaction(function (transaction) {
			const read_query_file = path.resolve(import.meta.dirname, "./graphql/read_nested_query.graphql");
			const read_query = fs.readFileSync(read_query_file).toString("utf8");
			const source = read_query;
			const operationName = "ReadRelationshipNestedQuery";
			const variableValues = {
				where1: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
				},
				where2: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000002",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined);
					assert.strictEqual(data.data.read_relationship.length, 1);
					assert.strictEqual(data.data.read_relationship[0].attributes._id, variableValues.where1._id);
					assert.strictEqual(data.data.read_relationship[0].query.read_relationship.length, 1);
					assert.strictEqual(data.data.read_relationship[0].query.read_relationship[0].attributes.gauze__relationship__id, variableValues.where2.gauze__relationship__id);
					return Promise.resolve(data);
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
	test.it("update nested mutation", function (test_ctx) {
		// todo: do a nested read before to ensure the target text is not different
		return suite_ctx.database.transaction(function (transaction) {
			const update_query_file = path.resolve(import.meta.dirname, "./graphql/update_nested_mutation.graphql");
			const update_query = fs.readFileSync(update_query_file).toString("utf8");
			const source = update_query;
			const operationName = "UpdateRelationshipNestedMutation";
			const variableValues = {
				where1: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
				},
				where2: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000002",
				},
				attributes1: {
					gauze__relationship__from_type: "gauze__entity1",
					gauze__relationship__from_id: "00000000-0000-0000-0000-000000000003",
					gauze__relationship__to_type: "gauze__entity2",
					gauze__relationship__to_id: "00000000-0000-0000-0000-000000000003",
				},
				attributes2: {
					gauze__relationship__from_type: "gauze__entity2",
					gauze__relationship__from_id: "00000000-0000-0000-0000-000000000003",
					gauze__relationship__to_type: "gauze__entity1",
					gauze__relationship__to_id: "00000000-0000-0000-0000-000000000003",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined);
					assert.strictEqual(data.data.update_relationship.length, 1);
					assert.strictEqual(data.data.update_relationship[0].attributes.gauze__relationship__id, variableValues.where1.gauze__relationship__id);
					assert.strictEqual(data.data.update_relationship[0].attributes.gauze__relationship__from_id, variableValues.attributes1.gauze__relationship__from_id);
					assert.strictEqual(data.data.update_relationship[0].attributes.gauze__relationship__from_type, variableValues.attributes1.gauze__relationship__from_type);
					assert.strictEqual(data.data.update_relationship[0].attributes.gauze__relationship__to_id, variableValues.attributes1.gauze__relationship__to_id);
					assert.strictEqual(data.data.update_relationship[0].attributes.gauze__relationship__to_type, variableValues.attributes1.gauze__relationship__to_type);
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship.length, 1);
					assert.strictEqual(data.data.update_relationship[0].mutation.update_relationship[0].attributes.gauze__relationship__id, variableValues.where2.gauze__relationship__id);
					assert.strictEqual(
						data.data.update_relationship[0].mutation.update_relationship[0].attributes.gauze__relationship__from_id,
						variableValues.attributes2.gauze__relationship__from_id,
					);
					assert.strictEqual(
						data.data.update_relationship[0].mutation.update_relationship[0].attributes.gauze__relationship__from_type,
						variableValues.attributes2.gauze__relationship__from_type,
					);
					assert.strictEqual(
						data.data.update_relationship[0].mutation.update_relationship[0].attributes.gauze__relationship__to_id,
						variableValues.attributes2.gauze__relationship__to_id,
					);
					assert.strictEqual(
						data.data.update_relationship[0].mutation.update_relationship[0].attributes.gauze__relationship__to_type,
						variableValues.attributes2.gauze__relationship__to_type,
					);
					return Promise.resolve(data);
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
	test.it("delete nested mutation", function (test_ctx) {
		// todo: do two root query reads after to make sure the entities no longer exist
		return suite_ctx.database.transaction(function (transaction) {
			const delete_query_file = path.resolve(import.meta.dirname, "./graphql/delete_nested_mutation.graphql");
			const delete_query = fs.readFileSync(delete_query_file).toString("utf8");
			const source = delete_query;
			const operationName = "DeleteRelationshipNestedMutation";
			const variableValues = {
				where1: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
				},
				where2: {
					gauze__relationship__id: "00000000-0000-0000-0000-000000000002",
				},
			};
			const contextValue = {
				database: suite_ctx.database,
				transaction: transaction,
			};
			return execute({
				source,
				contextValue,
				variableValues,
				operationName,
			})
				.then(function (data) {
					assert.strictEqual(data.errors, undefined);
					assert.strictEqual(data.data.delete_relationship.length, 1);
					return Promise.resolve(data);
				})
				.then(function () {
					return transaction.rollback();
				})
				.catch(function (err) {
					return transaction
						.rollback(err)
						.then(function () {
							throw err;
						})
						.catch(function (err) {
							throw err;
						});
				});
		});
	});
});
