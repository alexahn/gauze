import assert from "node:assert/strict";

import { execute, text_values } from "./../../../helpers.js";

const step = 2;
const description = "Update the next ytitne cursor page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			mutation CursorUpdateYtitneNext($cursor: String) {
				cursor_update_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
					page_info { has_next_page }
				}
			}
			`,
		"CursorUpdateYtitneNext",
		{
			cursor: scenario.first.page_info.next_cursor,
		},
	);
	scenario.second = data.cursor_update_ytitne;
	assert.deepEqual(text_values(scenario.second, "text"), ["cursor-ytitne-updated"]);
	assert.equal(scenario.second.page_info.has_next_page, false);
}

export default {
	step,
	description,
	run,
};
