import { execute } from "./../../../helpers.js";

const step = 0;
const description = "Create ytitne rows for cursor update navigation";

async function run(environment) {
	await execute(
		environment.database_manager,
		environment.transactions,
		`
			mutation CursorCreateUpdateYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
		"CursorCreateUpdateYtitne",
		{
			a: {
				id: "10000000-0000-4000-8000-000000000011",
				text: "cursor-ytitne-update-001",
			},
			b: {
				id: "10000000-0000-4000-8000-000000000012",
				text: "cursor-ytitne-update-002",
			},
			c: {
				id: "10000000-0000-4000-8000-000000000013",
				text: "cursor-ytitne-update-003",
			},
		},
	);
}

export default {
	step,
	description,
	run,
};
