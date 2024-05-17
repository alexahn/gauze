import * as $abstract from "./../../abstract/index.js";

function create_graphql_attributes_fields(entity) {
	// todo: add a boolean attributes property to field definition so we can expose a subset of fields to attributes argument?
	const graphql_fields = {};
	Object.keys(entity.fields).forEach(function (key) {
		const field = entity.fields[key];
		if (field.required) {
			graphql_fields[key] = {
				type: new $abstract.gauze.types.graphql.NON_NULL__GRAPHQL__TYPE__GAUZE__ABSTRACT(field.graphql_type),
				description: field.description,
			};
		} else {
			graphql_fields[key] = {
				type: field.graphql_type,
				description: field.description,
			};
		}
	});
	return graphql_fields;
}

function create_graphql_where_fields(entity) {
	// todo: add a boolean where property to field definition so we can expose a subset of fields to where argument?
	const graphql_fields = {};
	Object.keys(entity.fields).forEach(function (key) {
		const field = entity.fields[key];
		graphql_fields[key] = {
			type: field.graphql_type,
			description: field.description,
		};
	});
	return graphql_fields;
}

function create_graphql_attributes_string(entity) {
	// todo: add a boolean attributes property to field definition so we can expose a subset of fields to attributes argument?
	const graphql_attributes_string = Object.keys(entity.fields)
		.map(function (key) {
			const field = entity.fields[key];
			return field.name;
		})
		.join(" ");
	return graphql_attributes_string;
}

function create_graphql_where_string(entity) {
	// todo: add a boolean where property to field definition so we can expose a subset of fields to where argument?
	const graphql_attributes_string = Object.keys(entity.fields)
		.map(function (key) {
			const field = entity.fields[key];
			return field.name;
		})
		.join(" ");
	return graphql_attributes_string;
}

export { create_graphql_attributes_fields, create_graphql_attributes_string, create_graphql_where_fields, create_graphql_where_string };
