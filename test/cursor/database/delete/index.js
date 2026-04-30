import assert from "node:assert/strict";
import test from "node:test";

import { describe_database_cursor_suite, execute, load_cursor_steps, run_cursor_steps, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database delete", async function (suite_ctx) {
	await test.it("pages ezuag and uses cursor_delete_ezuag continuation", async function () {
		const steps = await load_cursor_steps(import.meta.dirname, "./navigation");
		await run_cursor_steps(
			{
				database_manager: suite_ctx.database_manager,
			},
			steps,
		);
	});

	await test.it("returns an empty cursor delete page when no rows match", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			const result = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorDeleteEzuagEmpty(
				$where_like: Ezuag_Mutation__Where
				$limit: Int
				$order: [Order]
			) {
				cursor_delete_ezuag(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 } }
					page_info { has_previous_page has_next_page previous_cursor current_cursor next_cursor }
				}
			}
			`,
				"CursorDeleteEzuagEmpty",
				{
					where_like: {
						gauze__ezuag__text1: "cursor-ezuag-delete-empty-%",
					},
					limit: 2,
					order: [{ column: "gauze__ezuag__text1", order: "asc" }],
				},
			);
			assert.deepEqual(result.cursor_delete_ezuag.nodes, []);
			assert.equal(result.cursor_delete_ezuag.page_info.has_previous_page, false);
			assert.equal(result.cursor_delete_ezuag.page_info.has_next_page, false);
			assert.equal(result.cursor_delete_ezuag.page_info.previous_cursor, null);
			assert.equal(typeof result.cursor_delete_ezuag.page_info.current_cursor, "string");
			assert.equal(result.cursor_delete_ezuag.page_info.next_cursor, null);
		});
	});
});
