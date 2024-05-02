function create_graphql_fields(entity) {
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
	const graphql_attributes_string = Object.keys(entity.fields)
		.map(function (key) {
			const field = entity.fields[key];
			return field.name;
		})
		.join(" ");
	return graphql_attributes_string;
}

export { create_graphql_fields, create_graphql_attributes_string };
