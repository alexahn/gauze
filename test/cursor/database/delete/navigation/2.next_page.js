import assert from "node:assert/strict";

import { execute, text_values } from "./../../../helpers.js";

const step = 2;
const description = "Delete the next ezuag cursor page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			mutation CursorDeleteEzuagNext($cursor: String) {
				cursor_delete_ezuag(cursor: $cursor) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 } }
					page_info { has_next_page }
				}
			}
			`,
		"CursorDeleteEzuagNext",
		{
			cursor: scenario.first.page_info.next_cursor,
		},
	);
	scenario.second = data.cursor_delete_ezuag;
	assert.deepEqual(text_values(scenario.second, "gauze__ezuag__text1"), ["cursor-ezuag-delete-003"]);
	assert.equal(scenario.second.page_info.has_next_page, false);
}

export default {
	step,
	description,
	run,
};
