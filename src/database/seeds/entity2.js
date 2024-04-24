/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__entity2").del();
	await knex("gauze__entity2").insert([
		{
			id: "00000000-0000-0000-0000-000000000001",
			created_at: new Date(),
			updated_at: new Date(),
			text: "begin",
		},
		{
			id: "00000000-0000-0000-0000-000000000002",
			created_at: new Date(),
			updated_at: new Date(),
			text: "end",
		},
		{
			id: "00000000-0000-0000-0000-000000000003",
			created_at: new Date(),
			updated_at: new Date(),
			text: "new",
		},
		{
			id: "00000000-0000-0000-0000-000000000004",
			created_at: new Date(),
			updated_at: new Date(),
			text: "old",
		},
	]);
};

export { seed };
