/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__blacklist", function (table) {
			table.uuid("gauze__blacklist__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__blacklist__created_at").notNullable();
			table.date("gauze__blacklist__updated_at").notNullable();
			table.date("gauze__blacklist__deleted_at");

			table.string("gauze__blacklist__realm", 16).notNullable();
			table.string("gauze__blacklist__agent_role", 8).notNullable();
			table.string("gauze__blacklist__agent_type", 64).notNullable();
			table.uuid("gauze__blacklist__agent_id").notNullable();
			table.string("gauze__blacklist__entity_type", 64).notNullable();
			table.uuid("gauze__blacklist__entity_id");
			table.string("gauze__blacklist__method").notNullable();

			table.index("gauze__blacklist__realm");
			table.index("gauze__blacklist__agent_type");
			table.index("gauze__blacklist__agent_id");
			table.index("gauze__blacklist__entity_type");
			table.index("gauze__blacklist__entity_id");

			table.unique(
				[
					"gauze__blacklist__realm",
					"gauze__blacklist__agent_type",
					"gauze__blacklist__agent_id",
					"gauze__blacklist__entity_type",
					"gauze__blacklist__entity_id",
					"gauze__blacklist__method",
				],
				{
					useConstraint: true,
				},
			);
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__blacklist")]);
};

export { up, down };
