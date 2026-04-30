import assert from "node:assert/strict";
import test from "node:test";

import { decode_cursor_payload, describe_database_cursor_suite, execute, text_values, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database filters", async function (suite_ctx) {
	function delay(ms) {
		return new Promise(function (resolve) {
			setTimeout(resolve, ms);
		});
	}

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

	await test.it("does not expose previous page outside a cursor date upper bound after paging forward and back", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
				mutation CursorCreateDateBoundedYtitne(
					$a: Ytitne_Mutation__Attributes
					$b: Ytitne_Mutation__Attributes
					$c: Ytitne_Mutation__Attributes
					$d: Ytitne_Mutation__Attributes
				) {
					a: create_ytitne(attributes: $a) { attributes { id } }
					b: create_ytitne(attributes: $b) { attributes { id } }
					c: create_ytitne(attributes: $c) { attributes { id } }
					d: create_ytitne(attributes: $d) { attributes { id } }
				}
				`,
				"CursorCreateDateBoundedYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000351",
						text: "cursor-date-upper-bound-a",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000352",
						text: "cursor-date-upper-bound-b",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000353",
						text: "cursor-date-upper-bound-c",
					},
					d: {
						id: "10000000-0000-4000-8000-000000000354",
						text: "cursor-date-upper-bound-d",
					},
				},
			);

			const bounded_rows = await execute(
				suite_ctx.database_manager,
				transactions,
				`
				query CursorReadDateBoundedRows($where_like: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
					read_ytitne(where_like: $where_like, limit: $limit, order: $order) {
						attributes { id created_at text }
					}
				}
				`,
				"CursorReadDateBoundedRows",
				{
					where_like: {
						text: "cursor-date-upper-bound-%",
					},
					limit: 4,
					order: [
						{
							column: "created_at",
							order: "desc",
						},
						{
							column: "id",
							order: "asc",
						},
					],
				},
			);
			const upper_bound = bounded_rows.read_ytitne[0].attributes.created_at;
			const expected_first_texts = bounded_rows.read_ytitne.slice(0, 2).map(function (row) {
				return row.attributes.text;
			});
			const expected_second_texts = bounded_rows.read_ytitne.slice(2, 4).map(function (row) {
				return row.attributes.text;
			});

			await delay(2);
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
				mutation CursorCreateDateOutsideBoundYtitne($outside: Ytitne_Mutation__Attributes) {
					outside: create_ytitne(attributes: $outside) { attributes { id } }
				}
				`,
				"CursorCreateDateOutsideBoundYtitne",
				{
					outside: {
						id: "10000000-0000-4000-8000-000000000355",
						text: "cursor-date-upper-bound-outside",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
				query CursorReadDateUpperBoundFirst(
					$where_like: Ytitne_Query__Where
					$where_between: Ytitne_Query__Where_Array
					$limit: Int
					$order: [Order]
				) {
					cursor_read_ytitne(where_like: $where_like, where_between: $where_between, limit: $limit, order: $order) {
						nodes { attributes { id created_at text } }
						page_info { has_previous_page has_next_page previous_cursor next_cursor }
					}
				}
				`,
				"CursorReadDateUpperBoundFirst",
				{
					where_like: {
						text: "cursor-date-upper-bound-%",
					},
					where_between: {
						created_at: [null, upper_bound],
					},
					limit: 2,
					order: [
						{
							column: "created_at",
							order: "desc",
						},
					],
				},
			);
			assert.deepEqual(text_values(first.cursor_read_ytitne, "text"), expected_first_texts);
			assert.equal(first.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
				query CursorReadDateUpperBoundCursor($cursor: String) {
					cursor_read_ytitne(cursor: $cursor) {
						nodes { attributes { id created_at text } }
						page_info { has_previous_page has_next_page previous_cursor next_cursor }
					}
				}
				`,
				"CursorReadDateUpperBoundCursor",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(text_values(second.cursor_read_ytitne, "text"), expected_second_texts);
			assert.equal(second.cursor_read_ytitne.page_info.has_previous_page, true);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);

			const back = await execute(
				suite_ctx.database_manager,
				transactions,
				`
				query CursorReadDateUpperBoundBack($cursor: String) {
					cursor_read_ytitne(cursor: $cursor) {
						nodes { attributes { id created_at text } }
						page_info { has_previous_page has_next_page previous_cursor next_cursor }
					}
				}
				`,
				"CursorReadDateUpperBoundBack",
				{
					cursor: second.cursor_read_ytitne.page_info.previous_cursor,
				},
			);
			assert.deepEqual(text_values(back.cursor_read_ytitne, "text"), expected_first_texts);
			assert.equal(back.cursor_read_ytitne.page_info.has_previous_page, false);
			assert.equal(back.cursor_read_ytitne.page_info.previous_cursor, null);
			assert.equal(back.cursor_read_ytitne.page_info.has_next_page, true);
		});
	});

	await test.it("constructs read cursor boundaries from every composite where_between order column", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
				mutation CursorCreateCompositeBetweenEzuag(
					$a: Ezuag_Mutation__Attributes
					$b: Ezuag_Mutation__Attributes
					$c: Ezuag_Mutation__Attributes
					$d: Ezuag_Mutation__Attributes
				) {
					a: create_ezuag(attributes: $a) { attributes { gauze__ezuag__id } }
					b: create_ezuag(attributes: $b) { attributes { gauze__ezuag__id } }
					c: create_ezuag(attributes: $c) { attributes { gauze__ezuag__id } }
					d: create_ezuag(attributes: $d) { attributes { gauze__ezuag__id } }
				}
				`,
				"CursorCreateCompositeBetweenEzuag",
				{
					a: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000331",
						gauze__ezuag__text1: "cursor-ezuag-filter-composite",
						gauze__ezuag__text2: "d",
					},
					b: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000332",
						gauze__ezuag__text1: "cursor-ezuag-filter-composite",
						gauze__ezuag__text2: "c",
					},
					c: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000333",
						gauze__ezuag__text1: "cursor-ezuag-filter-composite",
						gauze__ezuag__text2: "b",
					},
					d: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000334",
						gauze__ezuag__text1: "cursor-ezuag-filter-composite",
						gauze__ezuag__text2: "a",
					},
				},
			);

			const where_between = {
				gauze__ezuag__text1: ["cursor-ezuag-filter-composite", "cursor-ezuag-filter-composite"],
				gauze__ezuag__text2: ["z", "0"],
				gauze__ezuag__id: ["10000000-0000-4000-8000-000000000330", "10000000-0000-4000-8000-000000000335"],
			};
			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
				query CursorReadCompositeBetweenEzuag(
					$where_between: Ezuag_Query__Where_Array
					$limit: Int
					$order: [Order]
				) {
					cursor_read_ezuag(where_between: $where_between, limit: $limit, order: $order) {
						nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 gauze__ezuag__text2 } }
						page_info { has_next_page next_cursor }
					}
				}
				`,
				"CursorReadCompositeBetweenEzuag",
				{
					where_between,
					limit: 2,
					order: [
						{ column: "gauze__ezuag__text1", order: "asc" },
						{ column: "gauze__ezuag__text2", order: "desc" },
					],
				},
			);
			assert.deepEqual(
				first.cursor_read_ezuag.nodes.map(function (node) {
					return node.attributes.gauze__ezuag__id;
				}),
				["10000000-0000-4000-8000-000000000331", "10000000-0000-4000-8000-000000000332"],
			);
			assert.equal(first.cursor_read_ezuag.page_info.has_next_page, true);

			const decoded = decode_cursor_payload(first.cursor_read_ezuag.page_info.next_cursor);
			assert.deepEqual(decoded.parameters.where_between, where_between);
			assert.deepEqual(decoded.parameters.order, [
				{
					column: "gauze__ezuag__text1",
					order: "asc",
					nulls: "first",
				},
				{
					column: "gauze__ezuag__text2",
					order: "desc",
					nulls: "first",
				},
				{
					column: "gauze__ezuag__id",
					order: "asc",
					nulls: "last",
				},
			]);
			assert.deepEqual(decoded.next.cursor_where_between, {
				type: "lexicographic",
				start: [
					{
						column: "gauze__ezuag__text1",
						value: "cursor-ezuag-filter-composite",
					},
					{
						column: "gauze__ezuag__text2",
						value: "c",
					},
					{
						column: "gauze__ezuag__id",
						value: "10000000-0000-4000-8000-000000000332",
					},
				],
				end: null,
			});
		});
	});
});
