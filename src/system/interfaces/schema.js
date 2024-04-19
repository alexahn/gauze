import {
	GraphQLSchema,
	GraphQLObjectType,
} from 'graphql';

import {
	ENTITY1_RELATIONSHIPS_FIELDS
} from './../../structure/graphql/entity1.js'

import {
	ENTITY2_RELATIONSHIPS_FIELDS
} from './../../structure/graphql/entity2.js'

import {
	ENTITY1_QUERY_INTERFACE_SYSTEM
} from './queries/entity1.js'
import {
	ENTITY2_QUERY_INTERFACE_SYSTEM
} from './queries/entity2.js'
import {
	ENTITY1_MUTATION_INTERFACE_SYSTEM
} from './mutations/entity1.js'

ENTITY1_RELATIONSHIPS_FIELDS.entity2 = ENTITY2_QUERY_INTERFACE_SYSTEM
ENTITY2_RELATIONSHIPS_FIELDS.entity1 = ENTITY1_QUERY_INTERFACE_SYSTEM

const QUERY_TYPE = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
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

const SCHEMA = new GraphQLSchema({
	query: QUERY_TYPE,
	mutation: MUTATION_TYPE
})

export {
	SCHEMA
}