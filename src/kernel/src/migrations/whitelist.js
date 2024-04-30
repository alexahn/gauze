/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__whitelist", function (table) {
			table.uuid("gauze__whitelist__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__whitelist__created_at").notNullable();
			table.date("gauze__whitelist__updated_at").notNullable();
			table.date("gauze__whitelist__deleted_at");

			table.string("gauze__whitelist__realm", 16).notNullable();
			table.string("gauze__whitelist__agent_role", 8).notNullable();
			table.string("gauze__whitelist__agent_type", 64).notNullable();
			table.uuid("gauze__whitelist__agent_id").notNullable();
			table.string("gauze__whitelist__entity_type", 64).notNullable();
			table.uuid("gauze__whitelist__entity_id");
			table.string("gauze__whitelist__method").notNullable();

			table.index("gauze__whitelist__realm");
			table.index("gauze__whitelist__agent_type");
			table.index("gauze__whitelist__agent_id");
			table.index("gauze__whitelist__entity_type");
			table.index("gauze__whitelist__entity_id");

			table.unique(
				[
					"gauze__whitelist__realm",
					"gauze__whitelist__agent_type",
					"gauze__whitelist__agent_id",
					"gauze__whitelist__entity_type",
					"gauze__whitelist__entity_id",
					"gauze__whitelist__method",
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
	return Promise.all([knex.schema.dropTable("gauze__whitelist")]);
};

export { up, down };
