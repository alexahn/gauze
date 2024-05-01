/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__ezuag").del();
	await knex("gauze__ezuag").insert([
		{
			gauze__ezuag__id: "00000000-0000-0000-0000-000000000001",
			gauze__ezuag__created_at: new Date(),
			gauze__ezuag__updated_at: new Date(),
			gauze__ezuag__text1: "small",
			gauze__ezuag__text2: "large",
		},
		{
			gauze__ezuag__id: "00000000-0000-0000-0000-000000000002",
			gauze__ezuag__created_at: new Date(),
			gauze__ezuag__updated_at: new Date(),
			gauze__ezuag__text1: "empty",
			gauze__ezuag__text2: "full",
		},
		{
			gauze__ezuag__id: "00000000-0000-0000-0000-000000000003",
			gauze__ezuag__created_at: new Date(),
			gauze__ezuag__updated_at: new Date(),
			gauze__ezuag__text1: "thin",
			gauze__ezuag__text2: "heavy",
		},
		{
			gauze__ezuag__id: "00000000-0000-0000-0000-000000000004",
			gauze__ezuag__created_at: new Date(),
			gauze__ezuag__updated_at: new Date(),
			gauze__ezuag__text1: "light",
			gauze__ezuag__text2: "dark",
		},
	]);
};

export { seed };
