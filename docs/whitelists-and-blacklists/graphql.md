# Whitelists and Blacklists GraphQL

Whitelist and blacklist rows expose generated GraphQL operations in the system and database realms:

- `create_whitelist`, `read_whitelist`, `count_whitelist`, `update_whitelist`, and `delete_whitelist`
- `create_blacklist`, `read_blacklist`, `count_blacklist`, `update_blacklist`, and `delete_blacklist`

Application code normally uses the system realm so Gauze can enforce access-row hierarchy before delegating to the database realm.

## Creating Whitelist Rows

Create a whitelist row to grant an agent access to a private method on a specific entity row:

```graphql
mutation CreateWhitelist($attributes: Whitelist_Mutation__Attributes) {
	create_whitelist(attributes: $attributes) {
		attributes {
			gauze__whitelist__id
			gauze__whitelist__realm
			gauze__whitelist__agent_role
			gauze__whitelist__agent_type
			gauze__whitelist__agent_id
			gauze__whitelist__entity_type
			gauze__whitelist__entity_id
			gauze__whitelist__method
		}
	}
}
```

Example variables:

```json
{
	"attributes": {
		"gauze__whitelist__realm": "system",
		"gauze__whitelist__agent_role": "leaf",
		"gauze__whitelist__agent_type": "gauze__agent_user",
		"gauze__whitelist__agent_id": "00000000-0000-0000-0000-000000000002",
		"gauze__whitelist__entity_type": "gauze__entity",
		"gauze__whitelist__entity_id": "00000000-0000-0000-0000-000000000101",
		"gauze__whitelist__method": "read"
	}
}
```

## Creating Blacklist Rows

Create a blacklist row to block an agent from a public method on a specific entity row:

```graphql
mutation CreateBlacklist($attributes: Blacklist_Mutation__Attributes) {
	create_blacklist(attributes: $attributes) {
		attributes {
			gauze__blacklist__id
			gauze__blacklist__realm
			gauze__blacklist__agent_role
			gauze__blacklist__agent_type
			gauze__blacklist__agent_id
			gauze__blacklist__entity_type
			gauze__blacklist__entity_id
			gauze__blacklist__method
		}
	}
}
```

Example variables:

```json
{
	"attributes": {
		"gauze__blacklist__realm": "system",
		"gauze__blacklist__agent_role": "leaf",
		"gauze__blacklist__agent_type": "gauze__agent_user",
		"gauze__blacklist__agent_id": "00000000-0000-0000-0000-000000000002",
		"gauze__blacklist__entity_type": "gauze__entity",
		"gauze__blacklist__entity_id": "00000000-0000-0000-0000-000000000101",
		"gauze__blacklist__method": "read"
	}
}
```

For both create operations, the access row uses entity table names for `agent_type` and `entity_type`. In the system realm, the initiating agent must already have sufficient access on the same target entity row and method to create the requested role.

## Reading Access Rows

Read access rows by access id, by the current agent, or by target entity row and method.

```graphql
query ReadWhitelist($where: Whitelist_Query__Where) {
	read_whitelist(where: $where) {
		attributes {
			gauze__whitelist__id
			gauze__whitelist__agent_role
			gauze__whitelist__agent_type
			gauze__whitelist__agent_id
			gauze__whitelist__entity_type
			gauze__whitelist__entity_id
			gauze__whitelist__method
		}
	}
}
```

Example variables for target-row access records:

```json
{
	"where": {
		"gauze__whitelist__entity_type": "gauze__entity",
		"gauze__whitelist__entity_id": "00000000-0000-0000-0000-000000000101",
		"gauze__whitelist__method": "read"
	}
}
```

Use the matching `Blacklist_Query__Where` and `read_blacklist` operation for blacklist rows.

## Deleting Access Rows

Delete access rows by id:

```graphql
mutation DeleteWhitelist($where: Whitelist_Mutation__Where) {
	delete_whitelist(where: $where) {
		attributes {
			gauze__whitelist__id
			gauze__whitelist__agent_type
			gauze__whitelist__agent_id
			gauze__whitelist__entity_type
			gauze__whitelist__entity_id
			gauze__whitelist__method
		}
	}
}
```

Example variables:

```json
{
	"where": {
		"gauze__whitelist__id": "00000000-0000-0000-0000-000000000201"
	}
}
```

The system access model prereads the row by id, checks the initiator's authority for the row's target entity and method, and then fills in the routing fields needed for the lower-level delete. Use `delete_blacklist` with `Blacklist_Mutation__Where` for blacklist rows.

## Related Parameters

Access operations use the same generated parameter families as other entities, including `where`, `where_in`, `where_like`, `where_between`, `limit`, `offset`, and `order` where the method supports them.

Read [GraphQL Parameters](../graphql/parameters.md) for the shared parameter model.
