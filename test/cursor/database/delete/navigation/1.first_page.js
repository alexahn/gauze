import assert from "node:assert/strict";

import { execute, text_values } from "./../../../helpers.js";

const step = 1;
const description = "Delete the first ezuag cursor page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			mutation CursorDeleteEzuag(
				$where_like: Ezuag_Mutation__Where
				$limit: Int
				$order: [Order]
			) {
				cursor_delete_ezuag(where_like: $where_like, limit: $limit, order: $order) {
					nodes { attributes { gauze__ezuag__id gauze__ezuag__text1 } }
					page_info { has_next_page next_cursor }
				}
			}
			`,
		"CursorDeleteEzuag",
		{
			where_like: {
				gauze__ezuag__text1: "cursor-ezuag-delete-%",
			},
			limit: 2,
			order: [{ column: "gauze__ezuag__text1", order: "asc" }],
		},
	);
	scenario.first = data.cursor_delete_ezuag;
	assert.deepEqual(text_values(scenario.first, "gauze__ezuag__text1"), ["cursor-ezuag-delete-001", "cursor-ezuag-delete-002"]);
	assert.equal(scenario.first.page_info.has_next_page, true);
}

export default {
	step,
	description,
	run,
};
