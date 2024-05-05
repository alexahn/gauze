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

export { LINK_RELATIONSHIPS__LINKER__KERNEL, LINK_ROOT__LINKER__KERNEL };
