/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> }
	*/
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable('gauze__entity1', function (table) {
			table.increments('id').primary();
			table.date('created_at').notNullable();
			table.date('updated_at').notNullable();
			table.date('deleted_at');
			// the number of requests this program has made
			table.string('text')

			//table.index('reset', 'github_api__reset');
			//table.unique('reset'); // easy way to make sure we atomically add 
		})
	]);
};

/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> }
	*/
const down = function (knex) {
	return Promise.all([
		knex.schema.dropTable('gauze__entity1')
	]);
};

export {
	up,
	down
}