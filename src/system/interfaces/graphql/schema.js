import {
	GraphQLSchema,
	GraphQLObjectType,
} from 'graphql';

import {
	SYSTEM_RELATIONSHIP_STRUCTURE
} from './../../../structure/relationships.js'

import {
	TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE
} from './../../../structure/relationship/system/graphql.js'
import {
	TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE
} from './../../../structure/entity1/system/graphql.js'
import {
	TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
	QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
	MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
	QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
	MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE
} from './../../../structure/entity2/system/graphql.js'

// queries
import {
	RELATIONSHIP_READ_QUERY_GRAPHQL_INTERFACE_SYSTEM
} from './queries/relationship.js'
import {
	ENTITY1_READ_QUERY_GRAPHQL_INTERFACE_SYSTEM
} from './queries/entity1.js'
import {
	ENTITY2_READ_QUERY_GRAPHQL_INTERFACE_SYSTEM
} from './queries/entity2.js'

// mutations
import {
	RELATIONSHIP_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	RELATIONSHIP_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	RELATIONSHIP_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM
} from './mutations/relationship.js'
import {
	ENTITY1_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	ENTITY1_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	ENTITY1_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM
} from './mutations/entity1.js'
import {
	ENTITY2_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	ENTITY2_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
	ENTITY2_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM
} from './mutations/entity2.js'

const ENTITIES = {
	[TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: {
		query_relationships: null,
		mutation_relationships: null,
		query_query: QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE,
		mutation_mutation: MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE
	},
	[TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE]: {
		query_relationships: QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		mutation_relationships: MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		query_query: QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE,
		mutation_mutation: MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE
	},
	[TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE]: {
		query_relationships: QUERY_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
		mutation_relationships: MUTATION_RELATIONSHIPS_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
		query_query: QUERY_QUERY_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE,
		mutation_mutation: MUTATION_MUTATION_FIELDS__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE
	}
}

const METHODS = {
	[TYPE__GRAPHQL__SYSTEM__RELATIONSHIP__STRUCTURE]: {
		query: {
			read_relationship: RELATIONSHIP_READ_QUERY_GRAPHQL_INTERFACE_SYSTEM
		},
		mutation: {
			create_relationship: RELATIONSHIP_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
			update_relationship: RELATIONSHIP_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
			delete_relationship: RELATIONSHIP_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM
		}
	},
	[TYPE__GRAPHQL__SYSTEM__ENTITY1__STRUCTURE]: {
		query: {
			read_entity1: ENTITY1_READ_QUERY_GRAPHQL_INTERFACE_SYSTEM
		},
		mutation: {
			create_entity1: ENTITY1_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
			update_entity1: ENTITY1_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
			delete_entity1: ENTITY1_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM
		}
	},
	[TYPE__GRAPHQL__SYSTEM__ENTITY2__STRUCTURE]: {
		query: {
			read_entity2: ENTITY2_READ_QUERY_GRAPHQL_INTERFACE_SYSTEM
		},
		mutation: {
			create_entity2: ENTITY2_CREATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
			update_entity2: ENTITY2_UPDATE_MUTATION_GRAPHQL_INTERFACE_SYSTEM,
			delete_entity2: ENTITY2_DELETE_MUTATION_GRAPHQL_INTERFACE_SYSTEM
		}
	}
}

// todo: add some existence checks and guards to these loops
function link () {
	Object.keys(SYSTEM_RELATIONSHIP_STRUCTURE).forEach(function (entity) {
		var relationships = SYSTEM_RELATIONSHIP_STRUCTURE[entity]
		relationships.forEach(function (related) {
			Object.keys(METHODS[related].query).forEach(function (query) {
				var query_method = METHODS[related].query[query]
				ENTITIES[entity].query_relationships[query] = query_method
			})
			Object.keys(METHODS[related].mutation).forEach(function (mutation) {
				var mutation_method = METHODS[related].mutation[mutation]
				ENTITIES[entity].mutation_relationships[mutation] = mutation_method
			})
		})
	})
	Object.keys(ENTITIES).forEach(function (entity) {
		Object.keys(METHODS).forEach(function (entity_method) {
			Object.keys(METHODS[entity_method].query).forEach(function (query) {
				var query_method = METHODS[entity_method].query[query]
				ENTITIES[entity].query_query[query] = query_method
			})
			Object.keys(METHODS[entity_method].mutation).forEach(function (mutation) {
				var mutation_method = METHODS[entity_method].mutation[mutation]
				ENTITIES[entity].mutation_mutation[mutation] = mutation_method
			})
		})
	})
}

function root (query_root, mutation_root) {
	Object.keys(METHODS).forEach(function (entity_method) {
		Object.keys(METHODS[entity_method].query).forEach(function (query) {
			var query_method = METHODS[entity_method].query[query]
			query_root[query] = query_method
		})
		Object.keys(METHODS[entity_method].mutation).forEach(function (mutation) {
			var mutation_method = METHODS[entity_method].mutation[mutation]
			mutation_root[mutation] = mutation_method
		})
	})
}

const QUERY_FIELDS = {}
const MUTATION_FIELDS = {}

const QUERY_TYPE = new GraphQLObjectType({
	name: 'Query',
	fields: () => (QUERY_FIELDS)
})

const MUTATION_TYPE = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => (MUTATION_FIELDS)
})

link()
root(QUERY_FIELDS, MUTATION_FIELDS)

const SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE
})

export {
	SCHEMA__SCHEMA__GRAPHQL__INTERFACE__SYSTEM
}