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
- Globals and constants are upper Snake Case (all upper case).
	- TWO_WORDS

### External Code
- All external code will follow whatever conventions the source decides to use, which is usually Camel Case. External code will usually be easily identifiable due to the different in conventions.
	- twoWords

### Files
- Code variant files are Kebab Case. Code variant files usually contain code or other data that can change program execution behavior.
	- two-words
- Code invariant files are upper Kebab Case (Screaming Kebab Case). Code invariant files usually contain documentation or static variables that rarely change, if ever.
	- TWO-WORDS

### JavaScript

#### Modules
- Directories are modules, and module exports get aggregated under `index.js`.
- Non-aggregating modules (e.g. any file that is not `index.js`) should typically have named exports, and should rarely have a default export.
- Named instance exports should typically be named with the reverse order of the module path.
	- `/src/system/models/entity1.js` should export `ENTITY1_MODEL_SYSTEM`.
	- The root module can access it via `gauze.system.models.entity1.ENTITY1_MODEL_SYSTEM`.
- Named class exports should typically be named according to the abstract hierarchy.

## Dependency Hierarchy / Realm Hierarchy
- structure
- kernel
- database
- system
- user
- command

## Architecture

### Realms

#### Structure
The structure realm contains structural information for the entities in the realm.
- `f(kernel, database, system, user)` (interaction dependency)
- `g()` (code dependency)

### Kernel f(database, system, user)
The kernel realm contains base classes and common utilities, like logging and caching.
- `f(database, system, user)` (interaction dependency)
- `g(structure)` (code dependency)

### Database f(system, user)
The database realm manages state for entities.
- `f(system, user)` (interaction dependency)
- `g(structure, kernel)` (code dependency)

### System f(user)
The system realm manages user interaction.
- `f(user)` (interaction dependency)
- `g(database, kernel, structure)` (code dependency).

### User f()
The user realm manages authentication and the unauthenticated interface.
- `f()` (interaction dependency)
- `g(system, database, kernel, structure)` (code dependency)

### Control

#### Models
Models either resolve to a hard value or they interact with an interface for a realm that is lower in the dependency hierarchy.

#### Controllers
Controllers can use an arbitrary number of models to satisfy a method. Controllers should only use models from their realm.

#### Interfaces
Interfaces can use an arbitrary number of controllers to satisfy a request. Interfaces should only use controllers from their realm.

