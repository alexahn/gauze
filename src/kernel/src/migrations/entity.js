/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__entity", function (table) {
			table.uuid("id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("created_at").notNullable();
			table.date("updated_at").notNullable();
			table.date("deleted_at");

			table.string("text");

			table.index("created_at");
			table.index("updated_at");
			table.index("deleted_at");
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__entity")]);
};

export { up, down };
