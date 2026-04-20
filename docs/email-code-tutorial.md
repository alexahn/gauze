# Email Code Tutorial

This tutorial walks through one concrete extension to the `environment` realm: turning the existing placeholder email-code flow into a working authentication path.

The goal is to make these mutations actually work:

```graphql
mutation RequestEmailCode {
  agent {
    person {
      request {
        email(
          agent_person: {
            gauze__agent_person__email: "user@example.com"
          }
        ) {
          success
        }
      }
    }
  }
}
```

```graphql
mutation VerifyEmailCode {
  agent {
    person {
      verify {
        email(
          code: {
            code: "123456"
          }
        ) {
          success
        }
      }
    }
  }
}
```

Today, the GraphQL fields already exist, but the controller methods behind them are placeholders. This tutorial shows how to implement them and then update `${project_dir}/gauze.js` so the new step participates in sign-in.

## What a Step Is

In this tutorial, a step is the named success marker that a controller writes into `gauze__session__data` after an authentication checkpoint passes.

For example:

- `steps.person.request.email.success`
- `steps.person.verify.email.success`
- `steps.account.verify.password.success`

Those names are not just labels. Gauze uses them in two places:

1. Controller code writes them into the current session data.
2. Project configuration in `${project_dir}/gauze.js` requires them before later actions such as `environment.sign_in`.

That is why implementing the controller logic and updating `${project_dir}/gauze.js` are both required parts of the tutorial. If you only do one side, the flow remains incomplete.

## What You Will Change

You will touch four parts of the stack:

1. The environment GraphQL surface, which already exposes `agent.person.request.email` and `agent.person.verify.email`.
2. The environment controller, where the real email-code logic will live.
3. The session data model, which will store the pending code and the successful verification step.
4. The project authentication configuration in `${project_dir}/gauze.js`, which decides whether the step is required for sign-in or realm entry.

For reference:

- The GraphQL fields already exist in `${project_dir}/environment/interfaces/graphql/mutations/agents/person.js`.
- The placeholder controller methods live in `${project_dir}/environment/controllers/agent_person.js`.
- The default project authentication configuration lives in `${project_dir}/gauze.js`.

## Step 1: Keep the Existing GraphQL Mutation Shape

You do not need to add new GraphQL fields unless you want a different API shape. The existing mutation definitions already expose:

- `agent.person.request.email`
- `agent.person.verify.email`

That means the first code changes happen in the controller, not the schema.

## Step 2: Implement `request_email`

Open `${project_dir}/environment/controllers/agent_person.js` and replace the placeholder `request_email` method with real logic.

At a minimum, `request_email` should:

1. Require an environment session.
2. Require `agent_person.gauze__agent_person__email`.
3. Load the current session row from `gauze__session`.
4. Generate a short verification code.
5. Store that code in `gauze__session__data`.
6. Return `{ success: true }`.

One practical pattern is to store the code under a dedicated key such as `steps.person.request.email.code`.

Example implementation shape:

```js
request_email(context, scope, parameters) {
	const { agent } = context;

	function request_email() {
		if (!parameters.agent_person) {
			throw new Error("Field 'agent_person' is required");
		}
		if (!parameters.agent_person.gauze__agent_person__email) {
			throw new Error("Field 'agent_person.gauze__agent_person__email' is required");
		}

		const code = String(Math.floor(100000 + Math.random() * 900000));
		const session_where = {
			gauze__session__id: agent.session_id,
		};

		return MODEL__SESSION__MODEL__ENVIRONMENT.read(context, scope, { where: session_where })
			.then(function (sessions) {
				if (!sessions || !sessions.length) {
					throw new Error("Session could not be found");
				}
				return sessions[0];
			})
			.then(function (session) {
				const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
				let updated_data = MODEL__SESSION__MODEL__ENVIRONMENT.set_data_field(
					parsed_data,
					"steps.person.request.email.code",
					code,
				);
				updated_data = MODEL__SESSION__MODEL__ENVIRONMENT.set_data_field(
					updated_data,
					"steps.person.request.email.address",
					parameters.agent_person.gauze__agent_person__email,
				);

				const attributes = {
					...session,
					gauze__session__data: JSON.stringify(updated_data),
				};

				return MODEL__SESSION__MODEL__ENVIRONMENT.update(context, scope, {
					where: session_where,
					attributes,
				});
			})
			.then(function () {
				// Replace this with real email delivery.
				return {
					success: true,
				};
			});
	}

	if (!agent) {
		throw new Error("Session is required for request email step");
	}
	if (agent.agent_type != null) {
		throw new Error("Environment session is required for request email step");
	}

	return request_email();
}
```

