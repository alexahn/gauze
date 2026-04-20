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

## Start the Server

```sh
npx gauze project . application serve
```

The HTTP server starts on port `4000` by default.

## Useful Next Commands

Use `npx gauze project <dir> ...` to work against a project from any directory:

```sh
npx gauze project ./my-app migrate list
```

Common early commands:

```sh
npx gauze project ./my-app migrate current --format json
npx gauze project ./my-app shard plan 4 --format json
```
