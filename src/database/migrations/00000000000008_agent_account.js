/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__agent_account", function (table) {
			table.uuid("gauze__agent_account__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__agent_account__created_at").notNullable();
			table.date("gauze__agent_account__updated_at").notNullable();
			table.date("gauze__agent_account__deleted_at");

			table.string("gauze__agent_account__password", 2);

			table.index("gauze__agent_account__created_at");
			table.index("gauze__agent_account__updated_at");
			table.index("gauze__agent_account__deleted_at");
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__agent_account")]);
};

export { up, down };
