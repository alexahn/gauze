# Environment Realm

The `environment` realm is the outermost authentication entry point in Gauze. It is responsible for:

- Creating the initial environment session.
- Recording authentication progress in session data.
- Returning a proxy session once the sign-in requirements are satisfied.
- Minting realm-specific JWTs, such as `system` or `database` JWTs, from that proxy session.

At a high level, the flow is:

1. Start with an environment session.
2. Complete the required authentication steps in the `environment` realm.
3. Call `mutation.environment.sign_in` to exchange the environment session for a proxy session.
4. Use the proxy session JWT to call `mutation.realm.system.enter_session` or another realm-specific `enter_session` mutation.
5. Use the returned realm JWT against `/system/graphql`, `/database/graphql`, or another target realm endpoint.

## Environment Session to System Session

The environment schema exposes three top-level mutation groups:

- `mutation.agent` for agent-specific authentication steps.
- `mutation.environment` for sign-in, sign-out, sign-up, and proxy-session lifecycle operations.
- `mutation.realm` for entering and exiting target realm sessions.

In a generated project, these mutations are exposed through `${project_dir}/environment/interfaces/graphql/schema.js` and the modules it imports.

### Step 1: Complete the Required Authentication Steps

The default project configuration requires these proxy authentication steps before `environment.sign_in` succeeds:

- `steps.person.assert.email.success`
- `steps.account.verify.password.success`

Those requirements are defined in `${project_dir}/gauze.js` under `authentication.proxy`.

The currently implemented example sequence is:

```graphql
mutation AssertEmail {
  agent {
    person {
      assert {
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
mutation VerifyPassword {
  agent {
    account {
      verify {
        password(
          agent_account: {
            gauze__agent_account__password: "correct horse battery staple"
          }
        ) {
          success
        }
      }
    }
  }
}
```

These mutations run against `/environment/graphql` while you are still using an environment session.

`person.request.email` and `person.verify.email` exist in the environment GraphQL surface, but they are currently placeholders rather than a completed email-code flow. The supported sign-in example today is the combination of `person.assert.email` and `account.verify.password`.

### Step 2: Exchange the Environment Session for a Proxy Session

Once the required steps are complete, call `environment.sign_in`:

```graphql
mutation SignIn {
  environment {
    sign_in {
      gauze__session__id
      gauze__session__realm
      gauze__session__agent_id
      gauze__session__agent_type
      gauze__session__value
    }
  }
}
```

The returned `gauze__session__value` is the proxy session JWT. Use it as the bearer token for subsequent `environment` realm requests that require a proxy session.

### Step 3: Mint a System JWT from the Proxy Session

With the proxy JWT in the `Authorization` header, call `realm.system.enter_session`:

```graphql
mutation EnterSystemSession {
  realm {
    system {
      enter_session(
        proxy: {
          gauze__proxy__agent_id: "60850dda-0340-49d1-a378-f7313ada2eee"
          gauze__proxy__agent_type: "gauze__agent_user"
        }
      ) {
        gauze__session__id
        gauze__session__realm
        gauze__session__agent_id
        gauze__session__agent_type
        gauze__session__value
      }
    }
  }
}
```

The returned `gauze__session__value` is the JWT for the `system` realm. Use that token in the `Authorization: Bearer <token>` header when sending requests to `/system/graphql`.

### Optional: Inspect Available Proxies Before Entering a Realm

If you need to inspect which target agents are available from the current proxy session, query `proxy` on `/environment/graphql`:

```graphql
query AvailableProxies {
  proxy {
    gauze__proxy__id
    gauze__proxy__agent_id
    gauze__proxy__agent_type
    gauze__proxy__root_id
    gauze__proxy__realms
  }
}
```

The realm entry helper checks that:

- The current session is a proxy session.
- The target proxy exists under the current proxy root.
- The target proxy allows the requested realm in `gauze__proxy__realms`.
- The project's configured authentication requirements for that realm and agent type are satisfied.

Those checks are part of the environment realm session-entry logic in `${project_dir}/environment/`.

## JWT Audience and Realm Mapping

Each realm-specific `enter_session` controller signs a JWT with the target realm audience. In a generated project, that logic lives under `${project_dir}/environment/controllers/realms/`. For example:

