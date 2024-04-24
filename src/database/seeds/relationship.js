/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> } 
	*/
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('gauze__relationship').del()
	await knex('gauze__relationship').insert([{
			gauze__relationship__id: 1,
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: 'gauze__entity1',
			gauze__relationship__from_id: '2',
			gauze__relationship__to_type: 'gauze__entity2',
			gauze__relationship__to_id: '2'
		},
		{
			gauze__relationship__id: 2,
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: 'gauze__entity2',
			gauze__relationship__from_id: '2',
			gauze__relationship__to_type: 'gauze__entity1',
			gauze__relationship__to_id: '2'
		},
		{
			gauze__relationship__id: 3,
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: 'gauze__entity1',
			gauze__relationship__from_id: '1',
			gauze__relationship__to_type: 'gauze__entity2',
			gauze__relationship__to_id: '1'
		},
		{
			gauze__relationship__id: 4,
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: 'gauze__entity2',
			gauze__relationship__from_id: '1',
			gauze__relationship__to_type: 'gauze__entity1',
			gauze__relationship__to_id: '1'
		},
		{
			gauze__relationship__id: 5,
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: 'gauze__entity1',
			gauze__relationship__from_id: '1',
			gauze__relationship__to_type: 'gauze__entity2',
			gauze__relationship__to_id: '2'
		},
		{
			gauze__relationship__id: 6,
			gauze__relationship__created_at: new Date(),
			gauze__relationship__updated_at: new Date(),
			gauze__relationship__from_type: 'gauze__entity1',
			gauze__relationship__from_id: '1',
			gauze__relationship__to_type: 'gauze__entity2',
			gauze__relationship__to_id: '3'
		}
	]);
};

export {
	seed
}