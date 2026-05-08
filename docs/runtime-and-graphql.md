# HTTP & GraphQL

This page covers the HTTP server entry point and frontend bundle commands. The GraphQL endpoint, authentication, and request transaction details now live in [GraphQL Overview](./graphql/overview.md).

## Start the HTTP Server

Run:

```sh
npx gauze project ./my-app application serve
```

The server is a Koa application with `koa-body`, CORS, compression, conditional requests, and ETags enabled.
By default, the HTTP server listens on port `4000`.

## GraphQL Endpoints

Read [GraphQL Overview](./graphql/overview.md) for realm endpoints, bearer-token behavior, and request transaction behavior.

## Static UI Bundles

The HTTP server also serves the static UI bundle at `/gauze/`.

## Frontend Commands

Use:

```sh
npx gauze project ./my-app application build
npx gauze project ./my-app application watch
```

These commands rebuild the Gauze frontend for your application.
