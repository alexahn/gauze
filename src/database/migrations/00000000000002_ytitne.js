/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__ytitne", function (table) {
			table.uuid("id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("created_at").notNullable();
			table.date("updated_at").notNullable();
			table.date("deleted_at");

			table.string("text");
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__ytitne")]);
};

export { up, down };
