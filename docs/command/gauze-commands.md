# Gauze Commands

The Gauze CLI is organized into command families. Each family handles one kind of framework or project operation.

For a new user, the most useful commands are usually the ones that create a project, initialize the database, and start the server.

## Create a Project

Use this command to scaffold a new Gauze project:

```sh
npx gauze create project ./my-app
```

This creates a self-contained project directory with its own kernel, realms, CLI surface, and UI structure.

## Run Commands Against a Project

Once a project exists, the most common pattern is:

```sh
npx gauze project ./my-app <subcommand>
```

That form forwards command execution into the generated project.

Examples:

```sh
npx gauze project ./my-app migrate run
npx gauze project ./my-app seed run
npx gauze project ./my-app application serve
```

## Main Command Families

The CLI source shows several major command groups:

- `create` handles creation tasks such as creating a project or entity.
- `read` handles read-style inspection commands.
- `delete` handles delete-style commands.
- `migrate` handles migration creation and execution.
- `seed` handles seed creation and execution.
- `shard` handles shard planning commands.
- `application` handles serving, building, and watching the app.

## Common Migration Commands

These are common migration commands:

```sh
npx gauze project ./my-app migrate make create_article
npx gauze project ./my-app migrate run
npx gauze project ./my-app migrate current --format json
npx gauze project ./my-app migrate list --format json
```

Use these when you are changing schema or checking migration state.

## Common Seed Commands

These are common seed commands:

```sh
npx gauze project ./my-app seed make demo_users
npx gauze project ./my-app seed run
```

Use these when you want to create or load environment-specific seed data.

## Common Application Commands

These are common application commands:

```sh
npx gauze project ./my-app application serve
npx gauze project ./my-app application build
npx gauze project ./my-app application watch
```

Use these when you want to run the server or rebuild application assets.

### How `application serve` Starts the Server

The `application serve` command creates a Koa app, loads the root router, and mounts the routes for each realm before listening on the configured port.

```js
import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";

import * as $gauze from "./../../index.js";
import Router from "./../../router.js";

const app = new Koa();
const router = Router($gauze);

app.use(koaBody());
app.use(cors());
app.use(router.routes());

app.listen(argv.port);
```

At the root router level, Gauze then mounts the realm routers:

```js
ROUTER.use("/system", ROUTER__SYSTEM($gauze).routes());
ROUTER.use("/database", ROUTER__DATABASE($gauze).routes());
ROUTER.use("/environment", ROUTER__ENVIRONMENT($gauze).routes());
```

That is why `application serve` is more than just a generic HTTP start command. It assembles the project's realm-aware route structure and turns it into a running Koa application.

## Common Shard Commands

These are common shard commands:

```sh
npx gauze project ./my-app shard plan 4 --format json
npx gauze project ./my-app shard plan 4 --order time --format json
```

Use these when you want to inspect possible shard layouts before changing database configuration.

## Choosing the Right Command Surface

A useful rule is:

- Use `npx gauze create project ...` when you are creating a new project.
- Use `npx gauze project <dir> ...` for most work inside an existing project.

That distinction keeps the CLI model predictable.

## Related Pages

- Read [Command Overview](./overview.md) for the broader role of the command layer.
- Read [Quick Start](../getting-started.md) for the first commands most users will actually run.
- Read [Database Overview](../database/overview.md) if you are using migration, seed, and shard commands to manage data.