This example only stores the code. In a real implementation, this is also where you would send the email.

## Step 3: Implement `verify_email`

Next, replace the placeholder `verify_email` method in `${project_dir}/environment/controllers/agent_person.js`.

At a minimum, `verify_email` should:

1. Require an environment session.
2. Require `code.code`.
3. Read the current session data.
4. Compare the submitted code to the stored code.
5. Mark the verification step as successful when the codes match.
6. Return `{ success: true }` on success.

The key design choice is which success step to record. If you want this step to replace the current `assert_email` requirement, record something like `steps.person.verify.email.success`.

Example implementation shape:

```js
verify_email(context, scope, parameters) {
	const { agent } = context;

	function verify_email() {
		if (!parameters.code) {
			throw new Error("Field 'code' is required");
		}
		if (!parameters.code.code) {
			throw new Error("Field 'code.code' is required");
		}

		const session_where = {
			gauze__session__id: agent.session_id,
		};

		return MODEL__SESSION__MODEL__ENVIRONMENT.read(context, scope, { where: session_where })
			.then(function (sessions) {
				if (!sessions || !sessions.length) {
					throw new Error("Session could not be found");
				}
				return sessions[0];
			})
			.then(function (session) {
				const parsed_data = MODEL__SESSION__MODEL__ENVIRONMENT.parse_data(session.gauze__session__data);
				const expected_code = MODEL__SESSION__MODEL__ENVIRONMENT.get_data_field(
					parsed_data,
					"steps.person.request.email.code",
				);

				if (!expected_code) {
					throw new Error("No email code has been requested");
				}
				if (expected_code !== parameters.code.code) {
					throw new Error("Invalid email code");
				}

				let updated_data = MODEL__SESSION__MODEL__ENVIRONMENT.set_data_field(
					parsed_data,
					"steps.person.verify.email.success",
					true,
				);
				updated_data = MODEL__SESSION__MODEL__ENVIRONMENT.set_data_field(
					updated_data,
					"steps.person.request.email.code",
					null,
				);

				return MODEL__SESSION__MODEL__ENVIRONMENT.update(context, scope, {
					where: session_where,
					attributes: {
						...session,
						gauze__session__data: JSON.stringify(updated_data),
					},
				});
			})
			.then(function () {
				return {
					success: true,
				};
			});
	}

	if (!agent) {
		throw new Error("Session is required for verify email step");
	}
	if (agent.agent_type != null) {
		throw new Error("Environment session is required for verify email step");
	}

	return verify_email();
}
```

If you want the success marker to include the asserted person or proxy identifier instead of `true`, store that value instead. Gauze already uses that pattern for other steps.

## Step 4: Decide Whether to Keep `assert_email`

At this point, you have two options:

1. Keep `assert_email` as a separate identity-selection step and make the email code flow an additional proof step.
2. Replace `assert_email` with the new email-code flow entirely.

If you keep `assert_email`, the resulting sign-in path might be:

1. `agent.person.assert.email`
2. `agent.person.request.email`
3. `agent.person.verify.email`
4. `agent.account.verify.password`
5. `environment.sign_in`

