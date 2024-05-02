import * as $abstract from "./../../abstract/index.js";

function invert(obj) {
	const inverted = {};
	Object.keys(obj).forEach(function (key) {
		const val = obj[key];
		inverted[val] = key;
	});
	return inverted;
}

function construct_mapping_from_modules(modules, from_key, to_key) {
	const mapping = {};
	const entities = Object.keys(modules)
		.map(function (key) {
			const module = modules[key];
			return module.default($abstract);
		})
		.forEach(function (entity) {
			mapping[entity[from_key]] = entity[to_key];
		});
	return mapping;
}

const GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE = construct_mapping_from_modules($abstract.entities, "graphql_meta_type", "table_name");
const SQL_TABLE_TO_GRAPHQL_TYPE__RESOLVER__STRUCTURE = invert(GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE);
const MODULE_NAME_TO_SQL_TABLE__RESOLVER__STRUCTURE = construct_mapping_from_modules($abstract.entities, "name", "table_name");
const SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE = invert(MODULE_NAME_TO_SQL_TABLE__RESOLVER__STRUCTURE);

export {
	GRAPHQL_TYPE_TO_SQL_TABLE__RESOLVER__STRUCTURE,
	SQL_TABLE_TO_GRAPHQL_TYPE__RESOLVER__STRUCTURE,
	MODULE_NAME_TO_SQL_TABLE__RESOLVER__STRUCTURE,
	SQL_TABLE_TO_MODULE_NAME__RESOLVER__STRUCTURE,
};
