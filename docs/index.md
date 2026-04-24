<h1 style="display: flex; align-items: center; gap: 0.5rem;">
	<img src="/logo.svg" alt="Gauze logo" width="64" height="64" />
	<span>Gauze</span>
</h1>

```sh
npm install @ahn/gauze
```

Gauze is for teams who want GraphQL to come with an application structure, not just a resolver layer. Instead of hand-assembling schema files, auth flows, CRUD wiring, and project conventions around a server, you start with a generated project that already has a CLI, realm boundaries, migrations, GraphQL endpoints, and a frontend shell.

What makes Gauze compelling is that it turns definitions into working application code:

- Define an entity once and generate the surrounding models, controllers, schema modules, and GraphQL operations.
- Keep authentication, sessions, agent identity, and access control in the framework so every project starts from the same security model.
- Represent relationships explicitly and traverse them through nested GraphQL queries and mutations.
- Isolate external access, application workflows, and lower-level data access into separate realms so the system stays structured as it grows.
- Begin with a simple monolithic database layout and keep a path to shard-aware routing and transaction coordination when scale starts to matter.

The fastest way to get Gauze running is: create a project, add `.env`, run migrations, seed the database, and start the server.

## Read Next

- [Quick Start](./getting-started.md) for installation, project creation, `.env`, migrations, seeds, and serving.
- [Project Overview](./project/overview.md) for the structure Gauze creates for you.
- [Create a Definition](./entity/definition.md) for the entity format Gauze builds from.
- [Generate Project Code](./entity/generate-project-code.md) for turning that definition into runtime code.
- [GraphQL Overview](./graphql/overview.md) for endpoints, realms, bearer tokens, and request behavior.
- [HTTP & GraphQL](./runtime-and-graphql.md) for starting the HTTP server and frontend build commands.
- [Database Overview](./database/overview.md) for how Gauze stores data, configures environments, and grows into sharding.
- [Development](./development/source-layout.md) for framework internals and contribution work.
