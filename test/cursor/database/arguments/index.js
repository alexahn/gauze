import assert from "node:assert/strict";
import test from "node:test";

import { $gauze, describe_database_cursor_suite, execute_with_errors, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database arguments", async function (suite_ctx) {
	await test.it("requires a cursor or a filter for cursor reads and deletes", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			const read = await execute_with_errors(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneMissingFilter {
				cursor_read_ytitne {
					nodes { attributes { id } }
				}
			}
			`,
				"CursorReadYtitneMissingFilter",
			);
			assert.match(read.errors[0].message, /Field 'cursor' is required or field 'where' is required/);

			const delete_result = await execute_with_errors(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorDeleteYtitneMissingFilter {
				cursor_delete_ytitne {
					nodes { attributes { id } }
				}
			}
			`,
				"CursorDeleteYtitneMissingFilter",
			);
			assert.match(delete_result.errors[0].message, /Field 'cursor' is required or field 'where' is required/);
		});
	});

	await test.it("requires attributes and a cursor or filter for cursor updates", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			const missing_attributes = await execute_with_errors(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorUpdateYtitneMissingAttributes($where: Ytitne_Mutation__Where) {
				cursor_update_ytitne(where: $where) {
					nodes { attributes { id } }
				}
			}
			`,
				"CursorUpdateYtitneMissingAttributes",
				{
					where: {
						id: "10000000-0000-4000-8000-000000000401",
					},
				},
			);
			assert.match(missing_attributes.errors[0].message, /Field 'cursor' is required or field 'attributes' is required/);

			const missing_filter = await execute_with_errors(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorUpdateYtitneMissingFilter($attributes: Ytitne_Mutation__Attributes) {
				cursor_update_ytitne(attributes: $attributes) {
					nodes { attributes { id } }
				}
			}
			`,
				"CursorUpdateYtitneMissingFilter",
				{
					attributes: {
						text: "cursor-update-no-filter",
					},
				},
			);
			assert.match(missing_filter.errors[0].message, /Field 'cursor' is required or field 'where' is required/);
		});
	});

	await test.it("cleans cursor and offset from initial cursor request payloads", async function () {
		const model = $gauze.database.models.ytitne.MODEL__YTITNE__MODEL__DATABASE;
		const request = model._cursor_request_from_parameters(
			{
				cursor: null,
				where_like: {
					text: "cursor-clean-%",
				},
				offset: 12,
				limit: 1,
			},
			"read",
		);
		assert.deepEqual(request.parameters, {
			where_like: {
				text: "cursor-clean-%",
			},
			limit: 1,
		});
	});
});
