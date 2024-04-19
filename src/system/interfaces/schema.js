import {
	GraphQLSchema,
	GraphQLObjectType,
} from 'graphql';

import {
	GRAPHQL_SYSTEM_ENTITY1_RELATIONSHIPS_FIELDS_STRUCTURE
} from './../../structure/entity1/system/graphql.js'
import {
	GRAPHQL_SYSTEM_ENTITY2_RELATIONSHIPS_FIELDS_STRUCTURE
} from './../../structure/entity2/system/graphql.js'

// queries
import {
	RELATIONSHIP_QUERY_INTERFACE_SYSTEM
} from './queries/relationship.js'
import {
	ENTITY1_QUERY_INTERFACE_SYSTEM
} from './queries/entity1.js'
import {
	ENTITY2_QUERY_INTERFACE_SYSTEM
} from './queries/entity2.js'

// mutations
import {
	ENTITY1_MUTATION_INTERFACE_SYSTEM
} from './mutations/entity1.js'

GRAPHQL_SYSTEM_ENTITY1_RELATIONSHIPS_FIELDS_STRUCTURE.entity2 = ENTITY2_QUERY_INTERFACE_SYSTEM
GRAPHQL_SYSTEM_ENTITY2_RELATIONSHIPS_FIELDS_STRUCTURE.entity1 = ENTITY1_QUERY_INTERFACE_SYSTEM

const QUERY_TYPE = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		relationship: RELATIONSHIP_QUERY_INTERFACE_SYSTEM,
		entity1: ENTITY1_QUERY_INTERFACE_SYSTEM,
		entity2: ENTITY2_QUERY_INTERFACE_SYSTEM
	})
})

const MUTATION_TYPE = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		entity1: ENTITY1_MUTATION_INTERFACE_SYSTEM
	})
})

const SCHEMA_INTERFACE_SYSTEM = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE
})

export {
	SCHEMA_INTERFACE_SYSTEM
}