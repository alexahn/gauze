# Abstract Overview

The `abstract` layer is where Gauze keeps atomic definitions before they are turned into runtime structure. In a generated project, this is the part of the system where you describe entities, framework-level types, and project-specific abstract extensions.

For a new user, the simplest mental model is:

- `abstract/` describes what exists.
- `structure/` turns those descriptions into generated shared modules.
- The runtime realms then use that generated structure to expose behavior.

## What Lives in the Abstract Layer

The framework's own source tree makes that split visible:

- `src/abstract/entities/` contains entity definitions.
- `src/abstract/gauze/` contains framework-provided abstract definitions such as GraphQL types, middleware helpers, serializers, and errors.
- `src/abstract/project/` is where a project can add its own abstract extensions.

The project overview in Gauze uses the same idea. `abstract/` is the place for source definitions, not the final runtime implementation.

## Why Gauze Separates Abstract from Structure

Gauze does not treat entity definitions as the finished model. An entity definition is abstract metadata that still needs to be combined with generated structure and a concrete database.

That separation matters because it keeps a few concerns distinct:

- Abstract definitions stay small and declarative.
- Generated structure can be rebuilt consistently.
- Runtime realms do not need to hand-author every GraphQL field and operation.

This is one of the core design ideas in the framework.

## How Entity Definitions Use Abstract Modules

Entity definitions receive `$abstract` and use it to reference shared building blocks. In practice, that usually means:

- GraphQL scalar factories from `$abstract.gauze.types.graphql.scalars`.
- Framework middlewares, serializers, and deserializers from `$abstract.gauze`.
- Project-specific extensions from `$abstract.project`.

That is why examples in the entity docs reference names such as `$abstract.gauze.types.graphql.scalars.string...` instead of importing GraphQL scalars directly in every entity file.

## Abstract in a Generated Project

In a generated project, the `abstract/` directory is typically the part you edit when you are describing domain concepts:

- Add entity definitions in `abstract/entities/`.
- Add project-specific abstract GraphQL types under `abstract/project/types/`.
- Add project-specific abstract errors in `abstract/project/errors.js`.

By contrast, directories such as `database/`, `system/`, and `environment/` are where the running application behavior lives.

## Reading Order

If you are learning the abstract layer for the first time, this order usually works well:

1. Read [Create a Definition](../entity/definition.md) to see how an entity file is shaped.
2. Read [GraphQL Scalars](./graphql-scalars.md) to understand the shared scalar factories used in fields.
3. Read [Errors](./errors.md) to see how Gauze attaches structured error metadata to validation failures.

## Related Pages

- Read [Create a Definition](../entity/definition.md) for the concrete entity definition format.
- Read [Generate Project Code](../entity/generate-project-code.md) for what happens after abstract definitions are in place.
- Read [Project Overview](../project/overview.md) for how `abstract/` fits into the generated project layout.
