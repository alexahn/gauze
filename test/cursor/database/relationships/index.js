import assert from "node:assert/strict";
import test from "node:test";

import { describe_database_cursor_suite, execute, text_values, with_transactions } from "./../../helpers.js";

describe_database_cursor_suite("cursor pagination database relationships", async function (suite_ctx) {
	await test.it("pages cursor reads through a relationship source", async function () {
		await with_transactions(suite_ctx.database_manager, async function (transactions) {
			await execute(
				suite_ctx.database_manager,
				transactions,
				`
			mutation CursorCreateRelationshipGraph(
				$parent: Ytitne_Mutation__Attributes
				$child1: Ytitne_Mutation__Attributes
				$child2: Ytitne_Mutation__Attributes
				$child3: Ytitne_Mutation__Attributes
				$relationship1: Relationship_Mutation__Attributes
				$relationship2: Relationship_Mutation__Attributes
				$relationship3: Relationship_Mutation__Attributes
			) {
				parent: create_ytitne(attributes: $parent) { attributes { id } }
				child1: create_ytitne(attributes: $child1) { attributes { id } }
				child2: create_ytitne(attributes: $child2) { attributes { id } }
				child3: create_ytitne(attributes: $child3) { attributes { id } }
				relationship1: create_relationship(attributes: $relationship1) { attributes { gauze__relationship__id } }
				relationship2: create_relationship(attributes: $relationship2) { attributes { gauze__relationship__id } }
				relationship3: create_relationship(attributes: $relationship3) { attributes { gauze__relationship__id } }
			}
			`,
				"CursorCreateRelationshipGraph",
				{
					parent: {
						id: "10000000-0000-4000-8000-000000000601",
						text: "cursor-relationship-parent",
					},
					child1: {
						id: "10000000-0000-4000-8000-000000000602",
						text: "cursor-relationship-child-001",
					},
					child2: {
						id: "10000000-0000-4000-8000-000000000603",
						text: "cursor-relationship-child-002",
					},
					child3: {
						id: "10000000-0000-4000-8000-000000000604",
						text: "cursor-relationship-child-003",
					},
					relationship1: {
						gauze__relationship__id: "10000000-0000-4000-8000-000000000611",
						gauze__relationship__from_id: "10000000-0000-4000-8000-000000000601",
						gauze__relationship__from_type: "gauze__ytitne",
						gauze__relationship__to_id: "10000000-0000-4000-8000-000000000602",
						gauze__relationship__to_type: "gauze__ytitne",
					},
					relationship2: {
						gauze__relationship__id: "10000000-0000-4000-8000-000000000612",
						gauze__relationship__from_id: "10000000-0000-4000-8000-000000000601",
						gauze__relationship__from_type: "gauze__ytitne",
						gauze__relationship__to_id: "10000000-0000-4000-8000-000000000603",
						gauze__relationship__to_type: "gauze__ytitne",
					},
					relationship3: {
						gauze__relationship__id: "10000000-0000-4000-8000-000000000613",
						gauze__relationship__from_id: "10000000-0000-4000-8000-000000000601",
						gauze__relationship__from_type: "gauze__ytitne",
						gauze__relationship__to_id: "10000000-0000-4000-8000-000000000604",
						gauze__relationship__to_type: "gauze__ytitne",
					},
				},
			);

			const first = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadRelationshipYtitne(
				$source: Ytitne_Query__Source
				$where_like: Ytitne_Query__Where
				$limit: Int
				$order: [Order]
			) {
				cursor_read_ytitne(source: $source, where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
				"CursorReadRelationshipYtitne",
				{
					source: {
						_metadata: {
							id: "10000000-0000-4000-8000-000000000601",
							type: "YTITNE",
						},
						_direction: "to",
					},
					where_like: {
						text: "cursor-relationship-child-%",
					},
					limit: 2,
					order: [{ column: "text", order: "asc" }],
				},
			);
			assert.deepEqual(text_values(first.cursor_read_ytitne, "text"), ["cursor-relationship-child-001", "cursor-relationship-child-002"]);
			assert.equal(first.cursor_read_ytitne.page_info.has_next_page, true);

			const second = await execute(
				suite_ctx.database_manager,
				transactions,
				`
			query CursorReadRelationshipYtitneNext($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_previous_page has_next_page }
				}
			}
			`,
				"CursorReadRelationshipYtitneNext",
				{
					cursor: first.cursor_read_ytitne.page_info.next_cursor,
				},
			);
			assert.deepEqual(text_values(second.cursor_read_ytitne, "text"), ["cursor-relationship-child-003"]);
			assert.equal(second.cursor_read_ytitne.page_info.has_previous_page, true);
			assert.equal(second.cursor_read_ytitne.page_info.has_next_page, false);
		});
	});
});
