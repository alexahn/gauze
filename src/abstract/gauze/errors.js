// flat file for errors because codes need to be a monotonic sequence

// codes alloted to this file:
// [0, 999] inclusive for abstract
// [2000, 2999] inclusive for kernel
// [4000, 4999] inclusive for database
// [6000, 6999] inclusive for system
// [8000, 8999] inclusive for server

// gauze errors

const ENTITY_FIELD_ERROR_EXTENSIONS = function (name, code, entity, field) {
	return {
		code,
		name: name,
		entity: {
			name: entity.name,
		},
		field: {
			name: field.name,
			graphql_type: field.graphql_type.name, // note: this is using the name attribute on a function
			graphql_type_parameters: field.graphql_type_parameters,
		},
	};
};

// code 0
const ID_REGEX__ERROR__GAUZE__ABSTRACT = function (entity, field, value, regex) {
	const err = new Error(`Scalar string has a regex pattern of: ${regex}, received input: ${value.length}`);
	err.extensions = ENTITY_FIELD_ERROR_EXTENSIONS("STRING_ID_REGEX__ERROR__GAUZE__ABSTRACT", 0, entity, field);
	err.extensions.readable = `Field must be a UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)`;
	return err;
};

// code 1
const STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT = function (entity, field, value, minimum_length) {
	const err = new Error(`Scalar string has a minimum length of: ${minimum_length}, received input of length: ${value.length}`);
	err.extensions = ENTITY_FIELD_ERROR_EXTENSIONS("STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT", 1, entity, field);
	err.extensions.readable = `Field must be a minimum length of ${minimum_length}`;
	return err;
};

// code 2
const STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT = function (entity, field, value, maximum_length) {
	const err = new Error(`Scalar string has a maximum length of: ${maximum_length}, received input of length: ${value.length}`);
	err.extensions = ENTITY_FIELD_ERROR_EXTENSIONS("STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT", 2, entity, field);
	err.extensions.readable = `Field must be a maximum length of ${maximum_length}`;
	return err;
};

// code 4000
const UNIQUE_CONSTRAINT__ERROR_GAUZE__ABSTRACT = function (entity, field, message) {
	const err = new Error(`Field has a unique constraint: ${message}`);
	err.extensions = ENTITY_FIELD_ERROR_EXTENSIONS("UNIQUE_CONSTRAINT__ERROR_GAUZE__ABSTRACT", 4000, entity, field);
	err.extensions.readable = `Field must be unique`;
	return err;
};

export {
	// 0 - 1000
	ID_REGEX__ERROR__GAUZE__ABSTRACT,
	STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT,
	STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT,
	// 4000 - 5000
	UNIQUE_CONSTRAINT__ERROR_GAUZE__ABSTRACT,
};
