# gauze

A structured GraphQL framework.

## Prerequisites

- `nodejs` version `22.18.0`
- `zsh`

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

## Quick Start

1. Create a project using the CLI by running: `npx gauze create project { project_directory }`. A new directory will be created at `{ project_directory }` that contains the code for the project. All the code in the project is self-contained thereafter. The root `package.json` for the project must have `"type": "module"` set because the project uses ES6 modules.
2. Create an `.env` file to hold the project environment variables. The template `example.env` can be used as a starting point.
3. Create an entity definition file `{ entity_name }.js` based off the template `example.js`.
4. Create the migration file for the entity: `npx gauze project { project_directory } migrate make { entity_name }`
5. Update `{ project_directory }/database/migrations/.*{ entity_name }.js`. The exports should be changed from
	~~~
	/**
	 * @param { import("knex").Knex } knex
	 * @returns { Promise<void> }
	 */
	exports.up = function(knex) {

	};

	/**
	 * @param { import("knex").Knex } knex
	 * @returns { Promise<void> }
	 */
	exports.down = function(knex) {

	};
	~~~
	to
	~~~
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
	~~~
	because the project uses ES6 modules.
6. Run the migration file: `npx gauze project { project_directory } migrate run`
7. Create the project code for the entity: `npx gauze project { project_directory } create entity { project_directory } { entity_name }.json`. The models, controllers, and interfaces will be generated for the entity.
8. Update `{ project_directory }/database/interfaces/graphql/schema.js` to register your entity. Entities and their methods can be registered here for the database realm. Add an entry to `ENTITIES` and `METHODS` using the type name (which is defined in structure). The shape of the type name should be `$structure.entities.{ entity_name }.database.graphql.TYPE__GRAPHQL__DATABASE__{ ENTITY_NAME }__STRUCTURE`.
9. Update `{ project_directory }/system/interfaces/graphql/schema.js` to register your entity. Entities and their methods can be registered here for the system realm. Add an entry to `ENTITIES` and `METHODS` using the type name (which is defined in structure). The shape of the type name should be `$structure.entities.{ entity_name }.system.graphql.TYPE__GRAPHQL__SYSTEM__{ ENTITY_NAME }__STRUCTURE`.
10. Update `{ project_directory }/structure/relationships.js` to define your relationships. Relationships are defined in a simple map, where the key specifies the from target and the value represents the to target. 
11. Build the frontend application: `npx gauze project { project_directory } application build`. The frontend will be compiled to a single JavaScript file and a single CSS file. 
12. Run the server: `npx gauze project { project_directory } application serve`. The default port is 4000. The server will have endpoints to handle GraphQL queries and mutations, and also serve assets for the frontend application.
13. Send GraphQL queries to the server (`http://localhost:4000/environment/graphql`, `http://localhost:4000/system/graphql`, `http://localhost:4000/database/graphql`). Each realm has its own GraphQL endpoint, and each realm requires its own JWT. 
14. Visit `http://localhost:4000/gauze/v1` in the browser. 

## Usage

### CLI
The CLI is the main interface for the framework. The CLI is primarily used to create new projects, manage entity definitions, manage database migrations, and handle the project application. Every project hosts an application. A project contains multiple realms. Realms are processing layers in the framework's architecture, and currently there are 3 main realms: kernel, database, and system. Most application code will be written in the system realm.

### Project
All code for a project was designed to be self-contained, so creating a new project is akin to ejecting from a kernel (such that the project has its own kernel). The root level directories in a project all have significance. `abstract` hosts abstract definitions like errors and entities. `command` hosts CLI commands. `database` is the database realm, and primarily concerns itself with dealing with an underlying database. The framework currently uses SQL as the database. `environment` is the environment realm, and is the initial external interface for an agent. An agent authenticates in the `environment` realm before interacting with other realms. `kernel` hosts the kernel, which contains the majority of the framework code. `structure` hosts structural information for the entities, such that they can be turned into models that interact with a database. `system` is the system realm, and is the realm in which most application code will be written. `views` hosts the user interface for the project. Every realm contains the three directories: `controllers`, `interfaces`, and `models`. Every structural realm (such as `abstract` and `structure`) contains the three directories: `entities` (for entity definitions), `gauze` (for framework definitions), `project` (for project definitions). The `views` realm contains two directories: `gauze` (for internal framework user interface), and `project` (for project specific user interface). Every project can contains multiple systems (not to be confused with the system realm), which are basically modular projects.

