import assert from "node:assert/strict";

import { assert_cursor_shape, execute, text_values } from "./../../../helpers.js";

const step = 3;
const description = "Read the previous ytitne cursor page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			query CursorReadYtitnePrevious($cursor: String) {
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
		"CursorReadYtitnePrevious",
		{
			cursor: scenario.second.page_info.previous_cursor,
		},
	);
	scenario.previous = data.cursor_read_ytitne;
	assert.deepEqual(text_values(scenario.previous, "text"), ["cursor-ytitne-read-001", "cursor-ytitne-read-002"]);
	assert_cursor_shape(scenario.previous.page_info, {
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
