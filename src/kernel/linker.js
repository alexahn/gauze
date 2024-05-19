import * as $abstract from "./../abstract/index.js";
import * as $structure from "./../structure/index.js";

function pascal_snake_case(name) {
	const split = name.split("_");
	const mapped = split.map(function (part) {
		const updated = part[0].toUpperCase() + part.slice(1);
		return updated;
	});
	return mapped.join("_");
}

function HEADER__LINKER__KERNEL(realm, query_root, entities) {
	const HEADER__HEADER__STRUCTURE = {
		type: new $abstract.gauze.types.graphql.LIST__GRAPHQL__TYPE__GAUZE__ABSTRACT($structure.gauze.header.HEADER_TYPE__HEADER__STRUCTURE),
		args: {},
		resolve: function (source, query_arguments, context) {
			// reverse map from entities, keys are graphql meta types
			return Object.keys($abstract.entities)
				.map(function (name) {
					const module = $abstract.entities[name].default($abstract);
					if (entities[module.graphql_meta_type]) {
						const fields = Object.values(module.fields).map(function (field) {
							return {
								name: field.name,
								sql_type: field.sql_type,
								graphql_type: {
									name: field.graphql_type.name,
									description: field.graphql_type.description,
								},
								description: field.description,
							};
						});
						const methods = Object.values(module.methods);
						const pascal_snake_name = pascal_snake_case(module.name);
						// todo: do this the right way by reading the name field from the type definition
						// todo: we can do this by defining an ATTRIBUTES object in the schema and passing it into this function
						// todo: the architecture already makes this possible, so for now we are going to do string interpolation just to make things work end to end first
						const graphql_query_attributes_type = `${pascal_snake_name}_Query__Attributes`;
						const graphql_query_where_type = `${pascal_snake_name}_Query__Where`;
						const graphql_query_where_string_type = `${pascal_snake_name}_Query__Where_String`;
						const graphql_mutation_attributes_type = `${pascal_snake_name}_Mutation__Attributes`;
						const graphql_mutation_where_type = `${pascal_snake_name}_Mutation__Where`;
						const graphql_mutation_where_string_type = `${pascal_snake_name}_Mutation__Where_String`;
						let relationships;
						if (realm === "database") {
							relationships = $structure.relationships.DATABASE_RELATIONSHIPS__RELATIONSHIP__STRUCTURE[module.graphql_meta_type] || [];
						} else if (realm === "system") {
							relationships = $structure.relationships.SYSTEM_RELATIONSHIPS__RELATIONSHIP__STRUCTURE[module.graphql_meta_type] || [];
						} else {
							relationships = [];
						}
						return {
							name: module.name,
							table_name: module.table_name,
							primary_key: module.primary_key,
							graphql_meta_type: module.graphql_meta_type,
							fields: fields,
							methods: methods,
							graphql_attributes_string: module.graphql_attributes_string,
							graphql_where_string: module.graphql_where_string,
							graphql_query_attributes_type: graphql_query_attributes_type,
							graphql_query_where_type: graphql_query_where_type,
							graphql_query_where_string_type: graphql_query_where_string_type,
							graphql_mutation_attributes_type: graphql_mutation_attributes_type,
							graphql_mutation_where_type: graphql_mutation_where_type,
							graphql_mutation_where_string_type: graphql_mutation_where_string_type,
							relationships: relationships,
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
	// this is linking relationships to
	Object.keys(relationships).forEach(function (entity) {
		var entity_relationships = relationships[entity];
		entity_relationships.forEach(function (related) {
			Object.keys(methods[related].query).forEach(function (query) {
				var query_method = methods[related].query[query];
				entities[entity].query_relationships[query] = query_method;
				// entities[entity].query_relationships_to[query]
			});
			Object.keys(methods[related].mutation).forEach(function (mutation) {
				var mutation_method = methods[related].mutation[mutation];
				entities[entity].mutation_relationships[mutation] = mutation_method;
				// entities[entity].mutation_relationships_to[mutation]
			});
		});
	});
	// link relationships from here

	// link nested queries and mutations
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
