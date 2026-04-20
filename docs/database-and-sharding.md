# Database Setup

## Environment Configs

Database topology is defined per environment in your generated project, typically in files such as:

- Use `database/environment_development_monolithic_config.js` for the monolithic development database layout.
- Use `database/environment_development_sharded_config.js` for the sharded development database layout.
- Use `database/environment_test_monolithic_config.js` for the monolithic test database layout.
- Use `database/environment_test_sharded_config.js` for the sharded test database layout.

Gauze uses `GAUZE_ENV` to choose which database configuration to load at runtime. For example, `GAUZE_ENV="development_monolithic"` selects the monolithic development database config, while `GAUZE_ENV="development_sharded"` selects the sharded development database config.

Each table config must define three shard sequences:

- Use `previous` for shards that were used before the current layout and may still need to be consulted during a transition.
- Use `current` for shards that actively own the table's live key ranges.
- Use `next` for shards prepared for an upcoming resharding step.

Each shard entry must then define:

- Set `id` to a unique identifier for the shard definition.
- Set `start` to the inclusive lower bound of the shard's UUID range represented as BigInt values.
- Set `end` to the inclusive upper bound of the shard's UUID range represented as BigInt values.
- Use `read` for the database connection definitions that handle read operations against that shard.
- Use `write` for the database connection definitions that handle write operations against that shard.

Example monolithic SQLite configuration for one table:

```js
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG__ENVIRONMENT = {
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
};

export default CONFIG__ENVIRONMENT;
```

For a sharded setup, keep the same shape and add more entries to `current`, each with its own UUID range and database file or connection details.

## Monolithic vs Sharded

The shipped development defaults support both:

- Use `development_monolithic` for a single SQLite database file.
- Use `development_sharded` for four SQLite files arranged in a table-range layout.

Shards are keyed by UUID ranges represented as BigInt values, and the database manager routes reads and writes to the matching shard nodes.

## Migrations

Available commands:

```sh
npx gauze project ./my-app migrate make add_profile
npx gauze project ./my-app migrate run
npx gauze project ./my-app migrate current --format json
npx gauze project ./my-app migrate list --format json
npx gauze project ./my-app migrate up
npx gauze project ./my-app migrate down
npx gauze project ./my-app migrate rollback
npx gauze project ./my-app migrate unlock
```

Migration files live in `database/migrations/`.

## Seeds

Seed commands:

```sh
npx gauze project ./my-app seed make demo_users
npx gauze project ./my-app seed run
```

Seed files live in `database/seeds/`, split by environment such as `development/` and `test/`.

## Planning Shards

To inspect shard ranges before changing an environment config:

```sh
npx gauze project ./my-app shard plan 4 --order time --format json
```

Use `time` order for rollout planning and `key` order for contiguous range inspection.
