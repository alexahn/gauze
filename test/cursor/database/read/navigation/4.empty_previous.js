import assert from "node:assert/strict";

import { assert_cursor_shape, encode_cursor_payload, execute, text_values } from "./../../../helpers.js";

const step = 4;
const description = "Preserve navigation for an empty previous cursor page";

async function run(environment, scenario) {
	scenario.stale_empty_previous_cursor = encode_cursor_payload({
		v: 1,
		entity: "gauze__ytitne",
		method: "read",
		parameters: {
			where_like: {
				text: "cursor-ytitne-read-%",
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
		page: "previous",
		previous: {
			direction: "previous",
			cursor_where_between: {
				type: "lexicographic",
				start: null,
				end: [
					{
						column: "text",
						value: "cursor-ytitne-read-001",
					},
					{
						column: "id",
						value: "10000000-0000-4000-8000-000000000001",
					},
				],
			},
		},
		current: {
			direction: "previous",
			cursor_where_between: {
				type: "lexicographic",
				start: null,
				end: [
					{
						column: "text",
						value: "cursor-ytitne-read-003",
					},
					{
						column: "id",
						value: "10000000-0000-4000-8000-000000000003",
					},
				],
			},
		},
		next: null,
	});
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			query CursorReadYtitneEmptyPrevious($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info {
						has_previous_page
						has_next_page
						previous_cursor
						next_cursor
					}
				}
			}
			`,
		"CursorReadYtitneEmptyPrevious",
		{
			cursor: scenario.stale_empty_previous_cursor,
		},
	);
	scenario.empty_previous = data.cursor_read_ytitne;
	assert.deepEqual(text_values(scenario.empty_previous, "text"), []);
	assert_cursor_shape(scenario.empty_previous.page_info, {
		has_previous_page: false,
		has_next_page: true,
		previous_cursor: null,
		next_cursor: "string",
	});
}

export default {
	step,
	description,
	run,
};
