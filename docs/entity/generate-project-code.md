# Generate Project Code

Use `npx gauze project <dir> create entity <project_dir> <entity_file>` to validate an entity definition and generate the project code that represents that entity across your application.

Start with [Create a Definition](./definition.md) if you still need to write the entity definition file itself.
Create the database migration first. Read [Create a Migration](./create-a-migration.md) before running this command.

## Generate the Entity

After creating the entity definition file and migration, run:

```sh
npx gauze project ${project_dir} create entity ${project_dir} ./article.js
```

That flow:

1. Validates the entity config
2. Creates the generated project modules for that entity
3. Wires the entity into the project's exports
4. Updates the generated GraphQL operation files for that entity

## Custom vs Built-in

Use `npx gauze project <dir> create entity <project_dir> <entity_file>` for project entities. `npx gauze create gauze` is for working on Gauze itself rather than normal application development.

## After Generation

Run migrations, then inspect:

- Inspect `abstract/entities/<entity>.js` for the source entity definition.
- Inspect `structure/entities/<entity>/` for the generated structure modules.
- Inspect `database/interfaces/graphql/operations/<entity>/` for the generated GraphQL operation files.

If the entity should be queryable through the database and system GraphQL realms, register its generated definitions in:

- Update `database/interfaces/graphql/schema.js` to register the database realm definitions.
- Update `system/interfaces/graphql/schema.js` to register the system realm definitions.

In both files, add the entity to the realm's `ENTITIES` and `METHODS` maps using the generated type constants from `structure/entities/<entity>/`.

For example, the registration shape is:

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

Use the matching `database.graphql` or `system.graphql` constants for the schema file you are editing.

If the entity relates to other entities, update `structure/relationships.js` as well. Relationships are defined as a simple map where the key is the "from" GraphQL type constant and the value is an array of "to" GraphQL type constants that it can relate to.

For example:

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

In this example, `article` can relate to `author` and `tag`, and those entities can relate back to `article`. Add or remove entries based on which entity types should be traversable in your generated relationship structure.
