/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__agent_character", function (table) {
			table.uuid("gauze__agent_character__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__agent_character__created_at").notNullable();
			table.date("gauze__agent_character__updated_at").notNullable();
			table.date("gauze__agent_character__deleted_at");
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__agent_character")]);
};

export { up, down };
