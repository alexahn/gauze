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
	Entity1Query
} from './queries/entity1.js'
import {
	Entity2Query
} from './queries/entity2.js'
import {
	Entity1Mutation
} from './mutations/entity1.js'

ENTITY1_RELATIONSHIPS_FIELDS.entity2 = Entity2Query
ENTITY2_RELATIONSHIPS_FIELDS.entity1 = Entity1Query

const queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		entity1: Entity1Query,
		entity2: Entity2Query
	})
})

const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		entity1: Entity1Mutation
	})
})

const SCHEMA = new GraphQLSchema({
	query: queryType,
	mutation: mutationType
})

export {
	SCHEMA
}