- `${project_dir}/environment/controllers/realms/system.js` signs a `system` JWT.
- `${project_dir}/environment/controllers/realms/database.js` signs a `database` JWT.
- `${project_dir}/environment/controllers/realms/kernel.js` signs a `kernel` JWT.

The signing functions live in `${project_dir}/environment/authentication.js`. The relevant audience values are:

- `environment`
- `system`
- `database`
- `kernel`

## Extending the Environment Realm

You can expand the authentication and authorization surface by defining new GraphQL methods in the environment realm.

### Add a New GraphQL Method

In a generated project, environment mutations are organized by concern:

- Add sign-in or sign-out style methods to `${project_dir}/environment/interfaces/graphql/mutations/environment.js`.
- Add target-realm session methods to `${project_dir}/environment/interfaces/graphql/mutations/realm.js` and the files under `${project_dir}/environment/interfaces/graphql/mutations/realms/`.
- Add agent-specific authentication steps to the files under `${project_dir}/environment/interfaces/graphql/mutations/agents/`.

For a new method, the usual flow is:

1. Define the GraphQL field in the appropriate mutation module.
2. Add any new input or output types in `${project_dir}/environment/types.js` if the method needs them.
3. Implement the controller method in the matching controller module under `${project_dir}/environment/controllers/`.
4. Call the controller from the GraphQL resolver.

For example, the existing `realm.system.enter_session` method is wired through:

- `${project_dir}/environment/interfaces/graphql/mutations/realms/system.js` for the GraphQL field
- `${project_dir}/environment/controllers/realms/system.js` for the controller
- `${project_dir}/environment/realms.js` for the shared realm-session logic

### Example Extension: Email Request and Code Verification

One good extension path is to turn the existing placeholder email flow into a fully implemented authentication path.

The GraphQL surface already has these mutation shapes:

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

Right now, those resolver paths lead to placeholder controller methods in `${project_dir}/environment/controllers/agent_person.js`. To make them real, you would usually:

1. Implement `request_email` so it creates or delivers a verification code and stores the pending challenge in session data.
2. Implement `verify_email` so it checks the submitted code and records a success step in session data.
3. Add any new step dependencies in `project.default.steps`.
4. Add the new success step to `authentication.proxy`, `authentication.realms.<realm>`, or `authentication.agents.<agent_type>` if it should gate later access.

This would make a good tutorial because it touches the full environment-realm stack:

1. GraphQL mutation fields.
2. Environment input and output types.
3. Controller logic.
4. Session data updates.
5. Project authentication configuration.

If you want, the next step can be a dedicated tutorial page that walks through implementing `person.request.email` and `person.verify.email` end to end.

### Expand Authentication Requirements

Adding a new mutation alone does not make it part of the authorization flow. If the new method should participate in sign-in or realm entry requirements, update the project authentication configuration as well.

The default structure lives in `${project_dir}/gauze.js`:

- `steps` defines dependency relationships between authentication steps.
- `authentication.proxy` defines which successful steps are required before `environment.sign_in` can create a proxy session.
- `authentication.realms.<realm>` defines which successful steps are required before entering a target realm session.
- `authentication.agents.<agent_type>` defines additional requirements for specific target agent types.

If you add a new step such as `steps.account.verify.totp.success`, you usually need to:

1. Record that step in the session data from your new controller method.
2. Add it to `steps` if it depends on earlier steps.
3. Add it to `authentication.proxy`, `authentication.realms.<realm>`, or `authentication.agents.<agent_type>` depending on where it should be enforced.

### Expand Realm Offerings

If you want the environment realm to mint JWTs for an additional realm, follow the existing `system`, `database`, and `kernel` pattern:

1. Add a signing function in `${project_dir}/environment/authentication.js`.
2. Add a controller under `${project_dir}/environment/controllers/realms/`.
3. Add a GraphQL mutation type under `${project_dir}/environment/interfaces/graphql/mutations/realms/`.
4. Register it in `${project_dir}/environment/interfaces/graphql/mutations/realm.js`.
5. Add the realm configuration to `${project_dir}/gauze.js` under `realms` and `authentication.realms`.

## Related Pages

- Read [Authentication and Authorization](./overview.md) for the broader model.
- Read [HTTP & GraphQL](../runtime-and-graphql.md) for endpoint and bearer-token behavior.
