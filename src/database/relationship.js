/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> }
	*/
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable('gauze__relationship', function (table) {
			table.increments('_id').primary();
			table.date('_created_at').notNullable();
			table.date('_updated_at').notNullable();
			table.date('_deleted_at');
			// change to uuid later
			table.bigint('_from_id').notNullable();
			table.string('_from_type').notNullable();
			// change to uuid later
			table.bigint('_to_id').notNullable();
			table.string('_to_type').notNullable();
			table.index('_from_id');
			table.index('_from_type');
			table.index('_to_id');
			table.index('_to_type');

			table.unique(['_from_type', '_from_id', '_to_type', '_to_id'], {
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