import {
	GraphQLList
} from 'graphql'

function create_fields_array (fields) {
	const keys = Object.keys(fields)
	const mapped = {}
	keys.forEach(function (key) {
		const value = fields[key]
		mapped[key] = {
			type: new GraphQLList(value.type),
			description: value.description
		}
	})
	return mapped
}

export {
	create_fields_array
}