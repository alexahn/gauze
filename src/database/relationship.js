/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> }
	*/
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable('gauze__relationship', function (table) {
			table.increments('id').primary();
			table.date('created_at').notNullable();
			table.date('updated_at').notNullable();
			table.date('deleted_at');
			// change to uuid later
			table.bigint('from_id').notNullable();
			table.string('from').notNullable();
			// change to uuid later
			table.bigint('to_id').notNullable();
			table.string('to').notNullable();
			table.index('from_id');
			table.index('from');
			table.index('to_id');
			table.index('to');

			table.unique(['from', 'from_id', 'to', 'to_id'], {
				useConstraint: true
			})
		})
	]);
};

/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> }
	*/
const down = function (knex) {
	return Promise.all([
		knex.schema.dropTable('gauze__relationship')
	]);
};

export {
	up,
	down
}