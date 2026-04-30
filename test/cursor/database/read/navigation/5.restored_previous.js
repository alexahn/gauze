import assert from "node:assert/strict";

import { execute, text_values } from "./../../../helpers.js";

const step = 5;
const description = "Use an empty page recovery cursor to restore the current page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			query CursorReadYtitneRestoredPrevious($cursor: String) {
				cursor_read_ytitne(cursor: $cursor) {
					nodes { attributes { id text } }
				}
			}
			`,
		"CursorReadYtitneRestoredPrevious",
		{
			cursor: scenario.empty_previous.page_info.next_cursor,
		},
	);
	assert.deepEqual(text_values(data.cursor_read_ytitne, "text"), ["cursor-ytitne-read-001", "cursor-ytitne-read-002"]);
}

export default {
	step,
	description,
	run,
};
