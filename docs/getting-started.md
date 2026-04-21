# Quick Start

## Install Gauze

```sh
npm install @ahn/gauze
```

## Scaffold a Project

Create a new project directory:

```sh
npx gauze create project ./my-app
```

This creates a runnable Gauze project in `./my-app`.

## Move Into the Project

```sh
cd my-app
```

## Add `.env`

Create `.env` in the project root.

Use development settings that include:

- Set `GAUZE_ENV="development_monolithic"`.
- Set `GAUZE_SERVER_HOST="localhost"`.
- Set `GAUZE_SERVER_PORT="4000"`.
- Set JWT secrets for the `database`, `system`, and `environment` realms.

## Initialize the Database

Run migrations and seed data:

```sh
npx gauze project . migrate run
npx gauze project . seed run
```

## Build the Frontend Assets

Build the bundled frontend assets with:

```sh
npx gauze project . application build
```

This generates the frontend build output for the Gauze and project UIs.

## Start the Server

```sh
npx gauze project . application serve
```

The HTTP server starts on port `4000` by default.

## Useful Next Commands

After the server is running, the next commands people usually reach for are:

- Use `npx gauze project ./my-app migrate list` to see which migrations exist.
- Use `npx gauze project ./my-app migrate current --format json` to inspect the current migration state.
- Use `npx gauze project ./my-app seed run` to reload seed data when you need a fresh development dataset.
- Use `npx gauze project ./my-app shard plan 4 --format json` to preview a four-shard layout before moving beyond a monolithic database.

All of these commands follow the same pattern:

```sh
npx gauze project <dir> <subcommand>
```

That means you can run project commands from anywhere as long as you point Gauze at the project directory.
It is also equivalent in spirit to calling the generated project CLI entrypoint directly with `node ${project_dir}/command/gauze.js`, because `gauze project` hands execution off to the project's own command layer.
