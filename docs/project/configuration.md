# Project Configuration

Gauze projects are configured through a small set of files that each control a different concern. New users often benefit from seeing those files together before diving into any one subsystem.

The most important idea is:

Project configuration is split by responsibility. `.env`, `gauze.js`, and database config files each answer a different question.

## The Core Configuration Files

In a generated project, these files matter first:

- Use `.env` for runtime environment variables.
- Use `gauze.js` for project-level authentication and realm-entry rules.
- Use `database/config.js` for mapping environment names to database topologies.

You do not need to learn every setting at once, but it helps to know which file owns which kind of decision.

## `.env`

`.env` is where you set runtime values such as:

- `GAUZE_ENV`.
- `GAUZE_SERVER_HOST`.
- `GAUZE_SERVER_PORT`.
- Realm JWT secrets.

For most new projects, `.env` answers the question: which environment am I running, and what server/auth settings should it use?

One especially important variable is:

```sh
GAUZE_ENV="development_monolithic"
```

That value affects which database configuration Gauze loads.

## `gauze.js`

`gauze.js` is the root project configuration file. It defines authentication sequencing and realm-entry requirements, including:

- `steps`.
- `authentication.proxy`.
- `authentication.realms`.
- `authentication.agents`.

This file is about application policy rather than raw process settings. It tells Gauze what must happen before an agent can sign in, enter a realm, or act as a specific agent type.

If `.env` tells Gauze how to run, `gauze.js` tells Gauze what the project's auth rules are.

### Sample `gauze.js`

One common use of `gauze.js` is configuring stricter rules for admin users. In Gauze, that usually means the `gauze__agent_root` agent type. The real file also carries top-level metadata such as `name` and `type`, plus per-environment `admins` arrays.

```js
export default {
	name: "my-app",
	type: "project",
	version: "0.0.1",
	development_monolithic: {
		admins: [
			{
				name: "Admin User",
				email: "admin@example.com",
				gauze__agent_root: null,
				gauze__agent_account: null,
				gauze__agent_user: "11111111-1111-1111-1111-111111111111",
				gauze__agent_person: null,
				gauze__agent_character: null,
			},
		],
	},
	staging: {
		admins: [],
	},
	production: {
		admins: [],
	},
	realms: {
		kernel: {
			mode: "closed",
		},
		database: {
			mode: "closed",
		},
		system: {
			mode: "closed",
		},
	},
	steps: {
		"steps.person.assert.email": [],
		"steps.person.verify.email": ["steps.person.assert.email.success"],
		"steps.account.verify.password": ["steps.person.verify.email.success"],
	},
	authentication: {
		proxy: [
			"steps.person.verify.email.success",
			"steps.account.verify.password.success",
		],
		realms: {
			kernel: [],
			database: [],
			system: ["steps.account.verify.password.success"],
		},
		agents: {
			gauze__agent_root: ["steps.account.verify.password.success"],
			gauze__agent_user: [],
		},
	},
};
```

In that example:

- `name` and `type` identify the config as a project-level Gauze application config.
- `development_monolithic`, `staging`, and `production` each define their own `admins` list.
- The `development_monolithic.admins` entry identifies an admin person and ties that environment-level admin record to one or more agent IDs.
- In this example, `gauze__agent_user` is set to a concrete identifier, which means that user is configured as an admin user in the `development_monolithic` environment.
- `realms` controls whether each realm is open or closed before the finer authentication rules are evaluated.
- All sign-ins must complete email verification and password verification before a proxy session is created.
- Entering the `system` realm requires a verified password.
- `gauze__agent_root` is treated as the admin user type, so admin sessions explicitly require the password-verification success step.
- `gauze__agent_user` has no additional agent-specific requirement beyond the proxy and realm rules.

The important distinction is that there are two related pieces here:

- The environment-level `admins` arrays define who the admin users are for a given environment.
- `authentication.agents` defines what extra authentication requirements apply when one of those users operates as a specific agent type such as `gauze__agent_root`.

In practice, `gauze__agent_root` is how Gauze represents the highest-privilege administrative agent.

### How `GAUZE_ENV` Selects Runtime Admins

The admin configuration is environment-specific. At runtime, Gauze reads `GAUZE_ENV` and uses that value to select the matching section of `gauze.js`.

So if your `.env` contains:

```sh
GAUZE_ENV="development_monolithic"
```

then Gauze reads admin users from:

```js
development_monolithic.admins
```

If `GAUZE_ENV` changes, the runtime admin list changes with it. That means admin users are not only project-defined, but environment-defined. A development environment can have seeded local admins, while staging and production can keep separate admin records or none at all until they are explicitly configured.

## `database/config.js`

`database/config.js` is the entrypoint for database environment selection. It exports a map from environment names to database configuration objects.

At runtime, Gauze reads `GAUZE_ENV` and uses that string as the lookup key. For example, if `GAUZE_ENV` is `development_monolithic`, Gauze selects the database configuration registered under that key.

That means the flow is:

1. `.env` defines `GAUZE_ENV`.
2. `database/config.js` maps that value to a concrete database config.
3. Gauze uses the selected config for migrations, seeds, reads, and writes.

## A Good Mental Model

For new users, this split is usually the clearest:

- `.env` chooses the runtime environment.
- `gauze.js` defines application auth behavior.
- `database/config.js` selects the database topology for that environment.

Those three files together explain most of the project's startup behavior.

## What to Change First

When setting up a fresh project, a practical order is:

1. Set `.env` so the application runs in `development_monolithic`.
2. Confirm the database config selected by `database/config.js`.
3. Review `gauze.js` only after the basic server and database boot flow is clear.

That keeps the early setup process concrete and prevents auth configuration from feeling like a blocker before the app is even running.

## Related Pages

- Read [Project Overview](./overview.md) for the bigger picture of the generated app structure.
- Read [Authentication Project Configuration](../authentication-and-authorization/project-configuration.md) for the deeper `gauze.js` auth walkthrough.
- Read [Database Configuration](../database/configuration.md) for the environment-to-database selection model.
