import assert from "node:assert/strict";
import test from "node:test";

import { decode_cursor_payload, describe_database_cursor_suite, execute, load_cursor_steps, run_cursor_steps, with_transactions } from "./../../helpers.js";

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

	await test.it("constructs update cursor boundaries from every composite where_between order column", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
				mutation CursorCreateUpdateCompositeBetweenYtitne(
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
				"CursorCreateUpdateCompositeBetweenYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000611",
						text: "cursor-ytitne-update-between",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000612",
						text: "cursor-ytitne-update-between",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000613",
						text: "cursor-ytitne-update-between",
					},
					d: {
						id: "10000000-0000-4000-8000-000000000614",
						text: "cursor-ytitne-update-between",
					},
				},
			);

			const where_between = {
				text: ["cursor-ytitne-update-between", "cursor-ytitne-update-between"],
				id: ["10000000-0000-4000-8000-000000000610", "10000000-0000-4000-8000-000000000615"],
			};
			const result = await execute(
				suite_ctx.database_manager,
				transactions,
				`
				mutation CursorUpdateCompositeBetweenYtitne(
					$where_between: Ytitne_Mutation__Where_Array
					$attributes: Ytitne_Mutation__Attributes
					$limit: Int
					$order: [Order]
				) {
					cursor_update_ytitne(where_between: $where_between, attributes: $attributes, limit: $limit, order: $order) {
						nodes { attributes { id text } }
						page_info { has_next_page next_cursor }
					}
				}
				`,
				"CursorUpdateCompositeBetweenYtitne",
				{
					where_between,
					attributes: {
						text: "cursor-ytitne-updated-between",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(
				result.cursor_update_ytitne.nodes.map(function (node) {
					return node.attributes.id;
				}),
				["10000000-0000-4000-8000-000000000611", "10000000-0000-4000-8000-000000000612"],
			);
			assert.equal(result.cursor_update_ytitne.page_info.has_next_page, true);

			const decoded = decode_cursor_payload(result.cursor_update_ytitne.page_info.next_cursor);
			assert.equal(decoded.method, "update");
			assert.deepEqual(decoded.parameters.where_between, where_between);
			assert.deepEqual(decoded.parameters.order, [
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
			]);
			assert.deepEqual(decoded.next.cursor_where_between, {
				type: "lexicographic",
				start: [
					{
						column: "text",
						value: "cursor-ytitne-update-between",
					},
					{
						column: "id",
						value: "10000000-0000-4000-8000-000000000612",
					},
				],
				end: null,
			});
		});
	});
});
