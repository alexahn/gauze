import {
	GraphQLSchema,
	GraphQLObjectType,
} from 'graphql';

import {
	ENTITY1_RELATIONSHIPS_FIELDS
} from './types/entity1.js'

import {
	ENTITY2_RELATIONSHIPS_FIELDS
} from './types/entity2.js'

import {
	ENTITY1_QUERY
} from './queries/entity1.js'
import {
	ENTITY2_QUERY
} from './queries/entity2.js'
import {
	ENTITY1_MUTATION
} from './mutations/entity1.js'

ENTITY1_RELATIONSHIPS_FIELDS.entity2 = ENTITY2_QUERY
ENTITY2_RELATIONSHIPS_FIELDS.entity1 = ENTITY1_QUERY

const queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		entity1: ENTITY1_QUERY,
		entity2: ENTITY2_QUERY
	})
})

const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		entity1: ENTITY1_MUTATION
	})
})

const SCHEMA = new GraphQLSchema({
	query: queryType,
	mutation: mutationType
})

export {
	SCHEMA
}