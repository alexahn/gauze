/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__ezuag", function (table) {
			table.uuid("gauze__ezuag__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__ezuag__created_at").notNullable();
			table.date("gauze__ezuag__updated_at").notNullable();
			table.date("gauze__ezuag__deleted_at");
			// fields
			table.string("gauze__ezuag__text1").notNullable();
			table.string("gauze__ezuag__text2").notNullable();
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__ezuag")]);
};

export { up, down };
