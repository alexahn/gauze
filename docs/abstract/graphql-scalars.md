# GraphQL Scalars

Gauze ships with a small set of abstract GraphQL scalar factories that entity definitions reuse instead of hand-defining scalar behavior in each file. These factories live under `src/abstract/gauze/types/graphql/scalars/`.

## Built-In Scalars

The framework currently exports three built-in scalar modules:

- The `id` module provides the built-in ID scalar factory.
- The `date` module provides the built-in date scalar factory.
- The `string` module provides the built-in string scalar factory.

In code, these are exposed through `$abstract.gauze.types.graphql.scalars`.

## How Entity Definitions Use Them

In an entity definition, a field's `graphql_type` points to one of these scalar factory functions. The field can also provide `graphql_type_parameters`, which Gauze passes to the factory as the third argument.

That pattern lets a field stay declarative:

- The entity describes which scalar to use.
- The scalar factory handles parsing and serialization.
- The field can still pass local parameters such as length constraints.

## ID Scalar

The ID scalar is designed for Gauze UUID values.

Its current behavior is:

- Serialize the value as-is.
- Accept input only when it matches a UUID pattern.
- Throw an abstract Gauze error when validation fails.

That makes it a good fit for entity ID fields and other UUID-backed references.

## Date Scalar

The date scalar converts between JSON strings and JavaScript `Date` objects.

Its current behavior is:

- Serialize a `Date` instance to JSON.
- Parse input values into `Date`.
- Reject invalid dates.
- Require ISO-style literal input when parsed from GraphQL AST.

This is the scalar used by built-in timestamp-style fields such as created-at and updated-at definitions.

## String Scalar

The string scalar provides simple length validation.

Its current behavior is:

- Serialize the value as-is.
- Enforce `minimum_length`.
- Enforce `maximum_length`.
- Throw structured abstract Gauze errors when the limits are violated.

If no parameters are passed, it defaults to a minimum of `0` and a maximum of `1024`.

## Why These Scalars Are Factories

Each scalar is created as a function of:

- `entity`, which provides entity-level context.
- `field`, which provides field-level context.
- `params`, which carries scalar-specific configuration.

That design gives the scalar access to field context when it needs to build better errors or apply field-specific rules. It is also why Gauze can include entity and field metadata in abstract error extensions.

## Project-Level Scalars

The project extension path for GraphQL scalars is `src/abstract/project/types/graphql/scalars/`. That directory currently exists as the project namespace for custom scalar definitions.

Use that area when the built-in `id`, `date`, and `string` scalars are not enough and the project needs its own reusable scalar behavior.

## Related Pages

- Read [Abstract Overview](./overview.md) for where abstract GraphQL types fit in the larger architecture.
- Read [Errors](./errors.md) for the structured error objects these scalars can throw.
- Read [Create a Definition](../entity/definition.md) for examples of `graphql_type` and `graphql_type_parameters` on entity fields.
