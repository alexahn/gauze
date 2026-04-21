# Project Overview

When you run `npx gauze create project ./my-app`, Gauze does not just generate a server entrypoint. It creates an application layout with clear places for definitions, generated structure, realm code, database files, and UI code.

For a new user, the simplest way to think about a Gauze project is:

- `abstract/` is where you describe things.
- `structure/` is where Gauze generates shared structure from those descriptions.
- `database/`, `system/`, and `environment/` are the main runtime layers.
- `views/` contains the browser-facing UI.

## What the Generated Project Gives You

A generated project usually includes these major areas:

- `command/` for CLI entrypoints such as application serving, migrations, seeds, and entity commands
- `abstract/` for entity definition files
- `structure/` for generated GraphQL and SQL structure modules
- `database/` for database interfaces, migrations, seeds, and environment-aware database configuration
- `system/` for system-layer behavior and GraphQL interfaces
- `environment/` for application-facing authentication, sessions, and realm entry
- `views/` for frontend code and frontend build output

That structure matters because Gauze is opinionated about where work belongs. Instead of inventing a layout from scratch, you start with one that already matches the framework's model.

## What New Users Usually Touch First

In the early stages of a project, the most common starting points are:

- `.env` for runtime settings
- `abstract/entities/` for your first entity definitions
- `database/migrations/` and `database/seeds/` for initializing data
- `views/` if you are changing the bundled UI

That is usually enough to get from an empty generated project to a running application with real data.

## How the Layers Fit Together

An entity definition in `abstract/entities/*.js` drives much of the rest of the project:

- `structure/` turns entity metadata into shared constants and generated definitions
- `database/` exposes direct CRUD-style GraphQL operations
- `system/` composes higher-level system behavior on top of the database layer
- `environment/` handles session-aware application entry and authentication flow

This layered layout is one of the central ideas in Gauze. The project structure reflects the runtime architecture.

## How to Read a Gauze Project

If you inherit an existing Gauze project, this is a good first reading order:

1. Look at `.env` to see which environment is active.
2. Look at `gauze.js` to see project-level auth and realm requirements.
3. Look at `abstract/entities/` to see the domain model.
4. Look at `database/` to understand the active database topology.
5. Look at `system/` and `environment/` only after the lower layers are clear.

That order usually reduces confusion because it moves from configuration and source definitions toward generated structure and runtime behavior.

## Why This Matters

Many frameworks give you primitives and leave the project shape open-ended. Gauze takes the opposite approach: the generated project is part of the framework.

That gives you:

- a standard place for core application concerns
- a predictable path from entity definition to runtime behavior
- a clearer boundary between database work, system behavior, and environment entry

## Related Pages

- Read [Configuration](./configuration.md) for the files and settings that control a generated project.
- Read [Generated Project](../project-layout.md) for the original layout reference page.
- Read [Quick Start](../getting-started.md) to scaffold and run a project from scratch.
