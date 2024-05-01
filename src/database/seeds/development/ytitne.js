/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__ytitne").del();
	await knex("gauze__ytitne").insert([
		{
			id: "00000000-0000-0000-0000-000000000001",
			created_at: new Date(),
			updated_at: new Date(),
			text: "x hello",
		},
		{
			id: "00000000-0000-0000-0000-000000000002",
			created_at: new Date(),
			updated_at: new Date(),
			text: "x goodbye",
		},
		{
			id: "00000000-0000-0000-0000-000000000003",
			created_at: new Date(),
			updated_at: new Date(),
			text: "x enter",
		},
		{
			id: "00000000-0000-0000-0000-000000000004",
			created_at: new Date(),
			updated_at: new Date(),
			text: "x exit",
		},
	]);
};

export { seed };
