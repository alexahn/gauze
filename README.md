# gauze

A GraphQL server architecture.

## Prerequisites

- `nodejs` version `21.7.3`

## Usage

1. Create a project using the CLI: `npx gauze create project { project_directory }`
2. Update `example.env` and rename to `.env`
3. Update `example.json` and rename `{ entity_name }.js`
4. Create the migration file for your entity: `npx gauze project { project_directory } migrate make { entity_name }`
5. Update `{ project_directory }/database/migrations/.*{ entity_name }.js`
6. Run the migration file: `npx gauze project { project_directory } migrate run`
7. Create the project code for your entity: `npx gauze project { project_directory } create entity { project_directory } { entity_name }.json`
8. Update `{ project_directory }/database/interfaces/graphql/schema.js` to register your entity
9. Update `{ project_directory }/system/interfaces/graphql/schema.js` to register your entity
10. Update `{ project_directory }/structure/relationships.js` to define your relationships
11. Build the frontend application: `npx gauze project { project_directory } application build`
12. Run the server: `npx gauze project { project_directory } application serve`
13. Send GraphQL queries to the server (`http://localhost:4000/environment/graphql`, `http://localhost:4000/system/graphql`, `http://localhost:4000/database/graphql`)
14. Visit `http://localhost:4000/gauze/` in the browser

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

