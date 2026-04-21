# Abstract Errors

Gauze keeps abstract error definitions in flat files so error codes can remain monotonic and predictable. The framework ships with its own abstract error registry, and projects can reserve their own error codes in a separate project-level file.

## The Two Error Files

The current source tree has two main abstract error registries:

- `src/abstract/gauze/errors.js` is for framework-provided Gauze errors.
- `src/abstract/project/errors.js` is for project-specific abstract errors.

This separation keeps framework errors and project errors from competing for the same range.

## Reserved Code Ranges

The code comments in those files define the intended ranges:

- `src/abstract/gauze/errors.js` reserves `0` through `999` for abstract-level Gauze errors.
- `src/abstract/project/errors.js` reserves `1000` through `1999` for project abstract errors.

The same files also note higher ranges for other realms such as kernel, database, system, and server.

The practical rule is simple: if you add a new project abstract error, add it to `src/abstract/project/errors.js` and keep the numeric sequence increasing.

## What a Gauze Abstract Error Looks Like

The built-in Gauze errors are constructor functions that create `Error` objects and attach a structured `extensions` payload. That payload usually includes:

- A stable numeric `code`.
- A stable abstract `name`.
- A human-readable `readable` message.

Some Gauze error helpers also attach extra context such as entity data, field data, or GraphQL type metadata. Those fields are optional and depend on the higher-order function that creates the error and the inputs passed into it.

That shape is useful because a GraphQL client can inspect more than just the top-level error message.

## Current Built-In Abstract Errors

The framework currently defines a small set of field-oriented abstract errors:

- `ID_REGEX__ERROR__GAUZE__ABSTRACT`
- `STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT`
- `STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT`
- `UNIQUE_CONSTRAINT__ERROR_GAUZE__ABSTRACT`

These are mostly used by scalar validation and field constraint handling.

## How Errors Reach GraphQL

The built-in scalar factories throw these abstract errors during `parseValue`. For example:

- The ID scalar throws an abstract error when a value is not a UUID.
- The string scalar throws abstract errors when the value is shorter or longer than the configured limits.

Because those thrown values are ordinary `Error` objects with an `extensions` payload, GraphQL responses can surface both the message and the structured metadata.

## When to Add Project Errors

Add a project abstract error when you need a stable, reusable failure type that belongs to the project's own domain rules rather than Gauze itself.

Examples include:

- Domain-specific validation failures.
- Project-specific scalar rules.
- Custom abstract helpers that need stable error codes.

If the error is framework-generic, it belongs with Gauze. If it is specific to one project's domain or extensions, it belongs in the project file.

## Related Pages

- Read [GraphQL Scalars](./graphql-scalars.md) for where several built-in abstract errors are used.
- Read [Create a Definition](../entity/definition.md) for how field definitions attach GraphQL scalar behavior.
- Read [HTTP & GraphQL](../runtime-and-graphql.md) for the runtime GraphQL surface that returns these errors.
