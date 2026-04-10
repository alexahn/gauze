# Scaling

## Sharding

We're not sure if keeping an LRU cache of database connections is feasible. On the other end, we can create and destroy a database connection on every request. Look into latency for creating a connection on major databases (like PostgreSQL). PostgreSQL for example should have around the max of 100 connections, or ((core_count * 2) + effective_spindle_count) connections. This introduces an architecture limit in that we probably want the same number of application servers as the maximum connection limit per PostgreSQL server. The reason is that any more, and we potentially risk failing to create a connection for every application server. Geographic grouping may be a way around this, but for now, sharding will be done logically by primary keys.
