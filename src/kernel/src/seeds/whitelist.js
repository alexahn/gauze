/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__whitelist").del();
	await knex("gauze__whitelist").insert([
		{
			gauze__whitelist__id: "00000000-0000-0000-0000-000000000001",
			gauze__whitelist__created_at: new Date(),
			gauze__whitelist__updated_at: new Date(),
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user",
			gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000001",
			gauze__whitelist__entity_type: "gauze__ytitne",
			gauze__whitelist__entity_id: null,
			gauze__whitelist__method: "create",
		},
		{
			gauze__whitelist__id: "00000000-0000-0000-0000-000000000002",
			gauze__whitelist__created_at: new Date(),
			gauze__whitelist__updated_at: new Date(),
			gauze__whitelist__realm: "system",
			gauze__whitelist__agent_role: "root",
			gauze__whitelist__agent_type: "gauze__user",
			gauze__whitelist__agent_id: "00000000-0000-0000-0000-000000000002",
			gauze__whitelist__entity_type: "gauze__ytitne",
			gauze__whitelist__entity_id: null,
			gauze__whitelist__method: "create",
		},
	]);
};

export { seed };
