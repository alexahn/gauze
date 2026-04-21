# Entity Overview

Entities are one of the main ways you describe application data in Gauze. An entity definition gives Gauze the metadata it needs to generate database structure, GraphQL operations, and related project code around a single model.

For a new user, the high-level flow is:

- Define the entity in `abstract/entities/`.
- Create a migration so the database matches the definition.
- Generate the related project code for that entity.
- Register the generated types and methods in the relevant GraphQL schema files.
- Add relationships if the entity should traverse to other entity types.

## What an Entity Represents

In Gauze, an entity is not just a table schema and it is not just a GraphQL type. It is the source definition that ties several concerns together:

- The SQL-facing table and field names.
- The GraphQL-facing field types and descriptions.
- The default method set for create, read, update, delete, and count.
- The access rules that control which agent types can use those methods and fields.

That is why entities sit near the center of the framework. Once the entity definition is in place, the rest of the stack can derive a large amount of structure from it.

## Where Entity Work Lives

When you are working on entities in a generated project, these locations matter most:

- Use `abstract/entities/` for the source definition files.
- Use `database/migrations/` for the migration files that make the database match the entity definition.
- Use `structure/entities/` for the generated structure that Gauze creates from the definition.
- Use `database/interfaces/graphql/operations/<entity>/` for the generated GraphQL operation files.

You will usually read and edit `abstract/entities/` directly, but treat `structure/` and generated operation files as outputs of the entity workflow.

## The Standard Entity Workflow

The normal order of work is:

1. Write the entity definition.
2. Create the migration.
3. Run the migration.
4. Generate the entity's project code.
5. Register the generated GraphQL types and methods.
6. Define relationships if the entity should connect to other entity types.

This order keeps the abstract definition, database state, and generated code aligned.

## What the Definition Controls

An entity definition typically controls:

- The entity name and table name.
- The primary key.
- The field map, including SQL types and GraphQL scalar factories.
- The CRUD-style methods.
- The method privacy rules.
- The allowed agent types for methods and fields.

That makes the definition the main source of truth for how the entity should look and behave across the stack.

## How Entities Relate to Abstract and Structure

The entity definition itself lives in the abstract layer, where you describe the model. Gauze then uses that definition to generate shared structure and GraphQL operation code.

If you are trying to understand the boundary:

- The abstract layer describes the entity.
- The structure layer materializes generated constants and modules from that description.
- The database and system realms expose the resulting operations at runtime.

That separation is what lets Gauze keep entity definitions declarative while still generating a fairly large amount of code around them.

## Suggested Reading Order

If you are starting the entity workflow for the first time, this order usually works well:

1. Read [Create a Definition](./definition.md) to learn the entity file shape.
2. Read [Create a Migration](./create-a-migration.md) to align the database with the definition.
3. Read [Generate Project Code](./generate-project-code.md) to create the derived project modules.
4. Read [Article Entity Tutorial](./article-entity-tutorial.md) for a concrete walkthrough.

## Related Pages

- Read [Abstract Overview](../abstract/overview.md) for how entity definitions fit into the abstract layer.
- Read [Project Overview](../project/overview.md) for where entities sit in the generated project layout.
- Read [Database Overview](../database/overview.md) for how the entity workflow fits into Gauze's database model.
