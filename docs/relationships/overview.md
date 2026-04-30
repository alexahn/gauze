# Relationships Overview

Relationships let Gauze represent links between entity rows and expose those links through generated GraphQL traversal fields. They are useful when a caller should move through the application graph without manually querying the relationship table and stitching rows together.

## What a Relationship Represents

A relationship is a directed edge from one entity row to another entity row. Gauze stores those edges in the `gauze__relationship` entity with four anchor fields:

- `gauze__relationship__from_type`
- `gauze__relationship__from_id`
- `gauze__relationship__to_type`
- `gauze__relationship__to_id`

The `from` side and `to` side are entity row references. The type value is the entity's table name, such as `gauze__entity`, and the id value is that entity row's primary key.

## Relationship Definitions

Runtime traversal is controlled by `structure/relationships.js`. The relationship map uses GraphQL type constants as keys and values:

```js
const DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE = {
	[TYPE__GRAPHQL__DATABASE__ARTICLE__STRUCTURE]: [
		TYPE__GRAPHQL__DATABASE__AUTHOR__STRUCTURE,
		TYPE__GRAPHQL__DATABASE__TAG__STRUCTURE,
	],
};
```

Each key is a supported `from` type. Each array entry is a supported `to` type. To make a connection traversable in both directions as a first-class relationship, include both directions in the map.

Gauze keeps separate exported maps for the database and system realms:

- `DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE`
- `SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE`

Most projects can point the system map at the database map when both realms should expose the same traversal shape.

## Generated Traversal Fields

When an entity is registered in a realm schema and appears in the relationship map, Gauze links related entity operations into nested traversal fields:

- `relationships_to` exposes operations for rows reachable from the current row.
- `relationships_from` exposes operations for rows that point to the current row.

The nested operations keep the same generated method names as top-level entity operations, such as `read_article`, `count_tag`, or `create_relationship`.

## Relationship Rows

The relationship table is also a normal generated entity. It can be queried directly with operations such as `read_relationship`, `create_relationship`, `update_relationship`, `delete_relationship`, and `count_relationship`.

Direct relationship operations are useful when you need to create or manage edges explicitly. Traversal fields are useful when you want to read, count, create, update, or delete related entity rows from a parent row context.

## Suggested Reading

Read [Relationship GraphQL](./graphql.md) for traversal examples, `source` behavior, and direct relationship operations.

Read [Generate Project Code](../entity/generate-project-code.md) for where relationship maps fit into the entity workflow.
