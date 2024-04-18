import {
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLInterfaceType
} from 'graphql';

import {
	ENTITY1,
	ENTITY1_ATTRIBUTES_FIELDS
} from './../types/entity1.js'

const ENTITY1_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity1_Mutation_Attributes',
	description: 'Entity1 Mutation Attributes',
	fields: ENTITY1_ATTRIBUTES_FIELDS
})

function CreateEntity1 (attributes) {
	console.log('CreateEntity1', attributes)
}

function UpdateEntity1 (where, attributes) {
	console.log('UpdateEntity1', where, attributes)
}

function DeleteEntity1 (where) {
	console.log('DeleteEntity1', where)
}

const ENTITY1_CREATE = {
	type: new GraphQLList(ENTITY1),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, {
		attributes
	}) => {
		return CreateEntity1(attributes)
	}
}

const ENTITY1_UPDATE = {
	type: new GraphQLList(ENTITY1),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, {
		where,
		attributes
	}) => {
		return UpdateEntity1(where, attributes)
	}
}

const ENTITY1_DELETE = {
	type: new GraphQLList(ENTITY1),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, {
		where
	}) => {
		return DeleteEntity1(where)
	}
}

const ENTITY1_MUTATION_ROOT = new GraphQLObjectType({
	name: 'Entity1_Mutation',
	description: 'Entity1 Mutation',
	fields: {
		create: ENTITY1_CREATE,
		update: ENTITY1_UPDATE,
		delete: ENTITY1_DELETE
	}
})

const ENTITY1_MUTATION = {
	type: ENTITY1_MUTATION_ROOT,
	resolve: (_source, {}) => {
		return {}
	}
}

export {
	ENTITY1_MUTATION
}