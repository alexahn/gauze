import * as $abstract from "./../../abstract/index.js";

function create_fields_array(fields) {
	const keys = Object.keys(fields);
	const mapped = {};
	keys.forEach(function (key) {
		const value = fields[key];
		mapped[key] = {
			type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT(value.type),
			description: value.description,
		};
	});
	return mapped;
}

export { create_fields_array };
