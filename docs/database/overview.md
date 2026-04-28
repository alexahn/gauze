# Database Overview

Gauze treats the database as part of the application structure, not as a separate concern you wire up later. A generated project already knows where database configuration lives, how migrations and seeds are organized, and how requests should be routed when you move from one database to many.

For a new user, the main idea is simple:

- Start with one database.
- Describe that database in an environment config.
- Run migrations and seeds through the Gauze CLI.
- Move to sharding only when your project actually needs it.

## The Mental Model

Gauze does not hard-code one global database connection. Instead, each environment chooses a database topology.

That means:

- Development can use a single SQLite file.
- Test can use its own isolated database layout.
- A future production environment can use a different client, different hosts, and a sharded layout.

In practice, Gauze loads a database config based on `GAUZE_ENV`. If `GAUZE_ENV="development_monolithic"`, Gauze uses the monolithic development config. If `GAUZE_ENV="development_sharded"`, it uses the sharded development config instead.

This is one of the more important ideas in the framework: environment selection determines database behavior.

## Start Monolithic

Most projects should begin with a monolithic layout. In Gauze, that usually means one SQLite database file that backs the application during development.

This gives you a few immediate advantages:

- Setup stays simple.
- Migrations are easy to reason about.
- Local development is fast.
- You can focus on entities, GraphQL behavior, and authentication before you think about shard routing.

The framework is designed so that starting small does not trap you. The same database configuration shape can later describe multiple shards instead of one.

## Where Database Work Lives

In a generated project, the database layer is organized in a predictable way:

- `database/` contains database configuration, migrations, and seeds.
- `database/migrations/` contains migration files.
- `database/seeds/` contains seed files, usually split by environment.
- Environment-specific config files describe which databases exist and which UUID ranges they own.

If you are learning the project layout, the database folder is where you should look when you want to answer questions such as:

- Which database am I using right now?
- Where do migration files go?
- Where do seed files go?
- Is this environment monolithic or sharded?

## What the CLI Does for You

The Gauze CLI is the normal way to work with the database. Instead of dropping straight into a raw database tool, you usually use project commands such as:

```sh
npx gauze project ./my-app migrate run
npx gauze project ./my-app seed run
```

These commands use the current environment configuration to find the right database connections, migration directory, and seed directory.

That means the database workflow is not separate from the framework. It is part of the same project model.

## When Sharding Enters the Picture

Sharding in Gauze is based on UUID ranges represented as `BigInt` values. Each shard owns a range, and the database manager routes reads and writes to the shard that covers the relevant key range.

You do not need to understand all of that on day one. The practical progression is:

1. Learn the monolithic development setup.
2. Learn how environment configs describe databases.
3. Learn how Gauze represents shard ranges.
4. Introduce multiple current shards when your application actually needs them.

This is why Gauze can feel approachable for new projects but still structured for larger systems.

## Recommended Path for New Users

If you are just getting started, use this order:

1. Read [Quick Start](../getting-started.md).
2. Read [Configuration](./configuration.md) to understand how Gauze chooses database layouts.
3. Read [Ordering](./ordering.md) to understand stable row order before relying on pagination.
4. Read [Sharding](./sharding.md) only after the monolithic flow feels clear.

## Related Pages

- Read [Configuration](./configuration.md) for the shape of the environment config files and how `GAUZE_ENV` selects them.
- Read [Ordering](./ordering.md) for order inputs, null handling, and sharded result merge ordering.
- Read [Sharding](./sharding.md) for shard ranges, `previous/current/next`, and the shard planning command.
- Read [Database Setup](../database-and-sharding.md) for the original reference page covering migrations, seeds, and example config.
