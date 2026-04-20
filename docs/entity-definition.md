# Create a Definition

An entity definition is the source file that describes one data model in your project. You define the entity's table name, primary key, fields, GraphQL metadata, and method-level access rules in one module, then Gauze uses that module as the source of truth for code generation.

At a high level, the flow is:

1. Write an entity definition file in plain JavaScript.
2. Generate a migration file for the new table and columns.
3. Run the migration so the database matches the entity definition.
4. Run `npx gauze project <dir> create entity <project_dir> <entity_file>`.
5. Let Gauze validate the definition and generate the related project modules.
6. Review the generated GraphQL operations, structure files, and exports that now represent that entity across the stack.
7. Register the generated entity and methods in your GraphQL schema files, then define any entity relationships.

This page explains the shape of the entity definition itself so you can understand what Gauze reads before it generates the surrounding code.

## What an Entity Defines

Entity definitions are plain modules that export an object with:

- `name`: The logical entity name used throughout the generated project structure.
- `table_name`: The SQL table name that stores records for the entity.
- `primary_key`: The field name that Gauze treats as the entity's primary identifier.
- `graphql_meta_type`: The GraphQL-facing meta type name for the entity.
- `default_order`: The field used as the default sort key for reads.
- `default_order_direction`: The default sort direction for reads, usually `asc` or `desc`.
- `fields`: The map of entity field definitions, including SQL types, GraphQL types, serializers, and field-level permissions.
- `methods`: The CRUD-style method definitions and their authorization rules.

## Example

```js
export default function ($abstract) {
	const ENTITY = {
		name: "article",
		table_name: "app__article",
		primary_key: "app__article__id",
		graphql_meta_type: "ARTICLE",
		default_order: "app__article__created_at",
		default_order_direction: "desc",
		fields: {
			app__article__id: {
				name: "app__article__id",
				indexed: true,
				required: false,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.scalars.id.SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("app__article__id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
			app__article__title: {
				name: "app__article__title",
				indexed: true,
				required: true,
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.scalars.string.SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "title",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
			app__article__internal_notes: {
				name: "app__article__internal_notes",
				indexed: false,
				required: false,
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.scalars.string.SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "internal_notes",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_root"],
			},
		},
		methods: {
			create: { name: "create", privacy: "private", allowed_agent_types: ["gauze__agent_user"] },
			read: { name: "read", privacy: "public", allowed_agent_types: ["gauze__agent_user"] },
			update: { name: "update", privacy: "private", allowed_agent_types: ["gauze__agent_user"] },
			delete: { name: "delete", privacy: "private", allowed_agent_types: ["gauze__agent_root"] },
			count: { name: "count", privacy: "public", allowed_agent_types: ["gauze__agent_user"] },
		},
	};
	ENTITY.graphql_attributes_fields = $abstract.gauze.utility.create_graphql_attributes_fields(ENTITY);
	ENTITY.graphql_attributes_string = $abstract.gauze.utility.create_graphql_attributes_string(ENTITY);
	ENTITY.graphql_where_fields = $abstract.gauze.utility.create_graphql_where_fields(ENTITY);
	ENTITY.graphql_where_string = $abstract.gauze.utility.create_graphql_where_string(ENTITY);
	return ENTITY;
}
```

## Field Shape

Each field is validated by the manager before code generation. Required keys include:

- Define `name` for the persisted field identifier.
- Define `indexed` to control whether the field participates in generated indexed lookups.
- Define `required` to control whether the field is required during creation.
- Define `sql_type` for the database-facing type identifier.
- Define `graphql_type` for the GraphQL type factory.
- Define `description` for the field description used by the framework.
- Define the serializer and deserializer middleware arrays for transformation hooks.
- Define `allowed_agent_types` for field-level access control.

Typical built-in fields are `id`, `created_at`, `updated_at`, and `deleted_at`.

Field-level `allowed_agent_types` controls which agent types can access that field in generated auth logic. A restrictive field can be hidden even when the surrounding method is allowed.

## GraphQL Types and Scalars

Each field's `graphql_type` points at a scalar or other GraphQL type factory. In a Gauze project, the built-in scalar factories are available under:

- Use `$abstract.gauze.types.graphql.scalars.id` for ID fields.
- Use `$abstract.gauze.types.graphql.scalars.date` for date-like fields.
- Use `$abstract.gauze.types.graphql.scalars.string` for string fields.

So a typical field references them as:

```js
graphql_type: $abstract.gauze.types.graphql.scalars.string.SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
graphql_type_parameters: {
	maximum_length: 128,
},
```

Gauze scalar modules are factories, not static constants. They receive the entity, field, and optional `graphql_type_parameters`, then return a `GraphQLScalarType`. That is how the built-in `string` scalar enforces constraints like `minimum_length` and `maximum_length`.

Project-specific scalars belong in your generated project under:

- Place project-specific scalar modules in `abstract/project/types/graphql/scalars/`.

Then export them from:

- Export project-specific scalars from `abstract/project/types/graphql/scalars/index.js`.

After that, entity definitions can reference them through `$abstract.project.types.graphql.scalars`.

Example project scalar usage:

```js
graphql_type: $abstract.project.types.graphql.scalars.slug.SCALAR__SLUG__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT,
```

If you add a new project scalar, keep the same factory shape as the Gauze scalars so it works cleanly with entity validation and generated GraphQL types.

## Methods, Privacy, and Permissions

Every entity defines five methods:

- Define `create` for record creation.
- Define `read` for record retrieval.
- Define `update` for record updates.
- Define `delete` for record deletion.
- Define `count` for aggregate counting.

Each method must declare:

- Define `name` for the method identifier.
- Define `privacy` for the access mode.
- Define `allowed_agent_types` for the eligible agent types.

`privacy` has two supported modes:

- Use `private` when authorization should be whitelist-oriented. In the system model, Gauze checks the whitelist path first and falls back to element-level authorization.
- Use `public` when authorization should be blacklist-oriented. In the system model, Gauze treats the method as open by default and blocks access through blacklist checks.

Different entities can mix these modes. A content entity might expose `read` and `count` as `public` while keeping `create`, `update`, and `delete` as `private`.

`allowed_agent_types` is a separate gate from `privacy`. It declares which agent types are even eligible to invoke a method. In practice:

- Method `allowed_agent_types` controls who can call `create`, `read`, `update`, `delete`, or `count`.
- Field `allowed_agent_types` controls which attributes are available once a method is authorized.

Use `public` when records are broadly readable and exceptions should be denied explicitly. Use `private` when records should only be visible through explicit authorization. Keep `allowed_agent_types` narrow; it is easiest to relax permissions later, but difficult to audit an entity that starts too open.

## Related Pages

- Read [Generate Project Code](./entities.md) to generate project code from a finished definition.
