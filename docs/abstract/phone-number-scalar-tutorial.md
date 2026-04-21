# Phone Number Scalar Tutorial

This tutorial shows how to add a project-specific GraphQL scalar for phone numbers and use it in an entity definition. The goal is to keep phone-number validation reusable instead of repeating regex checks across multiple entity files.

## What You Are Building

In this tutorial, you will:

- Create a project-level phone number scalar module.
- Export it through the project scalar index.
- Reference it from an entity field.
- Pass scalar parameters for validation when needed.

This follows the same abstract scalar pattern that Gauze uses for its built-in `id`, `date`, and `string` scalars.

## Where the Scalar Belongs

Project-specific GraphQL scalars belong under:

```text
abstract/project/types/graphql/scalars/
```

For this example, create:

```text
abstract/project/types/graphql/scalars/phone_number.js
```

## Create the Scalar Module

The scalar should follow the same factory shape as the built-in Gauze scalars: it receives `entity`, `field`, and `params`, then returns a `GraphQLScalarType`.

Example:

```js
import { GraphQLScalarType } from "graphql";
import { v4 as uuidv4 } from "uuid";

function SCALAR__PHONE_NUMBER__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT(entity, field, params = {}) {
	const {
		regex = /^\+?[1-9]\d{1,14}$/,
		normalize = true,
	} = params;

	const id = uuidv4().replaceAll("-", "");

	const scalar = new GraphQLScalarType({
		name: ["SCALAR__PHONE_NUMBER__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT", id].join("___"),
		description: "Project Phone Number Scalar",
		serialize: function (value) {
			return value;
		},
		parseValue: function (value) {
			const parsed = normalize ? String(value).replaceAll(/[\s()-]/g, "") : String(value);

			if (!regex.test(parsed)) {
				throw new Error(`Invalid phone number for field ${field.name}`);
			}

			return parsed;
		},
		parseLiteral: function (ast) {
			return ast.value;
		},
	});

	scalar.match_value = function (value) {
		return typeof value === "string";
	};

	scalar.match_ast = function () {
		return true;
	};

	scalar.params = params;
	return scalar;
}

export { SCALAR__PHONE_NUMBER__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT };
```

This example normalizes spaces, parentheses, and dashes before validation, then validates against a default E.164-style pattern.

## Export the Scalar

After creating the scalar module, export it from:

```text
abstract/project/types/graphql/scalars/index.js
```

Example:

```js
export * as phone_number from "./phone_number.js";
```

If the higher-level `index.js` files in your project are not already exporting the scalar namespace, update them as well so the scalar becomes reachable through `$abstract.project.types.graphql.scalars`.

## Use the Scalar in an Entity

Once the scalar is exported, an entity field can reference it directly.

Example:

```js
app__contact__phone_number: {
	name: "app__contact__phone_number",
	indexed: true,
	required: true,
	sql_type: "string",
	graphql_type: $abstract.project.types.graphql.scalars.phone_number.SCALAR__PHONE_NUMBER__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT,
	graphql_type_parameters: {
		normalize: true,
	},
	description: "phone_number",
	pre_serialize_middlewares: [],
	serializers: [],
	post_serialize_middlewares: [],
	pre_deserialize_middlewares: [],
	deserializers: [],
	post_deserialize_middlewares: [],
	allowed_agent_types: ["gauze__agent_user"],
},
```

That keeps the entity definition declarative. The entity points at the scalar factory, and the scalar handles validation and normalization.

## Adding Project-Specific Errors

If you want the phone number scalar to throw structured project errors instead of plain `Error` values, add a helper in:

```text
abstract/project/errors.js
```

Example:

```js
const PHONE_NUMBER_FORMAT__ERROR__PROJECT__ABSTRACT = function ({ entity, field, value, regex }) {
	const err = new Error(`Invalid phone number format for value: ${value}`);

	err.extensions = {
		code: 1000,
		name: "PHONE_NUMBER_FORMAT__ERROR__PROJECT__ABSTRACT",
		readable: "Field must be a valid phone number",
		regex: regex.toString(),
	};

	if (entity) {
		err.extensions.entity = {
			name: entity.name,
		};
	}

	if (field) {
		err.extensions.field = {
			name: field.name,
			graphql_type: field.graphql_type?.name,
			graphql_type_parameters: field.graphql_type_parameters,
		};
	}

	return err;
};

export { PHONE_NUMBER_FORMAT__ERROR__PROJECT__ABSTRACT };
```

This example uses project error code `1000`, which fits the abstract project range documented in `abstract/project/errors.js`.

Then import that helper into the scalar module and call it from `parseValue`.

Example:

```js
import { GraphQLScalarType } from "graphql";
import { v4 as uuidv4 } from "uuid";

import { PHONE_NUMBER_FORMAT__ERROR__PROJECT__ABSTRACT } from "./../../errors.js";

function SCALAR__PHONE_NUMBER__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT(entity, field, params = {}) {
	const {
		regex = /^\+?[1-9]\d{1,14}$/,
		normalize = true,
	} = params;

	const id = uuidv4().replaceAll("-", "");

	const scalar = new GraphQLScalarType({
		name: ["SCALAR__PHONE_NUMBER__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT", id].join("___"),
		description: "Project Phone Number Scalar",
		serialize: function (value) {
			return value;
		},
		parseValue: function (value) {
			const parsed = normalize ? String(value).replaceAll(/[\s()-]/g, "") : String(value);

			if (!regex.test(parsed)) {
				throw PHONE_NUMBER_FORMAT__ERROR__PROJECT__ABSTRACT({
					entity,
					field,
					value: parsed,
					regex,
				});
			}

			return parsed;
		},
		parseLiteral: function (ast) {
			return ast.value;
		},
	});

	scalar.match_value = function (value) {
		return typeof value === "string";
	};

	scalar.match_ast = function () {
		return true;
	};

	scalar.params = params;
	return scalar;
}

export { SCALAR__PHONE_NUMBER__SCALAR__GRAPHQL__TYPE__PROJECT__ABSTRACT };
```

This is the better choice when you want stable error codes or additional metadata in GraphQL responses.

The exact inputs to the higher-order error helper can vary. Some projects attach only a code and a readable message, while others also attach entity or field context when that information is available.

## When to Use Scalar Parameters

Use `graphql_type_parameters` when different fields need slightly different phone-number rules.

Examples include:

- A field that requires normalization before validation.
- A field that accepts only strict E.164 values.
- A field that uses a project-specific regex for a narrower format.

That keeps one scalar reusable across several entities without duplicating the implementation.

## What to Do Next

After wiring in the scalar:

1. Add the field to your entity definition.
2. Create and run the matching migration.
3. Generate the entity code with `npx gauze project <dir> create entity <project_dir> <entity_file>`.
4. Register the entity in the relevant GraphQL schema files if it is new.

## Related Pages

- Read [GraphQL Scalars](./graphql-scalars.md) for the built-in scalar patterns this tutorial extends.
- Read [Errors](./errors.md) if you want to return structured project error objects.
- Read [Create a Definition](../entity/definition.md) for the full shape of an entity field definition.
