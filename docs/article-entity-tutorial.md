# Article Entity Tutorial

This tutorial walks through the `article` example step by step, from writing the definition to generating project code and wiring the result into the application.

The flow is:

1. Create the `article` entity definition file.
2. Create the migration for the `app__article` table.
3. Generate the project code from the definition.
4. Register the generated GraphQL definitions.
5. Define relationships if the entity connects to other entities.

## Step 1: Create the Definition File

Create `article.js`:

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

This definition says:

- The SQL table is `app__article`.
- The primary key is `app__article__id`.
- `title` is required.
- `internal_notes` exists but is restricted to a narrower agent type.
- `read` and `count` are public, while writes stay private.

## Step 2: Create the Migration

Create the migration file:

```sh
npx gauze project ${project_dir} migrate make create_article
```

Then update the migration so it creates `app__article`:

```js
export async function up(knex) {
	await knex.schema.createTable("app__article", function (table) {
		table.uuid("app__article__id").primary();
		table.string("app__article__title").notNullable();
		table.text("app__article__internal_notes");
		table.timestamp("app__article__created_at");
		table.timestamp("app__article__updated_at");
		table.timestamp("app__article__deleted_at");
	});
}

export async function down(knex) {
	await knex.schema.dropTable("app__article");
}
```

Add the table to the appropriate database config file before running the migration, then run:

```sh
npx gauze project ${project_dir} migrate run
```

## Step 3: Generate the Project Code

Run:

```sh
npx gauze project ${project_dir} create entity ${project_dir} ./article.js
```

This validates the definition and generates:

- structure files for `article`
- GraphQL operation files for `article`
- exports that wire the generated modules into the project

## Step 4: Register the GraphQL Definitions

Update these files:

- `${project_dir}/database/interfaces/graphql/schema.js`
- `${project_dir}/system/interfaces/graphql/schema.js`

Add the generated `article` type constants to each realm's `ENTITIES` and `METHODS` maps.

Example shape:

```js
import * as $structure from "../structure/index.js";

const ENTITIES = {
	article: $structure.entities.article.database.graphql.TYPE__GRAPHQL__DATABASE__ARTICLE__STRUCTURE,
};

const METHODS = {
	article: {
		create: $structure.entities.article.database.graphql.TYPE__GRAPHQL__DATABASE__ARTICLE__CREATE__STRUCTURE,
		read: $structure.entities.article.database.graphql.TYPE__GRAPHQL__DATABASE__ARTICLE__READ__STRUCTURE,
		update: $structure.entities.article.database.graphql.TYPE__GRAPHQL__DATABASE__ARTICLE__UPDATE__STRUCTURE,
		delete: $structure.entities.article.database.graphql.TYPE__GRAPHQL__DATABASE__ARTICLE__DELETE__STRUCTURE,
		count: $structure.entities.article.database.graphql.TYPE__GRAPHQL__DATABASE__ARTICLE__COUNT__STRUCTURE,
	},
};
```

Use the matching `system.graphql` constants in the system schema file.

## Step 5: Define Relationships

If `article` relates to other entities, update `${project_dir}/structure/relationships.js`.

For example, if `article` relates to `author` and `tag`:

```js
import { TYPE__GRAPHQL__DATABASE__ARTICLE__STRUCTURE } from "./entities/article/database/graphql.js";
import { TYPE__GRAPHQL__DATABASE__AUTHOR__STRUCTURE } from "./entities/author/database/graphql.js";
import { TYPE__GRAPHQL__DATABASE__TAG__STRUCTURE } from "./entities/tag/database/graphql.js";

const DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE = {
	[TYPE__GRAPHQL__DATABASE__ARTICLE__STRUCTURE]: [
		TYPE__GRAPHQL__DATABASE__AUTHOR__STRUCTURE,
		TYPE__GRAPHQL__DATABASE__TAG__STRUCTURE,
	],
	[TYPE__GRAPHQL__DATABASE__AUTHOR__STRUCTURE]: [TYPE__GRAPHQL__DATABASE__ARTICLE__STRUCTURE],
	[TYPE__GRAPHQL__DATABASE__TAG__STRUCTURE]: [TYPE__GRAPHQL__DATABASE__ARTICLE__STRUCTURE],
};

const SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE = DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE;

export {
	DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE,
	SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE,
};
```

## Step 6: Review the Result

After those steps, review:

- `${project_dir}/abstract/entities/article.js`
- `${project_dir}/structure/entities/article/`
- `${project_dir}/database/interfaces/graphql/operations/article/`
- `${project_dir}/database/interfaces/graphql/schema.js`
- `${project_dir}/system/interfaces/graphql/schema.js`
- `${project_dir}/structure/relationships.js`

## Related Pages

- Read [Create a Definition](./entity-definition.md) for the definition format.
- Read [Create a Migration](./create-a-migration.md) for migration and database config details.
- Read [Generate Project Code](./entities.md) for the general generation workflow.