### Realm
A realm is a processing layer in the framework, and also a self-contained API layer. Every realm interacts with realms below it, but never with realms above it. In a way, realms are an extension of the import hierarchy for the framework. Every realm contains its own GraphQL schema, and every realm can handle GraphQL queries from realms above it. As an example, the system realm interacts with the database realm to store and retrieve model data. Every realm requires its own JWT to interact with directly, but applications should be engineered to mostly interact with the system level realm. Realms can have specific authentication requirements. There are three primary realms currently: `kernel`, `database`, and `system`.

### Agent
An agent is someone who interacts with the system. The system is represented by the system realm, and each project can be thought of as a system that can be used along other systems. Five agent types are created when signing up: the root agent, the account agent, the user agent, the person agent, and the character agent. Entities and realms can be limited to particular agents. Currently, there is an informal hierarchy in that accounts should be thought of as holding users, and persons should be thought of as holding characters. An account is the internal representation of identity (self-contained) and a person is the external representation of identity (not self-contained).

### Entity
Entities are abstract definitions of data. An entity definition is turned into a useable model in the framework. Every entity currently supports five methods: create, read, update, delete, and count. Method access on entities are controlled by either whitelists or blacklists, dependening on whether the method is public or private. If a method is private, then whitelists are used to allow access. If a method is public, then blacklists are used to disallow access. Relationships are defined between entities to allow graph traversal. Whitelists and blacklists have their own hierarchy for self-management. There are three levels of authority: root, trunk, and leaf. There is only one root and it associated with whoever creates a piece of data. Trunk can manage other trunks and leaves. Leaf level cannot manage anyone else.

## Development Commands

- `npm run start`
	- Starts the `gauze` server on port `4000`
- `npm run start-graphiql`
	- Starts three `graphiql` instances on port `4001` (`database` realm), `4002` (`system` realm), and `4003` (`environment` realm)
- `npm run start-ui`
	- Builds the web interface and recompile the application on code change
- `npm run serve-ui`
	- Serves the built web interface application on port `3000`

## Gauze Commands

- `npx gauze migrate run`
- `npx gauze migrate make { migration_name }`
- `npx gauze create project`
- `npx gauze create entity { project_directory } { entity_json }`
- `npx gauze application build`
- `npx gauze application serve`
- `npx gauze application watch`
- `npx gauze project { project_directory }`

## Entity Definition

Example definition can be found in [here](./gauze/entity.js):
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
- `name` is the name of the entity and it determines the structure of the autogenerated code
- `table_name` should align with the SQL table name in the migration file
- `primary_key` should align with the primary key for the table in the migration file
- `graphql_meta_type` is a framework specific type identifier
- `default_order` is the default sort order for queries
- `default_order_direction` is the default sort order direction for queries (either `asc` or `desc`)
- `field.name` is the name of the field and it determines the structure of the autogenerated code
- `field.indexed` specifies whether the field is indexed or not (which is used for querying by attribute values)
- `field.required` specifies whether the field is required for creation or not
- `field.sql_type` is a framework specific type identifier for the field
- `field.graphql_type` is a reference to a graphql type definition, which will usually be a scalar value type
- `field.graphql_type_parameters` is a reference to the parameters passed to the function defined in `field.graphql_type`, which ultimately returns a GraphQL type
- `field.description` is a framework specific field description
- `field.pre_serialize_middlewares` is an array of pre-serialize middlewares, which will be run in order
- `field.serializers` is an array of serializers, which will be run in order
- `field.post_serialize_middlewares` is an array of post-serialize middlewares, which will be run in order
- `field.pre_deserialize_middlewares` is an array of pre-deserialize middlewares, which will be run in order
- `field.deserializers` is an array of deserializers, which will be run in order
- `field.post_deserialize_middlewares` is an array of post-deserialize middlewares, which will be run in order
- `field.allowed_agent_types` is an array of allowed agent types for the field
- `method.name` is the name of the method
- `method.privacy` is privacy mode for the method (either `public` or `private`)
- `method.allowed_agent_types` is an array of allowed agent types for the method

