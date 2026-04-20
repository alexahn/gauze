# Authentication and Authorization

Gauze separates authentication from authorization.

- Authentication answers who the agent is.
- Authorization answers what that agent is allowed to do.

In practice, requests usually follow this flow:

1. The request reaches a realm-specific GraphQL endpoint.
2. Gauze reads the bearer token from the `Authorization` header.
3. Gauze authenticates the agent for that realm.
4. Gauze evaluates method-level and field-level authorization before returning data or applying changes.

## Authentication

Each realm has its own JWT secret:

- Set `GAUZE_DATABASE_JWT_SECRET` for the database realm.
- Set `GAUZE_SYSTEM_JWT_SECRET` for the system realm.
- Set `GAUZE_ENVIRONMENT_JWT_SECRET` for the environment realm.

Requests use the standard bearer token header:

```http
Authorization: Bearer <token>
```

The `environment` realm is the application-facing entry point. It is typically where an agent authenticates before interacting with other realms.

## Steps

In Gauze, a step is a named authentication checkpoint recorded in session data.

A step usually represents one completed proof or decision in the authentication flow, such as:

- Asserting which person is signing in.
- Verifying a password.
- Verifying an email code.
- Completing a realm-specific prerequisite.

The names live in project configuration under `steps`, `authentication.proxy`, `authentication.realms`, and `authentication.agents`.

In practice, a step has two parts:

1. A controller method that writes a success marker into `gauze__session__data`.
2. A configuration entry that says which later operations depend on that success marker.

For example, a controller might write `steps.account.verify.password.success` into the current session. Later, `environment.sign_in` or `realm.system.enter_session` can require that step before issuing a JWT.

This makes steps the bridge between GraphQL mutations and authorization decisions:

- The mutation performs the work.
- The controller records the successful step.
- The project configuration decides what that step unlocks.

If a step name appears in `${project_dir}/gauze.js` but no controller ever records it in session data, the requirement will never pass at runtime.

## Authorization

Authorization is driven primarily by your entity definitions.

At the method level, each entity defines:

- Define `name` for the method identifier.
- Define `privacy` for the authorization mode.
- Define `allowed_agent_types` for the set of eligible agent types.

At the field level, each field defines its own `allowed_agent_types`.

This means Gauze can allow access to a method while still hiding individual fields from agent types that should not see them.

## Privacy Modes

Entity methods support two privacy modes:

- Use `private` when authorization should be whitelist-oriented and access should start closed.
- Use `public` when authorization should be blacklist-oriented and access should start open.

Use `private` when write operations or sensitive reads should only be exposed through explicit authorization. Use `public` when records are broadly readable and the exceptions are narrow.

## Agent Type Gates

`allowed_agent_types` is a separate control from `privacy`.

- Method `allowed_agent_types` controls who can invoke `create`, `read`, `update`, `delete`, or `count`.
- Field `allowed_agent_types` controls which attributes remain visible once a method is already allowed.

This separation lets you expose a `read` method to one agent type while keeping specific fields restricted to another.

## Related Pages

- Read [Project Configuration](./project-configuration.md) for the `${project_dir}/gauze.js` authentication structure.
- Read [Create a Definition](./entity-definition.md) for details on how `privacy` and `allowed_agent_types` are declared in entity definitions.
- Read [HTTP & GraphQL](./runtime-and-graphql.md) for the request flow and realm endpoints.
