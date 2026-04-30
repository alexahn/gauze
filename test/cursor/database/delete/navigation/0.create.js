import { execute } from "./../../../helpers.js";

const step = 0;
const description = "Create ezuag rows for cursor delete navigation";

async function run(environment) {
	await execute(
		environment.database_manager,
		environment.transactions,
		`
			mutation CursorCreateEzuag(
				$a: Ezuag_Mutation__Attributes
				$b: Ezuag_Mutation__Attributes
				$c: Ezuag_Mutation__Attributes
			) {
				a: create_ezuag(attributes: $a) { attributes { gauze__ezuag__id } }
				b: create_ezuag(attributes: $b) { attributes { gauze__ezuag__id } }
				c: create_ezuag(attributes: $c) { attributes { gauze__ezuag__id } }
			}
			`,
		"CursorCreateEzuag",
		{
			a: {
				gauze__ezuag__id: "10000000-0000-4000-8000-000000000021",
				gauze__ezuag__text1: "cursor-ezuag-delete-001",
				gauze__ezuag__text2: "keep",
			},
			b: {
				gauze__ezuag__id: "10000000-0000-4000-8000-000000000022",
				gauze__ezuag__text1: "cursor-ezuag-delete-002",
				gauze__ezuag__text2: "keep",
			},
			c: {
				gauze__ezuag__id: "10000000-0000-4000-8000-000000000023",
				gauze__ezuag__text1: "cursor-ezuag-delete-003",
				gauze__ezuag__text2: "keep",
			},
		},
	);
}

export default {
	step,
	description,
	run,
};
