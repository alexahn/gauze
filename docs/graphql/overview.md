# GraphQL Overview

Gauze exposes GraphQL through realm-specific schemas. Each realm has its own endpoint, authorization context, JWT audience, and generated operation surface.

- `/environment/graphql` handles authentication, environment sessions, proxy sessions, and realm entry.
- `/system/graphql` is the usual application-facing endpoint after a caller has entered the system realm.
- `/database/graphql` exposes lower-level generated entity operations directly.

## Start the HTTP Server

Run:

```sh
npx gauze project ./my-app application serve
```

The server is a Koa application with `koa-body`, CORS, compression, conditional requests, and ETags enabled. By default, the HTTP server listens on port `4000`.

## Endpoints

The top-level router mounts three realm GraphQL endpoints:

- Use `/environment/graphql` for the environment realm GraphQL endpoint.
- Use `/system/graphql` for the system realm GraphQL endpoint.
- Use `/database/graphql` for the database realm GraphQL endpoint.

The same HTTP server also serves static UI bundles at `/gauze/v1/` and `/project/`.

## Authentication

Each realm has its own JWT audience and secret:

- Set `GAUZE_ENVIRONMENT_JWT_SECRET` for the environment realm.
- Set `GAUZE_SYSTEM_JWT_SECRET` for the system realm.
- Set `GAUZE_DATABASE_JWT_SECRET` for the database realm.

Requests use `Authorization: Bearer <token>`. In open realms, public operations may proceed without a token; in closed realms, authentication is required.

## Request Behavior

GraphQL execution builds a request context, authenticates the agent, executes the operation, then:

- Commits transactions on success.
- Rolls back on GraphQL errors.
- Rolls back on unexpected runtime errors.

## Generated Schemas

Generated entity schemas follow a consistent shape across realms. Entity definitions produce standard operations such as `create_<entity>`, `read_<entity>`, `count_<entity>`, `update_<entity>`, and `delete_<entity>`, plus relationship traversal fields when relationships are registered.

The system realm usually delegates to the database realm while applying system-level authorization and behavior. The database realm exposes the lower-level CRUD-oriented operation set.

## What to Read Next

Read [Queries and Mutations](./queries-and-mutations.md) for the generated operation shapes, including reads, counts, creates, updates, deletes, and relationship traversal.

Read [Parameters](./parameters.md) for shared arguments such as `attributes`, filters, `limit`, `offset`, `order`, `count`, and `source`.
