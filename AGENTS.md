# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the framework and CLI entrypoints. The main command lives at `src/command/gauze.js`; domain layers are split across `src/kernel/`, `src/database/`, `src/environment/`, and `src/system/`. Frontend code lives under `src/views/`, with the active project UI in `src/views/project/src/` and generated build output in `src/views/*/build/`. Tests live in `test/` and are organized by subsystem (`database`, `system`, entity name) with step-style files such as `0.create.js`, `1.update.js`. Docs live in `docs/`, with higher-level design notes in `README.md`, `ARCHITECTURE.md`, and `SCALING.md`.

## Build, Test, and Development Commands
Use Node `22.18.0` as declared in `package.json`.

- Run `npm ci` to install exact dependencies.
- Run `npm run start` to start the server watcher, UI watchers, and GraphiQL instances together.
- Run `npm run watch-server` to start the backend on port `4000` and restart on `src/` changes.
- Run `npm run build-ui` to build the UI bundles under `src/views/*/build/`.
- Run `npm test` to execute both `test-monolithic` and `test-sharded`.
- Run `make format` to apply ESLint and then Prettier to `package.json`, `eslint.config.js`, `src/`, `test/`, and `gauze/`.

## Coding Style & Naming Conventions
This repo uses ESM (`"type": "module"`). Prettier is configured for tabs, width `4`, no semicolon elision, double quotes, and trailing commas; follow `.prettierrc.js`. Keep filenames lowercase with underscores where already established (`agent_account.js`, `environment_development_monolithic_config.js`). Export entry modules through local `index.js` files when extending a package subtree. Run `make format` before submitting changes.

## Testing Guidelines
Add or update tests in the nearest existing `test/` subtree for the affected realm. Follow the existing numbered-step pattern when a scenario spans setup, mutation, and readback. Run `npm test` locally before opening a PR; this is the same check executed in GitHub Actions after copying `env/development.env` to `.env`.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit messages such as `update README.md` or `allow arbitrary fields on shard node definition`. Keep commits focused and descriptive. PRs should include a concise summary, the affected subsystem or CLI surface, linked issues when applicable, and screenshots only for UI changes. Note any required `.env` or migration steps explicitly.

## Configuration Tips
Treat root-level `*.sqlite3` files and `src/views/*/build/` as generated artifacts. Do not hand-edit them unless the task is explicitly about fixtures or build output.

## Memory
At at time there is a piece of information that would be useful for future prompts regarding the codebase, add it to MEMORY.md. These can be technical notes, motivations, mistakes, etc. For example, if I correct you and ask you to do something another way, find out the motivation and record it in MEMORY.md so you do not make the same mistake in the future. Read MEMORY.md when you read AGENTS.md.
