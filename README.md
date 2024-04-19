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
