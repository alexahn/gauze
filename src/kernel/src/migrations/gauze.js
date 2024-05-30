/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {
	return Promise.all([
		knex.schema.createTable("gauze__gauze", function (table) {
			table.uuid("gauze__gauze__id", { useBinaryUuid: true, primaryKey: true }).primary().defaultTo(knex.fn.uuid());
			table.date("gauze__gauze__created_at").notNullable();
			table.date("gauze__gauze__updated_at").notNullable();
			table.date("gauze__gauze__deleted_at");
			// fields
			table.string("gauze__gauze__text1").notNullable();
			table.string("gauze__gauze__text2").notNullable();

			table.index("gauze__gauze__created_at");
			table.index("gauze__gauze__updated_at");
			table.index("gauze__gauze__deleted_at");
		}),
	]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
	return Promise.all([knex.schema.dropTable("gauze__gauze")]);
};

export { up, down };
