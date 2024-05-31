/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__proxy", function (table) {
			table.uuid("gauze__proxy__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__proxy__created_at").notNullable();
			table.date("gauze__proxy__updated_at").notNullable();
			table.date("gauze__proxy__deleted_at");

			table.string("gauze__proxy__agent_type", 64).notNullable();
			table.uuid("gauze__proxy__agent_id").notNullable();
			table.uuid("gauze__proxy__root_id").notNullable();

			table.index("gauze__proxy__created_at");
			table.index("gauze__proxy__updated_at");
			table.index("gauze__proxy__deleted_at");
			table.index("gauze__proxy__agent_type");
			table.index("gauze__proxy__agent_id");
			table.index("gauze__proxy__root_id");

			// note: do not add root_id as a unique constraint
			table.unique(["gauze__proxy__agent_type", "gauze__proxy__agent_id"], {
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
	return Promise.all([knex.schema.dropTable("gauze__proxy")]);
};

export { up, down };
