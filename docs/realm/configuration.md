# Realm Configuration

Realm configuration in Gauze lives primarily in each realm's own `gauze.js` file. In practice, that means files such as `${project_dir}/database/gauze.js`, `${project_dir}/system/gauze.js`, and `${project_dir}/environment/gauze.js`.

For a new user, the main point is:

Each realm declares its own identity and mode locally, and the project-level auth config then controls how entry into that realm is gated.

## The Two Main Configuration Areas

Realm behavior is usually split across two places:

- The realm-local `gauze.js`.
- The project-level `authentication.realms`.

These sections are related, but they do different jobs.

## Realm-Local `gauze.js`

Each realm typically has its own `gauze.js` file that defines the realm directly.

Example:

```js
export default {
	name: "system",
	type: "realm",
	mode: "closed",
};
```

This file is the primary configuration for the realm itself. It answers questions such as:

- What is this realm called?
- Is this config describing a realm?
- Is the realm open or closed?

When a realm is `closed`, authentication is required before it can be used in the normal way. When it is `open`, public access rules can be more permissive.

## `authentication.realms`

The root project `gauze.js` still matters, because `authentication.realms` defines the successful authentication steps required before the environment realm can mint a session for a specific target realm.

Example:

```js
authentication: {
	realms: {
		kernel: [],
		database: [],
		system: ["steps.account.verify.password.success"],
	},
},
```

In that example, the `system` realm has an extra requirement: the password verification step must already be complete before `environment` can mint a `system` JWT.

This means:

- The realm-local `gauze.js` defines the realm itself.
- `authentication.realms` defines realm-entry requirements inside the auth flow.

## How This Fits the Session Flow

The realm-entry sequence is usually:

1. authenticate in `environment`
2. create a proxy session
3. request entry into a target realm
4. have Gauze check the configured requirements for that realm
5. receive a realm-specific JWT if the checks pass

So realm configuration does not sit in isolation. It is part of the transition from one session type to another.

## Realm Configuration and Agent Type Configuration

Realm checks are only one part of the decision. Gauze can also apply agent-type-specific requirements through `authentication.agents`.

That means a request to enter `system` may be constrained by:

- Whether the realm is closed.
- The requirements in `authentication.realms.system`.
- The requirements for the chosen target agent type.

This layering is intentional. Realm access and agent access are related, but not identical.

## A Practical Reading Strategy

When reading a project's realm config, check it in this order:

1. Inspect the realm's own `gauze.js` to see its `name`, `type`, and `mode`.
2. Inspect `authentication.realms` in the project root config to see per-realm entry requirements.
3. Inspect `authentication.agents` to see whether some agent types face stricter rules.

That order makes it easier to separate broad realm policy from more specific access policy.

## Related Pages

- Read [Realm Overview](./overview.md) for the high-level purpose of realms.
- Read [Authentication Project Configuration](../authentication-and-authorization/project-configuration.md) for the deeper walkthrough of `authentication.realms` and `authentication.agents`.
- Read [Environment Realm](../authentication-and-authorization/environment-realm.md) for the actual realm-entry flow.
