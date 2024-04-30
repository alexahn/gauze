import * as $abstract from "./../abstract/index.js";

function invert(obj) {
	const inverted = {};
	Object.keys(obj).forEach(function (key) {
		const val = obj[key];
		inverted[val] = key;
	});
	return inverted;
}

function construct_mapping_from_modules(modules) {
	const mapping = {};
	const entities = Object.keys(modules)
		.map(function (key) {
			const module = modules[key];
			return module.default($abstract);
		})
		.forEach(function (entity) {
			mapping[entity.graphql_meta_type] = entity.table_name;
		});
	return mapping;
}

const GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE = construct_mapping_from_modules($abstract.entities);
const SQL_TABLE_TO_GRAPHQL_TYPE__RESOLVER__STRUCTURE = invert(GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE);

export { GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE, SQL_TABLE_TO_GRAPHQL_TYPE__RESOLVER__STRUCTURE };
