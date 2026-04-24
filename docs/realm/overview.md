# Realm Overview

Realms are one of the core organizing ideas in Gauze. They are not just API route names. They are layered execution boundaries with their own GraphQL surfaces, JWT audiences, and responsibilities.

For a new user, the quickest way to understand realms is:

- `Environment` is the outer entry point.
- `System` is the main application realm.
- `Database` is the lower-level data realm.
- `Kernel` is the lowest-level internal realm.

Each realm exists so work can move through the system in a structured way instead of everything happening in one undifferentiated API layer.

## What a Realm Is

A realm is a self-contained API layer with:

- Its own GraphQL endpoint.
- Its own JWT audience.
- Its own authentication expectations.
- Its own position in the framework's layer hierarchy.

That means a request is not only asking for data. It is also entering a particular layer of the application.

## The Main Realms

In a typical Gauze project, the top-level GraphQL endpoints are:

- Use `/environment/graphql` for the environment realm.
- Use `/system/graphql` for the system realm.
- Use `/database/graphql` for the database realm.

The `environment` realm is where authentication and session entry begin. The `system` realm is usually the main application-facing realm after sign-in. The `database` realm exposes lower-level CRUD-oriented behavior. The `kernel` realm also exists conceptually and in configuration, even though most new users will spend more time with `environment`, `system`, and `database`.

## Realm Routers

Each realm should have its own `router.js` file that contains the routes for that realm.

In practice, that means files such as:

- `${project_dir}/environment/router.js` contains the environment realm routes.
- `${project_dir}/system/router.js` contains the system realm routes.
- `${project_dir}/database/router.js` contains the database realm routes.

Each of those routers gathers the realm's HTTP interface and gives the application a single place to mount that realm's routes. This is useful because the routing boundary matches the realm boundary. When you want to understand how a realm is exposed over HTTP, `router.js` is the first file to inspect.

## Why Gauze Uses Realms

Realms give the framework a way to separate concerns:

- Authentication entry belongs in `environment`.
- Application workflows usually belong in `system`.
- Direct data operations belong in `database`.

This separation makes the system easier to reason about as it grows. Instead of every operation sharing one auth model and one API boundary, Gauze can apply different rules at different layers.

## A Simple Example Flow

A normal flow looks like this:

1. Start in the `environment` realm.
2. Complete the required authentication steps.
3. Exchange that session for a proxy session.
4. Enter the `system` realm.
5. Use the returned realm JWT against `/system/graphql`.

That means realm entry is explicit. You do not authenticate once and automatically gain the same kind of access everywhere.

## Realms and JWTs

Each realm has its own JWT audience and secret. In practice, that means a token for one realm is not the same as a token for another realm.

For example:

- `Environment` JWTs are for the environment realm.
- `System` JWTs are for the system realm.
- `Database` JWTs are for the database realm.

This is one reason the realm model stays clear under pressure: tokens carry layer-specific meaning.

## What New Users Should Focus On

If you are new to Gauze, focus on these ideas first:

1. `environment` is the entry realm.
2. `system` is usually the realm you want after sign-in.
3. Realm entry is controlled, not automatic.
4. Different realms can require different authentication conditions.

Once that is clear, the lower-level details of controllers, JWT signing, and realm-specific GraphQL modules become much easier to follow.

## Related Pages

- Read [Configuration](./configuration.md) for how realms are configured through each realm's own `gauze.js` and the project-level auth config.
- Read [Environment Realm](../authentication-and-authorization/environment-realm.md) for the full environment-to-realm session flow.
- Read [GraphQL Overview](../graphql/overview.md) for the mounted endpoints and request behavior.