If you replace `assert_email`, then `verify_email` must also establish the asserted identity in session data. In practice, that means it would need to:

1. Look up the `agent_person` by email.
2. Resolve the matching proxy.
3. Store the assertion value in `session.gauze__session__data`.
4. Record the success step.

That is the more complete email-code flow, but it requires more than simple code checking.

## Step 5: Update `${project_dir}/gauze.js`

Once the controller logic exists, update the project authentication configuration in `${project_dir}/gauze.js`.

The default config currently includes:

```js
steps: {
	"steps.account.verify.password": ["steps.person.assert.email.success"],
	"steps.person.assert.email": [],
},
authentication: {
	proxy: ["steps.person.assert.email.success", "steps.account.verify.password.success"],
	realms: {
		kernel: [],
		database: [],
		system: [],
	},
	agents: {
		gauze__agent_root: [],
		gauze__agent_account: [],
		gauze__agent_user: [],
		gauze__agent_person: [],
		gauze__agent_character: [],
	},
},
```

### Option A: Require the New Email Code Flow in Addition to `assert_email`

If you want the new flow to be additive, update it like this:

```js
steps: {
	"steps.person.assert.email": [],
	"steps.person.request.email": ["steps.person.assert.email.success"],
	"steps.person.verify.email": ["steps.person.request.email.success"],
	"steps.account.verify.password": ["steps.person.verify.email.success"],
},
authentication: {
	proxy: [
		"steps.person.assert.email.success",
		"steps.person.verify.email.success",
		"steps.account.verify.password.success",
	],
	realms: {
		kernel: [],
		database: [],
		system: [],
	},
	agents: {
		gauze__agent_root: [],
		gauze__agent_account: [],
		gauze__agent_user: [],
		gauze__agent_person: [],
		gauze__agent_character: [],
	},
},
```

This keeps the existing assertion step and adds the email-code verification as another required checkpoint.

### Option B: Replace `assert_email`

If you want the email-code flow to become the identity step, change the requirements so the rest of the flow depends on `steps.person.verify.email.success` instead:

```js
steps: {
	"steps.person.request.email": [],
	"steps.person.verify.email": ["steps.person.request.email.success"],
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
		system: [],
	},
	agents: {
		gauze__agent_root: [],
		gauze__agent_account: [],
		gauze__agent_user: [],
		gauze__agent_person: [],
		gauze__agent_character: [],
	},
},
```

If you choose this option, make sure `verify_email` records enough session data for later password verification to know which agent is being verified.

## Step 6: Make the Step Dependencies Real

The step arrays in `${project_dir}/gauze.js` are only meaningful if your controller methods record the corresponding success values in session data.

For the new email-code flow, that usually means:

- `request_email` should write `steps.person.request.email.success`
- `verify_email` should write `steps.person.verify.email.success`

If you forget to write those values into `gauze__session__data`, the configuration in `${project_dir}/gauze.js` will look correct, but the runtime checks will never pass.

## Step 7: Test the Flow

Once the code is in place, test the sequence through `/environment/graphql`:

1. Start with an environment session.
2. Call `agent.person.request.email`.
3. Confirm the code is stored or delivered.
4. Call `agent.person.verify.email`.
5. Call `agent.account.verify.password`.
6. Call `environment.sign_in`.
7. Call `realm.system.enter_session`.

The sign-in call should fail until every required success step is present in `gauze__session__data`.

## Practical Notes

- Start with storing the code in session data before integrating real email delivery.
- Clear or invalidate the code after successful verification.
- Add expiration metadata if the code should time out.
- Consider rate limiting repeated `request_email` attempts.
- Consider storing the asserted proxy or person identifier when verification succeeds, especially if you want to replace `assert_email`.

## Related Pages

- Read [Environment Realm](./environment-realm.md) for the broader environment-to-realm JWT flow.
- Read [Authentication and Authorization](./authentication-and-authorization.md) for the overall model.
