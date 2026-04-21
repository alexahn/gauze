# Kernel

The kernel is the part of Gauze that ties the framework together. If the realm directories are the visible application layers, the kernel is the shared machinery underneath them.

For contributors and maintainers, the kernel is where many of the framework's most important behaviors live:

- It contains shared managers and orchestration logic.
- It contains internal entity, model, and controller infrastructure.
- It contains routing, server, and environment support code that higher layers depend on.
- It contains the scaffolding and staged generation logic used to build or update projects.

## What Lives in the Kernel

The kernel source lives under `src/kernel/`. The major areas are:

- `src/kernel/bin/` contains helper scripts used during project creation and update flows.
- `src/kernel/src/applications/` contains application-level managers and orchestration code.
- `src/kernel/src/database/` contains shared database management logic.
- `src/kernel/src/environment/` contains shared environment-layer support used by the framework.
- `src/kernel/src/entities/`, `src/kernel/src/models/`, and `src/kernel/src/controllers/` contain core framework-side domain logic.
- `src/kernel/src/interfaces/` and `src/kernel/src/servers/` contain shared HTTP and GraphQL interface plumbing.
- `src/kernel/src/stages/` contains staged generation data used by the project scaffolding flow.

That means the kernel is not one narrow subsystem. It is the shared implementation layer that supports project generation, routing, realm behavior, and lower-level framework internals.

## How to Think About It

A useful mental model is:

- `src/database/`, `src/system/`, and `src/environment/` are the public framework realms.
- `src/kernel/` is the internal framework substrate that helps those realms work consistently.

When you are changing framework behavior that should affect multiple realms or multiple generated projects, the kernel is often the right place to look first.

## Key Areas to Inspect

If you are trying to understand the kernel, these are good starting points:

- Review `src/kernel/src/applications/manager.js` to understand project creation and orchestration.
- Review `src/kernel/src/database/manager.js` to understand shared database validation and shard routing.
- Review `src/kernel/src/servers/http.js` to understand server assembly and request handling.
- Review `src/kernel/bin/` to understand how framework updates and project scaffolding are executed.
- Review `src/kernel/src/stages/` if you are tracing how generated project structure is assembled over time.

## Kernel and Project Upgrades

The practical expectation for Gauze upgrades should be simple:

upgrading a project's Gauze version should largely be the same as replacing the project's `kernel/` directory with the new `kernel/` directory.

That expectation matters because it keeps framework updates conceptually clean. The kernel should behave like the replaceable implementation core of the generated project, rather than a directory that requires heavy manual merging every time the framework changes.

In practice, that means:

- Kernel changes should stay focused on shared framework behavior.
- Project-specific customizations should avoid depending on ad hoc kernel edits when possible.
- Upgrades should trend toward replacing the kernel wholesale, then validating that the project still behaves correctly.

This does not mean every upgrade is trivial. But it does set the design expectation: the kernel should be structured so replacement is the normal upgrade path.

## What This Implies for Contributors

If you are working on Gauze itself, try to treat the kernel as a stable upgrade unit.

That means:

- Prefer changes that keep the kernel internally coherent.
- Avoid scattering essential kernel behavior across unrelated project directories.
- Be cautious about upgrade paths that would force users into manual, file-by-file reconciliation inside `kernel/`.

If replacing `kernel/` stops being a reasonable mental model, the framework becomes harder to maintain and harder to upgrade.

## Related Pages

- Read [Framework Source](./source-layout.md) for the broader framework repository layout.
- Read [Project Overview](../project/overview.md) for how generated projects are organized.
- Read [Realm Overview](../realm/overview.md) for how the visible realm layers relate to the framework internals.
