import { GraphQLSchema } from "graphql";

import * as $abstract from "./../../../abstract/index.js";
import * as $structure from "./../../../structure/index.js";

import { DATABASE_RELATIONSHIP_STRUCTURE } from "./../../../structure/relationships.js";

// ezuag
import { CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/ezuag.js";

// ytitne
import { CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/ytitne.js";

// relationship
import { CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/relationship.js";

// whitelist
import { CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/whitelist.js";

// blacklist
import { CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE, METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE } from "./entities/blacklist.js";

const ENTITIES = {
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: CONNECTION__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE]: CONNECTION__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: CONNECTION__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: CONNECTION__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE]: CONNECTION__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

const METHODS = {
	[$structure.entities.ezuag.database.graphql.TYPE__GRAPHQL__DATABASE__EZUAG__STRUCTURE]: METHODS__EZUAG__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.ytitne.database.graphql.TYPE__GRAPHQL__DATABASE__YTITNE__STRUCTURE]: METHODS__YTITNE__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: METHODS__RELATIONSHIP__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.whitelist.database.graphql.TYPE__GRAPHQL__DATABASE__WHITELIST__STRUCTURE]: METHODS__WHITELIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
	[$structure.entities.blacklist.database.graphql.TYPE__GRAPHQL__DATABASE__BLACKLIST__STRUCTURE]: METHODS__BLACKLIST__ENTITY__GRAPHQL__INTERFACE__DATABASE,
};

// todo: add some existence checks and guards to these loops
function link() {
	Object.keys(DATABASE_RELATIONSHIP_STRUCTURE).forEach(function (entity) {
		var relationships = DATABASE_RELATIONSHIP_STRUCTURE[entity];
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

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE };
