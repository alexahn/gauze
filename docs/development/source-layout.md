# Framework Source

This section is for contributors working on Gauze itself rather than application authors using `npx gauze`.

## Repository Layout

The framework source lives under `src/`. Major areas include:

- Use `src/command/` for CLI command definitions.
- Use `src/kernel/` for framework internals, managers, routing helpers, and authorization logic.
- Use `src/abstract/` for built-in entity definitions, scalars, enums, and shared abstractions.
- Use `src/database/`, `src/system/`, and `src/environment/` for framework realm implementations.
- Use `src/views/` for bundled browser UIs.

## Scaffold Internals

`npx gauze create project <dir>` is backed by the project creation flow in the framework source. The generated project structure comes from the framework's source templates and scaffold scripts.

## Source-Level References

If you are extending Gauze itself, these areas are the main reference points:

- Review the CLI entrypoints in `src/command/`.
- Review the project scaffolding code in `src/kernel/src/applications/manager.js` and `src/kernel/bin/`.
- Review HTTP routing and transaction handling in `src/router.js` and `src/kernel/src/servers/http.js`.
- Review database validation and shard routing in `src/kernel/src/database/manager.js`.
- Review the built-in entity and scalar definitions in `src/abstract/`.

## Built-in Examples

Useful built-in references while developing Gauze:

- Review `src/abstract/entities/entity.js` for a built-in entity example.
- Review `src/abstract/entities/agent_user.js` for an agent-focused entity example.
- Review `src/abstract/entities/secret.js` for another built-in entity example.
- Review `src/abstract/gauze/types/graphql/scalars/` for built-in scalar implementations.
