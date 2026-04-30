# Whitelists and Blacklists Overview

Whitelists and blacklists are Gauze's row-level method access records. Entity definitions decide whether each method starts open or closed, and access rows provide the per-agent exceptions.

## Privacy Modes

Each entity method has a `privacy` value:

- `private` starts closed and uses whitelist rows to allow access.
- `public` starts open and uses blacklist rows to deny access.

This means a private `read` method requires a matching whitelist row before an agent can read the target row. A public `read` method is allowed by default unless a matching blacklist row blocks that agent.

## Access Row Shape

Whitelist rows live in `gauze__whitelist`. Blacklist rows live in `gauze__blacklist`.

Both tables use the same logical fields:

- `realm`: The realm where the access decision applies. The system access model currently validates `system`.
- `agent_role`: The authority level for the access row: `root`, `trunk`, or `leaf`.
- `agent_type`: The agent entity table name, such as `gauze__agent_user`.
- `agent_id`: The specific agent row id.
- `entity_type`: The protected entity table name, such as `gauze__entity`.
- `entity_id`: The protected entity row id.
- `method`: The protected method: `create`, `read`, `update`, `delete`, or `count`.

The `agent_type` and `entity_type` values are table names, not GraphQL metadata types.

## Roles

Access rows use a simple hierarchy:

- `root` is the highest authority for a target entity row and method.
- `trunk` can manage other `trunk` and `leaf` rows.
- `leaf` is the narrowest role and is mainly for using the granted method rather than delegating it.

For blacklist rows, only the `leaf` role is used to actually block an agent from a public method. `root` and `trunk` blacklist rows can exist as access-management records, but the runtime blacklist check looks for a matching `leaf` row when deciding whether to deny the public method.

When an agent creates, updates, deletes, reads, or counts access rows through the system realm, Gauze checks the initiator's existing access record for the same target entity row and method. That check enforces the role hierarchy before the access operation proceeds.

## Whitelist vs Blacklist

Use a whitelist row when the target method is private and the default should be "deny." The row says a specific agent can use a specific method on a specific entity row.

Use a blacklist row when the target method is public and the default should be "allow." The row says a specific agent is blocked from using a specific method on a specific entity row.

## Related Pages

Read [Whitelists and Blacklists GraphQL](./graphql.md) for create, read, and delete examples.

Read [Authentication and Authorization](../authentication-and-authorization/overview.md) for how privacy modes fit into the broader request flow.
