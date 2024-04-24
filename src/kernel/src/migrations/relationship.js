/**
	* @param { import("knex").Knex } knex
	* @returns { Promise<void> }
	*/
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable('gauze__relationship', function (table) {
			table.increments('gauze__relationship__id').primary();
			table.date('gauze__relationship__created_at').notNullable();
			table.date('gauze__relationship__updated_at').notNullable();
			table.date('gauze__relationship__deleted_at');
			// change to uuid later
			table.bigint('gauze__relationship__from_id').notNullable();
			table.string('gauze__relationship__from_type').notNullable();
			// change to uuid later
			table.bigint('gauze__relationship__to_id').notNullable();
			table.string('gauze__relationship__to_type').notNullable();
			table.index('gauze__relationship__from_id');
			table.index('gauze__relationship__from_type');
			table.index('gauze__relationship__to_id');
			table.index('gauze__relationship__to_type');

			table.unique([
				'gauze__relationship__from_type',
				'gauze__relationship__from_id',
				'gauze__relationship__to_type',
				'gauze__relationship__to_id'
			], {
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