import assert from "node:assert/strict";
import test from "node:test";

import { decode_cursor_payload, describe_database_cursor_suite, execute, load_cursor_steps, run_cursor_steps, with_transactions } from "./../../helpers.js";

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

	await test.it("constructs delete cursor boundaries from every composite where_between order column", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
				mutation CursorCreateDeleteCompositeBetweenEzuag(
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
				"CursorCreateDeleteCompositeBetweenEzuag",
				{
					a: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000711",
						gauze__ezuag__text1: "cursor-ezuag-delete-between",
						gauze__ezuag__text2: "keep",
					},
					b: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000712",
						gauze__ezuag__text1: "cursor-ezuag-delete-between",
						gauze__ezuag__text2: "keep",
					},
					c: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000713",
						gauze__ezuag__text1: "cursor-ezuag-delete-between",
						gauze__ezuag__text2: "keep",
					},
					d: {
						gauze__ezuag__id: "10000000-0000-4000-8000-000000000714",
						gauze__ezuag__text1: "cursor-ezuag-delete-between",
						gauze__ezuag__text2: "keep",
					},
				},
			);

			const where_between = {
				gauze__ezuag__text1: ["cursor-ezuag-delete-between", "cursor-ezuag-delete-between"],
				gauze__ezuag__id: ["10000000-0000-4000-8000-000000000710", "10000000-0000-4000-8000-000000000715"],
			};
			const result = await execute(
				suite_ctx.database_manager,
				transactions,
				`
				mutation CursorDeleteCompositeBetweenEzuag(
					$where_between: Ezuag_Mutation__Where_Array
					$limit: Int
					$order: [Order]
				) {
					cursor_delete_ezuag(where_between: $where_between, limit: $limit, order: $order) {
						nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 } }
						page_info { has_next_page next_cursor }
					}
				}
				`,
				"CursorDeleteCompositeBetweenEzuag",
				{
					where_between,
					limit: 2,
					order: [{ column: "gauze__ezuag__text1", order: "asc" }],
				},
			);
			assert.deepEqual(
				result.cursor_delete_ezuag.nodes.map(function (node) {
					return node.attributes.gauze__ezuag__id;
				}),
				["10000000-0000-4000-8000-000000000711", "10000000-0000-4000-8000-000000000712"],
			);
			assert.equal(result.cursor_delete_ezuag.page_info.has_next_page, true);

			const decoded = decode_cursor_payload(result.cursor_delete_ezuag.page_info.next_cursor);
			assert.equal(decoded.method, "delete");
			assert.deepEqual(decoded.parameters.where_between, where_between);
			assert.deepEqual(decoded.parameters.order, [
				{
					column: "gauze__ezuag__text1",
					order: "asc",
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
						value: "cursor-ezuag-delete-between",
					},
					{
						column: "gauze__ezuag__id",
						value: "10000000-0000-4000-8000-000000000712",
					},
				],
				end: null,
			});
		});
	});
});
