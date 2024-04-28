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
			gauze__ezuag__text1: "ez 1",
			gauze__ezuag__text2: "af 1",
		},
		{
			gauze__ezuag__id: "00000000-0000-0000-0000-000000000002",
			gauze__ezuag__created_at: new Date(),
			gauze__ezuag__updated_at: new Date(),
			gauze__ezuag__text1: "ez 2",
			gauze__ezuag__text2: "af 2",
		},
		{
			gauze__ezuag__id: "00000000-0000-0000-0000-000000000003",
			gauze__ezuag__created_at: new Date(),
			gauze__ezuag__updated_at: new Date(),
			gauze__ezuag__text1: "ez 3",
			gauze__ezuag__text2: "af 3",
		},
		{
			gauze__ezuag__id: "00000000-0000-0000-0000-000000000004",
			gauze__ezuag__created_at: new Date(),
			gauze__ezuag__updated_at: new Date(),
			gauze__ezuag__text1: "ez 4",
			gauze__ezuag__text2: "gg 4",
		},
	]);
};

export { seed };
