# Scaling

## Sharding

We're not sure if keeping an LRU cache of database connections is feasible. On the other end, we can create and destroy a database connection on every request. Look into latency for creating a connection on major databases (like PostgreSQL). PostgreSQL for example should have around the max of 100 connections, or ((core_count * 2) + effective_spindle_count) connections. This introduces an architecture limit in that we probably want the same number of application servers as the maximum connection limit per PostgreSQL server. The reason is that any more, and we potentially risk failing to create a connection for every application server. Geographic grouping may be a way around this, but for now, sharding will be done logically by primary keys.

## Connection Pooling

Gauze assumes there is a connection pooler in front of the database server, such as PgBouncer or RDS Proxy. Without a connection pooler, the number of application connections per database server is limited. PgBouncer and RDS Proxy can handle more than 10000 application connections per instance. There should be a connection pooler in front of every read slave and write master.

## Rewrite

Most of Gauze's code is already hardened, and introducing sharding will require substantial changes to the kernel models. More importantly, it will break the concept of pagination, as the number of elements returned for a query will depend on the number of sharded servers involved in the query. A complete rewrite of the project in TypeScript may be more productive. We can replace Knex with Kysely during the rewrite. We can recycle most of the architecture from Gauze.

## No Rewrite

Although most of the code is hardened, the parts that we need to edit involve logically simple operations. Such as, for all methods on the database kernel, we need to wrap the current implementation as a function that can be called, and introduce a new check at the highest level, which basically checks if the query parameters contain where.id (or whatever the primary key is). If the primary key is included in the where query, we can use the key to find the exact database server to query. If not, we need to apply the query to all database shards for the entity type. The core logical change is easy to understand, the only tedious bits are figuring out where we are instantiating databases and transactions. Instead of instantiating a database once, on application startup we would instantiate a connection per unique shard node. And instead of opening a transaction on every request, we would check to see if an existing transaction is running for the shard node. We need to save all open transactions on the context object, so that we can rollback all of them if there are any failures. For relationship traversal, we would need to get the list of ids that we are able to go to by using the source object's metadata (which contains the direction, entity id, and entity type), and use the set of ids to create a set of shard nodes to transact with.

TypeScript will give us extra guards, but it doesn't really affect codebase architecture. It's mostly good at finding simple mistakes (like mispellings). If it's easier to maximize the codebase architecture without a type system, then it may be worth it to take the risk of allowing simple mistakes to enter the codebase. Ideally all simple mistakes would be caught by tests, since the codebase architecture is leaning towards being able to test the system end to end.

Perhaps there is no solution to returning an arbitrary number of elements for a query (since the number of elements returned will depend on the number of shards involved in a query). Depending on what percentage of lookups are by primary key, this may not be a noticeable problem. 
