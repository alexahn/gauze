import * as $abstract from "./../abstract/index.js";
import * as $structure from "./../structure/index.js";

function HEADER__LINKER__KERNEL(query_root, entities) {
	const HEADER__HEADER__STRUCTURE = {
		type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.header.TYPE__HEADER__STRUCTURE),
		args: {},
		resolve: function (source, query_arguments, context) {
			// reverse map from entities, keys are graphql meta types
			return Object.keys($abstract.entities)
				.map(function (name) {
					const module = $abstract.entities[name].default($abstract);
					if (entities[module.graphql_meta_type]) {
						return {
							name: module.name,
							table_name: module.table_name,
							primary_key: module.primary_key,
							type: module.graphql_meta_type,
						};
					} else {
						return null;
					}
				})
				.filter(function (x) {
					return x;
				});
		},
	};
	query_root._header = HEADER__HEADER__STRUCTURE;
}

// todo: add some existence checks and guards to these loops
function LINK_RELATIONSHIPS__LINKER__KERNEL(entities, methods, relationships) {
	Object.keys(relationships).forEach(function (entity) {
		var entity_relationships = relationships[entity];
		entity_relationships.forEach(function (related) {
			Object.keys(methods[related].query).forEach(function (query) {
				var query_method = methods[related].query[query];
				entities[entity].query_relationships[query] = query_method;
			});
			Object.keys(methods[related].mutation).forEach(function (mutation) {
				var mutation_method = methods[related].mutation[mutation];
				entities[entity].mutation_relationships[mutation] = mutation_method;
			});
		});
	});
	Object.keys(entities).forEach(function (entity) {
		Object.keys(methods).forEach(function (entity_method) {
			Object.keys(methods[entity_method].query).forEach(function (query) {
				var query_method = methods[entity_method].query[query];
				entities[entity].query_query[query] = query_method;
			});
			Object.keys(methods[entity_method].mutation).forEach(function (mutation) {
				var mutation_method = methods[entity_method].mutation[mutation];
				entities[entity].mutation_mutation[mutation] = mutation_method;
			});
		});
	});
}

function LINK_ROOT__LINKER__KERNEL(query_root, mutation_root, methods) {
	Object.keys(methods).forEach(function (entity_method) {
		Object.keys(methods[entity_method].query).forEach(function (query) {
			var query_method = methods[entity_method].query[query];
			query_root[query] = query_method;
		});
		Object.keys(methods[entity_method].mutation).forEach(function (mutation) {
			var mutation_method = methods[entity_method].mutation[mutation];
			mutation_root[mutation] = mutation_method;
		});
	});
}

export { HEADER__LINKER__KERNEL, LINK_RELATIONSHIPS__LINKER__KERNEL, LINK_ROOT__LINKER__KERNEL };
