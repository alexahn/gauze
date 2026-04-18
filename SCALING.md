# Scaling

## Connection Pooling

Gauze assumes there is a connection pooler in front of the database server, such as PgBouncer or RDS Proxy. Without a connection pooler, the number of application connections per database server is limited. PgBouncer and RDS Proxy can handle more than 10000 application connections per instance. There should be a connection pooler in front of every read slave and write master. Gauze creates a database connection for every unique shard node configuration. 

## Transactions

Gauze tries to have an all or nothing architecture. In monolithic mode (non-sharded) mode, Gauze has an all or nothing architecture. In sharded mode, Gauze attempts to have an all or nothing architecture by committing or rolling back all involved transactions for a query at the same time. Only valid execution can modify the database. Transaction duration should be minimized to increase performance. Transaction duration is proportional to GraphQL query depth (as in how many nested calls there are), as each layer is serial with the previous layer. The total response time for the server request can be an approximation of the transaction duration. We should aim for response times under 1024 milliseconds.

Every shard node defines a transaction isolation level. Practically, every table will have the same transaction isolation level. GraphQL queries should try not to mix transaction isolation levels, because the stricter one could fail to commit, causing inconsistency in the data. The highest transaction isolation levels should ideally be run in isolated GraphQL queries. To minimize the probability of a transaction failing to commit, using a less strict isolation level, such as read committed, is recommended.

## Sharding

Gauze assumes every table is sharded. Each shard contains the entities whose primary key falls within the range designated by the shard. For monolithic applications, we can define a single shard for every table, which spans the entire key range. There is a helper CLI command `npx gauze shard plan` which can help determine the shard ranges. The sharding strategy is the halve the existing ranges for the shards and to create new shards with the remaining ranges, such that there are two shards that cover the range of one previous shard.

Each shard assumes there are a pool of read slaves and write masters. There should ideally only be one write master. The read slaves should be configured to replicate the write master, either through WAL (write ahead log) or physical replication of the storage device. Every shard node (both read slaves and write master) should have the same table schemas and migration table.

Sharding should mostly be used to increase write throughput. Read slaves can be used to increase read throughput. Sharding is done by the primary key of the entity. For queries that involve the primary key, such as `where[primary_key]` or `where_in[primary_key]`, the connection router will return the set of shard nodes to query. For generic queries that don't specify any primary key identifiers, the default behavior is to return all shard nodes. Be careful when constructing queries that do not involve the primary key, because performance will degrade to as if the database is monolithic (due to every shard node being involved in the query).

Sharding for read queries only scales when the average number of relationships an entity has is much lower than the number of total shards for an entity, assuming that most data is queried through relationships to initial agent entities. The average number of relationships an entity has will in general determine the average number of shard nodes involved in a query.

Pagination is broken in a sharded configuration (limit and offset do not work as expected) because each query is mapped to every shard node involved, and the results are concatenated together. We expect queries to return n * limit where n is the number of shard nodes involved in a query. The only reliable way to know when one has reached the end of pagination is when the server returns an empty response.

The relationship entity stores its data on both the "to" entity's node, and the "from" entity's node, along with the table for the relationship itself. The whitelist entity stores its data on both the "entity" entity and the "agent" entity, along with the table for the whitelist itself. Blacklist follows the same pattern as whitelist.
