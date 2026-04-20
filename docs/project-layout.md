# Generated Project

## Generated App Structure

`npx gauze create project <dir>` produces an application root with these major areas:

- Use `command/` for CLI entrypoints such as `application`, `migrate`, `seed`, and entity management.
- Use `abstract/` for entity definitions that act as the source of truth.
- Use `structure/` for generated GraphQL and SQL structure modules derived from entities.
- Use `database/` for database models, controllers, GraphQL schema, migrations, and seeds.
- Use `system/` for system-layer models and GraphQL interfaces.
- Use `environment/` for application-facing models, JWT auth helpers, and GraphQL interfaces.
- Use `views/` for browser UIs and build scripts.

## What to Touch First

For a new application, the most common starting points are:

- Use the `.env` file for runtime configuration.
- Use `abstract/entities/` for your entity definitions.
- Use `database/migrations/` and `database/seeds/` for database setup.
- Use `views/` if you are changing the bundled UI.

## How the Layers Fit Together

An entity definition in `abstract/entities/*.js` drives the rest of the stack.

- `structure/` converts entity metadata into GraphQL and SQL constants.
- `database/` exposes direct GraphQL CRUD operations.
- `system/` composes system behavior on top of the database layer.
- `environment/` wraps operations for application use and session-aware auth.

## Generated GraphQL Operations

Generated database operations live under:

```text
database/interfaces/graphql/operations/<entity>/
```

Each entity gets `create.graphql`, `read.graphql`, `update.graphql`, `delete.graphql`, and `count.graphql`, plus an `index.js` export.

## Frontend Output

The server serves two built frontends:

- Serve `/gauze/v1/` from `views/gauze/v1/build/`.
- Serve `/project/` from `views/project/build/`.

Rebuild them with the application build/watch commands when you change UI code.
