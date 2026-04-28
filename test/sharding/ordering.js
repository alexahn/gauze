import pg from "pg";

import test from "node:test";
import assert from "node:assert/strict";

import { DatabaseModel } from "./../../src/kernel/src/models/database.js";

const { types } = pg;

const MODEL = Object.assign(Object.create(DatabaseModel.prototype), {
	entity: {
		fields: {
			id: {
				sql_type: "uuid",
			},
			amount: {
				sql_type: "numeric",
			},
		},
	},
	primary_key: "id",
});

function compare(left, right, column = null) {
	return Math.sign(MODEL._compare_order_values(left, right, column));
}

function parse(oid, value) {
	return types.getTypeParser(oid, "text")(value);
}

test.describe("sharded result ordering", function () {
	test.it("compares bytea values returned by pg bytewise", function () {
		const first = parse(types.builtins.BYTEA, "\\x000102");
		const second = parse(types.builtins.BYTEA, "\\x000103");
		const longer = parse(types.builtins.BYTEA, "\\x00010200");

		assert.equal(compare(first, second), -1);
		assert.equal(compare(longer, first), 1);
	});

	test.it("compares PostgreSQL arrays recursively", function () {
		const first = parse(1007, "{1,2,3}");
		const second = parse(1007, "{1,2,4}");
		const longer = parse(1007, "{1,2,3,0}");

		assert.equal(compare(first, second), -1);
		assert.equal(compare(longer, first), 1);
	});

	test.it("compares PostgreSQL point and circle objects by coordinates", function () {
		const first_point = parse(600, "(1,2)");
		const second_point = parse(600, "(1,3)");
		const first_circle = parse(types.builtins.CIRCLE, "<(1,2),3>");
		const second_circle = parse(types.builtins.CIRCLE, "<(1,2),4>");

		assert.equal(compare(first_point, second_point), -1);
		assert.equal(compare(first_circle, second_circle), -1);
	});

	test.it("compares PostgreSQL interval objects by normalized duration", function () {
		const first = parse(types.builtins.INTERVAL, "1 day 00:00:00");
		const second = parse(types.builtins.INTERVAL, "2 days 00:00:00");
		const month = parse(types.builtins.INTERVAL, "1 mon");

		assert.equal(compare(first, second), -1);
		assert.equal(compare(month, second), 1);
	});

	test.it("compares JSON objects returned by pg recursively without stringifying them", function () {
		const first = parse(types.builtins.JSONB, '{"b":2,"a":1}');
		const second = parse(types.builtins.JSONB, '{"a":1,"b":3}');
		const with_later_key = parse(types.builtins.JSONB, '{"c":0}');

		assert.equal(compare(first, second), -1);
		assert.equal(compare(with_later_key, first), 1);
	});

	test.it("compares numeric strings numerically when the entity field is numeric", function () {
		const first = parse(types.builtins.INT8, "2");
		const second = parse(types.builtins.INT8, "10");
		const decimal = parse(types.builtins.NUMERIC, "10.0001");

		assert.equal(compare(first, second, "amount"), -1);
		assert.equal(compare(decimal, second, "amount"), 1);
		assert.equal(compare(first, second, "id"), 1);
	});
});
