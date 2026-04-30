import assert from "node:assert/strict";

import { execute_with_errors } from "./../../../helpers.js";

const step = 6;
const description = "Reject client arguments mixed with cursor continuation";

async function run(environment, scenario) {
	const result = await execute_with_errors(
		environment.database_manager,
		environment.transactions,
		`
			query CursorReadYtitneMixed($cursor: String, $where_like: Ytitne_Query__Where) {
				cursor_read_ytitne(cursor: $cursor, where_like: $where_like) {
					nodes { attributes { id } }
				}
			}
			`,
		"CursorReadYtitneMixed",
		{
			cursor: scenario.first.page_info.current_cursor,
			where_like: {
				text: "cursor-ytitne-read-%",
			},
		},
	);
	assert.match(result.errors[0].message, /cannot be combined/);
}

export default {
	step,
	description,
	run,
};
