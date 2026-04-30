import assert from "node:assert/strict";
import test from "node:test";

import { assert_cursor_shape, describe_database_cursor_suite, encode_cursor_payload, execute, text_values, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database stale cursors", async function (suite_ctx) {
	await test.it("preserves recovery navigation when a next cursor has no rows", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateStaleNextYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
			}
			`,
				"CursorCreateStaleNextYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000501",
						text: "cursor-stale-next-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000502",
						text: "cursor-stale-next-002",
					},
				},
			);

			const cursor = encode_cursor_payload({
				v: 1,
				entity: "gauze__ytitne",
				method: "read",
				parameters: {
					where_like: {
						text: "cursor-stale-next-%",
					},
					limit: 2,
					order: [
						{
							column: "text",
							order: "asc",
							nulls: "first",
						},
						{
							column: "id",
							order: "asc",
							nulls: "last",
						},
					],
				},
				page: "next",
				previous: null,
				current: {
					direction: "current",
					cursor_where_between: null,
				},
				next: {
					direction: "next",
					cursor_where_between: {
						type: "lexicographic",
						start: [
							{
								column: "text",
								value: "cursor-stale-next-999",
							},
							{
								column: "id",
								value: "10000000-0000-4000-8000-000000000999",
							},
						],
						end: null,
					},
				},
			});

			const empty = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneStaleNext($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
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
			`,
				"CursorReadYtitneStaleNext",
				{
					cursor,
				},
			);
			assert.deepEqual(text_values(empty.cursor_read_ytitne, "text"), []);
			assert_cursor_shape(empty.cursor_read_ytitne.page_info, {
				has_previous_page: true,
				has_next_page: false,
				previous_cursor: "string",
				current_cursor: "string",
				next_cursor: null,
			});

			const restored = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneStaleNextRestored($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadYtitneStaleNextRestored",
				{
					cursor: empty.cursor_read_ytitne.page_info.previous_cursor,
				},
			);
			assert.deepEqual(text_values(restored.cursor_read_ytitne, "text"), ["cursor-stale-next-001", "cursor-stale-next-002"]);
			assert.equal(restored.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(restored.cursor_read_ytitne.page_info.has_next_page, false);
		});
	});
});
