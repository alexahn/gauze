/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> } 
	*/
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('gauze__entity2').del()
	await knex('gauze__entity2').insert([{
			id: 1,
			created_at: new Date(),
			updated_at: new Date(),
			text: 'begin'
		},
		{
			id: 2,
			created_at: new Date(),
			updated_at: new Date(),
			text: 'end'
		},
	]);
};

export {
	seed
}