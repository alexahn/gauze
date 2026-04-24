# Parameters

Generated entity operations share a common parameter model. The exact input type name changes per entity and realm, but the argument names stay consistent.

## Attributes

`attributes` provides field values for create and update operations.

```json
{
	"attributes": {
		"id": "00000000-0000-0000-0000-000000000001",
		"text": "hello"
	}
}
```

Create operations require `attributes`. Update operations require `attributes` plus at least one filter.

## Filters

Gauze validates query filters against indexed entity fields. If a field is not indexed in the entity definition, it cannot be used for `where`, `where_in`, `where_not_in`, `where_like`, `where_between`, or `order`.

Use `where` for exact field matches:

```json
{
	"where": {
		"id": "00000000-0000-0000-0000-000000000001"
	}
}
```

Use `where_in` or `where_not_in` for list membership:

```json
{
	"where_in": {
		"id": ["00000000-0000-0000-0000-000000000001", "00000000-0000-0000-0000-000000000002"]
	}
}
```

Use `where_like` for SQL-style pattern matching:

```json
{
	"where_like": {
		"text": "hel%"
	}
}
```

Use `where_between` for plain inclusive range inputs:

```json
{
	"where_between": {
		"created_at": ["2026-01-01T00:00:00.000Z", "2026-02-01T00:00:00.000Z"]
	}
}
```

When `where_between` includes a non-primary indexed field and the primary key, Gauze treats the pair as a composite cursor-style range. The primary key acts as a tie-breaker for rows with the same ordered field value, so rows can be paged through repeated ordered values without collapsing duplicates.

## Limit and Offset

`limit` caps the number of rows returned by read, update, and delete operations. The runtime also caps requested limits with `GAUZE_SQL_MAX_LIMIT`.

`offset` skips rows before returning results. Offset pagination is straightforward in monolithic mode, but it is not globally correct across multiple shards because each shard applies its own limit and offset before results are concatenated.

Read [Sharding](../database/sharding.md) before relying on offset pagination in a sharded environment.

## Order

`order` is a list of `Order` inputs:

```json
{
	"order": [
		{
			"column": "created_at",
			"order": "desc"
		}
	]
}
```

Each order item supports:

- `column`: The indexed field to sort by.
- `order`: Optional `asc` or `desc`; if omitted, Gauze uses the entity's default order direction.
- `nulls`: Optional `first` or `last`.

If `order` is omitted, Gauze uses the entity's `default_order` and `default_order_direction`, falling back to the primary key and ascending order when needed.

## Count

`count` is available on `count_<entity>` operations. Most callers can omit it and receive the default `count(*)` result. When supplied, it is a field-to-label map for explicit count selections:

```json
{
	"count": {
		"id": "rows"
	}
}
```

Each count entry supports:

- `<field>`: The entity field to count, such as `id`.
- `<label>`: The result label returned in the count response's `select` field, such as `rows`.

The response `count` field uses the `CountValue` scalar. Small counts may serialize as JSON numbers, while database clients that return bigint counts, such as PostgreSQL, serialize counts as strings. When Gauze merges counts across shards, it sums values with `BigInt` and returns a string if any merged value was a bigint string or the total exceeds JavaScript's safe integer range.

Count responses are shaped from the requested `count` map. If `count` is omitted, Gauze returns the canonical `count(*)` selector. If no rows are returned for a requested selector, Gauze returns that selector with count `0`.

## Source

`source` is used for relationship traversal. Top-level entity operations usually omit it. Nested relationship operations receive source metadata from the parent object so Gauze can route the relationship read or mutation correctly:

```json
{
	"source": {
		"_metadata": {
			"id": "00000000-0000-0000-0000-000000000001",
			"type": "ENTITY"
		},
		"_direction": "to"
	}
}
```

Each source object supports:

- `_metadata`: The parent entity metadata used for relationship traversal.
- `_metadata.id`: The parent entity row id.
- `_metadata.type`: The parent entity GraphQL metadata type.
- `_direction`: The relationship traversal direction, usually `to` or `from`.

## Cache Filters

The database realm also exposes cache-backed filter arguments such as `cache_where_in` and `cache_where_not_in`. These are mainly for internal delegation paths, such as system authorization filters that pass large ID sets through an in-memory cache key instead of embedding every ID in a GraphQL variable.

Application clients should usually prefer the non-cache filter parameters.
