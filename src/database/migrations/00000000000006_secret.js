/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__secret", function (table) {
			table.uuid("gauze__secret__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__secret__created_at").notNullable();
			table.date("gauze__secret__updated_at").notNullable();
			table.date("gauze__secret__deleted_at");

			table.string("gauze__secret__realm", 16).notNullable();
			table.string("gauze__secret__agent_type", 64).notNullable();
			table.uuid("gauze__secret__agent_id").notNullable();
			table.string("gauze__secret__value", 512).notNullable();
			table.string("gauze__secret__kind", 16).notNullable();
			table.string("gauze__secret__name", 32).notNullable();

			table.index("gauze__secret__realm");
			table.index("gauze__secret__agent_type");
			table.index("gauze__secret__agent_id");

			table.unique(["gauze__secret__realm", "gauze__secret__agent_type", "gauze__secret__agent_id", "gauze__secret__value"], {
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
	return Promise.all([knex.schema.dropTable("gauze__secret")]);
};

export { up, down };
