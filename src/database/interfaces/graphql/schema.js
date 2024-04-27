import { GraphQLSchema, GraphQLObjectType } from "graphql";

import * as $structure from "./../../../structure/index.js"

import { DATABASE_RELATIONSHIP_STRUCTURE } from "./../../../structure/relationships.js";

// queries
import { READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./queries/relationship.js";
import { READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./queries/entity1.js";
import { READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE } from "./queries/entity2.js";

// mutations
import {
	CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./mutations/relationship.js";
import {
	CREATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./mutations/entity1.js";
import {
	CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
	DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
} from "./mutations/entity2.js";

const ENTITIES = {
	[$structure.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: {
		query_relationships: null,
		mutation_relationships: null,
		query_query: $structure.relationship.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
		mutation_mutation: $structure.relationship.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE,
	},
	[$structure.entity1.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY1__STRUCTURE]: {
		query_relationships: $structure.entity1.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__ENTITY1__STRUCTURE,
		mutation_relationships: $structure.entity1.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__ENTITY1__STRUCTURE,
		query_query: $structure.entity1.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__ENTITY1__STRUCTURE,
		mutation_mutation: $structure.entity1.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__ENTITY1__STRUCTURE,
	},
	[$structure.entity2.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY2__STRUCTURE]: {
		query_relationships: $structure.entity2.database.graphql.QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
		mutation_relationships: $structure.entity2.database.graphql.MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
		query_query: $structure.entity2.database.graphql.QUERY_QUERY_FIELDS__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
		mutation_mutation: $structure.entity2.database.graphql.MUTATION_MUTATION_FIELDS__GRAPHQL__DATABASE__ENTITY2__STRUCTURE,
	},
};

const METHODS = {
	[$structure.relationship.database.graphql.TYPE__GRAPHQL__DATABASE__RELATIONSHIP__STRUCTURE]: {
		query: {
			read_relationship: READ__RELATIONSHIP__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		mutation: {
			create_relationship: CREATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
			update_relationship: UPDATE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
			delete_relationship: DELETE__RELATIONSHIP__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	[$structure.entity1.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY1__STRUCTURE]: {
		query: {
			read_entity1: READ__ENTITY1__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		mutation: {
			create_entity1: CREATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__DATABASE,
			update_entity1: UPDATE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__DATABASE,
			delete_entity1: DELETE__ENTITY1__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
	[$structure.entity2.database.graphql.TYPE__GRAPHQL__DATABASE__ENTITY2__STRUCTURE]: {
		query: {
			read_entity2: READ__ENTITY2__QUERY__GRAPHQL__INTERFACE__DATABASE,
		},
		mutation: {
			create_entity2: CREATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
			update_entity2: UPDATE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
			delete_entity2: DELETE__ENTITY2__MUTATION__GRAPHQL__INTERFACE__DATABASE,
		},
	},
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

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE,
});

export { SCHEMA__SCHEMA__GRAPHQL__INTERFACE__DATABASE };
