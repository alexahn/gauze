/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__agent_account", function (table) {
			table.uuid("gauze__agent_acount__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__agent_account__created_at").notNullable();
			table.date("gauze__agent_acount__updated_at").notNullable();
			table.date("gauze__agent_acount__deleted_at");
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
