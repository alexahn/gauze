# Relationship GraphQL

Gauze exposes relationships through two related GraphQL surfaces:

- Traversal fields on entity results: `relationships_to` and `relationships_from`.
- Direct operations on the relationship entity: `create_relationship`, `read_relationship`, `update_relationship`, `delete_relationship`, and `count_relationship`.

Use traversal fields when you want to work from a parent entity row. Use direct relationship operations when you need to manage edge rows themselves.

## Traversing To Related Rows

`relationships_to` follows relationship edges where the current row is the `from` side.

```graphql
query ReadEntityRelationships($where: Entity_Query__Where, $relatedWhere: Entity_Query__Where) {
	read_entity(where: $where) {
		_metadata {
			id
			type
		}
		attributes {
			id
			text
		}
		relationships_to {
			read_entity(where: $relatedWhere) {
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
	}
}
```

The nested `read_entity` receives the parent row as its traversal source. Callers provide the normal filters for the related rows.

## Traversing From Related Rows

`relationships_from` follows relationship edges where the current row is the `to` side.

```graphql
query ReadIncomingRelationships($where: Entity_Query__Where) {
	read_entity(where: $where) {
		attributes {
			id
			text
		}
		relationships_from {
			read_entity {
				attributes {
					id
					text
				}
			}
		}
	}
}
```

This returns rows that have an outgoing relationship to the current row.

## Source Metadata

Relationship traversal is implemented with a `source` object. Nested traversal fields create the source automatically from the parent result:

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

The `_direction` value controls which side of the relationship is anchored:

- `to` means the parent row is the relationship `from` side.
- `from` means the parent row is the relationship `to` side.

Application callers usually do not need to pass `source` for nested traversal. It is mainly visible when using lower-level generated operations directly.

The `source._metadata.type` value is the GraphQL metadata type from the parent result. Gauze converts that value to the entity table name when it reads or creates rows in `gauze__relationship`.

## Creating Relationship Rows

Create an edge by writing a relationship row with both endpoint types and ids:

```graphql
mutation CreateRelationship($attributes: Relationship_Mutation__Attributes) {
	create_relationship(attributes: $attributes) {
		attributes {
			gauze__relationship__id
			gauze__relationship__from_type
			gauze__relationship__from_id
			gauze__relationship__to_type
			gauze__relationship__to_id
		}
	}
}
```

Example variables:

```json
{
	"attributes": {
		"gauze__relationship__from_type": "gauze__entity",
		"gauze__relationship__from_id": "00000000-0000-0000-0000-000000000001",
		"gauze__relationship__to_type": "gauze__entity",
		"gauze__relationship__to_id": "00000000-0000-0000-0000-000000000002"
	}
}
```

The direct relationship type fields use entity table names, not GraphQL metadata types.

In the system realm, Gauze validates that both endpoint types are known entity tables and that the `from` type is configured to relate to the `to` type in `structure/relationships.js`. It then authorizes the relationship against the endpoint rows with method `create`. For ordinary entity-to-entity edges, the caller must have access to the `create` method on both the `from` row and the `to` row. If the acting agent is itself one endpoint, Gauze treats that side as satisfied and checks access to `create` on the opposite endpoint.

The relationship table enforces uniqueness for the full `from_type`, `from_id`, `to_type`, and `to_id` tuple.

## Deleting Relationship Rows

Delete an edge by selecting the relationship row by id:

```graphql
mutation DeleteRelationship($where: Relationship_Mutation__Where) {
	delete_relationship(where: $where) {
		attributes {
			gauze__relationship__id
			gauze__relationship__from_type
			gauze__relationship__from_id
			gauze__relationship__to_type
			gauze__relationship__to_id
		}
	}
}
```

Example variables:

```json
{
	"where": {
		"gauze__relationship__id": "00000000-0000-0000-0000-000000000003"
	}
}
```

In the system realm, relationship deletes require `where.gauze__relationship__id`. Gauze prereads the relationship row, authorizes the caller against the row's endpoints with method `delete`, fills in the endpoint fields for the lower-level delete, and then deletes the matching row. For ordinary entity-to-entity edges, the caller must have access to the `delete` method on both endpoint rows. If the acting agent is itself one endpoint, Gauze checks access to `delete` on the opposite endpoint.

## Related Parameters

Relationship traversal accepts the same generated operation parameters as other entity operations, including `where`, `where_in`, `where_like`, `where_between`, `limit`, `offset`, and `order` where the method supports them.

Read [GraphQL Parameters](../graphql/parameters.md) for the shared parameter model.
