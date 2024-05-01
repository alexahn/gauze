/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__gauze").del();
	await knex("gauze__gauze").insert([
		{
			gauze__gauze__id: "00000000-0000-0000-0000-000000000001",
			gauze__gauze__created_at: new Date(),
			gauze__gauze__updated_at: new Date(),
			gauze__gauze__text1: "hello",
			gauze__gauze__text2: "goodbye",
		},
		{
			gauze__gauze__id: "00000000-0000-0000-0000-000000000002",
			gauze__gauze__created_at: new Date(),
			gauze__gauze__updated_at: new Date(),
			gauze__gauze__text1: "begin",
			gauze__gauze__text2: "end",
		},
		{
			gauze__gauze__id: "00000000-0000-0000-0000-000000000003",
			gauze__gauze__created_at: new Date(),
			gauze__gauze__updated_at: new Date(),
			gauze__gauze__text1: "start",
			gauze__gauze__text2: "finish",
		},
		{
			gauze__gauze__id: "00000000-0000-0000-0000-000000000004",
			gauze__gauze__created_at: new Date(),
			gauze__gauze__updated_at: new Date(),
			gauze__gauze__text1: "past",
			gauze__gauze__text2: "future",
		},
	]);
};

export { seed };
