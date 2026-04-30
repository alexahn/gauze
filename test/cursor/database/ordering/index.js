import assert from "node:assert/strict";
import test from "node:test";

import { describe_database_cursor_suite, execute, text_values, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database ordering", async function (suite_ctx) {
	await test.it("pages ytitne in descending order", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateDescendingYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
				"CursorCreateDescendingYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000031",
						text: "cursor-ytitne-desc-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000032",
						text: "cursor-ytitne-desc-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000033",
						text: "cursor-ytitne-desc-003",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneDescending($where_like: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ytitne(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadYtitneDescending",
				{
					where_like: {
						text: "cursor-ytitne-desc-%",
					},
					limit: 2,
					order: [{ column: "text", order: "desc" }],
				},
			);
			assert.deepEqual(text_values(first.cursor_read_ytitne, "text"), ["cursor-ytitne-desc-003", "cursor-ytitne-desc-002"]);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneDescendingNext($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page previous_cursor }
				}
			}
			`,
				"CursorReadYtitneDescendingNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(text_values(second.cursor_read_ytitne, "text"), ["cursor-ytitne-desc-001"]);
			assert.equal(second.cursor_read_ytitne.page_info.has_previous_page, true);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);

			const previous = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneDescendingPrevious($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadYtitneDescendingPrevious",
				{
					cursor: second.cursor_read_ytitne.page_info.previous_cursor,
				},
			);
			assert.deepEqual(text_values(previous.cursor_read_ytitne, "text"), ["cursor-ytitne-desc-003", "cursor-ytitne-desc-002"]);
			assert.equal(previous.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(previous.cursor_read_ytitne.page_info.has_next_page, true);
		});
	});

	await test.it("pages ezuag with mixed multi-column order and null cursor values", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateMixedEzuag(
				$a: Ezuag_Mutation__Attributes
				$b: Ezuag_Mutation__Attributes
				$c: Ezuag_Mutation__Attributes
				$d: Ezuag_Mutation__Attributes
				$e: Ezuag_Mutation__Attributes
				$f: Ezuag_Mutation__Attributes
				$g: Ezuag_Mutation__Attributes
			) {
				a: create_ezuag(attributes: $a) { attributes { gauze__ezuag__id } }
				b: create_ezuag(attributes: $b) { attributes { gauze__ezuag__id } }
				c: create_ezuag(attributes: $c) { attributes { gauze__ezuag__id } }
				d: create_ezuag(attributes: $d) { attributes { gauze__ezuag__id } }
				e: create_ezuag(attributes: $e) { attributes { gauze__ezuag__id } }
				f: create_ezuag(attributes: $f) { attributes { gauze__ezuag__id } }
				g: create_ezuag(attributes: $g) { attributes { gauze__ezuag__id } }
			}
			`,
				"CursorCreateMixedEzuag",
				{
					a: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000041",
						gauze__ezuag__text1: "cursor-ezuag-mixed-a",
						gauze__ezuag__text2: "b",
					},
					b: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000042",
						gauze__ezuag__text1: "cursor-ezuag-mixed-a",
						gauze__ezuag__text2: "a",
					},
					c: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000043",
						gauze__ezuag__text1: "cursor-ezuag-mixed-b",
						gauze__ezuag__text2: "b",
					},
					d: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000044",
						gauze__ezuag__text1: "cursor-ezuag-mixed-b",
						gauze__ezuag__text2: "a",
					},
					e: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000045",
						gauze__ezuag__text1: "cursor-ezuag-null-001",
						gauze__ezuag__text2: "null-boundary",
					},
					f: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000046",
						gauze__ezuag__text1: "cursor-ezuag-null-002",
						gauze__ezuag__text2: "null-boundary",
					},
					g: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000047",
						gauze__ezuag__text1: "cursor-ezuag-null-003",
						gauze__ezuag__text2: "null-boundary",
					},
				},
			);

			const mixed_first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagMixed($where_like: Ezuag_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ezuag(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadEzuagMixed",
				{
					where_like: {
						gauze__ezuag__text1: "cursor-ezuag-mixed-%",
					},
					limit: 2,
					order: [
						{ column: "gauze__ezuag__text1", order: "asc" },
						{ column: "gauze__ezuag__text2", order: "desc" },
					],
				},
			);
			assert.deepEqual(
				mixed_first.cursor_read_ezuag.nodes.map(function (node) {
					return `${node.attributes.gauze__ezuag__text1}:${node.attributes.gauze__ezuag__text2}`;
				}),
				["cursor-ezuag-mixed-a:b", "cursor-ezuag-mixed-a:a"],
			);
			assert.equal(mixed_first.cursor_read_ezuag.page_info.has_next_page, true);

			const mixed_second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagMixedNext($cursor: String) {
				cursor_read_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_previous_page has_next_page previous_cursor }
				}
			}
			`,
				"CursorReadEzuagMixedNext",
				{
					cursor: mixed_first.cursor_read_ezuag.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				mixed_second.cursor_read_ezuag.nodes.map(function (node) {
					return `${node.attributes.gauze__ezuag__text1}:${node.attributes.gauze__ezuag__text2}`;
				}),
				["cursor-ezuag-mixed-b:b", "cursor-ezuag-mixed-b:a"],
			);
			assert.equal(mixed_second.cursor_read_ezuag.page_info.has_previous_page, true);
			assert.equal(mixed_second.cursor_read_ezuag.page_info.has_next_page, false);

			const null_first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagNulls($where_like: Ezuag_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ezuag(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadEzuagNulls",
				{
					where_like: {
						gauze__ezuag__text1: "cursor-ezuag-null-%",
					},
					limit: 2,
					order: [{ column: "gauze__ezuag__deleted_at", order: "asc", nulls: "first" }],
				},
			);
			assert.deepEqual(text_values(null_first.cursor_read_ezuag, "gauze__ezuag__text1"), ["cursor-ezuag-null-001", "cursor-ezuag-null-002"]);
			assert.equal(null_first.cursor_read_ezuag.page_info.has_next_page, true);

			const null_second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagNullsNext($cursor: String) {
				cursor_read_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_previous_page has_next_page previous_cursor }
				}
			}
			`,
				"CursorReadEzuagNullsNext",
				{
					cursor: null_first.cursor_read_ezuag.page_info.next_cursor,
				},
			);
			assert.deepEqual(text_values(null_second.cursor_read_ezuag, "gauze__ezuag__text1"), ["cursor-ezuag-null-003"]);
			assert.equal(null_second.cursor_read_ezuag.page_info.has_previous_page, true);
			assert.equal(null_second.cursor_read_ezuag.page_info.has_next_page, false);

			const null_previous = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadEzuagNullsPrevious($cursor: String) {
				cursor_read_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadEzuagNullsPrevious",
				{
					cursor: null_second.cursor_read_ezuag.page_info.previous_cursor,
				},
			);
			assert.deepEqual(text_values(null_previous.cursor_read_ezuag, "gauze__ezuag__text1"), ["cursor-ezuag-null-001", "cursor-ezuag-null-002"]);
			assert.equal(null_previous.cursor_read_ezuag.page_info.has_previous_page, false);
			assert.equal(null_previous.cursor_read_ezuag.page_info.has_next_page, true);
		});
	});

	await test.it("uses the primary key as a deterministic tie-breaker when ordered values are equal", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateTieYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
				"CursorCreateTieYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000201",
						text: "cursor-tie",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000202",
						text: "cursor-tie",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000203",
						text: "cursor-tie",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadTieYtitne($where: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
				cursor_read_ytitne(where: $where, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadTieYtitne",
				{
					where: {
						text: "cursor-tie",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(
				first.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.id;
				}),
				["10000000-0000-4000-8000-000000000201", "10000000-0000-4000-8000-000000000202"],
			);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadTieYtitneNext($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadTieYtitneNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(
				second.cursor_read_ytitne.nodes.map(function (node) {
					return node.attributes.id;
				}),
				["10000000-0000-4000-8000-000000000203"],
			);
			assert.equal(second.cursor_read_ytitne.page_info.has_previous_page, true);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);
		});
	});
});
