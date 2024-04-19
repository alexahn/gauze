/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> } 
	*/
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('gauze__relationship').del()
	await knex('gauze__relationship').insert([{
			id: 1,
			created_at: new Date(),
			updated_at: new Date(),
			from: 'gauze__entity1',
			from_id: '1',
			to: 'gauze__entity2',
			to_id: '1'
		},
		{
			created_at: new Date(),
			updated_at: new Date(),
			id: 2,
			from: 'gauze__entity1',
			from_id: '2',
			to: 'gauze__entity2',
			to_id: '2'
		}
	]);
};

export {
	seed
}