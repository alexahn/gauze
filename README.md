# gauze

A GraphQL server architecture.

## Coding Conventions
- Based on definitions from [Naming Convention (programming)](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats).

### Internal Code
- Module names are lower Snake Case (all lower case) prefixed with a $.
	- $two_words
- Class names are Pascal Case (Upper Camel Case).
	- TwoWords
- Function, variable, and method names are lower Snake Case (all lower case).
	- two_words
- Global constants and module exports are upper Snake Case (all upper case).
	- TWO_WORDS

### External Code
- All external code will follow whatever conventions the source decides to use, which is usually Camel Case. External code will usually be easily identifiable due to the different in conventions.
	- twoWords

### Files
- Code variant files are lower Snake Case. Code variant files usually contain code or other data that can change program execution behavior.
	- two_words
- Code invariant files are upper upper Snake Case (all upper case). Code invariant files usually contain documentation or static variables that rarely change, if ever.
	- TWO_WORDS

### JavaScript

#### Modules
- Directories are modules, and module exports get aggregated under `index.js`.
- Non-aggregating modules (e.g. any file that is not `index.js`) should typically have named exports, and should rarely have a default export.
- Named instance exports should typically be named with the reverse order of the module path.
	- `/src/system/models/entity1.js` should export `ENTITY1_MODEL_SYSTEM`.
	- The root module can access it via `gauze.system.models.entity1.ENTITY1_MODEL_SYSTEM`.
- Named class exports should typically be named according to the abstract hierarchy.

## Dependency Hierarchy (Realm Hierarchy)
- abstract
- structure
- kernel
- database
- application / story
- system / reality
- environment
- command

## Architecture

### Realms

#### Abstract
The abstract realm contains the atomic defintions in the realm.

#### Structure
The structure realm contains structural information for the entities in the realm.
- `f(kernel, database, system, user)` (interaction dependency)
- `g()` (code dependency)

#### Kernel
The kernel realm contains base classes and common utilities, like logging and caching.
- `f(database, application, system, user)` (interaction dependency)
- `g(structure)` (code dependency)

#### Database
The database realm manages state for entities.
- `f(system, application, user)` (interaction dependency)
- `g(structure, kernel)` (code dependency)

#### Application
The application realm manages user interaction.
- `f(agent.user)` (interaction dependency)
- `g(database, kernel, structure)` (code dependency)

#### System
The system realm manages account interaction.
- `f(agent.account)` (interaction dependency)
- `g(application, database, kernel, structure)` (code dependency)

#### Story
The story realm manages character interaction.
- `f(agent.character)` (interaction dependency)
- `g(database, kernel, structure)` (code dependency)

#### Reality
The reality realm manages person interaction.
- `f(agent.person)` (interaction dependency)
- `g(application, database, kernel, structure)` (code dependency)

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
- `pre_serialize_middleware`
- `serialize`
- `post_serialize_middleware`
- `pre_deserialize_middleware`
- `deserialize`
- `post_deserialize_middleware`
