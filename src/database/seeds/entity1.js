/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> } 
	*/
const seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('gauze__entity1').del()
	await knex('gauze__entity1').insert([{
			id: 1,
			created_at: new Date(),
			updated_at: new Date(),
			text: 'hello'
		},
		{
			id: 2,
			created_at: new Date(),
			updated_at: new Date(),
			text: 'goodbye'
		},
		{
			id: 3,
			created_at: new Date(),
			updated_at: new Date(),
			text: 'enter'
		},
		{
			id: 4,
			created_at: new Date(),
			updated_at: new Date(),
			text: 'exit'
		}
	]);
};

export {
	seed
}