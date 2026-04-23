# Gauze repo notes

- Entity-style GraphQL method coverage lives under `test/<type>/(database|system)/methods/` and uses numbered step files like `0.create.js`, `1.count.js`, loaded with `load_steps(...)`.
- Database method suites call `run_steps(...)` with the database GraphQL schema; system method suites either also use `run_steps(...)` directly or, for access-controlled entities like `ytitne`, `run_layers(...)` with `./environment` steps first.
- `count` tests in this repo follow the same two-step pattern as other method tests: create a single record, then assert the GraphQL `count_<type>` query returns `[{"select":"count(*)","count":1}]`.
