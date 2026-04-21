# Command Overview

The command layer is how you interact with Gauze as a tool. It is the part of the framework that turns project structure into a usable CLI workflow for creating projects, running migrations, generating entities, starting servers, and inspecting state.

For a new user, the main idea is simple:

- `npx gauze ...` is the entrypoint.
- Some commands operate on Gauze itself.
- Some commands hand off to a generated project's own CLI.

This matters because a Gauze project is designed to be self-contained. After you create a project, many commands are meant to run through that project's command surface rather than only through the top-level package.

## The Main Command Entry Points

The command source lives under `src/command/`. The key files are:

- `src/command/gauze.js`, which is the main CLI entrypoint.
- `src/command/gauze/project.js`, which hands control off to a generated project's CLI.
- `src/command/application/`, which contains commands for serving, building, and watching the application.
- `src/command/gauze/create/`, `migrate/`, `seed/`, and `shard/`, which contain the main command families.

This structure mirrors the user experience. The CLI is grouped by concern rather than by one flat list of unrelated commands.

## Two Common Modes of Use

There are two very common ways to use the CLI:

1. Use `npx gauze create project ./my-app` to create a new project.
2. Use `npx gauze project ./my-app ...` to run commands against that generated project.

That second form is important. It means the generated project becomes its own command target.

## Why the Command Layer Matters

In Gauze, the CLI is not a thin convenience wrapper. It is part of the framework's workflow model.

The command layer is how you usually:

- Create projects.
- Generate or inspect entities.
- Create and run migrations.
- Create and run seeds.
- Plan shard layouts.
- Start or build the application.

Because of that, understanding the command layer gives you a practical understanding of how Gauze expects a project to evolve over time.

## A Good Mental Model

If you are new to Gauze, think of the command layer as the operational interface to the project.

The docs describe the structure of entities, realms, databases, and projects. The commands are how you actually act on that structure.

## Related Pages

- Read [Gauze Commands](./gauze-commands.md) for the main command families and common examples.
- Read [Quick Start](../getting-started.md) for the first commands most users should run.
- Read [Project Overview](../project/overview.md) for what those commands operate on.
