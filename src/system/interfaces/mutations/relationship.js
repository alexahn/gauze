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
	GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE,
	GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
} from './../../../structure/relationship/system/graphql.js'

import {
	RELATIONSHIP_CONTROLLER_SYSTEM
} from './../../controllers/relationship.js'

const RELATIONSHIP_MUTATION_ATTRIBUTES = new GraphQLInputObjectType({
	name: 'Relationship_Mutation_Attributes',
	description: 'Relationship Mutation Attributes',
	fields: GRAPHQL_SYSTEM_RELATIONSHIP_ATTRIBUTES_FIELDS_STRUCTURE
})

const RELATIONSHIP_SERIALIZER = new Serializer({
	graphql_type: GRAPHQL_SYSTEM_RELATIONSHIP_TYPE_STRUCTURE
})

const RELATIONSHIP_CREATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE),
	args: {
		attributes: {
			description: 'attributes',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		console.log('relationship create controller')
		return RELATIONSHIP_CONTROLLER_SYSTEM.Create(context, mutation_arguments).then(function (data) {
			return data.map(RELATIONSHIP_SERIALIZER.serialize)
		})
	}
}

const RELATIONSHIP_UPDATE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		},
		attributes: {
			description: 'attributes',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		return RELATIONSHIP_CONTROLLER_SYSTEM.Update(context, mutation_arguments).then(function (data) {
			return data.map(RELATIONSHIP_SERIALIZER.serialize)
		})
	}
}

const RELATIONSHIP_DELETE_MUTATION_INTERFACE_SYSTEM = {
	type: new GraphQLList(GRAPHQL_SYSTEM_RELATIONSHIP_MUTATION_STRUCTURE),
	args: {
		where: {
			description: 'where',
			type: RELATIONSHIP_MUTATION_ATTRIBUTES
		}
	},
	resolve: (_source, mutation_arguments, context) => {
		return RELATIONSHIP_CONTROLLER_SYSTEM.Delete(context, mutation_arguments).then(function (data) {
			return data.map(RELATIONSHIP_SERIALIZER.serialize)
		})
	}
}

export {
	RELATIONSHIP_CREATE_MUTATION_INTERFACE_SYSTEM,
	RELATIONSHIP_UPDATE_MUTATION_INTERFACE_SYSTEM,
	RELATIONSHIP_DELETE_MUTATION_INTERFACE_SYSTEM
}