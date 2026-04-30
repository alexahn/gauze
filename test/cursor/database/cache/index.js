import assert from "node:assert/strict";
import test from "node:test";

import { $gauze, decode_cursor_payload, describe_database_cursor_suite, execute, text_values, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database cache filters", async function (suite_ctx) {
	await test.it("allows internal cache filters on cursor continuation", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateCachedYtitne(
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
				"CursorCreateCachedYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000051",
						text: "cursor-ytitne-cache-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000052",
						text: "cursor-ytitne-cache-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000053",
						text: "cursor-ytitne-cache-003",
					},
					d: {
						id: "10000000-0000-4000-8000-000000000054",
						text: "cursor-ytitne-cache-004",
					},
				},
			);

			const allowed_ids = ["10000000-0000-4000-8000-000000000051", "10000000-0000-4000-8000-000000000052", "10000000-0000-4000-8000-000000000053"];
			$gauze.kernel.src.cache.lru.TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set("cursor-cache-where-in-initial", allowed_ids, allowed_ids.length);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneCached(
				$where_like: Ytitne_Query__Where
				$cache_where_in: Ytitne_Query__Where_String
				$limit: Int
				$order: [Order]
			) {
				cursor_read_ytitne(where_like: $where_like, cache_where_in: $cache_where_in, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadYtitneCached",
				{
					where_like: {
						text: "cursor-ytitne-cache-%",
					},
					cache_where_in: {
						id: "cursor-cache-where-in-initial",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(text_values(first.cursor_read_ytitne, "text"), ["cursor-ytitne-cache-001", "cursor-ytitne-cache-002"]);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const decoded_next_cursor = decode_cursor_payload(first.cursor_read_ytitne.page_info.next_cursor);
			assert.equal(decoded_next_cursor.parameters.cache_where_in, undefined);

			$gauze.kernel.src.cache.lru.TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set("cursor-cache-where-in-next", allowed_ids, allowed_ids.length);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneCachedNext($cursor: String, $cache_where_in: Ytitne_Query__Where_String) {
				cursor_read_ytitne(cursor: $cursor, cache_where_in: $cache_where_in) {
					nodes { attributes { id text } }
					page_info { has_next_page }
				}
			}
			`,
				"CursorReadYtitneCachedNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
					cache_where_in: {
						id: "cursor-cache-where-in-next",
					},
				},
			);
			assert.deepEqual(text_values(second.cursor_read_ytitne, "text"), ["cursor-ytitne-cache-003"]);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);
		});
	});

	await test.it("intersects client primary-key where_in with internal cache filters", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateIntersectionYtitne(
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
				"CursorCreateIntersectionYtitne",
				{
					a: {
						id: "10000000-0000-4000-8000-000000000055",
						text: "cursor-ytitne-intersection-001",
					},
					b: {
						id: "10000000-0000-4000-8000-000000000056",
						text: "cursor-ytitne-intersection-002",
					},
					c: {
						id: "10000000-0000-4000-8000-000000000057",
						text: "cursor-ytitne-intersection-003",
					},
					d: {
						id: "10000000-0000-4000-8000-000000000058",
						text: "cursor-ytitne-intersection-004",
					},
				},
			);

			const allowed_ids = ["10000000-0000-4000-8000-000000000055", "10000000-0000-4000-8000-000000000056", "10000000-0000-4000-8000-000000000057"];
			$gauze.kernel.src.cache.lru.TIERED_CACHE__LRU__CACHE__SRC__KERNEL.set("cursor-cache-where-in-intersection", allowed_ids, allowed_ids.length);

			const result = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadYtitneIntersection(
				$where_like: Ytitne_Query__Where
				$where_in: Ytitne_Query__Where_Array
				$cache_where_in: Ytitne_Query__Where_String
				$limit: Int
				$order: [Order]
			) {
				cursor_read_ytitne(where_like: $where_like, where_in: $where_in, cache_where_in: $cache_where_in, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page }
				}
			}
			`,
				"CursorReadYtitneIntersection",
				{
					where_like: {
						text: "cursor-ytitne-intersection-%",
					},
					where_in: {
						id: ["10000000-0000-4000-8000-000000000056"],
					},
					cache_where_in: {
						id: "cursor-cache-where-in-intersection",
					},
					limit: 3,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(text_values(result.cursor_read_ytitne, "text"), ["cursor-ytitne-intersection-002"]);
			assert.equal(result.cursor_read_ytitne.page_info.has_next_page, false);
		});
	});
});
