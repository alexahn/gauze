/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__agent_person", function (table) {
			table.uuid("gauze__agent_person__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__agent_person__created_at").notNullable();
			table.date("gauze__agent_person__updated_at").notNullable();
			table.date("gauze__agent_person__deleted_at");

			table.string("gauze__agent_person__email", 512).notNullable();

			table.unique(["gauze__agent_person__email"], {
				useConstraint: true,
			});
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__agent_person")]);
};

export { up, down };
