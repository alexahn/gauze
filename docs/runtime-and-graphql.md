# HTTP & GraphQL

## Start the HTTP Server

Run:

```sh
npx gauze project ./my-app application serve
```

The server is a Koa application with `koa-body`, CORS, compression, conditional requests, and ETags enabled.

## Endpoints

The top-level router mounts three realm routers:

- Use `/database/graphql` for the database realm GraphQL endpoint.
- Use `/system/graphql` for the system realm GraphQL endpoint.
- Use `/environment/graphql` for the environment realm GraphQL endpoint.

It also serves static UI bundles at `/gauze/v1/` and `/project/`.

## Authentication

Each realm has its own JWT audience and secret:

- Set `GAUZE_DATABASE_JWT_SECRET` for the database realm.
- Set `GAUZE_SYSTEM_JWT_SECRET` for the system realm.
- Set `GAUZE_ENVIRONMENT_JWT_SECRET` for the environment realm.

Requests use `Authorization: Bearer <token>`. In open realms, public operations may proceed without a token; in closed realms, auth is required.

## Request Behavior

GraphQL execution builds a request context, authenticates the agent, executes the operation, then:

- Commit transactions on success.
- Roll back on GraphQL errors.
- Roll back on unexpected runtime errors.

## Frontend Commands

Use:

```sh
npx gauze project ./my-app application build
npx gauze project ./my-app application watch
```

These commands rebuild the Gauze and project frontends for your application.
