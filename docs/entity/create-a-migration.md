# Create a Migration

After writing an entity definition, create a migration so the database schema matches the entity before you generate project code.

Run:

```sh
npx gauze project ${project_dir} migrate make create_article
```

This creates a new migration file in `${project_dir}/database/migrations/`.

## What the Migration Should Do

The migration should create the table named by the entity `table_name` and add columns that match the entity field definitions.

For example:

```js
export async function up(knex) {
	await knex.schema.createTable("app__article", function (table) {
		table.uuid("app__article__id").primary();
		table.string("app__article__title").notNullable();
		table.text("app__article__internal_notes");
		table.timestamp("app__article__created_at");
		table.timestamp("app__article__updated_at");
		table.timestamp("app__article__deleted_at");
	});
}

export async function down(knex) {
	await knex.schema.dropTable("app__article");
}
```

## Keep the Migration Aligned with the Definition

- Make sure `table_name` matches the table you create.
- Make sure field `name` values match the column names you create.
- Make sure field `sql_type` values map to the Knex column types you use.

## Add the Table to the Database Config

Before you run `migrate run`, add the new table to each relevant database environment config.

Gauze uses the database config to find the shard definition and the migration directory for the table, so the table entry must exist before the migration runner can apply the migration.

Typical files include:

- `database/environment_development_monolithic_config.js`
- `database/environment_development_sharded_config.js`
- `database/environment_test_monolithic_config.js`
- `database/environment_test_sharded_config.js`

Each config needs a table entry keyed by the entity `table_name`. For a monolithic setup, that usually looks like:

```js
app__article: {
	previous: [],
	current: [
		{
			id: "development_monolithic.app__article.shard.1",
			start: 0n,
			end: 340282366920938463463374607431768211455n,
			read: [
				{
					id: "development_monolithic.app__article.shard.1.read.1",
					transaction_isolation_level: "serializable",
					config: {
						client: "better-sqlite3",
						connection: {
							filename: path.join(__dirname, "../../", "development_monolithic.sqlite3"),
						},
						migrations: {
							tableName: "knex_migrations",
							directory: path.join(__dirname, "migrations"),
						},
						seeds: {
							directory: path.join(__dirname, "seeds", "development"),
						},
					},
				},
			],
			write: [
				{
					id: "development_monolithic.app__article.shard.1.write.1",
					transaction_isolation_level: "serializable",
					config: {
						client: "better-sqlite3",
						connection: {
							filename: path.join(__dirname, "../../", "development_monolithic.sqlite3"),
						},
						migrations: {
							tableName: "knex_migrations",
							directory: path.join(__dirname, "migrations"),
						},
						seeds: {
							directory: path.join(__dirname, "seeds", "development"),
						},
					},
				},
			],
		},
	],
	next: [],
},
```

For a sharded setup, keep the same structure but add the shard ranges and database connections for that table.

## Run the Migration

Once the migration file is ready, run:

```sh
npx gauze project ${project_dir} migrate run
```

This applies the migration to the database configured for the current `GAUZE_ENV`.

## Related Pages

- Read [Create a Definition](./definition.md) to define the entity first.
- Read [Generate Project Code](./generate-project-code.md) to generate the project modules from that definition.
- Read [Database Setup](../database-and-sharding.md) for environment configuration and sharding details.
