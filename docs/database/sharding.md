# Database Sharding

Gauze is built so you can begin with one database and still have a structured path into sharding later. Sharding is not a separate product mode. It uses the same environment-driven configuration model as the monolithic setup, but with more shard entries in `current`.

For new users, the most important thing to understand is this:

Gauze shards by UUID range, and each shard definition says which range it owns.

## What “Sharded” Means in Gauze

In a sharded environment, a table can have multiple active shard definitions. Each shard has:

- a UUID `start` bound
- a UUID `end` bound
- read connections
- write connections

When Gauze needs to read or write data, the database manager determines which shard owns the relevant UUID range and routes the operation there.

This means sharding is explicit. It is described in configuration rather than hidden inside custom application code.

## `previous`, `current`, and `next`

These three arrays are the heart of Gauze's shard transition model:

- `current` is the live layout.
- `previous` is the old layout that may still matter during a transition.
- `next` is the planned layout you are moving toward.

That structure is useful because resharding is usually not an instant event. Systems often need a period where old and new layouts both matter.

For a new user, a safe rule is:

- Read from `current` first.
- Treat `previous` and `next` as migration planning tools, not everyday defaults.

## Monolithic Is Still a Valid Start

A monolithic layout is just a special case of the same model: one active shard spanning the full UUID range.

That is why the transition path is coherent. You are not switching to a different architecture later. You are adding more shard definitions to the same configuration shape.

## Planning Shard Ranges

Gauze includes a shard planning command:

```sh
npx gauze project ./my-app shard plan 4 --order time --format json
```

This helps you inspect shard ranges before you rewrite an environment config.

Two useful planning modes are:

- `--order time` for rollout-oriented planning
- `--order key` for contiguous range inspection

The command is useful even if you are not ready to shard yet, because it makes the range model easier to see.

## A Practical Way to Think About Sharding

If you are new to the framework, do not start by memorizing the entire shard config shape. Start with these questions:

1. How many active shards are there for this table?
2. Which UUID range does each shard own?
3. Where do reads and writes go for that shard?
4. Is this a stable layout or a transition layout?

Those questions will get you much farther than thinking about sharding as an abstract scaling topic.

## When to Consider It

Consider sharding when one of these becomes true:

- A single database file or server is becoming a bottleneck.
- You need a clearer path for distributing load across nodes.
- You are planning operational separation across ranges of data.

Do not shard just because the framework supports it. Gauze is designed to make sharding possible, not mandatory.

## Beginner-Friendly Workflow

If you eventually need sharding, a reasonable progression is:

1. Get comfortable with `development_monolithic`.
2. Read and understand the current monolithic config.
3. Use `shard plan` to inspect possible ranges.
4. Introduce a sharded development environment.
5. Move from one current shard to several current shards only when you can explain the ranges clearly.

That last point matters. If the ownership ranges are not obvious to you, they will not be obvious to the next person maintaining the system either.

## Related Pages

- Read [Overview](./overview.md) for the high-level database model.
- Read [Configuration](./configuration.md) for how environments select shard layouts.
- Read [Database Setup](../database-and-sharding.md) for the existing reference material and example configuration.
