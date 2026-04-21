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
