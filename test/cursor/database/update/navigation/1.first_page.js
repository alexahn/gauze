import assert from "node:assert/strict";

import { execute } from "./../../../helpers.js";

const step = 1;
const description = "Update the first ytitne cursor page";

async function run(environment, scenario) {
	const data = await execute(
		environment.database_manager,
		environment.transactions,
		`
			mutation CursorUpdateYtitne(
				$where_like: Ytitne_Mutation__Where
				$attributes: Ytitne_Mutation__Attributes
				$limit: Int
				$order: [Order]
			) {
				cursor_update_ytitne(where_like: $where_like, attributes: $attributes, limit: $limit, order: $order) {
					nodes { attributes { id text } }
					page_info { next_cursor }
				}
			}
			`,
		"CursorUpdateYtitne",
		{
			where_like: {
				text: "cursor-ytitne-update-%",
			},
			attributes: {
				text: "cursor-ytitne-updated",
			},
			limit: 2,
			order: [{ column: "text", order: "asc" }],
		},
	);
	scenario.first = data.cursor_update_ytitne;
	assert.equal(scenario.first.nodes.length, 2);
	assert.equal(typeof scenario.first.page_info.next_cursor, "string");
}

export default {
	step,
	description,
	run,
};
