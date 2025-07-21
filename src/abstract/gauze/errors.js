// flat file for errors because codes need to be a monotonic sequence

// codes alloted to this file: [0, 999] inclusive

// gauze errors

const ENTITY_FIELD_ERROR_EXTENSIONS = function (code, entity, field) {
	return {
        code,
        entity: {
            name: entity.name,
        },
        field: {
            name: field.name,
            graphql_type: field.graphql_type.name, // note: this is using the name attribute on a function
            graphql_type_parameters: field.graphql_type_parameters
        },
    }
}

// code 0
const STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT = function (entity, field, value, minimum_length) {
	const err = new Error(`Scalar string has a minimum length of: ${minimum_length}, received input of length: ${value.length}`)
	err.extensions = ENTITY_FIELD_ERROR_EXTENSIONS(0, entity, field)
	err.extensions.readable = `Field has a minimum length of ${minimum_length}`
	return err
}

// code 1
const STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT = function (entity, field, value, maximum_length) {
	const err = new Error(`Scalar string has a maximum length of: ${maximum_length}, received input of length: ${value.length}`)
	err.extensions = ENTITY_FIELD_ERROR_EXTENSIONS(1, entity, field)
	err.extensions.readable = `Field has a maximum length of ${maximum_length}`
	return err
}

export {
	STRING_MINIMUM_LENGTH__ERROR__GAUZE__ABSTRACT,
	STRING_MAXIMUM_LENGTH__ERROR__GAUZE__ABSTRACT
}
