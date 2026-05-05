import assert from "node:assert/strict";
import test from "node:test";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

import * as $gauze from "./../../src/index.js";

function with_env(name, value, callback) {
	const previous_value = process.env[name];
	if (value === undefined) {
		delete process.env[name];
	} else {
		process.env[name] = value;
	}
	return Promise.resolve()
		.then(callback)
		.finally(function () {
			if (previous_value === undefined) {
				delete process.env[name];
			} else {
				process.env[name] = previous_value;
			}
		});
}

function schema() {
	const leaf_type = new GraphQLObjectType({
		name: "Leaf",
		fields: {
			value: {
				type: GraphQLString,
			},
		},
	});
	const branch_type = new GraphQLObjectType({
		name: "Branch",
		fields: {
			leaf: {
				type: leaf_type,
				resolve() {
					return {
						value: "ok",
					};
				},
			},
		},
	});
	const query_type = new GraphQLObjectType({
		name: "Query",
		fields: {
			branch: {
				type: branch_type,
				resolve() {
					return {};
				},
			},
		},
	});
	return new GraphQLSchema({
		query: query_type,
	});
}

function execute(operation) {
	return $gauze.kernel.src.shell.graphql.EXECUTE__GRAPHQL__SHELL__SRC__KERNEL({
		schema: schema(),
		context: {},
		operation,
		operation_name: undefined,
		operation_variables: undefined,
	});
}

test.describe("kernel GraphQL shell limits", async function () {
	await test.it("executes operations that are within the configured max depth", async function () {
		return with_env("GAUZE_GRAPHQL_MAX_DEPTH", "2", async function () {
			const data = await execute(`
				query {
					branch {
						leaf {
							value
						}
					}
				}
			`);

			assert.equal(data.data.branch.leaf.value, "ok");
			assert.equal(data.errors, undefined);
		});
	});

	await test.it("rejects operations deeper than the configured max depth", async function () {
		return with_env("GAUZE_GRAPHQL_MAX_DEPTH", "1", async function () {
			const data = await execute(`
				query {
					branch {
						leaf {
							value
						}
					}
				}
			`);

			assert.equal(data.errors.length, 1);
			assert.equal(data.errors[0].message, "Maximum GraphQL operation depth exceeded: 2 > 1");
			assert.equal(data.data, undefined);
		});
	});

	await test.it("counts depth through fragment spreads", async function () {
		return with_env("GAUZE_GRAPHQL_MAX_DEPTH", "1", async function () {
			const data = await execute(`
				query {
					branch {
						...BranchFields
					}
				}

				fragment BranchFields on Branch {
					leaf {
						value
					}
				}
			`);

			assert.equal(data.errors.length, 1);
			assert.equal(data.errors[0].message, "Maximum GraphQL operation depth exceeded: 2 > 1");
		});
	});
});
