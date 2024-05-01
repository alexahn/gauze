/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__entity").del();
	await knex("gauze__entity").insert([
		{
			id: "00000000-0000-0000-0000-000000000001",
			created_at: new Date(),
			updated_at: new Date(),
			text: "hello",
		},
		{
			id: "00000000-0000-0000-0000-000000000002",
			created_at: new Date(),
			updated_at: new Date(),
			text: "goodbye",
		},
		{
			id: "00000000-0000-0000-0000-000000000003",
			created_at: new Date(),
			updated_at: new Date(),
			text: "enter",
		},
		{
			id: "00000000-0000-0000-0000-000000000004",
			created_at: new Date(),
			updated_at: new Date(),
			text: "exit",
		},
	]);
};

export { seed };
