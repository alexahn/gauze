# gauze

A GraphQL server architecture.

## Coding Conventions
- Based on definitions from [Naming Convention (programming)](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats).

### Internal Code
- Module names are lower Snake Case (all lower case) prefixed with a $.
	- For example, use `$two_words`.
- Class names are Pascal Case (Upper Camel Case).
	- For example, use `TwoWords`.
- Function, variable, and method names are lower Snake Case (all lower case).
	- For example, use `two_words`.
- Global constants and module exports are upper Snake Case (all upper case).
	- For example, use `TWO_WORDS`.

### External Code
- All external code will follow whatever conventions the source decides to use, which is usually Camel Case. External code will usually be easily identifiable due to the difference in conventions.
	- For example, external code may use `twoWords`.

### Files
- Code variant files are lower Snake Case. Code variant files usually contain code or other data that can change program execution behavior.
	- For example, use `two_words`.
- Code invariant files are upper upper Snake Case (all upper case). Code invariant files usually contain documentation or static variables that rarely change, if ever.
	- For example, use `TWO_WORDS`.

### JavaScript

#### Modules
- Directories are modules, and module exports get aggregated under `index.js`.
- Non-aggregating modules (e.g. any file that is not `index.js`) should typically have named exports, and should rarely have a default export.
- Named instance exports should typically be named with the reverse order of the module path.
	- Export `ENTITY1_MODEL_SYSTEM` from `/src/system/models/entity1.js`.
	- The root module can access it via `gauze.system.models.entity1.ENTITY1_MODEL_SYSTEM`.
- Named class exports should typically be named according to the abstract hierarchy.

## Dependency Hierarchy (Realm Hierarchy)
- Put `abstract` at the base of the hierarchy.
- Put `structure` above `abstract`.
- Put `kernel` above `structure`.
- Put `database` above `kernel`.
- Put `application / story` above `database`.
- Put `system / reality` above `application / story`.
- Put `environment` above `system / reality`.
- Put `command` at the top of the hierarchy.

## Architecture

### Realms

#### Abstract
The abstract realm contains the atomic defintions in the realm.

#### Structure
The structure realm contains structural information for the entities in the realm.
- Use `f(kernel, database, system, user)` to represent the interaction dependency.
- Use `g()` to represent the code dependency.

#### Kernel
The kernel realm contains base classes and common utilities, like logging and caching.
- Use `f(database, application, system, user)` to represent the interaction dependency.
- Use `g(structure)` to represent the code dependency.

#### Database
The database realm manages state for entities.
- Use `f(system, application, user)` to represent the interaction dependency.
- Use `g(structure, kernel)` to represent the code dependency.

#### Application
The application realm manages user interaction.
- Use `f(agent.user)` to represent the interaction dependency.
- Use `g(database, kernel, structure)` to represent the code dependency.

#### System
The system realm manages account interaction.
- Use `f(agent.account)` to represent the interaction dependency.
- Use `g(application, database, kernel, structure)` to represent the code dependency.

#### Story
The story realm manages character interaction.
- Use `f(agent.character)` to represent the interaction dependency.
- Use `g(database, kernel, structure)` to represent the code dependency.

#### Reality
The reality realm manages person interaction.
- Use `f(agent.person)` to represent the interaction dependency.
- Use `g(application, database, kernel, structure)` to represent the code dependency.

#### Environment
The environment realm manages external interaction. The environment allows agents to be created and authenticated.

### Agent
An agent is a combination of (account, [user], person, [character]). All of these must be uniquely associated with one agent. Initially it is possible that multiple agents can represent the same identity, but as the system grows, it should be able to reduce duplication.

### Control

#### Models
Models either resolve to a hard value or they interact with an interface for a realm that is lower in the dependency hierarchy.

#### Controllers
Controllers can use an arbitrary number of models to satisfy a method. Controllers should only use models from their realm.

#### Interfaces
Interfaces can use an arbitrary number of controllers to satisfy a request. Interfaces should only use controllers from their realm.

### Lifecyle
- Run `pre_serialize_middleware` first.
- Run `serialize` next.
- Run `post_serialize_middleware` after serialization.
- Run `pre_deserialize_middleware` before deserialization.
- Run `deserialize` for the main deserialization step.
- Run `post_deserialize_middleware` after deserialization.
