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
