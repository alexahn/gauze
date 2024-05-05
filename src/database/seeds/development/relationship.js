/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("gauze__relationship").del();
	await knex("gauze__relationship").insert([
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000001",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000001",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000002",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000002",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000003",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000003",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000004",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000004",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000005",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000002",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000001",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000006",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000002",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000002",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000007",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000002",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000003",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000008",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__entity",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000002",
			gauze__relationship__to_type: "gauze__entity",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000004",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-000000000009",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__ytitne",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
			gauze__relationship__to_type: "gauze__ytitne",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000001",
		},
		{
			gauze__relationship__id: "00000000-0000-0000-0000-0000000000010",
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: "gauze__ytitne",
			gauze__relationship__from_id: "00000000-0000-0000-0000-000000000001",
			gauze__relationship__to_type: "gauze__ytitne",
			gauze__relationship__to_id: "00000000-0000-0000-0000-000000000002",
		},
	]);
};

export { seed };
