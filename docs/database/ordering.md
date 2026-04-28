# Database Ordering

Gauze exposes row ordering through the shared `order` argument on generated entity operations. Ordering matters in monolithic setups, but it matters even more in sharded setups because rows can come back from more than one database connection.

The practical rule is:

Use `order` when callers need stable result order, and include enough order fields to make that order meaningful.

## Where Ordering Applies

Generated entity operations use ordering in these places:

- `read_<entity>` accepts `order`, `limit`, and `offset`.
- `update_<entity>` accepts `order`, `limit`, and `offset` to choose which matching rows are updated.
- `delete_<entity>` accepts `order`, `limit`, and `offset` to choose which matching rows are deleted.
- `count_<entity>` does not accept `order` because it returns aggregate count results.

The `order` argument is a list of `Order` input objects. Each object describes one ordered column.

```json
{
	"order": [
		{
			"column": "app__article__created_at",
			"order": "desc",
			"nulls": "last"
		},
		{
			"column": "app__article__id",
			"order": "asc"
		}
	]
}
```

## Order Fields

Each order item supports:

- `column`: The indexed entity field to sort by.
- `order`: Optional `asc` or `desc`.
- `nulls`: Optional `first` or `last`.

Only indexed fields can be used for ordering. This matches the rest of Gauze's query parameter model: filters and ordering are validated against indexed entity fields before a query runs.

If `order` is omitted, Gauze uses the entity's `default_order` and `default_order_direction`. If the entity does not define a default order field, Gauze falls back to the primary key in ascending order.

If an order item omits `order`, Gauze uses the entity's `default_order_direction`, then falls back to `asc`.

If an order item omits `nulls`, Gauze uses `first`.

## Null Handling

`nulls` controls where `null` and missing values appear relative to non-null values:

- `nulls: "first"` puts null values before non-null values.
- `nulls: "last"` puts null values after non-null values.

This null placement is applied before comparing non-null values. The `asc` or `desc` direction controls the non-null value comparison.

## Sharded Result Ordering

In a sharded environment, each shard can apply SQL ordering locally, but local ordering alone is not enough. Concatenating already ordered shard results does not produce a globally ordered result.

To avoid that, Gauze sorts the combined result set after reading from the selected shards. Root reads, relationship reads, updates, and deletes all use the same shared row-sorting helper before returning rows to the caller.

When the requested order does not already include the entity primary key, Gauze appends the primary key as an internal ascending tie-breaker. This makes merged results deterministic when multiple rows share the same ordered value.

## Value Comparison

The shard merge sort compares the JavaScript values returned by the database driver. This is intentional because Knex passes most row values through from the underlying driver.

Common values are handled directly:

- `null` and `undefined`
- booleans
- numbers and bigints
- numeric strings for fields whose `sql_type` is numeric
- strings
- `Date` values
- `Buffer` and other `Uint8Array` values
- arrays
- PostgreSQL interval, point, and circle parser objects
- JSON-like objects

This gives Gauze deterministic merge ordering for common SQLite and PostgreSQL driver return values.

It is not a full reimplementation of every SQL database's ordering rules. Text collation, PostgreSQL enum declaration order, custom types, extension types, and specialized operator classes may not sort exactly the same way in JavaScript as they do inside the database.

## Limit and Offset

`limit` and `offset` are still applied inside each shard query. Gauze then sorts the rows returned from those shard queries.

That means shard merge sorting gives a deterministic order for the rows that were returned, but it is not yet full global cursor pagination. For cursor-style pagination across shards, prefer an explicit order that includes a stable tie-breaker, usually the primary key, and avoid relying on offset pagination for globally precise page boundaries.

## Recommended Ordering Pattern

For user-facing lists, use an application field first and the primary key second:

```json
{
	"order": [
		{
			"column": "app__article__created_at",
			"order": "desc",
			"nulls": "last"
		},
		{
			"column": "app__article__id",
			"order": "asc"
		}
	]
}
```

This makes repeated values safe. If two articles have the same `created_at`, the primary key still gives them a stable order.

## Related Pages

- Read [GraphQL Parameters](../graphql/parameters.md) for the full shared query parameter model.
- Read [Sharding](./sharding.md) for how Gauze routes work across database shards.
- Read [Create a Definition](../entity/definition.md) for `default_order`, `default_order_direction`, indexed fields, and field `sql_type`.
