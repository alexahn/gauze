# gauze


| Project   |     | Status 
|-----------|:----|----------
| CI/CD     |     | [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/alexahn/gauze/node.js.yml)](https://github.com/alexahn/gauze/actions/workflows/node.js.yml)
| Activity  |     | [![GitHub last commit](https://img.shields.io/github/last-commit/alexahn/gauze)](https://github.com/alexahn/gauze/commits/main/) [![GitHub commit activity](https://img.shields.io/github/commit-activity/y/alexahn/gauze)](https://github.com/alexahn/gauze/graphs/commit-activity) [![GitHub contributors](https://img.shields.io/github/contributors/alexahn/gauze)](https://github.com/alexahn/gauze/graphs/contributors)
| Package   |     | [![NPM Version](https://img.shields.io/npm/v/%40ahn%2Fgauze)](https://www.npmjs.com/package/@ahn/gauze) ![Node LTS](https://img.shields.io/node/v-lts/%40ahn%2Fgauze)

Gauze is a structured GraphQL framework, with a focus on modularity. It offers a unified way to define and interact with data, and includes a flexible authentication and authorization system. The framework has a fractal architecture, which enables modular reusability.

## Prerequisites

- Use Node.js version `22.18.0`.
- Use `zsh`.

## Installation
```
npm install @ahn/gauze
```

## Quick Start
1. `npx gauze create project { project_name }`
2. `mv example.env .env`
3. `npx gauze project { project_name } migrate run`
4. `npx gauze project { project_name } application build`
5. `npx gauze project { project_name } application serve`
6. `http://localhost:4000/gauze/v1`

## Concepts

### Koa and Knex
The framework uses `koa` as the underlying web server and `knex` as the database manager. 

### MVIC
Gauze implements an abstract model view controller architecture. One addition to the pattern is the introduction of interfaces. Agents interact with HTTP GraphQL endpoints (representing the "interface" in MVIC) or the graphical user interface (representing the "view" in MVIC). Entity definitions create models, which are the union of structural information with a concrete database. Controllers primarily handle interactions from the interface layer. Views can be thought of as translating agent inputs to interface actions. 

### Realm
A realm is a processing layer in the framework, and also a self-contained API layer. Every realm interacts with realms below it, but never with realms above it. In a way, realms are an extension of the import hierarchy for the framework. Every realm contains its own GraphQL schema, and every realm can handle GraphQL queries from realms above it. As an example, the system realm interacts with the database realm to store and retrieve model data. Every realm requires its own JWT to interact with directly, but applications should be engineered to mostly interact with the system level realm. Realms can have specific authentication requirements. There are three primary realms currently: `kernel`, `database`, and `system`. Every realm requires a JWT with the corresponding realm audience, and these JWTs are generated via authenticating in the `environment` realm. The `environment` realm is a special realm as it is outermost layer, and the first point of contact for any agent. An agent will authenticate in the `environment` realm and then create a session for a realm they wish to interact with, such as the `system` realm.

Every realm is represented by a directory which holds the code for the realm. Every realm exposes a root level `koa` router in `router.js`, which turns the realm into a composable unit.

### Agent
An agent is anything that interacts with a realm. Five agent types are created when signing up: the root agent, the account agent, the user agent, the person agent, and the character agent. Currently, there is an informal hierarchy in that accounts should be thought of as holding users, and persons should be thought of as holding characters. An account is the internal representation of identity (self-contained) and a person is the external representation of identity (not self-contained). Access to realms can be limited by agent type. Access to entities can be limited by agent type.

Every agent is represented by a JWT. Information about the agent is encoded in the JWT payload in the format:
```
{
  "proxy_id": "e6c2767c-a3d5-4aec-82ca-fe2042201773",
  "agent_id": "598a5ef8-c7d8-42e1-bcf6-37641d5eec07",
  "agent_type": "gauze__agent_user",
  "session_id": "26b3c35c-0847-41f9-b577-f381052da6ab",
  "seed": "a77128141fda763d3605cc8b27e35856a4379058cd461ea8d5ed659bf1232a54878071712e57d783bbbf58e117d0ef54a772805878982b1ad05e844ed49f0b35",
  "iat": 1754543413,
  "iss": "gauze",
  "aud": "system",
  "exp": 1754550613
}
```

### Entity
Entities are abstract definitions of data. An entity definition is turned into a useable model by the framework by joining its structural information with an underlying database. Every entity currently supports five methods: `create`, `read`, `update`, `delete`, and `count`. Method access on entities are controlled by either whitelists or blacklists, dependening on whether the method is public or private. If a method is private, then whitelists are used to allow access. If a method is public, then blacklists are used to disallow access. Whitelists and blacklists have their own hierarchy for self-management. There are three levels of authority: root, trunk, and leaf. There is only one root and it associated with the agent that creates the model. Trunk can manage other trunks and leaves. Leaf level cannot manage anyone else. Relationships can be defined to allow graph traversal. Relationships can be traversed via the `relationships_to` and `relationships_from` queries and mutations in GraphQL.

Every entity is represented by a JavaScript file that holds a function which returns the structural information for the entity.

### Project
A project is a self-contained kernel and CLI, along with a collection of realms, abstract definitions, user interfaces, and sub-projects. The root level directories in a project all have significance. `abstract` hosts abstract definitions like errors and entities. `command` hosts CLI commands. `database` is the database realm which holds the migration files and relevant database interaction code. `environment` is the environment realm, and is the initial external interface for an agent. An agent authenticates in the `environment` realm before interacting with other realms. `kernel` hosts the kernel, which contains the majority of the framework code. `structure` hosts structural information for entities. `system` is the system realm, and is the realm in which most application code will be written. `views` hosts the user interface for the project. Every realm contains the three directories: `controllers`, `interfaces`, and `models`. Every structural realm (such as `abstract` and `structure`) contains the three directories: `entities` (for entity definitions), `gauze` (for framework definitions), `project` (for project definitions). The `views` realm contains two directories: `gauze` (for internal framework user interface), and `project` (for project specific user interface). Every project can contains multiple sub-projects, which can be placed in a `projects` directory.

Every project is represented by a directory that holds the code for the entire project. Every project exposes a root level `koa` router in `router.js`, which turns the project into a composable unit.


## Usage

### Create a project
```
npx gauze create project { project_name }
```
The command will create a new directory at `{ project_name }` that houses the project code. A project is designed to be as self-contained as possible, and therefore has its own kernel and CLI. The command `npx gauze project { project_name } { sub_command }` will be used to pass execution control to the project's CLI. A project is a collection of realms and abstract definitions, along with a functioning kernel and CLI.

After creating a project, there will be an example entity definition file called `example.js`. An entity definition file typically looks like:
```
export default function ($abstract) {
	const ENTITY = {
		name: "gauze",
		table_name: "gauze__gauze",
		primary_key: "gauze__gauze__id",
		graphql_meta_type: "GAUZE",
		default_order: "gauze__gauze__created_at",
		default_order_direction: "asc",
		fields: {
			gauze__gauze__id: {
				name: "gauze__gauze__id",
				indexed: true,
				required: false,
				sql_type: "uuid",
				graphql_type: $abstract.gauze.types.graphql.scalars.id.SCALAR__ID__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "id",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__gauze__id")],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
			gauze__gauze__created_at: {
				name: "gauze__gauze__created_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.scalars.date.SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "created_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.CREATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__gauze__created_at")],
				serializers: [$abstract.gauze.serializers.CREATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__gauze__created_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.CREATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__gauze__created_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
			gauze__gauze__updated_at: {
				name: "gauze__gauze__updated_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.scalars.date.SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "updated_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__gauze__updated_at")],
				serializers: [$abstract.gauze.serializers.UPDATED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__gauze__updated_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.UPDATED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__gauze__updated_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
			gauze__gauze__deleted_at: {
				name: "gauze__gauze__deleted_at",
				indexed: true,
				required: false,
				sql_type: "datetime",
				graphql_type: $abstract.gauze.types.graphql.scalars.date.SCALAR__DATE__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				description: "deleted_at",
				pre_serialize_middlewares: [$abstract.gauze.middlewares.DELETED_AT_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("gauze__gauze__deleted_at")],
				serializers: [$abstract.gauze.serializers.DELETED_AT__SERIALIZER__GAUZE__ABSTRACT("gauze__gauze__deleted_at")],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [$abstract.gauze.deserializers.DELETED_AT__DESERIALIZER__GAUZE__ABSTRACT("gauze__gauze__deleted_at")],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
			gauze__gauze__text1: {
				name: "gauze__gauze__text1",
				indexed: true,
				required: false,
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.scalars.string.SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				graphql_type_parameters: {
					maximum_length: 1024
				}
				description: "text1",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
			gauze__gauze__text2: {
				name: "gauze__gauze__text2",
				indexed: true,
				required: false,
				sql_type: "string",
				graphql_type: $abstract.gauze.types.graphql.scalars.string.SCALAR__STRING__SCALAR__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				graphql_type_parameters: {
					maximum_length: 1024
				}
				description: "text2",
				pre_serialize_middlewares: [],
				serializers: [],
				post_serialize_middlewares: [],
				pre_deserialize_middlewares: [],
				deserializers: [],
				post_deserialize_middlewares: [],
				allowed_agent_types: ["gauze__agent_user"],
			},
		},
		methods: {
			create: {
				name: "create",
				privacy: "public",
				allowed_agent_types: ["gauze__agent_user"],
			},
			read: {
				name: "read",
				privacy: "public",
				allowed_agent_types: ["gauze__agent_user"],
			},
			update: {
				name: "update",
				privacy: "public",
				allowed_agent_types: ["gauze__agent_user"],
			},
			delete: {
				name: "delete",
				privacy: "public",
				allowed_agent_types: ["gauze__agent_user"],
			},
			count: {
				name: "count",
				privacy: "public",
				allowed_agent_types: ["gauze__agent_user"],
			},
		},
	};
	ENTITY.graphql_attributes_fields = $abstract.gauze.utility.create_graphql_attributes_fields(ENTITY);
	ENTITY.graphql_attributes_string = $abstract.gauze.utility.create_graphql_attributes_string(ENTITY);
	ENTITY.graphql_where_fields = $abstract.gauze.utility.create_graphql_where_fields(ENTITY);
	ENTITY.graphql_where_string = $abstract.gauze.utility.create_graphql_where_string(ENTITY);
	return ENTITY;
}
```
Field middlewares are objects with the following fields:
```
{
	create: function (attributes) {
		// do something with attributes
		return attributes;
	},
	update: function (attributes) {
		// do something with attributes
		return attributes;
	},
	read: function (attributes) {
		// do something with attributes
		return attributes;
	},
	delete: function (attributes) {
		// do something with attributes
		return attributes;
	},
	count: function (attributes) {
		// do something with attributes
		return attributes;
	},
}
```
Higher order functions can be used to define middlewares so that the individual middleware functions have access to the field that it is acting on:
```
function (field) {
	return {
		create: function (attributes) {
			// do something with attributes
			return attributes;
		},
		update: function (attributes) {
			// do something with attributes
			return attributes;
		},
		read: function (attributes) {
			// do something with attributes
			return attributes;
		},
		delete: function (attributes) {
			// do something with attributes
			return attributes;
		},
		count: function (attributes) {
			// do something with attributes
			return attributes;
		},
	};
};
```
Serializers and deserializers follow the same structure as middlewares, and they are only differentiated as semantic checkpoints during the processing flow. The `name` attribute for fields should align with the column name in the database. The `graphql_type` attribute for fields should point to a function which accepts three arguments (`entity`, `field`, `parameters`) and returns a GraphQL scalar. The `graphql_type_parameters` attribute for fields will populate the third argument `parameters`. Typically this is used to define custom validators and parsers. The `required` attribute for fields specifies whether the field is required for GraphQL, not whether the column is required in the database. Database constraints are typically independent of entity definitions. Every entity currently enables five methods: `create`, `read`, `update`, `delete`, and `count`. Each method can be either private or public. Public methods can be accessed by everyone by default. Private methods can be accessed by no one by default. Whitelists and blacklists are used in conjunction with the privacy mode to control access to methods.

### Create environment variables file
```
GAUZE_ENV="development"
GAUZE_DEBUG_UI="TRUE"
GAUZE_DEBUG_SQL="TRUE"
GAUZE_DEBUG_GRAPHQL="TRUE"
GAUZE_ENVIRONMENT_JWT_SECRET="ENVIRONMENT"
GAUZE_SYSTEM_JWT_SECRET="SYSTEM"
GAUZE_DATABASE_JWT_SECRET="DATABASE"
GAUZE_KERNEL_JWT_SECRET="KERNEL"
GAUZE_PROXY_JWT_SECRET="PROXY"
GAUZE_PROTOCOL="http"
GAUZE_HOST="localhost"
GAUZE_PORT="4000"
GAUZE_SERVER_PROTOCOL="http"
GAUZE_SERVER_HOST="localhost"
GAUZE_SERVER_PORT="4000"
GAUZE_GRAPHQL_MAX_DEPTH="8"
GAUZE_HTTP_MAX_SIZE="1048576"
GAUZE_SQL_MAX_LIMIT="1024"
GAUZE_SQL_MAX_BREADTH="4096"
GAUZE_SQL_MAX_TRANSACTIONS="256"
LOG_LEVEL_MINIMUM="0"
LOG_LEVEL_MAXIMUM="8"
LOG_LEVEL_REGEX=""
LOG_TOPIC_REGEX=""
LOG_MESSAGE_REGEX=""
KNEX_CLIENT="better-sqlite3"
```
The environment variables above are required to interact with a project. Create a `.env` file and define these environment variables inside. After creating a project, there will be an example environment variables file called `example.env`, which can be used as a starting point.

### Create an entity
```
npx gauze project { project_name } create entity { project_dir } { entity_name }.js
```
The command will create the relevant models, controllers, and structural files in the project using the entity definition in `{ entity_name }.js`.

```
npx gauze project { project_name } migrate make { entity_name }
```
The command will create a database migration file for the entity. Update the file to use ES6 modules by replacing `module.exports` with the corresponding named export:
```
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

};
```
Database migrations are defined using `knex`. Populate the `up` and `down` functions with the entity's corresponding database table and columns.
```
npx gauze project { project_name } migrate run
```
The command will run the database migrations for the project. The command ensures that the corresponding tables and columns will exist for every entity, so long as the migration files have been defined properly. 

Add a sharding configuration for the new table in `{ project_name }/database/config.js`. Sharding configuration should follow the pattern:
```
{
	[GAUZE_ENV]: {
		[table_name]: {
			previous: [...shards],
			current: [{
				id: [shard_id],
				start: [shard_key_range_start],
				end: [shard_key_range_end],
				read: [{
					id: [shard_node_id],
					transaction_isolation_level: "serialized",
					config: {...knex_config}
				}...shard_node_config],
				write: [{
					id: [shard_node_id],
					transaction_isolation_level: "serialized",
					config: {...knex_config}
				}...shard_node_config]
			}],
			next: [...shards]
		}
	},
}
```
`GAUZE_ENV` is used to choose the database configuration at runtime, and each environment has a configuration for every table. Each table has three sections in its configuration, `previous`, `current`, and `next`. `current` is always used during runtime. Each section holds an array of shard configurations. Each shard configuration has an `id`, start of the shard range `start`, end of the shard range `end`, an array of read slaves `read`, and and array of write masters `write`. `read` and `write` both contain an array of shard node configurations. Each shard node has a an `id`, `transaction_isolation_level` and `config`. `config` holds a `knex` configuration. The required fields in the `knex` configuration are `client`, `connection`, `migrations.directory`, `seeds.directory`.

Update `{ project_name }/database/interfaces/graphql/schema.js` to register your entity. Entities and their methods can be registered here for the database realm. Add an entry to `ENTITIES` and `METHODS` using the type name (which is defined in structure). The shape of the type name should be `$structure.entities.{ entity_name }.database.graphql.TYPE__GRAPHQL__DATABASE__{ ENTITY_NAME }__STRUCTURE`.

Update `{ project_name }/system/interfaces/graphql/schema.js` to register your entity. Entities and their methods can be registered here for the system realm. Add an entry to `ENTITIES` and `METHODS` using the type name (which is defined in structure). The shape of the type name should be `$structure.entities.{ entity_name }.system.graphql.TYPE__GRAPHQL__SYSTEM__{ ENTITY_NAME }__STRUCTURE`.

Update `{ project_name }/structure/relationships.js` to define your relationships. Relationships are defined in a simple map, where the key specifies the from target and the value represents the to target. 

### Run the project application
```
npx gauze project { project_name } application build
```
The command will build the the React user interface.
```
npx gauze project { project_name } application serve
```
The command will serve the application (on port `4000` by default). The React user interface can be accessed via `http://localhost:4000/gauze/v1` and `http://localhost:4000/project`. Alongside the React user interface, there are multiple endpoints which handle GraphQL queries and mutations.
- Use `/environment/graphql` for the `environment` realm GraphQL schema.
- Use `/system/graphql` for the `system` realm GraphQL schema.
- Use `/database/graphql` for the `database` realm GraphQL schema.
- Use `/kernel/graphql` for the `kernel` realm GraphQL schema.

It is recommended to use a GraphQL integrated development environment like `graphiql` to explore these schemas. An authorization header must be set with `Bearer { JWT }` to interact with non-environment realms.

## Gauze Commands

- Run `npx gauze migrate run` to apply pending migrations.
- Run `npx gauze migrate make { migration_name }` to create a migration file.
- Run `npx gauze create project` to scaffold a new project.
- Run `npx gauze create entity { project_directory } { entity_json }` to generate entity code for a project.
- Run `npx gauze application build` to build the application frontend.
- Run `npx gauze application serve` to serve the application.
- Run `npx gauze application watch` to rebuild the application on changes.
- Run `npx gauze project { project_directory } { sub_command }` to forward a command to a project's CLI.

## Entity Definition

An example definition can be found [here](https://github.com/alexahn/gauze/blob/main/gauze/entity.js).
```
    const ENTITY = {
        name: "entity",
        table_name: "gauze__entity",
        primary_key: "id",
        graphql_meta_type: "ENTITY",
        default_order: "created_at",
        default_order_direction: "asc",
        fields: {
            id: {
                name: "id",
                indexed: true,
                required: false,
                sql_type: "uuid",
                graphql_type: $abstract.gauze.types.graphql.STRING__GRAPHQL__TYPE__GAUZE__ABSTRACT,
				graphql_type_parameters: {},
                description: "id",
                pre_serialize_middlewares: [$abstract.gauze.middlewares.UPDATE_PROTECTED__MIDDLEWARE__GAUZE__ABSTRACT("id")],
                serializers: [],
                post_serialize_middlewares: [],
                pre_deserialize_middlewares: [],
                deserializers: [],
                post_deserialize_middlewares: [],
                allowed_agent_types: ["gauze__agent_user"],
            }
		},
        methods: {
            create: {
                name: "create",
                privacy: "public",
                allowed_agent_types: ["gauze__agent_user"],
            },
            read: {
                name: "read",
                privacy: "public",
                allowed_agent_types: ["gauze__agent_user"],
            },
            update: {
                name: "update",
                privacy: "public",
                allowed_agent_types: ["gauze__agent_user"],
            },
            delete: {
                name: "delete",
                privacy: "public",
                allowed_agent_types: ["gauze__agent_user"],
            },
            count: {
                name: "count",
                privacy: "public",
                allowed_agent_types: ["gauze__agent_user"],
            },
        },
    }
```
- The `name` field names the entity and determines the structure of the autogenerated code.
- The `table_name` field should align with the SQL table name in the migration file.
- The `primary_key` field should align with the primary key for the table in the migration file.
- The `graphql_meta_type` field defines a framework-specific type identifier.
- The `default_order` field defines the default sort order for queries.
- The `default_order_direction` field defines the default sort order direction for queries, either `asc` or `desc`.
- The `field.name` value names the field and determines the structure of the autogenerated code.
- The `field.indexed` value specifies whether the field is indexed for attribute-based queries.
- The `field.required` value specifies whether the field is required for creation.
- The `field.sql_type` value defines a framework-specific type identifier for the field.
- The `field.graphql_type` value references a GraphQL type definition, which will usually be a scalar value type.
- The `field.graphql_type_parameters` value provides the parameters passed to the function defined in `field.graphql_type`, which ultimately returns a GraphQL type.
- The `field.description` value defines a framework-specific field description.
- The `field.pre_serialize_middlewares` value holds the pre-serialize middlewares, which run in order.
- The `field.serializers` value holds the serializers, which run in order.
- The `field.post_serialize_middlewares` value holds the post-serialize middlewares, which run in order.
- The `field.pre_deserialize_middlewares` value holds the pre-deserialize middlewares, which run in order.
- The `field.deserializers` value holds the deserializers, which run in order.
- The `field.post_deserialize_middlewares` value holds the post-deserialize middlewares, which run in order.
- The `field.allowed_agent_types` value defines the allowed agent types for the field.
- The `method.name` value names the method.
- The `method.privacy` value defines the privacy mode for the method, either `public` or `private`.
- The `method.allowed_agent_types` value defines the allowed agent types for the method.

## Development

### Development Commands

- Run `npm run start` to launch `start-server`, `start-ui`, and `start-graphiql`.
- Run `npm run start-server` to proxy to `npm run watch-server` and start the `gauze` server on port `4000` while watching the `src` directory for changes.
- Run `npm run start-ui` to proxy to `npm run watch-ui` and rebuild the Gauze and project web interfaces on code changes.
- Run `npm run start-graphiql` to start three `graphiql` instances on ports `4001` (`database` realm), `4002` (`system` realm), and `4003` (`environment` realm).
- Run `npm run start-ui` when you only need the frontend watch process.

### Development process

Run `npm start`, which starts the backend server, two watch processes for building the user interface, and three graphiql servers (port 4001, 4002, 4003). Changes to the `src` directory will automatically restart the backend server. Changes to the user interface code (for both gauze and project applications) will rebuild the frontend(s). Run `npm test` and make sure all tests pass before committing.
