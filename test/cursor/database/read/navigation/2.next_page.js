import assert from "node:assert/strict";

import { assert_cursor_shape, execute, text_values } from "./../../../helpers.js";

const step = 2;
const description = "Read the next ytitne cursor page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			query CursorReadYtitneNext($cursor: String) {
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
		"CursorReadYtitneNext",
		{
			cursor: scenario.first.page_info.next_cursor,
		},
	);
	scenario.second = data.cursor_read_ytitne;
	assert.deepEqual(text_values(scenario.second, "text"), ["cursor-ytitne-read-003"]);
	assert_cursor_shape(scenario.second.page_info, {
		has_previous_page: true,
		has_next_page: false,
		previous_cursor: "string",
		current_cursor: "string",
		next_cursor: null,
	});
}

export default {
	step,
	description,
	run,
};
