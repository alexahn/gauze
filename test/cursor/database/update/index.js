import assert from "node:assert/strict";
import test from "node:test";

import { describe_database_cursor_suite, execute, load_cursor_steps, run_cursor_steps, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database update", async function (suite_ctx) {
	await test.it("uses embedded attributes for cursor_update_ytitne continuation", async function () {
		const steps = await load_cursor_steps(import.meta.dirname, "./navigation");
		await run_cursor_steps(
			{
				database_manager: suite_ctx.database_manager,
			},
			steps,
		);
	});

	await test.it("returns an empty cursor update page without mutating when continuation is out of window", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			const result = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorUpdateYtitneEmpty(
				$where_like: Ytitne_Mutation__Where
				$attributes: Ytitne_Mutation__Attributes
				$limit: Int
				$order: [Order]
			) {
				cursor_update_ytitne(where_like: $where_like, attributes: $attributes, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page previous_cursor current_cursor next_cursor }
				}
			}
			`,
				"CursorUpdateYtitneEmpty",
				{
					where_like: {
						text: "cursor-ytitne-update-empty-%",
					},
					attributes: {
						text: "cursor-ytitne-updated-empty",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(result.cursor_update_ytitne.nodes, []);
			assert.equal(result.cursor_update_ytitne.page_info.has_previous_page, false);
			assert.equal(result.cursor_update_ytitne.page_info.has_next_page, false);
			assert.equal(result.cursor_update_ytitne.page_info.previous_cursor, null);
			assert.equal(typeof result.cursor_update_ytitne.page_info.current_cursor, "string");
			assert.equal(result.cursor_update_ytitne.page_info.next_cursor, null);
		});
	});
});
