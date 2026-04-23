# Development

## Release Process

- Update `package.json` with new version (e.g. `0.0.13`)
- Git commit with message `v{version}` (e.g. `v0.0.13`)
- Run `./bin/git_release`
- Git commit with message `release v{version}` (e.g. `release v0.0.13`)
- Run `./bin/git_tag {version}` (e.g. `./bin/git_tag 0.0.13`)
- Run `./bin/npm_publish`
- Run `./bin/git_development`
- Run `make format`
- Git commit with message `back to development`

## Template Process

- ezuag is the source pattern for gauze in `bin/build_base_gauze_from_src:1`
- ytitne is the source pattern for entity in `bin/build_base_entity_from_src:1`
- `bin/base_from_src` copies those two into `src/kernel/src/base/...` and token-rewrites them
- `bin/src_from_base` then rebuilds the rest of `src/` from the base plus the entity definition files in `gauze/*.js` and `src/kernel/src/entities/*.js` in `bin/src_from_base:1`
