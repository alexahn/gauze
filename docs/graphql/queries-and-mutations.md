# Queries and Mutations

Gauze exposes GraphQL through realm-specific schemas. The most common application-facing endpoint is the system realm, while the database realm exposes the lower-level generated entity operations.

- Use `/system/graphql` for normal application reads and writes.
- Use `/database/graphql` when you need the lower-level database realm directly.
- Use `/environment/graphql` for authentication, session, and realm-entry flows.

Read [GraphQL Overview](./overview.md) for endpoint setup, bearer tokens, and request transaction behavior.

## Generated Entity Operations

Each entity definition can expose five standard operations:

- `create_<entity>`
- `read_<entity>`
- `count_<entity>`
- `update_<entity>`
- `delete_<entity>`

For example, the built-in `entity` model exposes operations such as `read_entity`, `count_entity`, and `update_entity`. A project entity named `article` would expose operations such as `create_article` and `read_article` after its generated code is registered in the relevant schema.

## Shared Filters

With the exception of `create_<entity>`, generated entity operations are filter-driven. `read_<entity>`, `count_<entity>`, `update_<entity>`, and `delete_<entity>` all accept the same core filter family:

- `where` matches exact field values:

```json
{
	"where": {
		"id": "00000000-0000-0000-0000-000000000001",
		"text": "hello"
	}
}
```

- `where_in` matches any value in a list:

```json
{
	"where_in": {
		"id": ["00000000-0000-0000-0000-000000000001", "00000000-0000-0000-0000-000000000002"]
	}
}
```

- `where_not_in` excludes any value in a list:

```json
{
	"where_not_in": {
		"id": ["00000000-0000-0000-0000-000000000003", "00000000-0000-0000-0000-000000000004"]
	}
}
```

- `where_like` matches SQL-style patterns:

```json
{
	"where_like": {
		"text": "hel%"
	}
}
```

- `where_between` matches inclusive ranges. Use `null` for an open range side:

```json
{
	"where_between": {
		"created_at": ["2026-01-01T00:00:00.000Z", "2026-02-01T00:00:00.000Z"],
		"id": ["00000000-0000-0000-0000-000000000001", null]
	}
}
```

In the database realm, the lower-level operations also expose cache-backed variants such as `cache_where_in` and `cache_where_not_in`. Those are mainly used by framework internals and system-realm delegation.

`read_<entity>`, `update_<entity>`, and `delete_<entity>` also accept `limit`, `offset`, and `order`. `count_<entity>` accepts the same core filters and can accept `order` for ordered composite `where_between` ranges, but it does not page or sort aggregate count results.

`order` is a list of `Order` inputs. Items are applied in list order, so later entries act as tie-breakers for earlier entries:

```json
{
	"order": [
		{
			"column": "created_at",
			"order": "desc",
			"nulls": "last"
		},
		{
			"column": "id",
			"order": "asc"
		}
	]
}
```

Each order item supports:

- `column`: The indexed field to sort by.
- `order`: Optional `asc` or `desc`; if omitted, Gauze uses the entity's default order direction.
- `nulls`: Optional `first` or `last`.

If `order` is omitted, Gauze uses the entity's `default_order` and `default_order_direction`, falling back to the primary key and ascending order when needed. When `where_between` includes fields that match a prefix of `order`, Gauze interprets that prefix as an ordered composite range.

## Read

Use `read_<entity>` to fetch entity rows. Reads accept the shared filters plus `limit`, `offset`, and `order`.

```graphql
query ReadEntity($where: Entity_Query__Where, $limit: Int, $order: [Order]) {
	read_entity(where: $where, limit: $limit, order: $order) {
		_metadata {
			id
			type
		}
		attributes {
			id
			text
			created_at
		}
	}
}
```

## Count

Use `count_<entity>` to count rows that match the shared filters. Counts can also take a `count` argument for explicit count selections. They do not take `limit` or `offset`; `order` is only used when a composite `where_between` range needs to be interpreted in ordered column order.

The returned `count` field uses the `CountValue` scalar. When the database client is PostgreSQL, count values are returned as strings because PostgreSQL reports `count(*)` as a bigint value.

```graphql
query CountEntity($where: Entity_Query__Where) {
	count_entity(where: $where) {
		select
		count
	}
}
```

## Create

Use `create_<entity>` with an `attributes` input. Create is the standard exception to the shared-filter pattern: it does not use `where`, `where_in`, `where_like`, or `where_between` because it creates new rows instead of selecting existing rows.

```graphql
mutation CreateEntity($attributes: Entity_Mutation__Attributes) {
	create_entity(attributes: $attributes) {
		_metadata {
			id
			type
		}
		attributes {
			id
			text
		}
	}
}
```

## Update and Delete

Use `update_<entity>` and `delete_<entity>` with the shared filters. Both operations also accept `limit`, `offset`, and `order`, and updates require `attributes`.

```graphql
mutation UpdateEntity($where: Entity_Mutation__Where, $attributes: Entity_Mutation__Attributes) {
	update_entity(where: $where, attributes: $attributes) {
		attributes {
			id
			text
		}
	}
}
```

`delete_<entity>` returns the affected rows so callers can confirm which records were removed or marked deleted, depending on the entity behavior.

## Relationships

Entity result objects can expose relationship traversal fields under `relationships_to` and `relationships_from` when relationships are registered for that entity pair. Relationship traversal reuses the same generated operation style, but the parent result becomes the `source` for the nested operation.

```graphql
query ReadEntityRelationships($where: Entity_Query__Where, $relatedWhere: Entity_Query__Where) {
	read_entity(where: $where) {
		attributes {
			id
			text
		}
		relationships_to {
			read_entity(where: $relatedWhere) {
				attributes {
					id
					text
				}
			}
		}
	}
}
```

The nested `read_entity` receives the parent entity as its `source`, so callers only provide the usual filters for the related rows.

Read [Entity Overview](../entity/overview.md) for how entity definitions and generated GraphQL modules fit together.
