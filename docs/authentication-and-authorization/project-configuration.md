# Project Configuration

Gauze projects have a root-level `gauze.js` configuration file. `${project_dir}/gauze.js` defines how authentication steps, proxy sign-in, and realm-entry requirements work in your application.

The most relevant sections are:

- `steps`
- `authentication.proxy`
- `authentication.realms`
- `authentication.agents`

## `steps`

The `steps` object defines dependency relationships between authentication steps.

Each key is a step name, and each value is an array of prerequisite success-step names that must already exist in session data before that step is allowed to complete.

For example:

```js
steps: {
	"steps.person.assert.email": [],
	"steps.person.request.email": ["steps.person.assert.email.success"],
	"steps.person.verify.email": ["steps.person.request.email.success"],
	"steps.account.verify.password": ["steps.person.verify.email.success"],
},
```

This means:

- `steps.person.assert.email` has no prerequisite steps.
- `steps.person.request.email` can run only after `steps.person.assert.email.success` has already been recorded.
- `steps.person.verify.email` can run only after `steps.person.request.email.success` has already been recorded.
- `steps.account.verify.password` can run only after `steps.person.verify.email.success` has already been recorded.

The convention is:

- The base step name, such as `steps.person.verify.email`, identifies the operation being performed.
- The `.success` variant, such as `steps.person.verify.email.success`, identifies the success marker written into session data after the operation completes.

Nested arrays are also supported. The requirement checker alternates between `and` and `or` logic by depth:

- The top-level array uses `and` logic.
- Arrays nested one level deeper use `or` logic.
- Arrays nested another level deeper switch back to `and` logic.

For example:

```js
steps: {
	"steps.account.verify.password": [
		"steps.person.assert.email.success",
		[
			"steps.person.verify.email.success",
			"steps.person.verify.phone.success",
		],
	],
},
```

This means `steps.account.verify.password` requires:

- `steps.person.assert.email.success`
- And either `steps.person.verify.email.success` or `steps.person.verify.phone.success`

At runtime, the leaf success values are not only checked for presence. They are also checked against the current asserted identity in session data, so a recorded success marker must match the active assertion to count as satisfied.

## `authentication.proxy`

`authentication.proxy` defines which successful steps are required before `environment.sign_in` can create a proxy session.

Example:

```js
authentication: {
	proxy: [
		"steps.person.verify.email.success",
		"steps.account.verify.password.success",
	],
},
```

In this example, sign-in will not succeed until both success markers have been written into the current session.

## `authentication.realms`

`authentication.realms` defines extra successful steps required before the environment realm can mint a JWT for a target realm.

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

In this example, entering the `system` realm requires `steps.account.verify.password.success`, even if the proxy session already exists.

## `authentication.agents`

`authentication.agents` defines additional successful steps required for specific target agent types.

Example:

```js
authentication: {
	agents: {
		gauze__agent_root: ["steps.account.verify.password.success"],
		gauze__agent_user: [],
	},
},
```

This lets the same realm require stricter authentication for one agent type than for another.

## How the Pieces Work Together

In practice, the flow is:

1. A GraphQL mutation runs, such as `agent.account.verify.password`.
2. Its controller validates that the prerequisites listed in `steps[step_name]` are already satisfied.
3. On success, the controller writes a success marker such as `steps.account.verify.password.success` into `gauze__session__data`.
4. Later, `authentication.proxy`, `authentication.realms`, or `authentication.agents` checks for that success marker before allowing sign-in or realm entry.

That means `steps` controls sequencing, while the `authentication.*` sections control what the completed sequence unlocks.

## Related Pages

- Read [Authentication and Authorization](./overview.md) for the broader model.
- Read [Environment Realm](./environment-realm.md) for the environment-to-realm JWT flow.
- Read [Email Code Tutorial](./email-code-tutorial.md) for a concrete example of updating `steps` and `authentication.proxy`.
