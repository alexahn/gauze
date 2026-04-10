# Scaling

## Sharding

We're not sure if keeping an LRU cache of database connections is feasible. On the other end, we can create and destroy a database connection on every request. Look into latency for creating a connection on major databases (like PostgreSQL). PostgreSQL for example should have around the max of 100 connections, or ((core_count * 2) + effective_spindle_count) connections. This introduces an architecture limit in that we probably want the same number of application servers as the maximum connection limit per PostgreSQL server. The reason is that any more, and we potentially risk failing to create a connection for every application server. Geographic grouping may be a way around this, but for now, sharding will be done logically by primary keys.

## Connection Pooling

Gauze assumes there is a connection pooler in front of the database server, such as PgBouncer or RDS Proxy. Without a connection pooler, the number of application connections per database server is limited. PgBouncer and RDS Proxy can handle more than 10000 application connections per instance. There should be a connection pooler in front of every read slave and write master.

## Rewrite

Most of Gauze's code is already hardened, and introducing sharding will require substantial changes to the kernel models. More importantly, it will break the concept of pagination, as the number of elements returned for a query will depend on the number of sharded servers involved in the query. A complete rewrite of the project in TypeScript may be more productive. We can replace Knex with Kysely during the rewrite. We can recycle most of the architecture from Gauze.
