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
	Serializer
} from './../../../structure/serializer.js'

import {
	GRAPHQL_SYSTEM_ENTITY1_MUTATION_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY1_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/entity1/system/graphql.js'

import {
	ENTITY1_CONTROLLER_SYSTEM
} from './../../controllers/entity1.js'

const ENTITY1_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Entity1_Mutation_Attributes',
	description: 'Entity1 Mutation Attributes',
	fields: GRAPHQL_SYSTEM_ENTITY1_ATTRIBUTES_FIELDS_STRUCTURE
})

const ENTITY1_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_ENTITY1_TYPE_STRUCTURE
})

const ENTITY1_CREATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY1_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		console.log('entity1 create controller')
		return ENTITY1_CONTROLLER_SYSTEM.Create(context, mutation_arguments).then(function (data) {
			return data.map(ENTITY1_SERIALIZER.serialize)
		})
	}
}

const ENTITY1_UPDATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY1_MUTATION_STRUCTURE),
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
	resolve: (_source, mutation_arguments, context) => {
		return ENTITY1_CONTROLLER_SYSTEM.Update(context, mutation_arguments).then(function (data) {
			return data.map(ENTITY1_SERIALIZER.serialize)
		})
	}
}

const ENTITY1_DELETE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_ENTITY1_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: ENTITY1_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		return ENTITY1_CONTROLLER_SYSTEM.Delete(context, mutation_arguments).then(function (data) {
			return data.map(ENTITY1_SERIALIZER.serialize)
		})
	}
}

export {
	ENTITY1_CREATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY1_UPDATE_MUTATION_INTERFACE_SYSTEM,
	ENTITY1_DELETE_MUTATION_INTERFACE_SYSTEM
}