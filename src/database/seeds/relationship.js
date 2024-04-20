/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> } 
	*/
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('gauze__relationship').del()
	await knex('gauze__relationship').insert([{
			_id: 1,
			_created_at: new Date(),
			_updated_at: new Date(),
			_from_type: 'gauze__entity1',
			_from_id: '2',
			_to_type: 'gauze__entity2',
			_to_id: '2'
		},
		{
			_id: 2,
			_created_at: new Date(),
			_updated_at: new Date(),
			_from_type: 'gauze__entity2',
			_from_id: '2',
			_to_type: 'gauze__entity1',
			_to_id: '2'
		},
		{
			_id: 3,
			_created_at: new Date(),
			_updated_at: new Date(),
			_from_type: 'gauze__entity1',
			_from_id: '1',
			_to_type: 'gauze__entity2',
			_to_id: '1'
		},
		{
			_id: 4,
			_created_at: new Date(),
			_updated_at: new Date(),
			_from_type: 'gauze__entity2',
			_from_id: '1',
			_to_type: 'gauze__entity1',
			_to_id: '1'
		},
		{
			_id: 5,
			_created_at: new Date(),
			_updated_at: new Date(),
			_from_type: 'gauze__entity1',
			_from_id: '1',
			_to_type: 'gauze__entity2',
			_to_id: '2'
		},
		{
			_id: 6,
			_created_at: new Date(),
			_updated_at: new Date(),
			_from_type: 'gauze__entity1',
			_from_id: '1',
			_to_type: 'gauze__entity2',
			_to_id: '3'
		}
	]);
};

export {
	seed
}