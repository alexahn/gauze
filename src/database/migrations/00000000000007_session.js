/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__session", function (table) {
			table.uuid("gauze__session__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__session__created_at").notNullable();
			table.date("gauze__session__updated_at").notNullable();
			table.date("gauze__session__deleted_at");

			table.string("gauze__session__realm", 16).notNullable();
			table.string("gauze__session__agent_type", 64);
			table.uuid("gauze__session__agent_id");
			table.string("gauze__session__value", 512).notNullable();
			table.string("gauze__session__kind", 16).notNullable();
			table.string("gauze__session__seed", 256).notNullable();
			table.string("gauze__session__data", 512).notNullable();

			table.index("gauze__session__realm");
			table.index("gauze__session__agent_type");
			table.index("gauze__session__agent_id");

			table.unique(["gauze__session__realm", "gauze__session__agent_type", "gauze__session__agent_id", "gauze__session__value"], {
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
	return Promise.all([knex.schema.dropTable("gauze__session")]);
};

export { up, down };
