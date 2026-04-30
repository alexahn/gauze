import { execute } from "./../../../helpers.js";

const step = 0;
const description = "Create ytitne rows for cursor navigation";

async function run(environment) {
	await execute(
		environment.database_manager,
		environment.transactions,
		`
			mutation CursorCreateYtitne(
				$a: Ytitne_Mutation__Attributes
				$b: Ytitne_Mutation__Attributes
				$c: Ytitne_Mutation__Attributes
			) {
				a: create_ytitne(attributes: $a) { attributes { id } }
				b: create_ytitne(attributes: $b) { attributes { id } }
				c: create_ytitne(attributes: $c) { attributes { id } }
			}
			`,
		"CursorCreateYtitne",
		{
			a: {
				id: "10000000-0000-4000-8000-000000000001",
				text: "cursor-ytitne-read-001",
			},
			b: {
				id: "10000000-0000-4000-8000-000000000002",
				text: "cursor-ytitne-read-002",
			},
			c: {
				id: "10000000-0000-4000-8000-000000000003",
				text: "cursor-ytitne-read-003",
			},
		},
	);
}

export default {
	step,
	description,
	run,
};
