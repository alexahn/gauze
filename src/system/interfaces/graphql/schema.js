import { GraphQLSchema, GraphQLObjectType } from "graphql";

import * as $structure from "./../../../structure/index.js";

import { SYSTEM_RELATIONSHIP_STRUCTURE } from "./../../../structure/relationships.js";

// relationship
import { READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./queries/relationship.js";
import {
	CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./mutations/relationship.js";

// whitelist
import { READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./queries/whitelist.js";
import {
	CREATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./mutations/whitelist.js";

// entity1
import { READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./queries/entity1.js";
import {
	CREATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./mutations/entity1.js";

// entity2
import { READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__SYSTEM } from "./queries/entity2.js";
import {
	CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
	DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
} from "./mutations/entity2.js";

const ENTITIES = {
	[$structure.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: {
		query_relationships: null,
		mutation_relationships: null,
		query_query: $structure.relationship.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
		mutation_mutation: $structure.relationship.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	},
	[$structure.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: {
		query_relationships: null,
		mutation_relationships: null,
		query_query: $structure.whitelist.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
		mutation_mutation: $structure.whitelist.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE,
	},
	[$structure.entity1.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE]: {
		query_relationships: $structure.entity1.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		mutation_relationships: $structure.entity1.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		query_query: $structure.entity1.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		mutation_mutation: $structure.entity1.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	},
	[$structure.entity2.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE]: {
		query_relationships: $structure.entity2.system.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
		mutation_relationships: $structure.entity2.system.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
		query_query: $structure.entity2.system.graphql.QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
		mutation_mutation: $structure.entity2.system.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
	},
};

const METHODS = {
	[$structure.relationship.system.graphql.TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: {
		query: {
			read_relationship: READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		mutation: {
			create_relationship: CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			update_relationship: UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			delete_relationship: DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	[$structure.whitelist.system.graphql.TYPE__GRAPHQL__SYSTEM__WHITELIST__STRUCTURE]: {
		query: {
			read_whitelist: READ__WHITELIST__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		mutation: {
			create_whitelist: CREATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			update_whitelist: UPDATE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			delete_whitelist: DELETE__WHITELIST__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	[$structure.entity1.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE]: {
		query: {
			read_entity1: READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		mutation: {
			create_entity1: CREATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			update_entity1: UPDATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			delete_entity1: DELETE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
	[$structure.entity2.system.graphql.TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE]: {
		query: {
			read_entity2: READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__SYSTEM,
		},
		mutation: {
			create_entity2: CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			update_entity2: UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
			delete_entity2: DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__SYSTEM,
		},
	},
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

const QUERY_TYPE = new GraphQLObjectType({
	name: "Query",
	fields: () => QUERY_FIELDS,
});

const MUTATION_TYPE = new GraphQLObjectType({
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
