import assert from "node:assert/strict";
import test from "node:test";

import { assert_cursor_shape, describe_database_cursor_suite, execute, load_cursor_steps, run_cursor_steps, text_values, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database read", async function (suite_ctx) {
	await test.it("pages ytitne with previous, current, and next cursors", async function () {
		const steps = await load_cursor_steps(import.meta.dirname, "./navigation");
		await run_cursor_steps(
			{
				database_manager: suite_ctx.database_manager,
			},
			steps,
		);
	});

	await test.it("reports page boundaries for empty, single-row, exact-limit, and extra-row reads", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			const query = `
			query CursorReadBoundaryYtitne($where_like: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ytitne(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info {
						has_previous_page
						has_next_page
						previous_cursor
						current_cursor
						next_cursor
					}
				}
			}
			`;

			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateBoundaryYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
				"CursorCreateBoundaryYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000101",
						text: "cursor-boundary-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000102",
						text: "cursor-boundary-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000103",
						text: "cursor-boundary-003",
					},
				},
			);

			const empty = await execute(suite_ctx.database_manager, transactions, query, "CursorReadBoundaryYtitne", {
				where_like: {
					text: "cursor-boundary-empty-%",
				},
				limit: 2,
				order: [{ column: "text", order: "asc" }],
			});
			assert.deepEqual(text_values(empty.cursor_read_ytitne, "text"), []);
			assert_cursor_shape(empty.cursor_read_ytitne.page_info, {
				has_previous_page: false,
				has_next_page: false,
				previous_cursor: null,
				current_cursor: "string",
				next_cursor: null,
			});

			const single = await execute(suite_ctx.database_manager, transactions, query, "CursorReadBoundaryYtitne", {
				where_like: {
					text: "cursor-boundary-001",
				},
				limit: 2,
				order: [{ column: "text", order: "asc" }],
			});
			assert.deepEqual(text_values(single.cursor_read_ytitne, "text"), ["cursor-boundary-001"]);
			assert_cursor_shape(single.cursor_read_ytitne.page_info, {
				has_previous_page: false,
				has_next_page: false,
				previous_cursor: null,
				current_cursor: "string",
				next_cursor: null,
			});

			const exact = await execute(suite_ctx.database_manager, transactions, query, "CursorReadBoundaryYtitne", {
				where_like: {
					text: "cursor-boundary-00_",
				},
				limit: 3,
				order: [{ column: "text", order: "asc" }],
			});
			assert.deepEqual(text_values(exact.cursor_read_ytitne, "text"), ["cursor-boundary-001", "cursor-boundary-002", "cursor-boundary-003"]);
			assert_cursor_shape(exact.cursor_read_ytitne.page_info, {
				has_previous_page: false,
				has_next_page: false,
				previous_cursor: null,
				current_cursor: "string",
				next_cursor: null,
			});

			const extra = await execute(suite_ctx.database_manager, transactions, query, "CursorReadBoundaryYtitne", {
				where_like: {
					text: "cursor-boundary-00_",
				},
				limit: 2,
				order: [{ column: "text", order: "asc" }],
			});
			assert.deepEqual(text_values(extra.cursor_read_ytitne, "text"), ["cursor-boundary-001", "cursor-boundary-002"]);
			assert_cursor_shape(extra.cursor_read_ytitne.page_info, {
				has_previous_page: false,
				has_next_page: true,
				previous_cursor: null,
				current_cursor: "string",
				next_cursor: "string",
			});
		});
	});
});
