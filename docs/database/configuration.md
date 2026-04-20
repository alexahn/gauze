# Database Configuration

Database configuration in Gauze is environment-driven. Instead of one universal connection string, each environment provides a database topology that the framework loads at runtime.

For a new user, the key point is:

`GAUZE_ENV` selects the database config, and the selected config tells Gauze where data lives.

## How Environment Selection Works

Gauze uses `GAUZE_ENV` to choose a database configuration file. Typical examples include:

- `development_monolithic`
- `development_sharded`
- `test_monolithic`
- `test_sharded`

Those environment names usually map to files such as:

- `database/environment_development_monolithic_config.js`
- `database/environment_development_sharded_config.js`
- `database/environment_test_monolithic_config.js`
- `database/environment_test_sharded_config.js`

In practice, the file that ties this together is `database/config.js`. That file exports a map whose keys are environment names and whose values are the imported environment config objects. The runtime selection step is simply: read `GAUZE_ENV`, use that string as the lookup key, and return the matching database configuration.

So if your `.env` sets:

```sh
GAUZE_ENV="development_monolithic"
```

Gauze loads the monolithic development database layout by using `"development_monolithic"` as the key into the map exported by `database/config.js`.

## What a Config Describes

Each config file describes database ownership table by table. A table entry contains three arrays:

- `previous`
- `current`
- `next`

These are not arbitrary names. They describe rollout state:

- `current` contains the shard definitions that own live traffic now.
- `previous` contains old shards that may still need to be consulted during a transition.
- `next` contains the shard layout you are preparing to move into.

For a monolithic setup, `current` usually contains one shard definition and the other arrays are empty.

## What a Shard Definition Contains

Every shard definition includes:

- `id` for a unique shard identifier
- `start` for the inclusive lower UUID bound
- `end` for the inclusive upper UUID bound
- `read` for read connection definitions
- `write` for write connection definitions

Each `read` or `write` entry then contains a concrete database client config. In development, that often means a SQLite file configured through Knex and `better-sqlite3`.

## What New Users Should Look For First

When you open a Gauze database config for the first time, focus on these three questions:

1. Which environment file is active?
2. How many `current` shard entries are there?
3. Which database file or host does each read/write connection point to?

If you can answer those, you already understand the most important part of the configuration.

## Example Reading Strategy

When looking at a monolithic config:

- Confirm that `current` has one entry.
- Confirm that `start` and `end` cover the full UUID range.
- Confirm that both `read` and `write` point to the same development database file.
- Confirm that migrations and seeds point at the expected directories.

That tells you you are in the simplest possible setup.

## Migrations and Seeds Belong to the Config

In Gauze, migration and seed directories are part of the database config, not an unrelated toolchain detail. That matters because the selected environment determines:

- Which database receives the migration
- Which migration directory is used
- Which seed directory is used

Typical commands are:

```sh
npx gauze project ./my-app migrate run
npx gauze project ./my-app seed run
```

Those commands make sense only because the environment config already defines the database topology they should act on.

## Configuration Advice for New Projects

Use these defaults unless you have a concrete reason not to:

- Use `development_monolithic` for local development.
- Use separate test configs for tests.
- Keep `previous` and `next` empty until you are actively planning a shard transition.
- Keep read and write pointed at the same database during early development.

This keeps the database model understandable while still matching the structure Gauze expects later.

## Common Beginner Mistakes

- Changing `GAUZE_ENV` without realizing it switches the entire database layout.
- Editing migrations while pointing at the wrong environment.
- Assuming sharding is required from the beginning.
- Treating `previous/current/next` as permanent categories instead of rollout states.

## Related Pages

- Read [Overview](./overview.md) for the bigger picture of how the database layer fits into Gauze.
- Read [Sharding](./sharding.md) for what `previous/current/next` mean during resharding.
- Read [Project Configuration](../project-configuration.md) for root-level project auth configuration, which is separate from database topology.
