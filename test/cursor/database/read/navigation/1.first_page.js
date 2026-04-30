import assert from "node:assert/strict";

import { assert_cursor_shape, execute, text_values } from "./../../../helpers.js";

const step = 1;
const description = "Read the first ytitne cursor page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			query CursorReadYtitne($where_like: Ytitne_Query__Where, $limit: Int, $order: [Order]) {
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
			`,
		"CursorReadYtitne",
		{
			where_like: {
				text: "cursor-ytitne-read-%",
			},
			limit: 2,
			order: [{ column: "text", order: "asc" }],
		},
	);
	scenario.first = data.cursor_read_ytitne;
	assert.deepEqual(text_values(scenario.first, "text"), ["cursor-ytitne-read-001", "cursor-ytitne-read-002"]);
	assert_cursor_shape(scenario.first.page_info, {
		has_previous_page: false,
		has_next_page: true,
		previous_cursor: null,
		current_cursor: "string",
		next_cursor: "string",
	});
}

export default {
	step,
	description,
	run,
};
