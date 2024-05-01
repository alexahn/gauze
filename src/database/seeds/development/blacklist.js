/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__blacklist").del();
	await knex("gauze__blacklist").insert([
		{
			gauze__blacklist__id: "00000000-0000-0000-0000-000000000001",
			gauze__blacklist__created_at: new Date(),
			gauze__blacklist__updated_at: new Date(),
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: "gauze__user",
			gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000001",
			gauze__blacklist__entity_type: "gauze__ytitne",
			gauze__blacklist__entity_id: "00000000-0000-0000-0000-000000000001",
			gauze__blacklist__method: "read",
		},
		{
			gauze__blacklist__id: "00000000-0000-0000-0000-000000000002",
			gauze__blacklist__created_at: new Date(),
			gauze__blacklist__updated_at: new Date(),
			gauze__blacklist__realm: "system",
			gauze__blacklist__agent_role: "root",
			gauze__blacklist__agent_type: "gauze__user",
			gauze__blacklist__agent_id: "00000000-0000-0000-0000-000000000002",
			gauze__blacklist__entity_type: "gauze__ytitne",
			gauze__blacklist__entity_id: "00000000-0000-0000-0000-000000000002",
			gauze__blacklist__method: "read",
		},
	]);
};

export { seed };
