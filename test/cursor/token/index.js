import assert from "node:assert/strict";
import test from "node:test";

import { $gauze, decode_cursor_payload, encode_cursor_payload, tamper_cursor_payload } from "./../helpers.js";

test.describe("cursor pagination tokens", async function () {
	await test.it("round-trips signed cursor payloads with JSON-safe values", async function () {
		const cursor = encode_cursor_payload({
			v: 1,
			entity: "gauze__ytitne",
			method: "read",
			parameters: {
				count: 1n,
				bytes: new Uint8Array([1, 2, 3]),
			},
			page: "current",
			current: {
				direction: "current",
				cursor_where_between: null,
			},
		});
		const payload = decode_cursor_payload(cursor);
		assert.equal(payload.parameters.count, "1");
		assert.deepEqual(payload.parameters.bytes, [1, 2, 3]);
	});

	await test.it("rejects malformed cursors and invalid signatures", async function () {
		assert.throws(function () {
			decode_cursor_payload("missing-signature");
		}, /Invalid cursor/);

		assert.throws(function () {
			decode_cursor_payload("one.two.three");
		}, /Invalid cursor/);

		const cursor = encode_cursor_payload({
			v: 1,
			entity: "gauze__ytitne",
			method: "read",
			parameters: {},
			page: "current",
			current: {
				direction: "current",
				cursor_where_between: null,
			},
		});
		const tampered = tamper_cursor_payload(cursor, function (payload) {
			return {
				...payload,
				method: "delete",
			};
		});
		assert.throws(function () {
			decode_cursor_payload(tampered);
		}, /Invalid cursor signature/);
	});

	await test.it("validates cursor payload version, entity, method, and page", async function () {
		const model = $gauze.database.models.ytitne.MODEL__YTITNE__MODEL__DATABASE;
		function valid_payload(overrides) {
			return {
				v: 1,
				entity: "gauze__ytitne",
				method: "read",
				parameters: {
					where: {
						id: "10000000-0000-4000-8000-000000000701",
					},
				},
				page: "current",
				current: {
					direction: "current",
					cursor_where_between: null,
				},
				...overrides,
			};
		}

		assert.throws(function () {
			model._cursor_request_from_parameters(
				{
					cursor: encode_cursor_payload(valid_payload({ v: 2 })),
				},
				"read",
			);
		}, /Invalid cursor payload/);

		assert.throws(function () {
			model._cursor_request_from_parameters(
				{
					cursor: encode_cursor_payload(valid_payload({ entity: "gauze__ezuag" })),
				},
				"read",
			);
		}, /Invalid cursor payload/);

		assert.throws(function () {
			model._cursor_request_from_parameters(
				{
					cursor: encode_cursor_payload(valid_payload({ method: "update" })),
				},
				"read",
			);
		}, /Invalid cursor method/);

		assert.throws(function () {
			model._cursor_request_from_parameters(
				{
					cursor: encode_cursor_payload(valid_payload({ page: "next", next: null })),
				},
				"read",
			);
		}, /Invalid cursor page/);
	});
});
