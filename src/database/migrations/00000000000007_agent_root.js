/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__agent_root", function (table) {
			table.uuid("gauze__agent_root__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__agent_root__created_at").notNullable();
			table.date("gauze__agent_root__updated_at").notNullable();
			table.date("gauze__agent_root__deleted_at");

			table.index("gauze__agent_root__created_at");
			table.index("gauze__agent_root__updated_at");
			table.index("gauze__agent_root__deleted_at");
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__agent_root")]);
};

export { up, down };
