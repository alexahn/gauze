import assert from "node:assert/strict";
import test from "node:test";

import { decode_cursor_payload, describe_database_cursor_suite, execute, text_values, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database filters", async function (suite_ctx) {
	await test.it("applies where, where_in, where_not_in, where_like, and where_between filters", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateFilteredYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
				$d: Ytitne_Mutation__Attributes
				$e: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
				d: create_ytitne(attributes: $d) { attributes { id } }
				e: create_ytitne(attributes: $e) { attributes { id } }
			}
			`,
				"CursorCreateFilteredYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000301",
						text: "cursor-filter-exact",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000302",
						text: "cursor-filter-like-001",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000303",
						text: "cursor-filter-like-002",
					},
					d: {
						id: "10000000-0000-4000-8000-000000000304",
						text: "cursor-filter-like-003",
					},
					e: {
						id: "10000000-0000-4000-8000-000000000305",
						text: "cursor-filter-outside",
					},
				},
			);

			const exact = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadExactYtitne($where: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ytitne(where: $where, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page }
				}
			}
			`,
				"CursorReadExactYtitne",
				{
					where: {
						text: "cursor-filter-exact",
					},
					limit: 2,
					order: [{ column: "id", order: "asc" }],
				},
			);
			assert.deepEqual(text_values(exact.cursor_read_ytitne, "text"), ["cursor-filter-exact"]);
			assert.equal(exact.cursor_read_ytitne.page_info.has_next_page, false);

			const include_exclude = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadIncludeExcludeYtitne(
				$where_in: Ytitne_Query__Where_Array
				$where_not_in: Ytitne_Query__Where_Array
				$limit: Int
				$order: [Order]
			) {
				cursor_read_ytitne(where_in: $where_in, where_not_in: $where_not_in, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page }
				}
			}
			`,
				"CursorReadIncludeExcludeYtitne",
				{
					where_in: {
						id: ["10000000-0000-4000-8000-000000000302", "10000000-0000-4000-8000-000000000303"],
					},
					where_not_in: {
						id: ["10000000-0000-4000-8000-000000000303"],
					},
					limit: 2,
					order: [{ column: "id", order: "asc" }],
				},
			);
			assert.deepEqual(text_values(include_exclude.cursor_read_ytitne, "text"), ["cursor-filter-like-001"]);
			assert.equal(include_exclude.cursor_read_ytitne.page_info.has_next_page, false);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadBetweenYtitne(
				$where_like: Ytitne_Query__Where
				$where_between: Ytitne_Query__Where_Array
				$limit: Int
				$order: [Order]
			) {
				cursor_read_ytitne(where_like: $where_like, where_between: $where_between, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadBetweenYtitne",
				{
					where_like: {
						text: "cursor-filter-like-%",
					},
					where_between: {
						id: ["10000000-0000-4000-8000-000000000302", "10000000-0000-4000-8000-000000000304"],
					},
					limit: 2,
					order: [{ column: "id", order: "asc" }],
				},
			);
			assert.deepEqual(text_values(first.cursor_read_ytitne, "text"), ["cursor-filter-like-001", "cursor-filter-like-002"]);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const decoded = decode_cursor_payload(first.cursor_read_ytitne.page_info.next_cursor);
			assert.deepEqual(decoded.parameters.where_like, {
				text: "cursor-filter-like-%",
			});
			assert.deepEqual(decoded.parameters.where_between, {
				id: ["10000000-0000-4000-8000-000000000302", "10000000-0000-4000-8000-000000000304"],
			});

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadBetweenYtitneNext($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadBetweenYtitneNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(text_values(second.cursor_read_ytitne, "text"), ["cursor-filter-like-003"]);
			assert.equal(second.cursor_read_ytitne.page_info.has_previous_page, true);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);
		});
	});
});
