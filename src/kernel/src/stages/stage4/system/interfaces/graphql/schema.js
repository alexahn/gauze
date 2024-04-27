import { GraphQLSchema } from "graphql";

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";

import { SYSTEM_RELATIONSHIP_STRUCTURE } from "./../../../structure/relationships.js";

// relationship
import { CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/relationship.js";

// whitelist
import { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/whitelist.js";

// entity1
import { CONNECTION__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/entity1.js";

// entity2
import { CONNECTION__ENTITY2__ENTITY__GRAPHQL__INTERFACE__SYSTEM, METHODS__ENTITY2__ENTITY__GRAPHQL__INTERFACE__SYSTEM } from "./entities/entity2.js";

const ENTITIES = {
	[$structure.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entity1.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE]: CONNECTION__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entity2.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE]: CONNECTION__ENTITY2__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
};

const METHODS = {
	[$structure.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entity1.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE]: METHODS__ENTITY1__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
	[$structure.entity2.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE]: METHODS__ENTITY2__ENTITY__GRAPHQL__INTERFACE__SYSTEM,
};

// todo: add some existence checks and guards to these loops
function link() {
	Object.keys(SYSTEM_RELATIONSHIP_STRUCTURE).forEach(function (entity) {
		var relationships = SYSTEM_RELATIONSHIP_STRUCTURE[entity];
		relationships.forEach(function (related) {
			Object.keys(METHODS[related].query).forEach(function (query) {
				var query_method = METHODS[related].query[query];
				ENTITIES[entity].query_relationships[query] = query_method;
			});
			Object.keys(METHODS[related].mutation).forEach(function (mutation) {
				var mutation_method = METHODS[related].mutation[mutation];
				ENTITIES[entity].mutation_relationships[mutation] = mutation_method;
			});
		});
	});
	Object.keys(ENTITIES).forEach(function (entity) {
		Object.keys(METHODS).forEach(function (entity_method) {
			Object.keys(METHODS[entity_method].query).forEach(function (query) {
				var query_method = METHODS[entity_method].query[query];
				ENTITIES[entity].query_query[query] = query_method;
			});
			Object.keys(METHODS[entity_method].mutation).forEach(function (mutation) {
				var mutation_method = METHODS[entity_method].mutation[mutation];
				ENTITIES[entity].mutation_mutation[mutation] = mutation_method;
			});
		});
	});
}

function root(query_root, mutation_root) {
	Object.keys(METHODS).forEach(function (entity_method) {
		Object.keys(METHODS[entity_method].query).forEach(function (query) {
			var query_method = METHODS[entity_method].query[query];
			query_root[query] = query_method;
		});
		Object.keys(METHODS[entity_method].mutation).forEach(function (mutation) {
			var mutation_method = METHODS[entity_method].mutation[mutation];
			mutation_root[mutation] = mutation_method;
		});
	});
}

const QUERY_FIELDS = {};
const MUTATION_FIELDS = {};

const QUERY_TYPE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Query",
	fields: () => QUERY_FIELDS,
});

const MUTATION_TYPE = new $abstract.gauze.types.graphql.OBJECT__GRAPHQL__TYPE__GAUZE__ABSTRACT({
	name: "Mutation",
	fields: () => MUTATION_FIELDS,
});

link();
root(QUERY_FIELDS, MUTATION_FIELDS);

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM };
